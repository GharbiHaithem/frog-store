import React, { useEffect, useState } from 'react';
import './style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createproduct, productByid, updateproduct } from '../../features/product/productSlice';
import { getcategories } from '../../features/category/categorySlice';
import { resetState, upload } from '../../features/upload/uploadSlice';
import { useNavigate, useParams } from 'react-router-dom'
const AddProduct = () => {
  const dispatch = useDispatch();
  const [localImageUrls, setLocalImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [_images, set_Images] = useState([]);
 const{id} = useParams()
 console.log(id)
  useEffect(()=>{
  if(id){
    dispatch(productByid(id))
  }
 },[id,dispatch])
   const { productbyid,isLoading ,sizes} = useSelector(state => state?.product)
  // 👉 état pour la modale taille
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [currentSize, setCurrentSize] = useState("");
  const [sizeQuantity, setSizeQuantity] = useState("");
 
  useEffect(() => {
    dispatch(getcategories());
  }, [dispatch]);

  const schema = yup.object().shape({
    titre: yup.string().required('Titre est requis'),
    description: yup.string().required('Description est requise'),
    category: yup.string().required('Catégorie est requise'),
    prix: yup.string().required('Prix est requis'),
  });

  const formik = useFormik({
    initialValues: {
      titre: !id ?'' : productbyid?.titre,
      description:!id ? '' : productbyid?.description,
      category: productbyid?.category?._id,
      images_product:!id ? [] : productbyid?.images_product?.map((img)=>img?.url),
      prix:!id ? null : productbyid?.prix,
      promotion:!id ? null : productbyid?.promotion ,
      sizes: !id ? [] : productbyid?.sizes , // { size: "M", quantity: 5 }
    },
    validationSchema: schema,
    enableReinitialize:true,
    onSubmit: (values) => {
      if(id){
        const data ={
          id,
          values
        }
        resetState()
           setTimeout(() => {
      dispatch(updateproduct(data));
      }, 2000);      
      
      }else{
dispatch(createproduct(values));
formik.resetForm();
      setLocalImageUrls([]);
      setTimeout(() => {
        dispatch(resetState());
      }, 2000);      
}
      
      
    },
  });

  const { categories } = useSelector((state) => state.category);
  const subCategoryIds = categories.flatMap(cat =>
    cat.subCategories.map(subCat => subCat._id)
  );
  const mainCategories = categories.filter(
    cat => !subCategoryIds.includes(cat._id)
  );

  // ---- gestion images ----
  const handleSelectFile = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedFiles(selectedFiles);
    set_Images(selectedFiles);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setLocalImageUrls(urls);
  };

  useEffect(() => {
    if (_images?.length > 0) {
      dispatch(upload(_images));
    }
  }, [_images, dispatch]);

  const { images } = useSelector((state) => state.upload);

  useEffect(() => {
    if (images.length > 0) {
      formik.setFieldValue('images_product', images);
    }
  }, [images]);

  // ---- gestion taille ----
  const handleSelectSize = (size) => {
    setCurrentSize(size);
    setSizeQuantity("");
    setShowSizeModal(true);
  };

  const handleAddSizeQuantity = () => {
    if (!sizeQuantity) return;
    const existing = formik.values.sizes.find((s) => s.size === currentSize);

    let updatedSizes;
    if (existing) {
      // Si la taille existe déjà → on met à jour la quantité
      updatedSizes = formik.values.sizes.map((s) =>
        s.size === currentSize ? { ...s, quantity: Number(sizeQuantity) } : s
      );
    } else {
      // Sinon on ajoute une nouvelle entrée
      updatedSizes = [
        ...formik.values.sizes,
        { size: currentSize, quantity: Number(sizeQuantity) },
      ];
    }

    formik.setFieldValue("sizes", updatedSizes);
    setShowSizeModal(false);
  };

  return (
    <div className="w-[90%] md:w-[60%] mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
      <h2 className={`text-2xl font-bold text-center   ${id ? 'text-yellow-400' : 'text-blue-700' } `}>   {id ? 'Update product': 'Add product'  } </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Catégorie</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => formik.setFieldValue("category", e.target.value)}
            value={formik.values.category || ""}
          >
            <option value="">Sélectionner une catégorie</option>
            {mainCategories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
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

        {/* Prix */}
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
          <label className="block text-sm font-medium text-gray-600 mb-2">Tailles & Stocks</label>
          <div className="flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSelectSize(size)}
                className="px-4 py-2 rounded-full border text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-blue-100"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Liste des tailles ajoutées */}
          <div className="mt-3 space-y-1">
            {formik.values.sizes?.map((s, i) => (
              <p key={i} className="text-sm text-gray-700">
                <span className="font-semibold">{s.size}</span> → {s.quantity} en stock
              </p>
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
<div className='flex items-center gap-3 flex-wrap w-full'>
  {productbyid?.images_product?.map((img, i) => (
    <div
      key={i}
      className="w-1/4 h-[120px] overflow-hidden rounded-lg shadow-sm border border-gray-200"
    >
      <img
        src={img?.url}
        alt={`image-${i}`}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
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
          disabled={formik.values.images_product?.length ===0}
          className={`w-full py-3 rounded-lg  ${id  ? 'bg-yellow-300  hover:bg-yellow-500' :  'bg-blue-600 hover:bg-blue-700'}  text-white font-semibold  transition`}
        >
        {id ? 'Update product': 'Add product'  }   
        </button>
      </form>

      {/* 🔵 Modal Taille */}
      {showSizeModal && (
        <div className="absolute inset-0 bg-black  w-full h-screen  top-0 left-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Quantité pour la taille {currentSize}
            </h3>
            <input
              type="number"
              value={sizeQuantity}
              onChange={(e) => setSizeQuantity(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Entrez la quantité"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleAddSizeQuantity}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
