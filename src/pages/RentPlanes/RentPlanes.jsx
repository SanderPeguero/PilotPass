import React, { useState } from 'react';
import Header from './components/Header';
import AircraftList from './components/AircraftList';
import UserRentals from './components/UserRentals';
import OwnerDashboard from './components/OwnerDashboard';
import { AircraftService } from './services/AircraftService';
import { RentalService } from './services/RentalService';
import './style.css'

// Initialize services
const aircraftService = new AircraftService();
const rentalService = new RentalService();

// Mock user ID for demo purposes
const currentUserId = 1;

function RentPlanes() {

    const [showRentals, setShowRentals] = useState(false);
    const [showOwnerSide, setShowOwnerSide] = useState(false);
    const [rentals, setRentals] = useState(rentalService.getRentalsByUser(currentUserId));

    const handleRentalCreated = () => {
        setRentals(rentalService.getRentalsByUser(currentUserId));
    };

    const handleUpdateRentalStatus = (rentalId, status) => {
        rentalService.updateRentalStatus(rentalId, status);
        setRentals(rentalService.getRentalsByUser(currentUserId));
    };

    const renderContent = () => {
        if (showOwnerSide) {
            return (
                <OwnerDashboard
                    rentals={rentalService.getAllRentals()}
                    aircraft={aircraftService.getAllAircraft()}
                    onUpdateRentalStatus={handleUpdateRentalStatus}
                />
            );
        }

        return !showRentals ? (
            <AircraftList
                aircraft={aircraftService.getAvailableAircraft()}
                onRentalCreated={handleRentalCreated}
                rentalService={rentalService}
                currentUserId={currentUserId}
            />
        ) : (
            <UserRentals
                rentals={rentals}
                aircraft={aircraftService.getAllAircraft()}
            />
        );
    };

    return (
        <div className="ml-[3rem] z-[0]">
            <Header
                onToggleView={() => setShowRentals(!showRentals)}
                onToggleOwnerView={() => setShowOwnerSide(!showOwnerSide)}
                showOwnerSide={showOwnerSide}
            />
            <main className="container">
                {renderContent()}
            </main>
        </div>
    );
}

export default RentPlanes