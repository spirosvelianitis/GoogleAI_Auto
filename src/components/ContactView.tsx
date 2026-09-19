import React, { useState, useEffect } from 'react';
import { Vehicle, ContactInquiry } from '../types';
import DynamicMap from './DynamicMap';
import { 
  Send, Calendar, Clock, MapPin, Phone, Mail, 
  MessageSquare, CheckCircle2, AlertCircle, Car, ShieldCheck 
} from 'lucide-react';

interface ContactViewProps {
  vehicles: Vehicle[];
  preSelectedVehicle?: Vehicle | null;
  initialType?: ContactInquiry['type'];
}

export default function ContactView({
  vehicles,
  preSelectedVehicle = null,
  initialType = 'general'
}: ContactViewProps) {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    phone: '',
    type: initialType,
    vehicleId: preSelectedVehicle ? preSelectedVehicle.id : '',
    vehicleName: preSelectedVehicle ? `${preSelectedVehicle.year} ${preSelectedVehicle.make} ${preSelectedVehicle.model}` : '',
    preferredDate: '',
    preferredTime: 'morning',
    preferredContact: 'phone',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ inquiryId: string; message: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync if preSelectedVehicle changes
  useEffect(() => {
    if (preSelectedVehicle) {
      setFormData(prev => ({
        ...prev,
        vehicleId: preSelectedVehicle.id,
        vehicleName: `${preSelectedVehicle.year} ${preSelectedVehicle.make} ${preSelectedVehicle.model}`,
        type: prev.type === 'general' ? 'test_drive' : prev.type,
      }));
    }
  }, [preSelectedVehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitSuccess({
        inquiryId: data.inquiryId || 'BDA-' + Math.floor(100000 + Math.random() * 900000),
        message: data.message || `Thank you! Your inquiry has been routed to our sales specialists.`
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'general',
        vehicleId: '',
        vehicleName: '',
        preferredDate: '',
        preferredTime: 'morning',
        preferredContact: 'phone',
        message: ''
      });
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred. Please call (704) 588-3420 directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Top Title Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Showroom & Test Drive Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Visit Blue Diamon Auto & <span className="text-cyan-400">Connect With Us</span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Schedule a VIP test drive, request an out-the-door quote, or reach out to our team. Explore our interactive map below for real-time directions to our lot.
        </p>
      </div>

      {/* Main 2-Column: Dynamic Map + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              Inquire or Schedule a Test Drive
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Guaranteed response within 15 minutes during showroom operating hours.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Inquiry Confirmed!</h3>
                  <p className="text-xs text-emerald-700">Reference #{submitSuccess.inquiryId}</p>
                </div>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {submitSuccess.message} Our client specialist will reach out to confirm your vehicle request and scheduling.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(null)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {submitError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Inquiry Type Tabs */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  How can we assist you today?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {[
                    { id: 'test_drive', label: 'VIP Test Drive' },
                    { id: 'price_quote', label: 'Out-The-Door Quote' },
                    { id: 'financing', label: 'Finance Pre-Approval' },
                    { id: 'trade_in', label: 'Trade-In Appraisal' },
                    { id: 'general', label: 'General Question' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.id as any })}
                      className={`p-2 rounded-xl text-center font-semibold border transition-all ${
                        formData.type === type.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Selection */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Vehicle of Interest (Optional)
                </label>
                <select
                  value={formData.vehicleId || ''}
                  onChange={(e) => {
                    const selected = vehicles.find(v => v.id === e.target.value);
                    setFormData({
                      ...formData,
                      vehicleId: e.target.value,
                      vehicleName: selected ? `${selected.year} ${selected.make} ${selected.model}` : ''
                    });
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">-- General Inquiry (No specific car) --</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} (${v.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name, Email, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(704) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Test Drive Scheduling date/time (if test drive) */}
              {formData.type === 'test_drive' && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900">
                    <Calendar className="w-4 h-4" />
                    <span>Preferred Test Drive Schedule</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 font-medium block mb-1">Target Date</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 font-medium block mb-1">Target Time Window</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs"
                      >
                        <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="evening">Evening (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Questions or Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Ask about down payment options, trade-in details, or specific vehicle features..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="flex items-center gap-4 text-slate-600 text-[11px]">
                <span className="font-semibold text-slate-800">Preferred Contact:</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={() => setFormData({ ...formData, preferredContact: 'phone' })}
                  />
                  <span>Phone Call</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="text"
                    checked={formData.preferredContact === 'text'}
                    onChange={() => setFormData({ ...formData, preferredContact: 'text' })}
                  />
                  <span>SMS Text</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={() => setFormData({ ...formData, preferredContact: 'email' })}
                  />
                  <span>Email</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Routing to Specialist...' : 'Submit Inquiry'}</span>
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                We respect your privacy. Your information is strictly used for dealership inquiries and never sold.
              </p>
            </form>
          )}
        </div>

        {/* Right Column: Dynamic Map & Showroom Information */}
        <div className="lg:col-span-6 space-y-6">
          {/* Dynamic Map Component */}
          <div>
            <DynamicMap />
          </div>

          {/* Location & Highway directions guide */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 text-xs text-slate-700">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Showroom Location & Transit Access</span>
            </h2>
            <div className="space-y-2">
              <p>
                <strong>From Uptown Charlotte:</strong> Take I-77 South to Exit 5 (Tyvola Rd / South Blvd). Head south on Auto Mall corridor for 1.2 miles. Blue Diamon Auto will be on your right.
              </p>
              <p>
                <strong>From Charlotte Douglas Airport (CLT):</strong> Take I-485 Outer to South Blvd Exit 64A. Travel north for 2.5 miles.
              </p>
              <p className="text-slate-500">
                Ample customer parking is available on site in front of our main showroom.
              </p>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:7045883420"
              className="p-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600/30 text-cyan-300 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Call Sales Team</div>
                <div className="font-bold text-sm">(704) 588-3420</div>
              </div>
            </a>

            <a
              href="mailto:sales@bluediamonauto.com"
              className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-3 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Email Inquiries</div>
                <div className="font-bold text-sm">sales@bluediamonauto.com</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
