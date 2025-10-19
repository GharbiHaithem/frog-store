import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Select, Tag, Popconfirm, Tooltip } from "antd";
import {
  allproduct,
  deleteProduct,
  productByParentCategory,
} from "../../features/product/productSlice";
import { getcategories } from "../../features/category/categorySlice";
import { GrTrash } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const { Option } = Select;

const ListProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state?.product);
  const { categories } = useSelector((state) => state?.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Charger les données
  useEffect(() => {
    dispatch(allproduct());
    dispatch(getcategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(productByParentCategory(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);

  // Gestion des catégories principales
  const subCategoryIds = categories.flatMap((cat) =>
    cat.subCategories.map((subCat) => subCat._id)
  );
  const mainCategories = categories.filter(
    (cat) => !subCategoryIds.includes(cat._id)
  );

  // Colonnes du tableau
  const columns = [
    {
      title: "Image",
      dataIndex: "images_product",
      align: "center",
    },
    {
      title: "Titre",
      dataIndex: "titre",
      render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <div
          className="text-gray-500 text-sm"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      align: "center",
    },
  ];

  // Données formatées
  const _data =
    products?.map((product, i) => ({
      key: i + 1,
      images_product: (
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={product?.images_product[0]?.url}
          alt="product"
          className="object-cover w-[80px] h-[80px] rounded-xl shadow-md"
        />
      ),
      titre: product?.titre,
      description: product?.description,
      Actions: (
        <div className="flex justify-center gap-4">
          <Tooltip title="Modifier" placement="top">
            <button
              onClick={() => navigate(`/editcategory/${product?._id}`)}
              className="bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-full shadow-md transition-transform hover:scale-110"
            >
              <FaRegEdit size={18} />
            </button>
          </Tooltip>

          <Tooltip title="Supprimer" placement="top">
            <Popconfirm
              title="Supprimer ce produit ?"
              okText="Oui"
              cancelText="Non"
              onConfirm={() => dispatch(deleteProduct(product?._id))}
            >
              <button className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-full shadow-md transition-transform hover:scale-110">
                <GrTrash size={18} />
              </button>
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    })) || [];

  return (
<motion.div
  className="p-4 md:p-6 rounded-xl bg-white shadow-lg h-[100vh] flex flex-col"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 flex-shrink-0 gap-3 md:gap-0">
    <h1 className="text-xl md:text-2xl font-bold text-blue-700">
      🛍️ Liste des Produits
    </h1>

    <Select
      placeholder="Filtrer par catégorie"
      onChange={(value) => setSelectedCategoryId(value)}
      value={selectedCategoryId || undefined}
      className="w-full md:w-60"
      allowClear
    >
      {mainCategories.map((cat) => (
        <Option key={cat._id} value={cat._id}>
          {cat.name}
        </Option>
      ))}
    </Select>
  </div>

  {/* Tableau scrollable verticalement */}
  <div className="flex-1 overflow-y-auto">
    <Table
      columns={columns}
      dataSource={_data}
      pagination={{ pageSize: 5 }}
      bordered
      className="shadow-sm rounded-lg overflow-hidden"
      scroll={{ x: "max-content" }} // permet scroll horizontal si le tableau est large
    />
  </div>
</motion.div>

  );
};

export default ListProduct;
