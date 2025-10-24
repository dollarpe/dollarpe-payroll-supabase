import { useState } from 'react';
import { X, Check, CheckCircle2, Mail } from 'lucide-react';
import { supabase, BusinessSignup, isSupabaseConfigured } from '../lib/supabase';

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
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  if (!isOpen) return null;

  const handleInputChange = (field: keyof BusinessSignup, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Live-clear error for the field
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[field as string];
      return copy;
    });
  };

  const validateEmail = (email: string) => {
    if (!email || !email.trim()) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address.';
    return '';
  };

  const handleVerifyExisting = async (email: string) => {
    if (!isSupabaseConfigured) {
      return { existing: false, data: null };
    }
    try {
      const { data, error } = await supabase
        .from('business_signups')
        .select('*')
        .eq('email', email)
        .order('updated_at', { ascending: false })
        .limit(1);
      if (error) {
        console.error('Supabase lookup error:', error);
        return { existing: false, data: null };
      }
      const record = Array.isArray(data) && data.length > 0 ? (data as any)[0] : null;
      return { existing: Boolean(record), data: record };
    } catch (e) {
      console.error('Lookup exception:', e);
      return { existing: false, data: null };
    }
  };

  const handleVerifyEmail = async () => {
    const emailError = validateEmail(formData.email || '');
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      return;
    }

    // Optionally, you could trigger a real verification (send OTP/email); here we mark verified and save progress
    try {
      setLoading(true);
      // First, check if this email already has a submitted signup
      const { existing, data } = await handleVerifyExisting(formData.email);
      if (existing && data) {
        setSignupId(data.id);
        setFormData(prev => ({ ...prev, ...data, email_verified: true }));
        // Show the success page directly when a record exists
        setIsCompleted(true);
        setCurrentStep(7);
        return;
      }

      // Not existing: mark verified and save progress
      await saveProgress(currentStep);
      setFormData(prev => ({ ...prev, email_verified: true }));
    } catch (err) {
      console.error('Verification save/lookup failed', err);
      setErrors(prev => ({ ...prev, email: 'Failed to verify email. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const validateIndianMobile = (raw: string) => {
    const input = raw || '';
    const digitsOnly = input.replace(/[^0-9]/g, '');
    let digits = digitsOnly;

    // If user included country code like '91' or '+91' or a leading 0, strip common prefixes to get last 10 digits
    if (digits.length > 10) {
      // If user included a leading 0 or country code (e.g., 091, 91, +91), normalize by taking the last 10 digits
      if (digits.length === 11 && digits.startsWith('0')) {
        digits = digits.slice(1);
      } else if (digits.length > 10) {
        digits = digits.slice(digits.length - 10);
      }
    }

    if (!digits) return 'Mobile number is required.';
    if (!/^[6-9][0-9]{9}$/.test(digits)) return 'Please enter a valid 10-digit Indian mobile number starting with 6-9.';
    return '';
  };

  const validatePAN = (pan: string) => {
    if (!pan || !pan.trim()) return 'PAN is required.';
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
    if (!panRegex.test(pan.trim())) return 'Please enter a valid PAN (e.g., ABCDE1234F).';
    return '';
  };

  const validateIFSC = (ifscRaw: string) => {
    const ifsc = (ifscRaw || '').replace(/\s+/g, '').toUpperCase();
    if (!ifsc) return 'IFSC is required.';
    // IFSC format: 11 chars, 4 letters, 0, 6 alphanumeric (e.g., HDFC0001234)
    const ifscRegex = /^[A-Z]{4}0[0-9A-Z]{6}$/i;
    if (!ifscRegex.test(ifsc)) return 'Please enter a valid IFSC (e.g., HDFC0001234).';
    return '';
  };

  const validateCIN = (cin: string) => {
    if (!cin || !cin.trim()) return '';
    const c = cin.trim().toUpperCase();
    // CIN: 21 characters alphanumeric, format: [A-Z][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}
    // A loose regex to match typical CIN patterns (company identification number)
    const cinRegex = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
    if (!cinRegex.test(c)) return 'Please enter a valid CIN (21 chars).';
    return '';
  };

  const validateGSTIN = (gstin: string) => {
    if (!gstin || !gstin.trim()) return '';
    const g = gstin.trim().toUpperCase();
    // GSTIN: 15 chars. Pattern: 2 digit state code, 10 char PAN, 1 entity code, 1 Z, 1 checksum
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
    if (!gstRegex.test(g)) return 'Please enter a valid GSTIN (15 chars).';
    return '';
  };

  const validateWebsite = (raw: string) => {
    const v = (raw || '').trim();
    if (!v) return '';
    // Allow users to enter without protocol (e.g., example.com) by prepending https for validation
    const candidate = /^https?:\/\//i.test(v) ? v : `https://${v}`;
    try {
      const url = new URL(candidate);
      if (!(url.protocol === 'http:' || url.protocol === 'https:')) {
        return 'Please use http or https URL.';
      }
      // Basic host check
      if (!url.hostname || !url.hostname.includes('.')) return 'Please enter a valid website URL.';
      return '';
    } catch (err) {
      return 'Please enter a valid website URL (e.g., https://yourcompany.com).';
    }
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
    if (currentStep === 1) {
      // Validate email before proceeding
      const emailError = validateEmail(formData.email);
      if (emailError) {
        setErrors(prev => ({ ...prev, email: emailError }));
        return;
      }

      if (!formData.email_verified) {
        // Save progress and mark verified on Next flow
        await saveProgress();
        setFormData(prev => ({ ...prev, email_verified: true }));
      }
    }
    // Validate PAN on step 2
    // Validate required fields on step 3 (Business Details)
    if (currentStep === 3) {
      const name = (formData.business_name || '').trim();
      const type = (formData.business_type || '').trim();
      const address = (formData.business_address || '').trim();
      if (!name) {
        setErrors(prev => ({ ...prev, business_name: 'Business name is required.' }));
        return;
      }
      if (!type) {
        setErrors(prev => ({ ...prev, business_type: 'Business type is required.' }));
        return;
      }
      if (!address) {
        setErrors(prev => ({ ...prev, business_address: 'Business address is required.' }));
        return;
      }
    }
    if (currentStep === 2) {
      const panError = validatePAN(formData.business_pan || '');
      if (panError) {
        setErrors(prev => ({ ...prev, business_pan: panError }));
        return;
      }
    }
    // Validate registration number (CIN or GSTIN) on step 4
    if (currentStep === 4) {
      const reg = formData.business_registration_number || '';
      const cinErr = validateCIN(reg);
      const gstErr = validateGSTIN(reg);
      if (!reg.trim()) {
        setErrors(prev => ({ ...prev, business_registration_number: 'Registration number is required.' }));
        return;
      }
      // Accept either valid CIN or valid GSTIN
      if (cinErr && gstErr) {
        setErrors(prev => ({ ...prev, business_registration_number: 'Please enter a valid CIN (21 chars) or GSTIN (15 chars).' }));
        return;
      }
    }

    // Validate authorised signatory contact on step 5
    if (currentStep === 5) {
      const phoneError = validateIndianMobile(formData.authorized_signatory_contact || '');
      if (phoneError) {
        setErrors(prev => ({ ...prev, authorized_signatory_contact: phoneError }));
        return;
      }
    }

    // Validate IFSC on step 6
    if (currentStep === 6) {
      const ifscError = validateIFSC(formData.bank_ifsc || '');
      if (ifscError) {
        setErrors(prev => ({ ...prev, bank_ifsc: ifscError }));
        return;
      }
      // Other required bank fields
      const acct = (formData.bank_account_number || '').trim();
      const bname = (formData.bank_name || '').trim();
      const branch = (formData.bank_branch || '').trim();
      if (!acct) {
        setErrors(prev => ({ ...prev, bank_account_number: 'Bank account number is required.' }));
        return;
      }
      if (!bname) {
        setErrors(prev => ({ ...prev, bank_name: 'Bank name is required.' }));
        return;
      }
      if (!branch) {
        setErrors(prev => ({ ...prev, bank_branch: 'Bank branch is required.' }));
        return;
      }
    }

    // Validate Website URL on step 7 (optional but must be valid if provided)
    if (currentStep === 7) {
      const webErr = validateWebsite(formData.website_url || '');
      if (webErr) {
        setErrors(prev => ({ ...prev, website_url: webErr }));
        return;
      }
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
          <div className="inline-flex items-center space-x-2 text-gray-700 mb-6">
            <Mail className="w-5 h-5" />
            <span>
              For queries, email <a href="mailto:support@dollarpe.xyz" className="text-[#24cb71] underline">support@dollarpe.xyz</a>
            </span>
          </div>
          {/* Show submitted details */}
          <div className="text-left mx-auto max-w-xl bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Submitted Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div><span className="font-medium">Email:</span> {formData.email}</div>
              {formData.business_name && <div><span className="font-medium">Business Name:</span> {formData.business_name}</div>}
              {formData.business_pan && <div><span className="font-medium">Business PAN:</span> {formData.business_pan}</div>}
              {formData.business_type && <div><span className="font-medium">Business Type:</span> {formData.business_type}</div>}
              {formData.business_address && <div className="md:col-span-2"><span className="font-medium">Address:</span> {formData.business_address}</div>}
              {formData.business_registration_number && <div><span className="font-medium">Registration No.:</span> {formData.business_registration_number}</div>}
              {formData.authorized_signatory_name && <div><span className="font-medium">Signatory:</span> {formData.authorized_signatory_name}</div>}
              {formData.authorized_signatory_contact && <div><span className="font-medium">Contact:</span> {formData.authorized_signatory_contact}</div>}
              {formData.bank_name && <div><span className="font-medium">Bank:</span> {formData.bank_name}</div>}
              {formData.bank_branch && <div><span className="font-medium">Branch:</span> {formData.bank_branch}</div>}
              {formData.bank_ifsc && <div><span className="font-medium">IFSC:</span> {formData.bank_ifsc}</div>}
              {formData.website_url && <div className="md:col-span-2"><span className="font-medium">Website:</span> {formData.website_url}</div>}
            </div>
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
              {errors.email ? <p className="text-rose-600 text-sm mt-1">{errors.email}</p> : null}
            </div>
            <button
              onClick={handleVerifyEmail}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              disabled={loading}
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
              {errors.business_pan ? <p className="text-rose-600 text-sm mt-1">{errors.business_pan}</p> : null}
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
              {errors.business_name ? <p className="text-rose-600 text-sm mt-1">{errors.business_name}</p> : null}
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
              {errors.business_type ? <p className="text-rose-600 text-sm mt-1">{errors.business_type}</p> : null}
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
              {errors.business_address ? <p className="text-rose-600 text-sm mt-1">{errors.business_address}</p> : null}
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
              {errors.business_registration_number ? <p className="text-rose-600 text-sm mt-1">{errors.business_registration_number}</p> : null}
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
              {errors.authorized_signatory_contact ? <p className="text-rose-600 text-sm mt-1">{errors.authorized_signatory_contact}</p> : null}
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
              {errors.bank_account_number ? <p className="text-rose-600 text-sm mt-1">{errors.bank_account_number}</p> : null}
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
              {errors.bank_name ? <p className="text-rose-600 text-sm mt-1">{errors.bank_name}</p> : null}
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
              {errors.bank_branch ? <p className="text-rose-600 text-sm mt-1">{errors.bank_branch}</p> : null}
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
              {errors.bank_ifsc ? <p className="text-rose-600 text-sm mt-1">{errors.bank_ifsc}</p> : null}
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
              {errors.website_url ? <p className="text-rose-600 text-sm mt-1">{errors.website_url}</p> : null}
              <p className="text-sm text-gray-500 mt-2">Optional: Enter your company website</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
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

  <div className="p-6 overflow-auto flex-1">
          <div className="mb-8">
            <div className="flex items-start justify-between gap-7 mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="h-full flex items-start">
                  <div className={`relative flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
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
                  {/* {index < steps.length - 1 && (
                    <div
                      className={`h-1 mt-5 flex-1 mx-1 rounded transition-all ${
                        currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    />
                  )} */}
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

  <div className="p-6 border-t border-gray-200 flex justify-between items-center bg-gray-50 flex-shrink-0">
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