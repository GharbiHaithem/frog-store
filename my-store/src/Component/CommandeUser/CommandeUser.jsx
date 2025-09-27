import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allcommandesuser } from "../../features/commande/commandeSlice";
import { Link } from "react-router-dom";

const CommandeUser = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      dispatch(allcommandesuser(user._id));
    }
  }, [dispatch, user?._id]);

  const { commandes } = useSelector((state) => state?.commande);

  return (
    <div className="md:w-[80%] w-full mx-auto mt-[100px]">
      <h1 className="text-center uppercase text-lg font-semibold tracking-wide">
        Historique de vos commandes
      </h1>
      <hr className="mt-4 mb-6 border-gray-300" />

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Référence</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Prix total</th>
              <th className="px-6 py-3">Paiement</th>
              <th className="px-6 py-3 text-center">Détails</th>
            </tr>
          </thead>
          <tbody>
            {commandes &&
              commandes.map((row, i) => (
                <tr
                  key={row?._id}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-3 font-medium">{row?.refCommande}</td>
                  <td className="px-6 py-3">
                    {new Date(row.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-800">
                    {row?.cart?.items?.reduce(
                      (sum, current) =>
                        sum + current?.product?.prix * current?.quantity,
                      0
                    )}
                    ,00 TND
                  </td>
                  <td className="px-6 py-3">{row.payementMethode}</td>
                  <td className="px-6 py-3 text-center">
                    <Link
                      to={`/detailscommande/${row?._id}`}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                    >
                      Voir détails
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommandeUser;
