import { useState } from 'react';
import { ArrowRight, CheckCircle2, Users, Shield, Calendar, Smartphone, Zap, BarChart3, FileCheck, Cloud, Quote, Clock, Tag } from 'lucide-react';
import SignupModal from './components/SignupModal';
import SelfServiceTabs from './components/SelfServiceTabs';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
      <Header onStartTrial={() => setIsSignupModalOpen(true)} />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-col gap-5 items-center justify-between">
            <div className='flex flex-col items-center justify-center'>
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Cloud-Based Payroll Solution</span>
              </div>
              <h1 className="text-center md:text-left text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Simplify Your Payroll Management
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center max-w-2xl">
                Transform outdated payroll practices and build a better workplace for your business with GigPay Payroll.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="bg-[#24cb71] text-white px-8 py-4 rounded-lg hover:bg-[#24cb71] transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                >
                  <span className="font-semibold">Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {/* <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-all">
                  Watch Demo
                </button> */}
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className='max-w-4xl'>
                <img className="border border-gray-200 rounded shadow-lg" src="https://ik.imagekit.io/vv/hero-banner2.svg?updatedAt=1761067636725" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage payroll efficiently and keep your team happy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border border-emerald-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payroll Automation</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Personalized salary components with online delivery and multi-level approval workflows. Intuitive interface for seamless processing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Custom salary structures</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Multi-level approvals</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Off-cycle payroll runs</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl border border-teal-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Leave & Attendance</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Create custom leave types, streamline employee applications, and track attendance effortlessly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Custom leave policies</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time tracking</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Automated approvals</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Employee Self-Service</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Mobile and web access for instant payslip downloads, document submission, and real-time notifications.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Mobile & web access</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Instant payslip download</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Document management</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border border-amber-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Reporting</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Formula-based calculations, custom reporting tags, and scheduled earnings configuration for complete visibility.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Custom formulas</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Reporting tags</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Scheduled earnings</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-2xl border border-rose-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileCheck className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Document Management</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Centralized document storage with secure access, automated workflows, and intelligent organization.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Secure storage</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Online submission</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>Smart organization</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-white p-8 rounded-2xl border border-cyan-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Real-time employee communication, instant notifications, and seamless team coordination.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>Instant notifications</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time updates</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>Team messaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="compliance" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                <span>Nation-Wide Compliance</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Stay Compliant, Stay Confident
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Automated compliance management that keeps you ahead of tax law changes and regulatory requirements across India.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Tax Adjustments</h3>
                    <p className="text-gray-600">Stay updated with automatic tax law changes and compliance requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Statutory Reports</h3>
                    <p className="text-gray-600">Ready-to-file reports for PF, ESI, LWF, PT, and IT compliance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tax Form Generation</h3>
                    <p className="text-gray-600">Automated generation of all required tax forms and documentation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
              <img className='max-w-[80%] mx-auto' src="https://ik.imagekit.io/vv/secure.svg?updatedAt=1761068038815" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100/50 text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          <span>Leave and Attendance</span>
        </div>
        {/* <h6 className='text-green-600 font-bold text-center'></h6> */}
        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center'>Manage leave and
          attendance, built-in.</h2>
        <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center'>Create custom leave types, allow employees to apply for leaves, approve or reject leaves, manage attendance - all from within GigPay Payroll.</p>
        <img className='max-w-[80%] mx-auto' src="https://ik.imagekit.io/vv/hero-banner.svg?updatedAt=1761067515720" alt="" />
      </section>
      <SelfServiceTabs />
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100/50 text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          <span>Integrations</span>
        </div>
        {/* <h6 className='text-green-600 font-bold text-center'></h6> */}
        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center'>Natively built. Deeply connected. <br/> Inherently collaborative.</h2>
        <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center'>Leverage the power of the ever evolving ecosystem and keep your HR, Payroll, and Finance teams on the same page.</p>
        <div className='bg-black flex flex-col md:flex-row items-center justify-center rounded-xl p-12 gap-4 max-w-4xl mx-auto'>
          <div className='text-left'>
            <h6 className='text-green-600 font-bold mb-3'>Custom Integrations</h6>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>We can work with systems you already love</h2>
            <p className='text-xl text-white'>Bring data from your existing systems like Workday, SAP, Oracle, UKG, and Microsoft to streamline things without disrupting your way of doing things through custom integrations.</p>
          </div>
          <div>
            <img src="https://ik.imagekit.io/vv/customisation%201.svg?updatedAt=1761069421913" alt="" />
          </div>
        </div>
      </section>
      <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Cloud className="w-4 h-4" />
            <span>Seamless Integrations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect Your Entire Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            Native and custom integrations with leading HR, Payroll, and Finance systems
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Workday</h3>
              <p className="text-gray-600">Seamless HR data synchronization</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">SAP</h3>
              <p className="text-gray-600">Enterprise resource planning integration</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Oracle</h3>
              <p className="text-gray-600">Financial system connectivity</p>
            </div>
          </div>

          {/* <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Integration Support</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Need a specific integration? Our team can build custom connections to your existing systems
            </p>
            <button className="bg-[#24cb71] text-white px-8 py-3 rounded-lg hover:bg-[#24cb71] transition-all shadow-lg">
              Contact Integration Team
            </button>
          </div> */}
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100/50 text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          <span>Customise</span>
        </div>
        {/* <h6 className='text-green-600 font-bold text-center'></h6> */}
        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center'>
            Customise and automate 
            the way you want
          </h2>
        <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center'>Build new feature on top of an already powerful platform and make GigPay Payroll work the way you want.</p>
        <img className='max-w-[100%] md:max-w-[80%] mx-auto' src="https://ik.imagekit.io/vv/customise-and-automate%201.svg?updatedAt=1761073652169" alt="" />
      </section>

      <section id="advanced-features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-red-600 mb-4">Advanced Features</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Powerfully engineered to back your unique processes</h2>
            <img
              src="https://ik.imagekit.io/vv/Frame%207.svg?updatedAt=1761074303654"
              alt="Advanced features illustration"
              className="w-full max-w-lg object-contain"
            />
          </div>
          <div className="space-y-10">
            <div>
              <div className="flex items-start space-x-4">
                <Zap className="w-6 h-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Formula based earnings</h3>
                  <p className="text-gray-600">Apply formulae to salary components instead of manual calculations and ensure accuracy.</p>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-6" />
            </div>
            <div>
              <div className="flex items-start space-x-4">
                <Tag className="w-6 h-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Reporting tags</h3>
                  <p className="text-gray-600">Create tags, associate them with employees, and get customised payroll reports for deeper insights.</p>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-6" />
            </div>
            <div>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Scheduled earnings</h3>
                  <p className="text-gray-600">Configure bonuses or variable pay for employees in advance as a part of any future pay runs.</p>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-6" />
            </div>
            <div>
              <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Off-cycle payrun</h3>
                  <p className="text-gray-600">Do not wait until the next pay run to pay the bonus and withheld salaries.</p>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-6" />
            </div>
            <div>
              <div className="flex items-start space-x-4">
                <FileCheck className="w-6 h-6 text-gray-900 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Document management</h3>
                  <p className="text-gray-600">Store and share employee and organizational documents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Growing Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how companies across India are transforming their payroll operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "GigPay Payroll has completely transformed our payroll process. What used to take days now takes hours. The compliance features give us peace of mind.",
                author: "Dhruv Vats",
                role: "HR Director",
                company: "Rocket Incentive"
              },
              {
                quote: "The employee self-service portal has been a game-changer. Our team loves the instant access to payslips and the mobile app makes everything so convenient.",
                author: "Bharath Reddy",
                role: "Finance Manager",
                company: "Dojima Nework"
              },
              {
                quote: "Switching to GigPay Payroll was the best decision for our growing startup. The automation saves us countless hours and the support team is incredibly responsive.",
                author: "Sujith Sizon",
                role: "CEO",
                company: "Audace LLC"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <Quote className="w-10 h-10 text-emerald-600 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">300+</p>
              <p className="text-gray-600">Employees Managed Monthly</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">100%</p>
              <p className="text-gray-600">Compliance Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">80%</p>
              <p className="text-gray-600">Time Saved</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">20+</p>
              <p className="text-gray-600">Happy Businesses</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Payroll?
          </h2>
          <p className="text-xl text-emerald-50 mb-10">
            Join thousands of businesses streamlining their payroll operations. Start your free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-white text-[#24cb71] px-8 py-4 rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group font-semibold"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-emerald-600 transition-all font-semibold">
              Schedule a Demo
            </button> */}
          </div>
          <p className="text-emerald-100 mt-6 text-sm">
            Setup in minutes • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
