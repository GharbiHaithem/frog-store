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
import React from 'react';

const GeneratePDF = ({ sendMessage2, commande, sendMessage, setShowPdfModal, user }) => {
  const [load, setLoad] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); // URL du PDF après upload
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirection WhatsApp fiable
  const handleSendToWhatsApp = (url) => {
    const phoneNumber = "21622013583";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Voici%20le%20lien%20:%20${encodeURIComponent(url)}`;

    try {
      const newWindow = window.open(whatsappLink, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappLink;
      }
    } catch (err) {
      window.location.href = whatsappLink;
    }
  };

  // Génération PDF optimisée
  const generatePDF = async () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const root = createRoot(element);
    root.render(<Invoice commande={commande} user={user} />);
    setShowPdfModal(true);

    const opt = {
      margin: 0.5,
      filename: 'facture.pdf',
      image: { type: 'jpeg', quality: 0.85 }, // PDF plus léger
      html2canvas: { scale: 1.3, logging: false }, // moins lourd → plus rapide
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const pdfBlob = await html2pdf().set(opt).from(element).toPdf().output('blob');
    document.body.removeChild(element);
    return new File([pdfBlob], 'facture.pdf', { type: 'application/pdf' });
  };

  // Upload optimisé
  const uploadPDF = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          maxBodyLength: Infinity,
          timeout: 60000
        }
      );
      return response.data.url;
    } catch (error) {
      console.error("Erreur lors de l'upload du PDF:", error);
      throw error;
    }
  };

  // Envoi email
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

  // Génération + Upload + WhatsApp
  const handleGenerateAndUpload = async () => {
    setLoad(true);
    try {
      const pdfFile = await generatePDF();
      const url = await uploadPDF(pdfFile); // ⚡ upload terminé
      setPdfUrl(url); // ✅ lien prêt pour WhatsApp

      await sendPdfEmail(url);  // email après upload
      sendMessage2();
      // handleSendToWhatsApp(url); // ouvrir WhatsApp
    } catch (error) {
      console.error('Erreur lors du traitement:', error);
    } finally {
      setLoad(false);
      setShowPdfModal(false);

      // Nettoyage localStorage + Redux
      localStorage.removeItem('user');
      localStorage.removeItem('step');
      localStorage.removeItem('disconnect');
      localStorage.removeItem('cartUuid');
      dispatch(resetState());

      // Redirection finale
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40">
      {pdfUrl ? (
        <a
          href={`https://api.whatsapp.com/send?phone=21622013583&text=Voici%20le%20lien%20:%20${encodeURIComponent(pdfUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-[80px] rounded-xl text-white flex items-center justify-center gap-3 shadow-lg bg-[#25d366] hover:bg-green-700 animate-shake"
        >
          <FaWhatsapp className="text-3xl" />
          <span className="text-lg font-semibold">Envoyer sur WhatsApp</span>
        </a>
      ) : (
        <button
          onClick={handleGenerateAndUpload}
          disabled={load}
          className={`w-full h-[80px] rounded-xl text-white flex items-center justify-center gap-3 shadow-lg transition ${load ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25d366] hover:bg-green-700 animate-shake'}`}
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
