import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import Invoice from '../Invoice/Invoice';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Icon spinner
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../../features/auth/authSlice';

const GeneratePDF = ({ sendMessage2, commande, sendMessage,setShowPdfModal, user, pdfUrl, setPdfUrl }) => {
  const [load, setLoad] = useState(false);
const navigate = useNavigate()
const handleSendToWhatsApp = (pdfUrl) => {
  const phoneNumber = "21622013583";
  const message = `Voici le lien de la facture : ${pdfUrl}`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  // Détection du navigateur Messenger ou Instagram
  const isInAppBrowser = /FBAN|FBAV|Messenger|Instagram/i.test(navigator.userAgent);

  if (isInAppBrowser) {
    // 🚀 Forcer l’ouverture dans le navigateur externe selon la plateforme
    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = `googlechrome://${whatsappLink.replace(/^https?:\/\//, '')}`;
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const a = document.createElement("a");
      a.href = whatsappLink;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(whatsappLink, "_blank"); // fallback desktop
    }
  } else {
    // 🌐 Si ce n’est pas Messenger → simple ouverture dans un nouvel onglet
    window.open(whatsappLink, "_blank");
  }
};


  const generatePDF = async () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const root = createRoot(element);
    root.render(<Invoice commande={commande} user={user} />);
 setShowPdfModal(true)
    const opt = {
      margin: 1,
      filename: 'facture.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const pdfBlob = await html2pdf().set(opt).from(element).toPdf().output('blob');
    document.body.removeChild(element);
    return new File([pdfBlob], 'facture.pdf', { type: 'application/pdf' });
   
  };
const dispatch = useDispatch()
  const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://phone-store-node-server.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.url;
    } catch (error) {
      console.error('Erreur lors de l\'upload du PDF:', error);
      throw error;
    }
  };

  const handleGenerateAndUpload = async () => {
    setLoad(true); // START loader
    try {
      const pdfFile = await generatePDF();
      const url = await uploadPDF(pdfFile);
      setPdfUrl(url);
      sendMessage2();
      handleSendToWhatsApp(url);
    } catch (error) {
      console.error('Erreur lors du traitement:', error);
    } finally {
      setLoad(false); // STOP loader
      setShowPdfModal(false)
setTimeout(()=>{navigate('/')},2000)
localStorage.removeItem('user')
localStorage.removeItem('step')
localStorage.removeItem('disconnect')
localStorage.removeItem('cartUuid')

dispatch(resetState())

    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40">
      <button
        onClick={handleGenerateAndUpload}
        disabled={load}
        className={`w-full h-[80px] rounded-xl text-white flex items-center justify-center gap-3 shadow-lg transition 
          ${load ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25d366] hover:bg-green-700 animate-shake'}`}
      >
        {load ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
            <span className="text-lg font-semibold">Préparation du PDF...</span>
          </>
        ) : (
          <>
            <FaWhatsapp className="text-3xl" />
            <span className="text-lg font-semibold">Commandez avec WhatsApp</span>
          </>
        )}
      </button>

      {/* ✅ Animation vibration */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GeneratePDF;
