import React from 'react'

const Footer = () => {
  return (
 <footer className="bg-gray-900 text-white py-6 mt-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Frog store. Tous droits réservés.
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Made with ❤️ by Votre Équipe
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer