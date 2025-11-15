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

            <h2 className="text-2xl font-bold mb-2">Company Overview</h2>
            <p className="text-gray-700 mb-4">Brief introduction to Gigpay, a brand of DollarPe Technologies Private Limited.</p>
            <p className="text-gray-700 mb-6">Core services offered: comprehensive payroll and payout solutions for Indian businesses.</p>

            <h2 className="text-2xl font-bold mb-2 mt-8">About the Company</h2>
            <p className="text-gray-700 mb-4">Gigpay specializes in modern payroll and payout management, offering a cloud-based platform that is both user-friendly and scalable.</p>
            <p className="text-gray-700 mb-4">The company is deeply committed to compliance with Indian statutory requirements, ensuring businesses remain stress-free and audit-ready.</p>
            <p className="text-gray-700 mb-6">At Gigpay, we understand the importance of simplifying payroll and payout processes to enable business growth, helping organizations focus on what truly matters — their people and performance.</p>

            <h2 className="text-2xl font-bold mb-2 mt-8">Mission</h2>
            <p className="text-gray-700 mb-4">Our mission is to revolutionize payroll management for Indian businesses through innovative technology and expert support.</p>
            <p className="text-gray-700 mb-6">We aim to empower clients to concentrate on growth, while our specialists handle the complexities of payroll and compliance seamlessly.</p>

            <h2 className="text-2xl font-bold mb-2 mt-8">Vision</h2>
            <p className="text-gray-700 mb-4">Our vision is to become a leader in innovative payroll and payout solutions, setting benchmarks for reliability, accuracy, and simplicity.</p>
            <p className="text-gray-700 mb-6">We are committed to continuous improvement, adapting to evolving market needs and embracing technological advancements to deliver superior value.</p>

            <h2 className="text-2xl font-bold mb-2 mt-8">Core Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><span className="font-semibold">Accuracy:</span> Ensuring precise payroll calculations and transparent reporting.</li>
              <li><span className="font-semibold">Security:</span> Prioritizing the protection of client data with industry-grade safeguards.</li>
              <li><span className="font-semibold">Ease of Use:</span> Designing an intuitive platform that serves businesses of all sizes.</li>
              <li><span className="font-semibold">Compliance:</span> Staying ahead of regulatory changes to minimize client risks.</li>
              <li><span className="font-semibold">Partnership:</span> Building long-term relationships with clients as trusted advisors.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2 mt-8">Team</h2>
            <p className="text-gray-700 mb-4">The Gigpay team brings together experts in payroll management, finance, and compliance, with years of collective experience in serving diverse industries.</p>
            <p className="text-gray-700 mb-6">Our team is dedicated to providing ongoing support, resolving challenges swiftly, and delivering exceptional client satisfaction.</p>

            <h2 className="text-2xl font-bold mb-2 mt-8">Conclusion</h2>
            <p className="text-gray-700 mb-4">Gigpay, operated by DollarPe Technologies Private Limited, stands as a trusted partner in payroll and payout management.</p>
            <p className="text-gray-700 mb-6">We invite businesses to connect with us for tailored, efficient, and compliant payroll solutions designed to simplify operations and fuel growth.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}