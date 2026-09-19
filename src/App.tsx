/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InventoryView from './components/InventoryView';
import SpecialsView from './components/SpecialsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import VehicleDetailModal from './components/VehicleDetailModal';
import DocSyncModal from './components/DocSyncModal';
import { Vehicle, ActiveTab, DocSyncInfo, ContactInquiry } from './types';
import { 
  INITIAL_VEHICLES, 
  SAMPLE_GOOGLE_DOC_TEXT, 
  DEFAULT_GOOGLE_DOC_ID, 
  DEFAULT_GOOGLE_DOC_URL, 
  parseGoogleDocInventory 
} from './data/defaultDocData';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [activeTab, setActiveTab] = useState<ActiveTab>('inventory');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [contactTargetVehicle, setContactTargetVehicle] = useState<Vehicle | null>(null);
  const [contactInitialType, setContactInitialType] = useState<ContactInquiry['type']>('general');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  // Google Docs synchronization state
  const [syncInfo, setSyncInfo] = useState<DocSyncInfo>({
    docUrl: DEFAULT_GOOGLE_DOC_URL,
    docId: DEFAULT_GOOGLE_DOC_ID,
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'synced',
    source: 'google_docs_export',
    vehicleCount: INITIAL_VEHICLES.length,
    rawText: SAMPLE_GOOGLE_DOC_TEXT,
  });

  // Function to fetch and parse Google Doc via our server endpoint
  const handleSyncDoc = async (docUrlOrId: string) => {
    setSyncInfo(prev => ({ ...prev, status: 'syncing', errorMessage: undefined }));

    try {
      const resp = await fetch(`/api/docs/fetch?doc=${encodeURIComponent(docUrlOrId)}`);
      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || 'Failed to retrieve document export.');
      }

      if (data.rawText) {
        const parsed = parseGoogleDocInventory(data.rawText);
        if (parsed.length > 0) {
          setVehicles(parsed);
          setSyncInfo({
            docUrl: docUrlOrId.includes('http') ? docUrlOrId : `https://docs.google.com/document/d/${docUrlOrId}/edit`,
            docId: data.docId || docUrlOrId,
            lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'synced',
            source: 'google_docs_export',
            vehicleCount: parsed.length,
            rawText: data.rawText,
          });
        } else {
          throw new Error('Google Doc reached, but no vehicle entries were formatted correctly. Check template instructions.');
        }
      }
    } catch (err: any) {
      console.warn("Google doc sync error:", err.message);
      setSyncInfo(prev => ({
        ...prev,
        status: 'error',
        errorMessage: err.message || "Failed to load Google Doc. Check sharing permissions ('Anyone with link can view')."
      }));
    }
  };

  // Manual update from the in-app Google Doc editor
  const handleApplyManualDocText = (text: string) => {
    const parsed = parseGoogleDocInventory(text);
    if (parsed.length > 0) {
      setVehicles(parsed);
      setSyncInfo(prev => ({
        ...prev,
        status: 'synced',
        source: 'custom_editor',
        vehicleCount: parsed.length,
        rawText: text,
        lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        errorMessage: undefined
      }));
    }
  };

  // Reset to default inventory
  const handleResetToDefaultDoc = () => {
    const parsed = parseGoogleDocInventory(SAMPLE_GOOGLE_DOC_TEXT);
    setVehicles(parsed);
    setSyncInfo({
      docUrl: DEFAULT_GOOGLE_DOC_URL,
      docId: DEFAULT_GOOGLE_DOC_ID,
      lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'synced',
      source: 'default_preset',
      vehicleCount: parsed.length,
      rawText: SAMPLE_GOOGLE_DOC_TEXT,
    });
  };

  // Quick navigation helpers
  const handleScheduleTestDrive = (vehicle: Vehicle) => {
    setContactTargetVehicle(vehicle);
    setContactInitialType('test_drive');
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquireVehicle = (vehicle: Vehicle) => {
    setContactTargetVehicle(vehicle);
    setContactInitialType('price_quote');
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClaimSpecial = (vehicle: Vehicle) => {
    setContactTargetVehicle(vehicle);
    setContactInitialType('price_quote');
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGeneralTestDrive = () => {
    setContactTargetVehicle(null);
    setContactInitialType('test_drive');
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const specialsCount = vehicles.filter(v => v.isSpecial).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header with Navigation & Live Google Docs Status */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        specialsCount={specialsCount}
        syncInfo={syncInfo}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenScheduleTestDrive={handleOpenGeneralTestDrive}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'inventory' && (
          <InventoryView
            vehicles={vehicles}
            syncInfo={syncInfo}
            onSelectVehicle={(veh) => setSelectedVehicle(veh)}
            onScheduleTestDrive={handleScheduleTestDrive}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
            onViewSpecials={() => setActiveTab('specials')}
          />
        )}

        {activeTab === 'specials' && (
          <SpecialsView
            vehicles={vehicles}
            onSelectVehicle={(veh) => setSelectedVehicle(veh)}
            onClaimDeal={handleClaimSpecial}
            onGeneralInquiry={() => {
              setContactTargetVehicle(null);
              setContactInitialType('trade_in');
              setActiveTab('contact');
            }}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onContactClick={() => setActiveTab('contact')}
            onInventoryClick={() => setActiveTab('inventory')}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView
            vehicles={vehicles}
            preSelectedVehicle={contactTargetVehicle}
            initialType={contactInitialType}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        syncInfo={syncInfo}
      />

      {/* Vehicle Details Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onScheduleTestDrive={handleScheduleTestDrive}
        onInquire={handleInquireVehicle}
      />

      {/* Google Docs Inventory & Pricing Manager Modal */}
      <DocSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        syncInfo={syncInfo}
        onSyncDoc={handleSyncDoc}
        onApplyManualDocText={handleApplyManualDocText}
        onResetToDefaultDoc={handleResetToDefaultDoc}
      />
    </div>
  );
}
