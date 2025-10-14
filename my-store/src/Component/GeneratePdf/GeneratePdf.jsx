import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import Invoice from '../Invoice/Invoice';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../../features/auth/authSlice';
import React from 'react'
const GeneratePDF = ({ sendMessage2, commande, sendMessage, setShowPdfModal, user, pdfUrl, setPdfUrl }) => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleSendToWhatsApp = (pdfUrl) => {
  const phoneNumber = "21622013583";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Voici%20le%20lien%20:%20${encodeURIComponent(pdfUrl)}`;

  try {
    // 🟢 Tentative d'ouverture dans un nouvel onglet
    const newWindow = window.open(whatsappLink, '_blank');

    // 🔴 Si l'ouverture a été bloquée, fallback sur redirection directe
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappLink;
    }
  } catch (err) {
    // ⚠️ Si l'environnement (ex: Messenger WebView) bloque window.open()
    window.location.href = whatsappLink;
  }
};

  const generatePDF = async () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const root = createRoot(element);
    root.render(<Invoice commande={commande} user={user} />);
    setShowPdfModal(true);

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

  const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://phone-store-node-server.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.url;
    } catch (error) {
      console.error("Erreur lors de l'upload du PDF:", error);
      throw error;
    }
  };

  const sendPdfEmail = async (url) => {
    try {
      const res = await axios.post('http://localhost:5000/api/mail/send', {
        to: 'gharbi.haythem1988@gmail.com',
        pdfUrl: url,
        subject: 'Votre facture'
      });

      if (res.data.success) {
        alert('Email envoyé avec succès !');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateAndUpload = async () => {
    setLoad(true);
    try {
      const pdfFile = await generatePDF();
      const url = await uploadPDF(pdfFile);
      setPdfUrl(url);

      await sendPdfEmail(url);
      sendMessage2();
      handleSendToWhatsApp(url);
    } catch (error) {
      console.error('Erreur lors du traitement:', error);
    } finally {
      setLoad(false);
      setShowPdfModal(false);

      setTimeout(() => {
        navigate('/');
      }, 2000);

      localStorage.removeItem('user');
      localStorage.removeItem('step');
      localStorage.removeItem('disconnect');
      localStorage.removeItem('cartUuid');
      dispatch(resetState());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40">
      {pdfUrl ? (
        <a
          href={`https://wa.me/21622013583?text=Voici%20le%20lien%20:%20${encodeURIComponent(pdfUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-[80px] rounded-xl text-white flex items-center justify-center gap-3 shadow-lg bg-[#25d366] hover:bg-green-700 animate-shake"
        >
          <FaWhatsapp className="text-3xl" />
          <span className="text-lg font-semibold">Commandez avec WhatsApp</span>
        </a>
      ) : (
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
            <span className="text-lg font-semibold">Générer et envoyer le PDF</span>
          )}
        </button>
      )}

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
