import React, { useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Invoice from '../Invoice/Invoice';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaWhatsapp } from 'react-icons/fa';

const GeneratePDF = ({sendMessage2,commande,sendMessage,user,pdfUrl,setPdfUrl}) => {
  console.log({user,sendMessage2,pdfUrl})
  const handleSendToWhatsApp = (pdfUrl) => {
  const phoneNumber = "21622013583";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Voici%20le%20lien%20:%20${encodeURIComponent(
    pdfUrl
  )}`;

  // Redirection dans le même onglet
  window.location.href = whatsappLink;
};
  useEffect(()=>{
    console.log(pdfUrl?.length>0)
    if(pdfUrl?.length>0){
    handleSendToWhatsApp(pdfUrl)
    }
    },[pdfUrl])
    console.log(pdfUrl?.length>0) 
  const generatePDF = async () => {
    // Créez un conteneur temporaire pour rendre le composant
    const element = document.createElement('div');
    document.body.appendChild(element);

    // Rendre le composant React dans le conteneur temporaire
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
    document.body.removeChild(element); // Nettoyage

    // Convertir le Blob en fichier
    const pdfFile = new File([pdfBlob], 'facture.pdf', { type: 'application/pdf' });

    return pdfFile;
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
  useEffect(()=>{
    if (pdfUrl && typeof pdfUrl === 'string' && pdfUrl.trim() !== '') {
      handleSendToWhatsApp(pdfUrl);
    }
  },[pdfUrl]);
  const handleGenerateAndUpload = async () => {
    try {
      const pdfFile = await generatePDF();
      const pdfUrl = await uploadPDF(pdfFile);
      console.log('PDF uploadé avec succès:', pdfUrl);
      setPdfUrl(pdfUrl)
      sendMessage2()
     
    } catch (error) {
      console.error('Erreur lors du traitement de la commande:', error);
    }
  };

  return (
    <div>
    
      <button  onClick={handleGenerateAndUpload} className='bg-[#25d366]  w-full p-2 fixed bottom-0 left-0 text-white flex items-center  gap-3 justify-center'><FaWhatsapp className='text-xl'/>Commandez avec WhatsApp</button>
    </div>
  );
};

export default GeneratePDF;
