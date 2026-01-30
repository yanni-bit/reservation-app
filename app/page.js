"use client"; // Indique que c'est un Client Component (nécessaire pour useState)

import { useState } from "react";

export default function Home() {
  // État principal : liste des chambres
  const [chambres, setChambres] = useState([
    { id: 1, nom: "Chambre Standard", prix: 80, disponible: true },
    { id: 2, nom: "Chambre Deluxe", prix: 120, disponible: true },
    { id: 3, nom: "Suite Junior", prix: 180, disponible: false },
    { id: 4, nom: "Suite Présidentielle", prix: 350, disponible: true },
  ]);

  // État pour le filtre d'affichage
  const [afficherTout, setAfficherTout] = useState(true);

  // Fonction pour réserver/annuler une chambre (toggle)
  const reserver = (id) => {
    setChambres(
      chambres.map((ch) =>
        ch.id === id ? { ...ch, disponible: !ch.disponible } : ch
      )
    );
  };

  // Calculs dynamiques (recalculés à chaque rendu)
  const nbReservees = chambres.filter((c) => !c.disponible).length;
  const nbLibres = chambres.length - nbReservees;
  const totalRevenus = chambres.reduce((total, chambre) => {
    if (!chambre.disponible) {
      return total + chambre.prix;
    }
    return total;
  }, 0);

  return (
    <main className="p-6">
      {/* Grille des chambres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chambres
          // Filtre : toutes les chambres ou seulement les disponibles
          .filter((chambre) => afficherTout || chambre.disponible)
          // Génère une carte pour chaque chambre
          .map((chambre) => (
            <div
              key={chambre.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              {/* Nom de la chambre */}
              <h2 className="text-xl font-bold text-black">{chambre.nom}</h2>

              {/* Prix par nuit */}
              <p className="text-gray-600 mb-2">{chambre.prix} €/nuit</p>

              <div className="flex flex-col gap-4">
                {/* Statut de disponibilité */}
                <span
                  className={
                    chambre.disponible
                      ? "text-green-500 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {chambre.disponible ? "● Disponible" : "● Réservée"}
                </span>

                {/* Bouton réserver/annuler */}
                <button
                  onClick={() => reserver(chambre.id)}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    chambre.disponible
                      ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {chambre.disponible ? "Réserver maintenant" : "Indisponible"}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Panneau de statistiques */}
      <div className="w-max mx-auto bg-white rounded-lg shadow-md p-6 mt-4 border border-gray-200">
        <div className="p-6">
          {/* Bouton filtre */}
          <button
            onClick={() => setAfficherTout(!afficherTout)}
            className="mb-4 bg-black text-white px-4 py-2 rounded"
          >
            {afficherTout ? "Masquer indisponibles" : "Afficher tous"}
          </button>
        </div>

        {/* Compteurs */}
        <p className="text-black">Total : <strong>{chambres.length}</strong></p>
        <p className="text-red-600">Réservées : <strong>{nbReservees}</strong></p>
        <p className="text-green-600">Libres : <strong>{nbLibres}</strong></p>
        <p className="text-blue-600">Revenus : <strong>{totalRevenus} €</strong></p>
      </div>
    </main>
  );
}