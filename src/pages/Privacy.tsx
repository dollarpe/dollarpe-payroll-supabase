import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

            <p className="text-gray-700 mb-6">
              Gigpay (“Brand”, “we,” “us,” or “our”) operated by DollarPe Technologies Private Limited (“Company”) respects your privacy and is committed to protecting it through this Privacy Policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website (www.gigpay.in), use our payout services (excluding gaming and cryptocurrency-related payouts), and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>

            {/* Section 1: Scope */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 1: Scope</h2>
            <p className="text-gray-700 mb-3">This policy applies to information we collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>1.1 Through our services, including any payout products we offer (except for payouts related to gaming or cryptocurrency businesses).</li>
              <li>1.2 Through electronic communications, such as email, text, and other messages between you and Gigpay.</li>
              <li>1.3 Through customer support interactions and our marketing communications.</li>
            </ul>
            <p className="text-gray-700 mt-4 mb-2">It does not apply to information collected by:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>1.4 Any third party, including through any application or content that may link to or be accessible from our platforms.</li>
            </ul>

            {/* Section 2: Information We Collect */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 2: Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>2.1 <span className="font-semibold">Personal Information:</span> such as your name, email address, mailing address, phone number, date of birth, government identification, and financial account information.</li>
              <li>2.2 <span className="font-semibold">Business Information:</span> including company name, Tax Identification Number (TIN), business address, and authorized representative details.</li>
              <li>2.3 <span className="font-semibold">Transaction Information:</span> details of payout transactions processed through our service.</li>
              <li>2.4 <span className="font-semibold">Device and Usage Information:</span> IP address, browser type, operating system, and interactions with our website and services.</li>
            </ul>

            {/* Section 3: How We Use Your Information */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 3: How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>3.1 Provide, operate, and maintain our payout services.</li>
              <li>3.2 Verify your identity and conduct necessary compliance checks (e.g., KYC - Know Your Customer, AML - Anti-Money Laundering).</li>
              <li>3.3 Process payouts securely and accurately.</li>
              <li>3.4 Communicate with you about your account, transactions, and service updates.</li>
              <li>3.5 Comply with legal and regulatory obligations.</li>
              <li>3.6 Improve our services and develop new features.</li>
            </ul>

            {/* Section 4: Disclosure of Your Information */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 4: Disclosure of Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>4.1 <span className="font-semibold">Service Providers:</span> who perform services on our behalf, such as payment processing, identity verification, and fraud detection.</li>
              <li>4.2 <span className="font-semibold">Regulatory Authorities:</span> when required to comply with applicable laws and regulations.</li>
              <li>4.3 <span className="font-semibold">Business Transfers:</span> if Gigpay is involved in a merger, acquisition, or asset sale.</li>
              <li>4.4 <span className="font-semibold">With Your Consent:</span> for any other purpose disclosed to you when you provide the information.</li>
            </ul>
            <p className="text-gray-700 mt-2">We do not sell or rent your personal information to third parties.</p>

            {/* Section 5: Data Security */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 5: Data Security</h2>
            <p className="text-gray-700">We implement a variety of technical and organizational measures to maintain the security of your personal information. However, no transmission of data over the internet is completely secure. We encourage you to use caution when transmitting personal information.</p>

            {/* Section 6: Data Retention */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 6: Data Retention</h2>
            <p className="text-gray-700">We retain your personal information as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.</p>

            {/* Section 7: Your Privacy Rights */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 7: Your Privacy Rights</h2>
            <p className="text-gray-700 mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>7.1 Access the personal information we hold about you.</li>
              <li>7.2 Request correction of any inaccurate or incomplete information.</li>
              <li>7.3 Request deletion of your personal information, subject to legal retention requirements.</li>
              <li>7.4 Object to or restrict certain uses of your information.</li>
            </ul>
            <p className="text-gray-700 mt-2">To exercise these rights, please contact us at: <a href="mailto:support@gigpay.in" className="text-emerald-700 font-medium">support@gigpay.in</a>.</p>

            {/* Section 8: Changes to this privacy policy */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 8: Changes to this Privacy Policy</h2>
            <p className="text-gray-700">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated Privacy Policy on this page and updating the effective date.</p>

            {/* Section 9: Contact Us */}
            <h2 className="text-2xl font-bold mb-2 mt-8">Section 9: Contact Us</h2>
            <div className="text-gray-700 space-y-1">
              <p>Gigpay</p>
              <p>Operated by DollarPe Technologies Private Limited</p>
              <p>Email: <a href="mailto:support@gigpay.in" className="text-emerald-700 underline">support@gigpay.in</a></p>
              <p>Phone: <a href="tel:+919880265163" className="text-emerald-700 underline">+91 9880265163</a></p>
              <p>Hours: Monday - Friday (9:00 AM to 7:00 PM)</p>
              <p>Address: MyTime Cowork, 2nd Floor, 55, Lane 2, Westend Marg, Near Saket, Saidulajab, New Delhi 110030</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}