import { useState } from 'react';
import { X, Check, CheckCircle2, Mail } from 'lucide-react';
import { supabase, BusinessSignup } from '../lib/supabase';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, name: 'Email Verification' },
  { id: 2, name: 'Business PAN' },
  { id: 3, name: 'Business Details' },
  { id: 4, name: 'Business Registration Details' },
  { id: 5, name: 'Authorised Signatory Details' },
  { id: 6, name: 'Bank Account Details' },
  { id: 7, name: 'Website Details' },
];

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState<BusinessSignup>({
    email: '',
    email_verified: false,
    business_pan: '',
    business_name: '',
    business_type: '',
    business_address: '',
    business_registration_number: '',
    business_registration_date: '',
    authorized_signatory_name: '',
    authorized_signatory_designation: '',
    authorized_signatory_contact: '',
    bank_account_number: '',
    bank_name: '',
    bank_branch: '',
    bank_ifsc: '',
    website_url: '',
    current_step: 1,
    completed: false,
  });
  const [signupId, setSignupId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof BusinessSignup, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveProgress = async (nextStep?: number) => {
    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        current_step: nextStep || currentStep,
        updated_at: new Date().toISOString(),
      };

      if (signupId) {
        const { error } = await supabase
          .from('business_signups')
          .update(dataToSave)
          .eq('id', signupId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('business_signups')
          .insert([dataToSave])
          .select()
          .single();

        if (error) throw error;
        if (data) setSignupId(data.id);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Failed to save progress. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 1 && !formData.email_verified) {
      await saveProgress();
      setFormData(prev => ({ ...prev, email_verified: true }));
    }

    if (currentStep < 7) {
      await saveProgress(currentStep + 1);
      setCurrentStep(currentStep + 1);
    } else {
      await saveProgress(7);
      setFormData(prev => ({ ...prev, completed: true }));
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (!isCompleted && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    if (isCompleted) {
      return (
        <div className="text-center py-10">
          <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Signup submitted successfully</h3>
          <p className="text-gray-600 mb-4">We will reach out within 72 hours.</p>
          <div className="inline-flex items-center space-x-2 text-gray-700">
            <Mail className="w-5 h-5" />
            <span>
              For queries, email <a href="mailto:support@dollarpe.xyz" className="text-[#24cb71] underline">support@dollarpe.xyz</a>
            </span>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registered Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                placeholder="your.email@company.com"
                required
              />
            </div>
            <button
              onClick={() => handleInputChange('email_verified', 'true')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Verify
            </button>
            {formData.email_verified && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-700 font-medium">You're logged in!</p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business PAN Number
              </label>
              <input
                type="text"
                value={formData.business_pan}
                onChange={(e) => handleInputChange('business_pan', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="ABCDE1234F"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={formData.business_name}
                onChange={(e) => handleInputChange('business_name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Your Company Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                value={formData.business_type}
                onChange={(e) => handleInputChange('business_type', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select type</option>
                <option value="proprietorship">Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llp">LLP</option>
                <option value="private_limited">Private Limited</option>
                <option value="public_limited">Public Limited</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <textarea
                value={formData.business_address}
                onChange={(e) => handleInputChange('business_address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={3}
                placeholder="Full business address"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Registration Number
              </label>
              <input
                type="text"
                value={formData.business_registration_number}
                onChange={(e) => handleInputChange('business_registration_number', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="CIN/Registration Number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Registration Date
              </label>
              <input
                type="date"
                value={formData.business_registration_date}
                onChange={(e) => handleInputChange('business_registration_date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authorised Signatory Name
              </label>
              <input
                type="text"
                value={formData.authorized_signatory_name}
                onChange={(e) => handleInputChange('authorized_signatory_name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                value={formData.authorized_signatory_designation}
                onChange={(e) => handleInputChange('authorized_signatory_designation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Director, CEO"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                value={formData.authorized_signatory_contact}
                onChange={(e) => handleInputChange('authorized_signatory_contact', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="+91 9876543210"
                required
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Account Number
              </label>
              <input
                type="text"
                value={formData.bank_account_number}
                onChange={(e) => handleInputChange('bank_account_number', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Account Number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bank_name}
                onChange={(e) => handleInputChange('bank_name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., HDFC Bank"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch Name
              </label>
              <input
                type="text"
                value={formData.bank_branch}
                onChange={(e) => handleInputChange('bank_branch', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Branch Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IFSC Code
              </label>
              <input
                type="text"
                value={formData.bank_ifsc}
                onChange={(e) => handleInputChange('bank_ifsc', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="HDFC0001234"
                required
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.website_url}
                onChange={(e) => handleInputChange('website_url', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://yourcompany.com"
              />
              <p className="text-sm text-gray-500 mt-2">Optional: Enter your company website</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-bold text-lg">V</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Business Signup</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep > step.id
                          ? 'bg-emerald-600 text-white'
                          : currentStep === step.id
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                    </div>
                    <span
                      className={`text-xs mt-2 text-center hidden md:block ${
                        currentStep === step.id ? 'text-blue-600 font-semibold' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all ${
                        currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isCompleted ? 'All Set!' : steps[currentStep - 1].name}
            </h3>
            {currentStep === 1 && !isCompleted && (
              <p className="text-gray-600">
                Verification of email is mandatory for setting up your account.
              </p>
            )}
          </div>

          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          {!isCompleted ? (
            <>
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Previous
              </button>
              <div className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </div>
              <button
                onClick={handleNext}
                disabled={loading || (currentStep === 1 && !formData.email_verified)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  loading || (currentStep === 1 && !formData.email_verified)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? 'Saving...' : currentStep === 7 ? 'Complete Signup' : 'Next'}
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg font-semibold bg-[#24cb71] text-white hover:bg-[#24cb71]"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}