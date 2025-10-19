import React, { useEffect, useState } from 'react';
import './style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createproduct, deleteimg, productByid, updateproduct } from '../../features/product/productSlice';
import { getcategories } from '../../features/category/categorySlice';
import { resetState, upload } from '../../features/upload/uploadSlice';
import { useParams } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [localImageUrls, setLocalImageUrls] = useState([]);
  const [_images, set_Images] = useState([]);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [currentSize, setCurrentSize] = useState("");
  const [sizeQuantity, setSizeQuantity] = useState("");

  const { productbyid } = useSelector(state => state?.product);
  const { categories } = useSelector(state => state.category);
  const { images } = useSelector(state => state.upload);

  // ---- Fetch product & categories ----
  useEffect(() => { if(id) dispatch(productByid(id)); }, [id, dispatch]);
  useEffect(() => { dispatch(getcategories()); }, [dispatch]);

  // ---- Formik validation ----
  const schema = yup.object().shape({
    titre: yup.string().required('Titre est requis'),
    description: yup.string().required('Description est requise'),
    category: yup.string().required('Catégorie est requise'),
    prix: yup.string().required('Prix est requis'),
  });

  const formik = useFormik({
    initialValues: {
      titre: id ? productbyid?.titre : '',
      description: id ? productbyid?.description : '',
      category: id ? productbyid?.category?._id : '',
      images_product: id ? productbyid?.images_product?.map(img => img?.url) : [],
      prix: id ? productbyid?.prix : '',
      promotion: id ? productbyid?.promotion : '',
      sizes: id ? productbyid?.sizes : [],
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if(id){
        dispatch(updateproduct({ id, values }));
        resetState();
      } else {
        dispatch(createproduct(values));
        formik.resetForm();
        setLocalImageUrls([]);
        setTimeout(() => dispatch(resetState()), 2000);
      }
    },
  });

  // ---- Handle images ----
  const handleSelectFile = (event) => {
    const files = Array.from(event.target.files);
    set_Images(files);
    const urls = files.map(file => URL.createObjectURL(file));
    setLocalImageUrls(urls);
  };

  useEffect(() => { if(_images.length) dispatch(upload(_images)); }, [_images, dispatch]);
  useEffect(() => { if(images.length) formik.setFieldValue('images_product', images); }, [images]);

  // ---- Handle sizes ----
  const handleSelectSize = (size) => {
    setCurrentSize(size);
    setSizeQuantity('');
    setShowSizeModal(true);
  };

  const handleAddSizeQuantity = () => {
    if(!sizeQuantity) return;
    const existing = formik.values.sizes.find(s => s.size === currentSize);
    const updatedSizes = existing
      ? formik.values.sizes.map(s => s.size === currentSize ? { ...s, quantity: Number(sizeQuantity) } : s)
      : [...formik.values.sizes, { size: currentSize, quantity: Number(sizeQuantity) }];
    formik.setFieldValue("sizes", updatedSizes);
    setShowSizeModal(false);
  };

  const deleteImage = (data) => {
    dispatch(deleteimg(data));
    setTimeout(() => dispatch(productByid(id)), 1000);
  };

  // ---- Main categories ----
  const subCategoryIds = categories.flatMap(cat => cat.subCategories.map(sub => sub._id));
  const mainCategories = categories.filter(cat => !subCategoryIds.includes(cat._id));

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white shadow-xl rounded-xl p-6 space-y-6 my-6">
      <h2 className={`text-3xl font-bold text-center ${id ? 'text-yellow-500' : 'text-blue-600'}`}>
        {id ? 'Update Product' : 'Add Product'}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => formik.setFieldValue("category", e.target.value)}
            value={formik.values.category || ""}
          >
            <option value="">Sélectionner une catégorie</option>
            {mainCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre du produit</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Titre du produit"
            {...formik.getFieldProps('titre')}
          />
        </div>

        {/* Price & Promotion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...formik.getFieldProps('prix')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Promotion (%)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...formik.getFieldProps('promotion')}
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tailles & Stocks</label>
          <div className="flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map(size => (
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Images du produit</label>
          <input
            type="file"
            multiple
            onChange={handleSelectFile}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="flex gap-2 mt-3 flex-wrap">
            {localImageUrls.map((url, i) => (
              <img key={i} src={url} alt="preview" className="w-24 h-24 object-cover rounded-lg shadow-sm border"/>
            ))}
          </div>
        </div>

        {/* Existing Images */}
        <div className="flex gap-3 flex-wrap">
          {productbyid?.images_product?.map((img, i) => (
            <div key={i} className="relative w-28 h-28 rounded-lg overflow-hidden border shadow-sm group">
              <img src={img.url} alt={`img-${i}`} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-red-600 text-white p-2 rounded-lg" onClick={() => deleteImage({id: productbyid._id, imageUrl: img.url})}>
                  <AiTwotoneDelete size={20}/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <ReactQuill
            theme="snow"
            placeholder="Description du produit"
            value={formik.values.description}
            onChange={val => formik.setFieldValue('description', val)}
            className="bg-white rounded-lg"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formik.values.images_product?.length === 0}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${id ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {id ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Modal Taille */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quantité pour {currentSize}</h3>
            <input
              type="number"
              value={sizeQuantity}
              onChange={(e) => setSizeQuantity(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
              placeholder="Entrez la quantité"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSizeModal(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Annuler</button>
              <button onClick={handleAddSizeQuantity} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Valider</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
