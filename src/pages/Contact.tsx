import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submit: in real app, send to backend or email service
    console.log('Contact form submitted', form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16 pb-20">
        <div className='bg-gray-100 py-8 mb-8'>
          <h2 className="text-6xl font-bold text-gray-900 mb-4 text-center">Contact Us</h2>
          <p className='text-center text-gray-600 mb-12'>Not finding what you are looking for?</p>
        </div>
        <div className="max-w-7xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Contact details */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Monday - Friday (9:00 AM to 7:00 PM)</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"><Mail className="w-5 h-5 text-gray-700" /></div>
                  <a href="mailto:support@dollarpe.xyz" className="text-gray-800 hover:text-emerald-700">support@dollarpe.xyz</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"><Phone className="w-5 h-5 text-gray-700" /></div>
                  <a href="tel:+919880265163" className="text-gray-800 hover:text-emerald-700">+91 9880265163</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"><MapPin className="w-5 h-5 text-gray-700" /></div>
                  <div className="text-gray-800">
                    MyTime Cowork, 2nd Floor, 55, Lane 2, Westend Marg, Near Saket, Saidulajab, New Delhi 110030
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center"><Clock className="w-5 h-5 text-gray-700" /></div>
                  <div className="text-gray-800">We typically respond within 1 business day.</div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in touch with us</h2>
              <p className="text-gray-600 mb-6">Send us your questions and suggestions. We'll get back to you at the earliest.</p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 mb-6">
                  Thanks! We received your message and will reach out soon.
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message *"
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <p className="text-sm text-gray-600">By clicking Submit, you agree to our <a href="/privacy" className="text-emerald-700 underline">Privacy Policy</a>.</p>
                <button type="submit" className="w-full bg-[#24cb71] text-white py-3 rounded-lg hover:bg-[#24cb71] transition-colors font-semibold">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}