import React from "react";
import "./Invoice.css";

const Invoice = ({ user, commande }) => {
  const subtotal =
    commande?.cart?.items?.reduce(
      (sum, item) =>
        sum +
        (item?.product?.prix -
          (item?.product?.prix * item?.product?.promotion) / 100) *
          item.quantity,
      0
    ) || 0;

  const delivery = 8;
  const total = subtotal + delivery;

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h1>Détails de la commande</h1>
        <p className="order-ref">
          Commande n° <strong>{commande?.refCommande}</strong>
        </p>
         <p className="order-ref">
          Commande date° <strong>{new Date(commande?.createdAt).toLocaleDateString()}</strong>
        </p>
      </div>

      <section className="invoice-section">
        <h2>Adresse de livraison</h2>
        <div className="invoice-address">
          <p><strong>{user?.firstname} {user?.lastname}</strong></p>
          <p>{commande?.adress}</p>
          <p>{user?.numtel}</p>
          <p>{user?.email}</p>
        </div>
      </section>

      <section className="invoice-section">
        <h2>Détails des produits</h2>
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Size</th>
                
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {commande?.cart?.items?.map((prod) => {
                const prixUnitaire =
                  prod?.product?.prix -
                  (prod?.product?.prix * prod?.product?.promotion) / 100;
                const prixTotal = prixUnitaire * prod?.quantity;

                return (
                  <tr key={prod?._id}>
                    <td>{prod?.product?.titre}</td>
                    <td>{prod?.quantity}</td>
                    <td>{prod?.size}</td>
                    
                    <td>{prixUnitaire.toFixed(2)} TND</td>
                    <td>{prixTotal.toFixed(2)} TND</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Sous-total</td>
                <td>{subtotal.toFixed(2)} TND</td>
              </tr>
              <tr>
                <td colSpan="3">Frais de livraison</td>
                <td>{delivery.toFixed(2)} TND</td>
              </tr>
              <tr className="invoice-total">
                <td colSpan="3">Total</td>
                <td>{total.toFixed(2)} TND</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <footer className="invoice-footer">
        <p>Merci pour votre commande 🛍️</p>
        <p>Ce document est généré automatiquement — aucune signature n’est requise.</p>
      </footer>
    </div>
  );
};

export default Invoice;
