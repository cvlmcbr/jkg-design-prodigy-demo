'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Building2,
  Palette,
  Target,
  Clock,
  DollarSign,
  MessageCircle,
  Smartphone
} from 'lucide-react'
import toast from 'react-hot-toast'

interface OnboardingData {
  language: string
  location: string
  businessCulture: string
  companyName: string
  industry: string
  services: string[]
  budget: string
  timeline: string
  brandPersonality: string[]
  communicationStyle: string
  message: string
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇬' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'lg', name: 'Luganda', flag: '🇺🇬' }
]

const locations = [
  { code: 'uganda', name: 'Uganda', city: 'Kampala', flag: '🇺🇬' },
  { code: 'kenya', name: 'Kenya', city: 'Nairobi', flag: '🇰🇪' },
  { code: 'tanzania', name: 'Tanzania', city: 'Dar es Salaam', flag: '🇹🇿' },
  { code: 'rwanda', name: 'Rwanda', city: 'Kigali', flag: '🇷🇼' }
]

const businessCultures = [
  { 
    id: 'collaborative', 
    name: 'Collaborative Ubuntu Style',
    description: 'Community-focused decisions with stakeholder input'
  },
  { 
    id: 'hierarchical', 
    name: 'Respectful Hierarchy',
    description: 'Traditional respect for seniority and established processes'
  },
  { 
    id: 'innovative', 
    name: 'Innovation-Forward',
    description: 'Tech-savvy approach with modern business practices'
  }
]

const industries = [
  'Tourism & Hospitality', 'Food & Beverage', 'Technology', 'Healthcare',
  'Education', 'Finance', 'Retail', 'Manufacturing', 'Agriculture', 'Other'
]

const services = [
  { id: 'branding', name: 'Brand Identity', icon: '🎨' },
  { id: 'web', name: 'Web Design', icon: '🌐' },
  { id: 'print', name: 'Print Design', icon: '📄' },
  { id: 'social', name: 'Social Media', icon: '📱' },
  { id: 'packaging', name: 'Packaging', icon: '📦' },
  { id: 'photography', name: 'Photography', icon: '📸' }
]

const budgetRanges = [
  'Under $2,000', '$2,000 - $5,000', '$5,000 - $15,000', 
  '$15,000 - $50,000', '$50,000+', 'Let\'s discuss'
]

const timelines = [
  'ASAP (Rush fee applies)', '2-4 weeks', '1-2 months', 
  '3-6 months', '6+ months', 'Flexible'
]

const brandPersonalities = [
  { id: 'professional', name: 'Professional', emoji: '💼' },
  { id: 'creative', name: 'Creative', emoji: '🎨' },
  { id: 'friendly', name: 'Friendly', emoji: '😊' },
  { id: 'luxury', name: 'Luxury', emoji: '✨' },
  { id: 'traditional', name: 'Traditional', emoji: '🏛️' },
  { id: 'modern', name: 'Modern', emoji: '🚀' }
]

