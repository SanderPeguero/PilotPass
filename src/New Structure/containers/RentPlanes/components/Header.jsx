import React from 'react';

function Header({ onToggleView, onToggleOwnerView, showOwnerSide }) {
  return (
    <header className="header sticky top-0">
      <div className="header-content">
        <h1 className="main-title">Aircraft Rental</h1>
        <nav className="flex gap-4">
          <button
            onClick={onToggleView}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-lg shadow-blue-500/20"
          >
            View My Rentals
          </button>
          <button
            onClick={onToggleOwnerView}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 shadow-lg shadow-emerald-500/20"
          >
            {showOwnerSide ? "Renter's Side" : "Owner's Side"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;