import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { commandebyid as fn } from '../../features/commande/commandeSlice'
import { CiEdit } from 'react-icons/ci'
import html2pdf from 'html2pdf.js';
const DetailsCommande = () => {
      const {id} = useParams()
      const dispatch = useDispatch()
      useEffect(()=>{
            if(id !== undefined){
                  dispatch(fn(id))
            }
            
      },[id,dispatch])
      const componentRef = useRef();
      const{commandebyid}= useSelector(state=>state?.commande)
      const user = JSON.parse(localStorage.getItem('user'))
      const generatePDF = () => {
            const element = componentRef.current;
            const opt = {
              margin:       0.5,
              filename:     'facture.pdf',
              image:        { type: 'jpeg', quality: 0.98 },
              html2canvas:  { scale: 2 },
              jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
        
            html2pdf().from(element).set(opt).save();
          };
  return (
       <>
       <Helmet>
         <title>Détails Commande</title>
         <meta name="Page de Détails Commande"  content="page a propos des Détails Commande"></meta>
       </Helmet>
    <div className='md:w-[80%] w-full mx-auto mb-10   mt-[150px]  h-[100vh] my-10'>
      <h1 className='text-sm font-semibold text-center uppercase  '>Détails de la commande</h1>
    <div ref={componentRef}>
    <div  className='my-5 p-2 py-3   px-3 bg-white shadow-xl'>
      Commande n° <span  className='text-lg font-bold'>{commandebyid?.refCommande}</span>
      </div>
      <div className=' bg-white shadow-xl mt-4'>
<h1 className='text-center text-lg  uppercase font-bold p-2 border-b'>Adresse de livraison</h1>
      <div className='md:w-1/3 w-full text-xs px-5 flex flex-col gap-2 py-5 border-b '>
      <span className='uppercase'>{user?.firstname +" "+ user?.lastname}</span>
      <span className='uppercase'>{user?.adress}</span>
      <span className='uppercase'>{user?.gender}</span>
      <span className=' mb-2'>{user?.email}</span>
      <hr/>

      </div>
</div>
      <div className='my-5 p-2 py-3   px-3 bg-white shadow-xl'>
      <div className="flex justify-center w-full overflow-x-auto ">
      <table className="min-w-full w-full bg-white border border-gray-300">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 border text-left">Produit</th>
      <th className="px-4 py-2 border text-center">Quantité</th>
      <th className="px-4 py-2 border text-right">Prix unitaire</th>
      <th className="px-4 py-2 border text-right">Prix total</th>
    </tr>
  </thead>
  <tbody>
      {commandebyid&& commandebyid?.cart?.items?.map((prod)=>(
 <tr className="border-b" key={prod?._id}>
 <td className="px-4 py-2 border">{(prod?.product?.titre)}</td>
 <td className="px-4 py-2 border text-center">{prod?.quantity}</td>
 <td className="px-4 py-2 border text-right">{prod?.product?.prix},00 TND</td>
 <td className="px-4 py-2 border text-right">{prod?.quantity * prod?.product?.prix},00 TND</td>
</tr>
      ))}
   
    {/* Ligne pour le sous-total */}
    <tr>
      <td colSpan="3" className="px-4 py-2 border text-right font-bold">Sous-total</td>
      <td className="px-4 py-2 text-right">{  commandebyid?.cart?.items.reduce((sum,current)=>sum + current.product.prix * current.quantity, 0)},00 TND</td>
    </tr>
    {/* Ligne pour les frais de livraison */}
    <tr>
      <td colSpan="3" className="px-4 py-2 border text-right font-bold">Frais de livraison</td>
      <td className="px-4 py-2 text-right">7,00 TND</td>
    </tr>
    {/* Ligne pour le total */}
    <tr className="font-bold">
      <td colSpan="3" className="px-4 py-2 border text-right">Total</td>
      <td className="px-4 py-2 text-right">{ commandebyid?.cart?.items.reduce((sum,current)=>sum + current.product.prix * current.quantity, 0)+7},00 TND</td>
    </tr>
  </tbody>
</table>

    </div>
      </div>
    </div>
      <button onClick={generatePDF} className="bg-blue-500 text-white p-2 rounded mt-4">
      Télécharger le PDF
      </button>
    </div>
    </>
  )
}

export default DetailsCommande