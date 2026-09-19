import React, { useState } from 'react';
import { FileText, RefreshCw, CheckCircle2, AlertCircle, Copy, ExternalLink, HelpCircle, Sparkles, X, Code } from 'lucide-react';
import { DocSyncInfo } from '../types';
import { SAMPLE_GOOGLE_DOC_TEXT, parseGoogleDocInventory } from '../data/defaultDocData';
import { Vehicle } from '../types';

interface DocSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncInfo: DocSyncInfo;
  onSyncDoc: (docUrlOrId: string) => Promise<void>;
  onApplyManualDocText: (text: string) => void;
  onResetToDefaultDoc: () => void;
}

export default function DocSyncModal({
  isOpen,
  onClose,
  syncInfo,
  onSyncDoc,
  onApplyManualDocText,
  onResetToDefaultDoc
}: DocSyncModalProps) {
  const [docInput, setDocInput] = useState(syncInfo.docUrl);
  const [activeTab, setActiveTab] = useState<'connect' | 'editor' | 'guide'>('connect');
  const [editableDocText, setEditableDocText] = useState(syncInfo.rawText || SAMPLE_GOOGLE_DOC_TEXT);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSyncSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalFeedback(null);
    await onSyncDoc(docInput);
  };

  const handleApplyEditor = () => {
    try {
      const parsed = parseGoogleDocInventory(editableDocText);
      if (parsed.length === 0) {
        setLocalFeedback("No valid vehicles recognized in the text. Ensure each vehicle has 'Vehicle: [Year] [Make] [Model]' and 'Price: $XX,XXX'.");
        return;
      }
      onApplyManualDocText(editableDocText);
      setLocalFeedback(`Successfully loaded ${parsed.length} vehicles with updated prices and pictures from Google Doc!`);
      setTimeout(() => setLocalFeedback(null), 3500);
    } catch (err: any) {
      setLocalFeedback("Error parsing Google Doc text: " + err.message);
    }
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(SAMPLE_GOOGLE_DOC_TEXT);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400 flex items-center justify-center text-cyan-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">Google Docs Inventory & Price Sync</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-700">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Manage vehicle prices, pictures, and specifications directly from any Google Doc
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('connect')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'connect'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Connect & Sync Doc</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'editor'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Live Doc Content & Quick Price Edit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Google Doc Format Guide</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Status Alert Banner */}
          <div className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs ${
            syncInfo.status === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <div className="flex items-start gap-2">
              {syncInfo.status === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-semibold">
                  {syncInfo.status === 'error' ? 'Connection Notice' : 'Current Status: Inventory Synced'}
                </div>
                <div className="text-slate-600 mt-0.5">
                  {syncInfo.errorMessage || `Displaying ${syncInfo.vehicleCount} vehicles loaded from Google Doc. Last synced: ${syncInfo.lastSyncedAt}`}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onResetToDefaultDoc}
              className="text-[11px] font-medium text-blue-700 hover:underline shrink-0"
            >
              Reset to Official Preset
            </button>
          </div>

          {localFeedback && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs font-medium">
              {localFeedback}
            </div>
          )}

          {activeTab === 'connect' && (
            <div className="space-y-4">
              <form onSubmit={handleSyncSubmit} className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Google Doc Link or Document ID
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={docInput}
                      onChange={(e) => setDocInput(e.target.value)}
                      placeholder="https://docs.google.com/document/d/YOUR_DOC_ID/edit"
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-slate-800 pr-10"
                    />
                    {docInput.includes('docs.google.com') && (
                      <a
                        href={docInput}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-blue-600"
                        title="Open in Google Docs"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={syncInfo.status === 'syncing' || !docInput.trim()}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shrink-0 shadow-sm"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncInfo.status === 'syncing' ? 'animate-spin' : ''}`} />
                    <span>{syncInfo.status === 'syncing' ? 'Syncing...' : 'Fetch & Load Doc'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Tip: In Google Docs, click <strong>Share</strong> and set General Access to <strong>"Anyone with the link can view"</strong>, or use <strong>File &gt; Share &gt; Publish to web</strong>.
                </p>
              </form>

              <div className="pt-3 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Quick Load Presets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setDocInput("https://docs.google.com/document/d/1a8B9cDef-BlueDiamonAuto-Inventory2026/edit");
                      onSyncDoc("https://docs.google.com/document/d/1a8B9cDef-BlueDiamonAuto-Inventory2026/edit");
                    }}
                    className="text-left p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-blue-700 flex items-center justify-between">
                      <span>Blue Diamon Master Inventory</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      8 Luxury, Sports, & SUV vehicles with active specials, prices & high-res photos
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('editor');
                    }}
                    className="text-left p-3 rounded-xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-cyan-800 flex items-center justify-between">
                      <span>Live Price & Picture Editor</span>
                      <Code className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Instantly change prices or car photos in real-time right here in the app
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    Live Google Doc Content Editor
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Edit prices (e.g. change <code>Price: $47,990</code> to <code>$42,000</code>) or image URLs below and click "Apply to Inventory" to watch the website update instantly!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditableDocText(SAMPLE_GOOGLE_DOC_TEXT)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Reload Sample
                </button>
              </div>

              <textarea
                value={editableDocText}
                onChange={(e) => setEditableDocText(e.target.value)}
                rows={12}
                className="w-full font-mono text-[11px] p-3 rounded-xl border border-slate-300 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-y"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  Parsed count on save: {parseGoogleDocInventory(editableDocText).length} vehicles recognized
                </span>
                <button
                  type="button"
                  onClick={handleApplyEditor}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Apply Changes to Inventory & Prices</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  How Blue Diamon Auto Loads Prices & Pictures from Google Docs
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Our system parses standard Google Docs into structured inventory. You can write your inventory as simple text blocks or bullet points. The system looks for key labels like:
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-[11px] space-y-1 text-slate-800">
                <div className="text-blue-700 font-semibold">VEHICLE 1: [Year] [Make] [Model] [Trim]</div>
                <div>Price: $45,000</div>
                <div>Original Price: $49,000 (optional, shows discount badge)</div>
                <div>Special Deal: Yes (adds to Specials tab)</div>
                <div>Special Badge: Diamond Deal of the Week (optional custom badge)</div>
                <div>Mileage: 18,500 miles</div>
                <div>Body Style: Sedan / SUV / Truck / Coupe</div>
                <div>Exterior Color: Portimao Blue</div>
                <div>Pictures: https://your-photo-url-1.jpg, https://your-photo-url-2.jpg</div>
                <div>Features: Navigation, Sunroof, Leather, Heated Seats</div>
                <div>Description: Clean Carfax, one owner, mint condition...</div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-500">
                  Copy the full template text and paste it into your new Google Doc:
                </div>
                <button
                  type="button"
                  onClick={handleCopyTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                  <span>{copiedTemplate ? "Copied to Clipboard!" : "Copy Template Text"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Powered by Blue Diamon Auto Google Docs Integration
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
