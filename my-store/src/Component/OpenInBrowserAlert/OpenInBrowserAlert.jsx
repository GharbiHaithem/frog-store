import React, { useEffect, useState } from "react";
import logo from "../../assets/spinner-icon-12071.gif"; // ← remplace par ton logo

const OpenInBrowserAlert = () => {
  const [isMessenger, setIsMessenger] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const inMessenger = /FBAN|FBAV|Messenger/i.test(userAgent);
    setIsMessenger(inMessenger);
  }, []);

  const handleOpenInBrowser = () => {
    const currentUrl = window.location.href;
    // Ouvre dans le navigateur externe
    window.open(currentUrl, "_blank");
  };

  if (!isMessenger) return null; // ne rien afficher si on n'est pas dans Messenger

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: 100, borderRadius: "50%", marginBottom: 20 }}
      />
      <h2 style={{ marginBottom: 10 }}>🔒 Navigation limitée</h2>
      <p style={{ marginBottom: 20, fontSize: 16, lineHeight: 1.4 }}>
        Vous visualisez ce site à l’intérieur de Messenger.<br />
        Certaines fonctionnalités (WhatsApp, PDF, Email, etc.) ne marcheront pas.
      </p>
      <button
        onClick={handleOpenInBrowser}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          backgroundColor: "#00bcd4",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🚀 Ouvrir dans le navigateur
      </button>
    </div>
  );
};

export default OpenInBrowserAlert;
