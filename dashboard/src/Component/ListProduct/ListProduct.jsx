import React, { useEffect, useState } from 'react';
import { IoMdArchive } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { allproduct, productByParentCategory } from '../../features/product/productSlice';
import { MdLabelImportant } from 'react-icons/md';
import { getcategories } from '../../features/category/categorySlice';
import './style.css'
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
  
  const { products } = useSelector(state => state?.product);
  const _data = products?.map((product, i) => ({
    key: i + 1,
    images_product:<img  src={product?.images_product[0]?.url} />,
    titre: product?.titre,
    description: product?.description, // Stocke la chaîne HTML directement
    Actions: (
      <div className='d-flex gap-20'>
        <button style={{ padding: '10px' }} className='bg-warning'></button>
        <button style={{ padding: '10px' }} className='bg-dark'>
          <IoMdArchive className='fs-5' />
        </button>
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
      <div className='qqq d-flex justify-content-between align-items-center p-3 bg-primary text-light' style={{ width: '100%' }}>
        <div>
          <h2>LIST PRODUCTS</h2>
        </div>
        <div className='input-container mt-1'>
        <select className='text-black'  onChange={handleCategoryChange} value={selectedCategoryId}>
  <option  selected value="">Select Category</option>
 
  {
  mainCategories && mainCategories.map((category) => (
    <React.Fragment key={category?._id}>
      <option onClick={()=>{
        alert('rrr')
        setTimeout(()=>{
         
        },2000)
      }} className='text-sm uppercase font-extrabold' value={category?._id}>{category?.name}</option>
      {category?.subCategories && category?.subCategories.length > 0 && (
        category.subCategories.map((subCategory) => (
          <option  className='text-xs uppercase font-extralight' key={subCategory?._id} value={subCategory?._id}>
            ---- {subCategory?.name} {/* Ajouter un tiret pour indiquer qu'il s'agit d'une sous-catégorie */}
          </option>
        ))
      )}
    </React.Fragment>
  ))
}

</select>
        </div>
      </div>
      <Table columns={columns} dataSource={_data} />
    </div>
  );
}

export default ListProduct;
