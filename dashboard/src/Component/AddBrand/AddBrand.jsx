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
import { createbrand } from '../../features/brand/brandSlice';

const AddBrand = () => {
      const [localImageUrls, setLocalImageUrls] = useState([]);
      const [selectedFiles, setSelectedFiles] = useState([]);
      const [_images, set_Images] = useState([]);

      const dispatch = useDispatch()
      const schema = yup.object().shape({
            titre: yup.string().required('Titre est requis'),
         
          
          });
        
          const formik = useFormik({
            initialValues: {
              titre: '',
           
              images_brand:[],
              
            },
            validationSchema: schema,
            enableReinitialize: true,
            onSubmit: (values) => {
             dispatch(createbrand(values))
            
              formik.resetForm();
              setLocalImageUrls([]);
              setTimeout(() => {
                dispatch(resetState());
              }, 2000);
           
            }
          });
        
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
                formik.setFieldValue('images_brand', images);
            }
        }, [images]);
        
          return (
    <div className='w-[50%] mx-auto'>
         
         <form onSubmit={formik.handleSubmit}>
        <div className="form-group flex flex-col mt-3">
          <label className="col-form-label font-bold text-[#236693] text-xs md:text-sm">Titre Brand</label>
          <input 
            className="form-control rounded-lg text-xs p-2 md:h-11"
            type="text"
            name='titre'
            value={formik.values.titre}
            onChange={formik.handleChange('titre')}
            placeholder="Titre Brand"
          />
          {formik.touched.titre && formik.errors.titre ? (
            <div className='p-2 w-full flex items-center bg-blue-300 text-white gap-3'>
              <MdLabelImportant />
              <span className='mb-0 text-sm'>{formik.errors.titre}</span>
            </div>
          ) : null}
        </div>
      
       
       
        <div className="form-group mt-1 flex flex-col w-full gap-1">
          <label className="custom-file-upload">
            <input type="file" multiple placeholder="Année de fabrication" onChange={handleSelectFile} />
            <div className='flex items-center gap-2'>
              <BsUpload />
              <span className='mx-3'>Sélectionner une image pour article</span>
            </div>
          </label>
          <span className='text-xs font-extralight'>Format JPG ou JPEG uniquement</span>
        </div>
       
        <button 
          type='submit'
         
          className={`p-2 w-full text-white bg-blue-600 mt-2  rounded-lg`}
        
        >
        Add Brand
        </button>
      </form>
    </div>
  )
}

export default AddBrand