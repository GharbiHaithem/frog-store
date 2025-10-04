import React from 'react';
import './Invoice.css'; // si tu veux ajouter des styles custom

const Invoice = ({ user, commande }) => {
  return (
    <div className="md:w-[80%] w-full mx-auto mb-10 h-[100vh] my-10">
      <h1
        className="text-sm font-semibold text-center uppercase"
        style={{ color: "#111827" }} // noir léger (équivalent text-gray-900)
      >
        Détails de la commande
      </h1>

      <div>
        {/* Commande */}
        <div
          className="my-5 p-2 py-3 px-3"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          Commande n°{" "}
          <span className="text-lg font-bold">{commande?.refCommande}</span>
        </div>

        {/* Adresse */}
        <div
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            marginTop: "1rem",
          }}
        >
          <h1
            className="text-center text-lg uppercase font-bold p-2 border-b"
            style={{ borderColor: "#d1d5db" }} // équivalent gray-300
          >
            Adresse de livraison
          </h1>

          <div className="md:w-1/3 w-full text-xs px-5 flex flex-col gap-2 py-5 border-b" style={{ borderColor: "#d1d5db" }}>
            <span className="uppercase">{user?.firstname + " " + user?.lastname}</span>
            <span className="uppercase">{commande?.adress}</span>
            <span className="uppercase">{user?.numtel}</span>
            <span className="mb-2">{user?.email}</span>
            <hr style={{ borderColor: "#d1d5db" }} />
          </div>
        </div>

        {/* Tableau produits */}
        <div
          className="my-5 p-2 py-3 px-3"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <div className="flex justify-center w-full overflow-x-auto">
            <table
              className="min-w-full w-full border"
              style={{ borderColor: "#d1d5db", backgroundColor: "#ffffff" }}
            >
              <thead style={{ backgroundColor: "#f3f4f6" /* gris clair */ }}>
                <tr>
                  <th className="px-4 py-2 border text-left" style={{ borderColor: "#d1d5db" }}>Produit</th>
                  <th className="px-4 py-2 border text-center" style={{ borderColor: "#d1d5db" }}>Quantité</th>
                  <th className="px-4 py-2 border text-right" style={{ borderColor: "#d1d5db" }}>Prix unitaire</th>
                  <th className="px-4 py-2 border text-right" style={{ borderColor: "#d1d5db" }}>Prix total</th>
                </tr>
              </thead>
              <tbody>
                {commande &&
                  commande?.cart?.items?.map((prod) => (
                    <tr className="border-b" style={{ borderColor: "#d1d5db" }} key={prod?._id}>
                      <td className="px-4 py-2 border" style={{ borderColor: "#d1d5db" }}>{prod?.product?.titre}</td>
                      <td className="px-4 py-2 border text-center" style={{ borderColor: "#d1d5db" }}>{prod?.quantity}</td>
                      <td className="px-4 py-2 border text-right" style={{ borderColor: "#d1d5db" }}>
                        {(prod?.product?.prix - ((prod?.product?.prix * prod?.product?.promotion/100) ))} TND
                      </td>
                      <td className="px-4 py-2 border text-right" style={{ borderColor: "#d1d5db" }}>
                        {prod?.quantity * (prod?.product?.prix - ((prod?.product?.prix * prod?.product?.promotion/100) ))} TND
                      </td>
                    </tr>
                  ))}

                {/* Sous-total */}
                <tr>
                  <td colSpan="3" className="px-4 py-2 border text-right font-bold" style={{ borderColor: "#d1d5db" }}>
                    Sous-total
                  </td>
                  <td className="px-4 py-2 text-right">
                    {commande?.cart?.items.reduce(
                      (sum, current) => sum +(current?.product?.prix - ((current?.product?.prix * current?.product?.promotion/100) )) * current.quantity,
                      0
                    )}
                    TND
                  </td>
                </tr>

                {/* Livraison */}
                <tr>
                  <td colSpan="3" className="px-4 py-2 border text-right font-bold" style={{ borderColor: "#d1d5db" }}>
                    Frais de livraison
                  </td>
                  <td className="px-4 py-2 text-right">8,00 TND</td>
                </tr>

                {/* Total */}
                <tr className="font-bold">
                  <td colSpan="3" className="px-4 py-2 border text-right" style={{ borderColor: "#d1d5db" }}>
                    Total
                  </td>
                  <td className="px-4 py-2 text-right">
                    {commande?.cart?.items.reduce(
                      (sum, current) => sum + (current?.product?.prix - ((current?.product?.prix * current?.product?.promotion/100) )) * current.quantity,
                      0
                    ) + 8}
                    TND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
