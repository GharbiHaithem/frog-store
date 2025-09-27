import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { TfiEmail } from "react-icons/tfi";
import { PiLockKeyOpenFill } from "react-icons/pi";

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
const [erreur,setErreur]= useState({})
  const handleSubmit = async(e) => {
    e.preventDefault()
    let newErreur={}
    if(!formData.email){
    newErreur.email="Email et un champ obligatoire"
    }
    if(!formData.password){
    newErreur.password="password et un champ obligatoire"
    }
    setErreur(newErreur)
    if (Object.keys(newErreur).length === 0) {
      dispatch(login({email:formData.email,password:formData.password}))
    }
  }

  const { isSuccess, user, message } = useSelector(state => state?.auth)

  useEffect(()=>{
    if(isSuccess && Object.keys(user).length > 0){
      localStorage.setItem('disconnect', JSON.stringify(false))
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    }
  }, [isSuccess, user, navigate])

  return (
     <>
       <Helmet>
         <title>Authentification</title>
         <meta name="Page d'Authentification "  content="page Authentification"></meta>
       </Helmet>
    <div className="w-full flex justify-center items-center min-h-[100vh] bg-gray-50 px-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 uppercase">Connectez-vous</h1>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <TfiEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Exemple@live.domaine"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
               {erreur.email && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.email}</span>}
          </div>

          {/* Password */}
          <div className="relative">
            <PiLockKeyOpenFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
              {erreur.password && <span className='text-xs mt-1 text-red-600 font-light'>{erreur.password}</span>}
          </div>

          {/* Message erreur */}
          {message && (
            <span className="text-xs font-medium text-red-500 text-center">{message}</span>
          )}

          {/* Bouton login */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold uppercase hover:bg-blue-700 transition duration-300"
          >
            Se connecter
          </button>
        </form>

        {/* Option inscription */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Vous n’avez pas encore de compte ?{" "}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Créez-en un
          </span>
        </p>
      </div>
    </div>
    </>
  )
}

export default LoginForm
