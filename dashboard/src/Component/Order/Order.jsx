import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Popconfirm, message } from 'antd';
import { commandes, deleteorder } from '../../features/commande/commandeSlice';
import { allproduct, productByParentCategory } from '../../features/product/productSlice';
import { getcategories } from '../../features/category/categorySlice';
import { io } from 'socket.io-client';
import { FaTrashAlt } from 'react-icons/fa';

const socket = io('https://frog-store-server.onrender.com');

const ListProduct = () => {
  const dispatch = useDispatch();
  const { commande } = useSelector(state => state?.commande);
  const { categories } = useSelector(state => state?.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [commandess, setCommandess] = useState([]);

  useEffect(() => {
    socket.on('newCommande', (newCommande) => {
      console.log('🆕 Nouvelle commande reçue :', newCommande);
      setCommandess((prev) => [newCommande, ...prev]);
    });

    return () => socket.off('newCommande');
  }, []);

  useEffect(() => {
    dispatch(commandes());
    dispatch(allproduct());
    dispatch(getcategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(productByParentCategory(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);


  const allCommandes = [...commandess, ...(Array.isArray(commande) ? commande : [])];

  const _data = allCommandes?.map((c, i) => ({
    key: i + 1,
    id: c?._id,
    user: c?.user,
    items:
      c?.cart?.items?.map(
        art =>
          `${art?.product?.titre || 'Produit inconnu'} - ${art?.product?.prix || 0} DT * ${art?.quantity} ====> ${art?.color} `
      ) || [],
    size: c?.cart?.items?.map(art => art?.size) || [],
    priceTotal:
      c?.cart?.items?.reduce(
        (sum, current) =>
          sum + ((current.product.prix - ((current.product.prix * current.product.promotion) / 100)) * current.quantity),
        0
      ) + ' DT',
    status: c?.status || "Unread",
    date: c?.createdAt,
  }));

  const columns = [
    {
      title: 'Client',
      dataIndex: 'user',
      render: (user) => (
        <div className="flex flex-col text-gray-700">
          <span className="font-medium text-gray-800">{user?.firstname} {user?.lastname}</span>
          <span className="text-sm text-gray-500">{user?.numtel || '—'}</span>
          <span className="text-sm text-gray-500">{user?.adress || '—'}</span>
        </div>
      ),
    },
    {
      title: 'Produits',
      dataIndex: 'items',
      render: (items) => (
        <div className="flex flex-col gap-1">
          {items?.length > 0 ? (
            items.map((item, i) => (
              <span
                key={i}
                className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium shadow-sm"
              >
                {item} 
              </span>
            ))
          ) : (
            <span className="italic text-gray-400">Aucun produit</span>
          )}
        </div>
      ),
    },
    {
      title: 'Taille',
      dataIndex: 'size',
      render: (sizes) => (
        <div className="flex flex-wrap gap-2">
          {sizes?.length > 0 ? (
            sizes.map((s, i) => (
              <span
                key={i}
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold"
              >
                {s}
              </span>
            ))
          ) : (
            <span className="italic text-gray-400">—</span>
          )}
        </div>
      ),
    },
    {
      title: 'Prix Total',
      dataIndex: 'priceTotal',
      render: (price) => <span className="font-bold text-green-600">{price}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) => (
        <Popconfirm
          title="Supprimer cette commande ?"
         onConfirm={() => dispatch(deleteorder(id)) }
          okText="Oui"
          cancelText="Non"
        >
          <button      className="flex items-center justify-center gap-2 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm font-medium transition">
            <FaTrashAlt /> Supprimer
          </button>
        </Popconfirm>
      ),
    },
    {
      title: 'Date & Heure',
      dataIndex: 'date',
      render: (isoString) => <DateTimeDisplay isoString={isoString} />,
    },
  ];

  return (
    <div className="container mx-auto mt-[10px] w-full p-5">
      <div className="bg-white w-full shadow-lg rounded-xl overflow-hidden">
        <Table
          columns={columns}
          dataSource={_data}
          pagination={{ pageSize: 10 }}
          className="min-w-full"
          rowClassName={(record) =>
            record.status === "Unread"
              ? "bg-gray-100 font-semibold"
              : "bg-white text-gray-500"
          }
          scroll={{ x: 'max-content', y: 500 }}
        />
      </div>
    </div>
  );
};

export default ListProduct;

const DateTimeDisplay = ({ isoString }) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return (
    <div className="text-gray-600 italic text-sm font-light">
      <span>{formattedDate}</span> | <span>{formattedTime}</span>
    </div>
  );
};
