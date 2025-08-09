'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Users, 
  Monitor, 
  CheckCircle2, 
  BarChart3, 
  Brain,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react'

type DemoSection = 'overview' | 'onboarding' | 'dashboard' | 'assets' | 'crm' | 'ai'

interface DemoNavigationProps {
  currentDemo: DemoSection
  setCurrentDemo: (demo: DemoSection) => void
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'onboarding', label: 'Client Onboarding', icon: Users },
  { id: 'dashboard', label: 'Project Dashboard', icon: Monitor },
  { id: 'assets', label: 'Asset Review', icon: CheckCircle2 },
  { id: 'crm', label: 'CRM Dashboard', icon: BarChart3 },
  { id: 'ai', label: 'AI Features', icon: Brain },
]

export default function DemoNavigation({ currentDemo, setCurrentDemo }: DemoNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (demo: DemoSection) => {
    setCurrentDemo(demo)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
        <div className="container-africa">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">JKG</span>
              </div>
              <div>
                <div className="font-display font-bold text-gray-900 text-lg">
                  JKG Design Prodigy
                </div>
                <div className="text-sm text-gray-500 -mt-1">
                  Interactive Demo Suite
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const isActive = currentDemo === item.id
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as DemoSection)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : ''}`} />
                    <span>{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary-100 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Back to Overview / Mobile Menu */}
            <div className="flex items-center space-x-4">
              {currentDemo !== 'overview' && (
                <button
                  onClick={() => setCurrentDemo('overview')}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Overview</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 overflow-hidden"
      >
        <div className="container-africa py-4">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => {
              const isActive = currentDemo === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as DemoSection)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
            
            {currentDemo !== 'overview' && (
              <div className="pt-2 mt-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    setCurrentDemo('overview')
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 w-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Overview</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Demo Section Breadcrumb */}
      {currentDemo !== 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 right-0 z-30 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-primary-100"
        >
          <div className="container-africa py-3">
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => setCurrentDemo('overview')}
                className="text-primary-600 hover:text-primary-800 transition-colors"
              >
                Demo Overview
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-700 font-medium">
                {navItems.find(item => item.id === currentDemo)?.label}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}