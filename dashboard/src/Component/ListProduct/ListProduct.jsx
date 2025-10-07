import React, { useEffect, useState } from 'react';
import { IoMdArchive } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { allproduct, deleteProduct, productByParentCategory } from '../../features/product/productSlice';
import { MdLabelImportant } from 'react-icons/md';
import { getcategories } from '../../features/category/categorySlice';
import './style.css'
import { GrTrash } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router';
const columns = [
  {
    title: 'Key',
    dataIndex: 'key',
  },
  {
      title: 'Images',
      dataIndex: 'images_product',
    },
  {
    title: 'Titre',
    dataIndex: 'titre',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />, // Utilise dangerouslySetInnerHTML ici
  },
  {
    title: "Action",
    dataIndex: 'Actions'
  }
];

const ListProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allproduct());
  }, [dispatch]);
  const navigate= useNavigate()
  const { products } = useSelector(state => state?.product);
  const _data = products?.map((product, i) => ({
    key: i + 1,
    images_product:<img  src={product?.images_product[0]?.url} className='object-cover w-[100px] h-[100px] rounded-lg'/>,
    titre: product?.titre,
    description: product?.description, // Stocke la chaîne HTML directement
    Actions: (
      <div className='flex gap-2'>
        <button onClick={()=>dispatch(deleteProduct(product?._id))} style={{ padding: '10px' , fontSize :'20px'}} className='bg-red-500 text-white rounded-full hover:text-red-500 hover:bg-white border border-transparent hover:border-red-500'><GrTrash/></button>
         <button  onClick={()=>navigate(`/editcategory/${product?._id}`)} style={{ padding: '10px' , fontSize :'20px'}} className='bg-yellow-500 text-white rounded-full hover:text-yellow-500 hover:bg-white border border-transparent hover:border-yellow-500'><FaRegEdit/></button>
        
      </div>
    ),
  })) || [];

     const{categories} = useSelector(state=>state?.category)
     const subCategoryIds = categories.flatMap(cat => cat.subCategories.map(subCat => subCat._id));
    
     // Étape 2 : Filtrer les catégories principales en excluant celles qui sont dans la liste des sous-catégories
     const mainCategories = categories.filter(cat => !subCategoryIds.includes(cat._id)); 
     const [selectedCategoryId, setSelectedCategoryId] = useState('');

     const handleCategoryChange = (event) => {
       const selectedId = event.target.value;
       setSelectedCategoryId(selectedId);
       console.log('Selected Category ID:', selectedId); // Affiche l'ID de la catégorie sélectionnée dans la console
    
      
      };
      useEffect(()=>{
        dispatch(getcategories())
        if(selectedCategoryId !== null){
         
            
          
           dispatch(productByParentCategory(selectedCategoryId))
         }
       },[selectedCategoryId,dispatch])
     return (
    <div className='container mt-5 h-[100vh]'>

      <Table columns={columns} dataSource={_data} />
    </div>
  );
}

export default ListProduct;
