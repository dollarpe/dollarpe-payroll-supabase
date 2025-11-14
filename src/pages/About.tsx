import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Us</h1>

            {/* Company Overview */}
            <h2 className="text-2xl font-bold mb-2">Company Overview</h2>
            <p className="text-gray-700 mb-4">Brief introduction to GigPay, a brand of DollarPe Technologies Private Limited</p>
            <p className="text-gray-700 mb-6">Core services offered: comprehensive payroll solutions for Indian businesses</p>

            {/* About the Company */}
            <h2 className="text-2xl font-bold mb-2 mt-8">About the Company</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Detailed description of GigPay specialization in payroll management</li>
              <li>Emphasis on the cloud-based platform that is user-friendly and scalable</li>
              <li>Highlight the commitment to compliance with Indian statutory requirements</li>
              <li>Discussion on the importance of simplifying payroll processes for business growth</li>
            </ul>

            {/* Mission */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Mission</h2>
             <p className="text-gray-700 mb-4">Statement of purpose: to revolutionize payroll management for Indian businesses</p>
             <p className="text-gray-700 mb-6">Focus on enabling clients to concentrate on growth while experts handle payroll</p>

            {/* Vision */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Vision</h2>
             <p className="text-gray-700 mb-6">Aspirational goals: to be a leader in innovative payroll solutions</p>
             <p className="text-gray-700 mb-6">Commitment to continuous improvement and adaptation to market needs</p>

            {/* Core Values */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Core Values</h2>
             <ul className="list-disc pl-6 space-y-2 text-gray-700">
               <li><span className="font-semibold">Accuracy:</span> Ensuring precise payroll calculations and reporting</li>
               <li><span className="font-semibold">Security:</span> Prioritizing the protection of client data</li>
               <li><span className="font-semibold">Ease of Use:</span> Designing an intuitive platform for all business sizes</li>
               <li><span className="font-semibold">Compliance:</span> Staying ahead of regulatory changes to minimize client risks</li>
               <li><span className="font-semibold">Partnership:</span> Building long-term relationships with clients as trusted advisors</li>
             </ul>

            {/* Team */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Team</h2>
            <p className="text-gray-700 mb-4">Introduction to the Gigpay team</p>
            <p className="text-gray-700 mb-4">Overview of expertise and experience in payroll and compliance</p>
            <p className="text-gray-700 mb-6">Commitment to providing ongoing support and addressing client challenges</p>

            {/* Conclusion */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Conclusion</h2>
            <p className="text-gray-700 mb-4">Reiteration of Gigpay's role as a trusted partner in payroll management</p>
            <p className="text-gray-700 mb-6">Encouragement for potential clients to reach out for tailored solutions</p>
            <p className="text-sm text-gray-500">This outline critically addresses the key components of Gigpay's company page, emphasizing its position as a forward-thinking payroll solution provider while ensuring clarity on its mission, vision, values, and team structure.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}