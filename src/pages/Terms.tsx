import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  const url = 'https://veenaexpertvault.com/terms';
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>This website pages content is for your general information and uses only. It is subject to change without prior notice.</li>
              <li>Neither we nor any third parties provide any warranty or guarantee the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. By visiting the website you acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
              <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
              <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
              <li>All trademarks reproduced in this website, which is not the property of, or licensed to the operator, are acknowledged on the website.</li>
              <li>Unauthorized use of this website shall be subjected to a claim for damages and/or be a criminal offence.</li>
              <li>From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
              <li>You may not create a link to this website from another website or document without DollarPe Payroll's prior written consent.</li>
              <li>If you choose, or you are provided with, a user identification code, password or any other piece of information as part of our security procedures, you must treat such information as confidential. You must not disclose it to any third party.</li>
              <li>We have the right to disable any user identification code or password, whether chosen by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these terms of use.</li>
              <li>Your use of this website and any dispute arising out of such use of the website is subject to the exclusive jurisdiction of the courts of Delhi, Government of India.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-2 mt-8">Acceptance of Terms through Use</h2>
            <p>The data we collect from you are stored in our system servers and will be treated with utmost confidentiality. Your personal information will be used only by DollarPe Payroll for all business transactions that require your information to complete the transactions. DollarPe Payroll reserves the right to verify the authenticity of the information or documents you provide.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}