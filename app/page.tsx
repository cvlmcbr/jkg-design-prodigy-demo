'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smartphone, 
  Monitor, 
  Users, 
  Brain,
  MessageCircle,
  CreditCard,
  BarChart3,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react'
import DemoNavigation from '@/components/DemoNavigation'
import ClientOnboardingDemo from '@/components/demos/ClientOnboardingDemo'
import ProjectDashboardDemo from '@/components/demos/ProjectDashboardDemo'
import AssetReviewDemo from '@/components/demos/AssetReviewDemo'
import CRMDashboardDemo from '@/components/demos/CRMDashboardDemo'
import AIFeaturesDemo from '@/components/demos/AIFeaturesDemo'

type DemoSection = 'overview' | 'onboarding' | 'dashboard' | 'assets' | 'crm' | 'ai'

const features = [
  {
    icon: Globe,
    title: 'East African Optimization',
    description: 'Built specifically for Uganda, Kenya, and Tanzania markets with cultural adaptations'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Optimized for smartphones with offline functionality and 2G/3G networks'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Integration',
    description: 'Native WhatsApp Business API for familiar client communication'
  },
  {
    icon: CreditCard,
    title: 'Mobile Money Payments',
    description: 'MTN, Airtel, Tigo integration with transparent fee structures'
  },
  {
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Smart brief generation, predictive analytics, and automated workflows'
  },
  {
    icon: BarChart3,
    title: 'Hospital-Grade Analytics',
    description: 'Real-time performance monitoring with predictive insights'
  }
]

const stats = [
  { label: 'Reduction in Admin Time', value: '40%' },
  { label: 'Faster Client Response', value: '60%' },
  { label: 'Quicker Payment Collection', value: '50%' },
  { label: 'System Uptime Target', value: '99.9%' }
]

export default function DemoHome() {
  const [currentDemo, setCurrentDemo] = useState<DemoSection>('overview')

  return (
    <div className="min-h-screen bg-white">
      <DemoNavigation currentDemo={currentDemo} setCurrentDemo={setCurrentDemo} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentDemo === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container-africa py-20"
            >
              {/* Hero Section */}
              <div className="text-center mb-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <div className="inline-flex items-center px-6 py-3 bg-secondary-100 border border-secondary-200 rounded-lg text-secondary-700 text-sm font-medium mb-8">
                    <Zap className="w-4 h-4 mr-2" />
                    Interactive Demo Suite
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-secondary-900 mb-8 leading-tight">
                    Professional Creative
                    <span className="block text-primary-500">
                      Management Platform
                    </span>
                  </h1>
                  
                  <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed mb-12">
                    Experience JKG Design Prodigy's comprehensive client management and CRM suite. 
                    Professional-grade tools designed for modern creative agencies.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <button
                    onClick={() => setCurrentDemo('onboarding')}
                    className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-lg transition-all duration-300 flex items-center shadow-sm hover:shadow-md"
                  >
                    Start Interactive Demo
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="px-8 py-4 bg-white hover:bg-secondary-50 text-secondary-700 rounded-lg font-medium text-lg transition-all duration-300 border border-secondary-200 hover:border-secondary-300">
                    View Features Overview
                  </button>
                </motion.div>
              </div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-white border border-secondary-200 rounded-lg">
                    <div className="text-3xl md:text-4xl font-display font-bold text-primary-500 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-secondary-600 text-sm md:text-base font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-24"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-secondary-900 mb-16">
                  Professional Creative Management
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="group p-8 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary-50 rounded-lg">
                          <feature.icon className="w-6 h-6 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-secondary-900 mb-3 text-lg">
                            {feature.title}
                          </h3>
                          <p className="text-secondary-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Demo Sections Preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-24"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-secondary-900 mb-16">
                  Interactive Demo Components
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      id: 'onboarding',
                      icon: Users,
                      title: 'Client Onboarding',
                      description: 'Streamlined client intake with smart questionnaires'
                    },
                    {
                      id: 'dashboard',
                      icon: Monitor,
                      title: 'Project Dashboard',
                      description: 'Real-time progress tracking with clear visualizations'
                    },
                    {
                      id: 'assets',
                      icon: CheckCircle2,
                      title: 'Asset Review',
                      description: 'Efficient approval workflow with feedback system'
                    },
                    {
                      id: 'crm',
                      icon: BarChart3,
                      title: 'CRM Dashboard',
                      description: 'Comprehensive lead management and analytics'
                    }
                  ].map((demo) => (
                    <motion.button
                      key={demo.id}
                      onClick={() => setCurrentDemo(demo.id as DemoSection)}
                      className="group p-8 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 text-left"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="inline-flex p-3 rounded-lg bg-primary-50 mb-6">
                        <demo.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      
                      <h3 className="font-semibold text-secondary-900 text-xl mb-3 group-hover:text-primary-500 transition-colors">
                        {demo.title}
                      </h3>
                      
                      <p className="text-secondary-600 mb-6 leading-relaxed">
                        {demo.description}
                      </p>
                      
                      <div className="flex items-center text-primary-500 font-medium">
                        Try Interactive Demo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-center bg-secondary-50 rounded-lg p-12 border border-secondary-200"
              >
                <div className="flex justify-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-primary-500 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl font-medium text-secondary-900 mb-8 leading-relaxed max-w-4xl mx-auto">
                  "Professional-grade creative management platform with the sophistication 
                  that world-class agencies demand."
                </blockquote>
                
                <div className="text-secondary-600 font-medium">
                  — Designed for modern creative professionals
                </div>
              </motion.div>
            </motion.div>
          )}

          {currentDemo === 'onboarding' && (
            <ClientOnboardingDemo key="onboarding" />
          )}

          {currentDemo === 'dashboard' && (
            <ProjectDashboardDemo key="dashboard" />
          )}

          {currentDemo === 'assets' && (
            <AssetReviewDemo key="assets" />
          )}

          {currentDemo === 'crm' && (
            <CRMDashboardDemo key="crm" />
          )}

          {currentDemo === 'ai' && (
            <AIFeaturesDemo key="ai" />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}