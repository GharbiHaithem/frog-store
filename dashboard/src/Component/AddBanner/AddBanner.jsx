import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../features/upload/uploadSlice';

const AddBanner = () => {
        const [localImageUrls, setLocalImageUrls] = useState([]);
            const [selectedFiles, setSelectedFiles] = useState([]);
              const [_images, set_Images] = useState([]);
                   const dispatch = useDispatch()
                const handleSelectFile = (event) => {
            const selectedFiles = Array.from(event.target.files);
            setSelectedFiles(selectedFiles);
            
            // Mettez à jour _images avec les fichiers sélectionnés
            set_Images(selectedFiles);
            
            // Créez des URLs locales pour afficher les images en avant-première
            const urls = selectedFiles.map((file) => URL.createObjectURL(file));
            setLocalImageUrls(urls);
        };
           const formik = useFormik({
                        initialValues: {
                         
                          images_product:[],
                          
                        },
                        
                        enableReinitialize: true,
                        onSubmit: (values) => {
                       
                        console.log(values.images_product)
                          formik.resetForm();
                          setLocalImageUrls([]);
                          setTimeout(() => {
                        
                          }, 2000);
                       
                        }
                      });
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
  
          <div className='mt-10'>
      <label className="block text-sm font-medium text-gray-600 mb-1">Images de la benniére</label>
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

  )
}

export default AddBanner