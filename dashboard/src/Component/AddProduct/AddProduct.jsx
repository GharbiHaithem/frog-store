import React, { useEffect, useState } from 'react';
import './style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BsUpload } from "react-icons/bs";
import * as yup from 'yup';
import { MdDomain, MdLabelImportant } from "react-icons/md";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GrCheckboxSelected } from "react-icons/gr";

import { useParams } from 'react-router';
import { createproduct } from '../../features/product/productSlice';
import { getcategories } from '../../features/category/categorySlice';
import { resetState, upload } from '../../features/upload/uploadSlice';

const AddProduct = () => {
      const [localImageUrls, setLocalImageUrls] = useState([]);
      const [selectedFiles, setSelectedFiles] = useState([]);
      const [_images, set_Images] = useState([]);
      useEffect(()=>{
        dispatch(getcategories())
       },[])
      const dispatch = useDispatch()
      const schema = yup.object().shape({
            titre: yup.string().required('Titre est requis'),
            description: yup.string().required('Description est requise'),
            // images_product: yup.array().min(1, 'Champ image article est obligatoire').required('Champ image article est obligatoire'),
            category : yup.string().required('category est requise'),
            prix: yup.string().required('prix est requise'),
          
          });
        
          const formik = useFormik({
            initialValues: {
              titre: '',
              description:'',
              category:'',
              images_product:[],
              prix : null,
              quantityStq :null,
              promotion:null,
               sizes: []
            },
            validationSchema: schema,
            enableReinitialize: true,
            onSubmit: (values) => {
             dispatch(createproduct(values))
            
              formik.resetForm();
              setLocalImageUrls([]);
              setTimeout(() => {
                dispatch(resetState());
              }, 2000);
           
            }
          });
        
          const{categories} = useSelector(state=>state?.category)
          const subCategoryIds = categories.flatMap(cat => cat.subCategories.map(subCat => subCat._id));
         
          // Étape 2 : Filtrer les catégories principales en excluant celles qui sont dans la liste des sous-catégories
          const mainCategories = categories.filter(cat => !subCategoryIds.includes(cat._id));  
          const handleSelectCategory=(e)=>{
            formik.setFieldValue('category', (e.target.value));
          } 
          const[sCat,setSCat] = useState([])
          useEffect(()=>{
            if(formik.values.category !== null && formik.values.category){
              const data  = categories?.filter((cat)=>cat?._id === formik.values.category  ? cat?.subCategories  : "" )
              console.log(data)
              console.log(data)
              setSCat(data)
            }
          },[formik.values.category])
         useEffect(()=>{
          const data  = categories?.filter((cat)=>cat?._id === formik.values.category  ? cat?.name  : "" )
          console.log(data)
          setSCat(data)
         },[formik.values.category])
          console.log(formik.values.category)
          const handleSelectFile = (event) => {
            const selectedFiles = Array.from(event.target.files);
            setSelectedFiles(selectedFiles);
            
            // Mettez à jour _images avec les fichiers sélectionnés
            set_Images(selectedFiles);
            
            // Créez des URLs locales pour afficher les images en avant-première
            const urls = selectedFiles.map((file) => URL.createObjectURL(file));
            setLocalImageUrls(urls);
        };
        
        useEffect(() => {
            // Chargez les images seulement après que _images a été mis à jour
            if (_images.length > 0) {
                dispatch(upload(_images));
            }
        }, [_images, dispatch]);
        const { images, isLoading } = useSelector(state => state.upload); 
        useEffect(() => {
            // Une fois que les images sont téléchargées, mettez à jour le formulaire
            if (images.length > 0) {
                formik.setFieldValue('images_product', images);
            }
        }, [images]);
        
          return (
 <div className="w-[90%] md:w-[60%] mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
  <h2 className="text-2xl font-bold text-center text-blue-700">Ajouter un produit</h2>

  <form onSubmit={formik.handleSubmit} className="space-y-5">
    {/* Catégorie */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Catégorie</label>
      <select
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onChange={handleSelectCategory}
        value={formik.values.category || ""}
      >
        <option value="">Sélectionner une catégorie</option>
        {mainCategories?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      {formik.touched.category && formik.errors.category && (
        <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
      )}
    </div>

    {/* Titre */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Titre article</label>
      <input
        type="text"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Titre du produit"
        value={formik.values.titre}
        onChange={formik.handleChange("titre")}
      />
    </div>

    {/* Prix & Quantité */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Prix</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Prix"
          value={formik.values.prix}
          onChange={formik.handleChange("prix")}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Quantité</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Quantité"
          value={formik.values.quantityStq}
          onChange={formik.handleChange("quantityStq")}
        />
      </div>
    </div>

    {/* Promotion */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Promotion (%)</label>
      <input
        type="number"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Promotion"
        value={formik.values.promotion}
        onChange={formik.handleChange("promotion")}
      />
    </div>

    {/* Tailles */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">Tailles disponibles</label>
      <div className="flex gap-2 flex-wrap">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => {
              if (formik.values.sizes.includes(size)) {
                formik.setFieldValue(
                  "sizes",
                  formik.values.sizes.filter((s) => s !== size)
                );
              } else {
                formik.setFieldValue("sizes", [...formik.values.sizes, size]);
              }
            }}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              formik.values.sizes.includes(size)
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>

    {/* Upload Images */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Images du produit</label>
      <input
        type="file"
        multiple
        onChange={handleSelectFile}
        className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4
        file:rounded-lg file:border-0 file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <div className="flex gap-2 mt-3 flex-wrap">
        {localImageUrls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt="preview"
            className="w-20 h-20 object-cover rounded-lg shadow-sm border"
          />
        ))}
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
      <ReactQuill
        className="bg-white rounded-lg"
        theme="snow"
        placeholder="Description du produit"
        value={formik.values.description}
        onChange={formik.handleChange("description")}
        name="description"
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
    >
      Ajouter le produit
    </button>
  </form>
</div>

  )
}

export default AddProduct