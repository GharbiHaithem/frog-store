import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import Invoice from '../Invoice/Invoice';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Icon spinner

const GeneratePDF = ({ sendMessage2, commande, sendMessage, user, pdfUrl, setPdfUrl }) => {
  const [load, setLoad] = useState(false);

const handleSendToWhatsApp = (pdfUrl) => {
  const phoneNumber = "21622013583";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Voici%20le%20lien%20:%20${encodeURIComponent(
    pdfUrl
  )}`;

  // Ouvre dans un nouvel onglet/fenêtre
  window.open(whatsappLink, '_blank');
};

  const generatePDF = async () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const root = createRoot(element);
    root.render(<Invoice commande={commande} user={user} />);

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
    }
  };

  return (
    <div>
      <button
        onClick={handleGenerateAndUpload}
        disabled={load}
        className={`bg-[#25d366] p-4 w-[80%] mx-auto fixed bottom-0 text-white flex items-center gap-3 justify-center rounded-md ${
          load ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700 transition'
        }`}
      >
        {load ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
            Préparation du PDF...
          </>
        ) : (
          <>
            <FaWhatsapp className="text-3xl" />
            Commandez avec WhatsApp
          </>
        )}
      </button>
    </div>
  );
};

export default GeneratePDF;