export default function ClientOnboardingDemo() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    language: 'en',
    location: 'uganda',
    businessCulture: '',
    companyName: '',
    industry: '',
    services: [],
    budget: '',
    timeline: '',
    brandPersonality: [],
    communicationStyle: '',
    message: ''
  })

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      toast.success('Step completed! Moving to next section.')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    toast.success('🎉 Onboarding completed! AI brief generation starting...', {
      duration: 5000
    })
    
    // Simulate AI processing
    setTimeout(() => {
      toast.success('✨ AI has generated your comprehensive project brief!', {
        duration: 6000
      })
    }, 3000)
  }

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayValue = (field: keyof OnboardingData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFormData(field, newArray)
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-white via-primary-50 to-coral-50">
      <div className="container-africa max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-coral-100 backdrop-blur-sm rounded-full text-primary-700 text-sm font-medium mb-6">
            <Smartphone className="w-4 h-4 mr-2" />
            AI-Powered Client Onboarding
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Welcome to Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-coral-500">
              Creative Journey
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our AI-enhanced onboarding process learns your unique needs and crafts 
            the perfect creative strategy for your brand.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-3 font-medium">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-coral-500 shadow-sm"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Onboarding Steps */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <AnimatePresence mode="wait">
            {/* Step 1: Language & Location */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-gradient-to-br from-primary-100 to-coral-100 rounded-2xl mr-4">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Let's Get to Know You
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Language Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Preferred Language
                    </label>
                    <div className="space-y-3">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => updateFormData('language', lang.code)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-3 hover:scale-[1.02] ${
                            formData.language === lang.code
                              ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-coral-50 text-primary-700 shadow-lg'
                              : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Business Location
                    </label>
                    <div className="space-y-3">
                      {locations.map((location) => (
                        <button
                          key={location.code}
                          onClick={() => updateFormData('location', location.code)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-3 hover:scale-[1.02] ${
                            formData.location === location.code
                              ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-coral-50 text-primary-700 shadow-lg'
                              : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-2xl">{location.flag}</span>
                          <div className="text-left">
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm opacity-70">{location.city}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Business Culture */}
                <div className="mt-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Business Culture Style
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {businessCultures.map((culture) => (
                      <button
                        key={culture.id}
                        onClick={() => updateFormData('businessCulture', culture.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-[1.02] ${
                          formData.businessCulture === culture.id
                            ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-coral-50 shadow-lg'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-2">
                          {culture.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {culture.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-secondary-100 to-lime-100 rounded-2xl mr-4">
                    <Building2 className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    About Your Business
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      placeholder="Enter your company name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg transition-all duration-300 hover:border-primary-300"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => updateFormData('industry', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg transition-all duration-300 hover:border-primary-300"
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Services Needed
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => toggleArrayValue('services', service.id)}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 hover:scale-105 ${
                            formData.services.includes(service.id)
                              ? 'border-lime-500 bg-gradient-to-br from-lime-50 to-primary-50 text-lime-700 shadow-lg'
                              : 'border-gray-200 hover:border-lime-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-2xl">{service.icon}</span>
                          <span className="font-medium text-sm">{service.name}</span>
                        </button>
                      ))}
                    </div>
                    {formData.services.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        Selected: {formData.services.length} service{formData.services.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Project Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-coral-100 to-primary-100 rounded-2xl mr-4">
                    <Target className="w-6 h-6 text-coral-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Project Scope
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Budget */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      <DollarSign className="w-5 h-5 inline mr-2" />
                      Budget Range
                    </label>
                    <div className="space-y-3">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          onClick={() => updateFormData('budget', range)}
                          className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left hover:scale-[1.02] ${
                            formData.budget === range
                              ? 'border-coral-500 bg-gradient-to-r from-coral-50 to-primary-50 text-coral-700 shadow-md'
                              : 'border-gray-200 hover:border-coral-300 hover:bg-gray-50'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      <Clock className="w-5 h-5 inline mr-2" />
                      Timeline
                    </label>
                    <div className="space-y-3">
                      {timelines.map((timeline) => (
                        <button
                          key={timeline}
                          onClick={() => updateFormData('timeline', timeline)}
                          className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left hover:scale-[1.02] ${
                            formData.timeline === timeline
                              ? 'border-secondary-500 bg-gradient-to-r from-secondary-50 to-primary-50 text-secondary-700 shadow-md'
                              : 'border-gray-200 hover:border-secondary-300 hover:bg-gray-50'
                          }`}
                        >
                          {timeline}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Brand Personality */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-lime-100 to-coral-100 rounded-2xl mr-4">
                    <Palette className="w-6 h-6 text-lime-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Brand Personality
                  </h2>
                </div>

                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Select personality traits that represent your brand
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {brandPersonalities.map((personality) => (
                      <button
                        key={personality.id}
                        onClick={() => toggleArrayValue('brandPersonality', personality.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 hover:scale-105 ${
                          formData.brandPersonality.includes(personality.id)
                            ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-lime-50 text-primary-700 shadow-lg'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-3xl">{personality.emoji}</span>
                        <span className="font-medium">{personality.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <MessageCircle className="w-5 h-5 inline mr-2" />
                    Communication Preference
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: 'whatsapp', name: 'WhatsApp Business', desc: 'Quick updates and file sharing' },
                      { id: 'email', name: 'Email Updates', desc: 'Formal communication with detailed reports' },
                      { id: 'calls', name: 'Regular Calls', desc: 'Weekly check-ins and milestone reviews' }
                    ].map((comm) => (
                      <button
                        key={comm.id}
                        onClick={() => updateFormData('communicationStyle', comm.id)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-[1.02] ${
                          formData.communicationStyle === comm.id
                            ? 'border-secondary-500 bg-gradient-to-r from-secondary-50 to-coral-50 shadow-md'
                            : 'border-gray-200 hover:border-secondary-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{comm.name}</div>
                        <div className="text-sm text-gray-600">{comm.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Final Message */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-lime-100 to-primary-100 rounded-2xl mr-4">
                    <CheckCircle2 className="w-6 h-6 text-lime-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Tell Us More
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Additional Details
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      placeholder="Share any specific goals, challenges, or inspiration for your project. The more details you provide, the better we can serve you!"
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg resize-none transition-all duration-300 hover:border-primary-300"
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-gradient-to-br from-primary-50 via-coral-50 to-lime-50 rounded-2xl p-6 border border-white/50">
                    <h3 className="font-semibold text-gray-900 mb-4">Project Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Location:</span> {
                          locations.find(l => l.code === formData.location)?.name || 'Not specified'
                        }
                      </div>
                      <div>
                        <span className="font-medium">Company:</span> {formData.companyName || 'Not specified'}
                      </div>
                      <div>
                        <span className="font-medium">Industry:</span> {formData.industry || 'Not specified'}
                      </div>
                      <div>
                        <span className="font-medium">Services:</span> {formData.services.length} selected
                      </div>
                      <div>
                        <span className="font-medium">Budget:</span> {formData.budget || 'Not specified'}
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span> {formData.timeline || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-primary-50 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-md'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-lime-500 to-coral-500 hover:from-lime-600 hover:to-coral-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Generate AI Brief</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}