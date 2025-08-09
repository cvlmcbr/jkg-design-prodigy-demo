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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DemoNavigation currentDemo={currentDemo} setCurrentDemo={setCurrentDemo} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentDemo === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container-africa py-16"
            >
              {/* Hero Section */}
              <div className="text-center mb-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
                    <Zap className="w-4 h-4 mr-2" />
                    Live Interactive Demo
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-6">
                    The Future of
                    <span className="block bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                      Creative Management
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Experience JKG Design Prodigy's revolutionary client app and CRM suite. 
                    Built specifically for East African markets with hospital-grade reliability 
                    and world-class user experience.
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
                    className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
                  >
                    Start Interactive Demo
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl font-semibold text-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
                    View Features Overview
                  </button>
                </motion.div>
              </div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm md:text-base">
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
                className="mb-20"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-900 mb-12">
                  Built for East African Excellence
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors">
                          <feature.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
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
                className="mb-20"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-900 mb-12">
                  Explore Interactive Demos
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      id: 'onboarding',
                      icon: Users,
                      title: 'Client Onboarding',
                      description: 'Cultural adaptation with smart questionnaires',
                      color: 'from-blue-500 to-indigo-600'
                    },
                    {
                      id: 'dashboard',
                      icon: Monitor,
                      title: 'Project Dashboard',
                      description: 'Real-time progress with beautiful visualizations',
                      color: 'from-purple-500 to-pink-600'
                    },
                    {
                      id: 'assets',
                      icon: CheckCircle2,
                      title: 'Asset Review',
                      description: 'Intuitive approval workflow with feedback',
                      color: 'from-green-500 to-teal-600'
                    },
                    {
                      id: 'crm',
                      icon: BarChart3,
                      title: 'CRM Dashboard',
                      description: 'Lead management with predictive analytics',
                      color: 'from-orange-500 to-red-600'
                    }
                  ].map((demo) => (
                    <motion.button
                      key={demo.id}
                      onClick={() => setCurrentDemo(demo.id as DemoSection)}
                      className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${demo.color} mb-4`}>
                        <demo.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 text-xl mb-2 group-hover:text-primary-600 transition-colors">
                        {demo.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {demo.description}
                      </p>
                      
                      <div className="flex items-center text-primary-600 font-medium">
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
                className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-12"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
                  "This system would make agencies like IDEO and Pentagram jealous. 
                  It's the future of creative agency management."
                </blockquote>
                
                <div className="text-gray-600">
                  — Based on analysis of world-class creative agencies
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