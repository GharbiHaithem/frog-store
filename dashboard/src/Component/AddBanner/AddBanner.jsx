import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../features/upload/uploadSlice';
import { banner, createbanner, delbanner } from '../../features/banner/bannerSlice';
import { AiTwotoneDelete } from "react-icons/ai";
const AddBanner = () => {
        const [localImageUrls, setLocalImageUrls] = useState([]);
            const [selectedFiles, setSelectedFiles] = useState([]);
              const [_images, set_Images] = useState([]);
                   const dispatch = useDispatch()
                   useEffect(()=>{
                      dispatch(banner())
                   },[dispatch])
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
                         
                          images_banner:[],
                          
                        },
                        
                        enableReinitialize: true,
                        onSubmit: (values) => {
                       dispatch(createbanner(values))
                        console.log(values.images_product)
                          formik.resetForm();
                          setLocalImageUrls([]);
                          setTimeout(() => {
                        dispatch(banner())
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
                formik.setFieldValue('images_banner', images);
            }
        }, [images]);
        const{images_banner,message} = useSelector(state=>state?.banner)
        const handleDelete=(img)=>{
          console.log(img)
          dispatch(delbanner({publicId:img}))
            setTimeout(() => {
                        dispatch(banner())
                          }, 200);

        }
  return (
  
          <div className='mt-10'>
            <form onSubmit={formik.handleSubmit}> 
      <label className="block text-sm font-medium text-gray-600 mb-1">Images de la benniére</label>
      <input
        type="file"
        multiple
        onChange={handleSelectFile}
        className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4
        file:rounded-lg file:border-0 file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button type='submit' className='text-green-600 bg-green-300 p-3 rounded-sm mt-5 '>Save Banner</button>
      <br/>
      {message && <span className='text-red-500 text-sm font-light'>{message}</span>}
      </form>
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
    <div className="flex md:flex-row flex-col  gap-2">
  {images_banner && images_banner[0]?.images_banner?.map((img, i) => (
    <div key={i} className="relative group w-[200px]">
      {/* Image */}
      <img
        className="w-[200px] h-[200px]  object-cover rounded-lg"
        src={img?.url}
        alt=""
      />

      {/* Overlay noir visible uniquement au hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          onClick={() => handleDelete(img?.publicId)}
          className="bg-red-600 text-white px-3 py-1 rounded-lg"
        >
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  ))}
</div>

    </div>

  )
}

export default AddBanner