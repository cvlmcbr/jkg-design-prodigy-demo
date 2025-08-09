'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles,
  ArrowRight,
  Palette,
  Smartphone,
  Brain,
  Megaphone,
  Star,
  ChevronRight,
  Play,
  Zap,
  Layers,
  TrendingUp,
  Users,
  Monitor,
  CheckCircle2,
  BarChart3
} from 'lucide-react'
import DemoNavigation from '@/components/DemoNavigation'
import ClientOnboardingDemo from '@/components/demos/ClientOnboardingDemo'
import ProjectDashboardDemo from '@/components/demos/ProjectDashboardDemo'
import AssetReviewDemo from '@/components/demos/AssetReviewDemo'
import CRMDashboardDemo from '@/components/demos/CRMDashboardDemo'
import AIFeaturesDemo from '@/components/demos/AIFeaturesDemo'

type DemoSection = 'overview' | 'onboarding' | 'dashboard' | 'assets' | 'crm' | 'ai'

export default function DemoHome() {
  const [currentDemo, setCurrentDemo] = useState<DemoSection>('overview')
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: Palette,
      title: 'Branding',
      description: 'Crafting unique brand identities that resonate with your audience',
      color: 'from-primary-500 to-primary-700'
    },
    {
      icon: Smartphone,
      title: 'Social Media',
      description: 'Engaging content that drives conversations and builds communities',
      color: 'from-coral-400 to-coral-600'
    },
    {
      icon: Brain,
      title: 'AI Automation',
      description: 'Cutting-edge AI tools to streamline your creative workflow',
      color: 'from-lime-400 to-lime-600'
    },
    {
      icon: Megaphone,
      title: 'Advertising',
      description: 'Strategic campaigns that convert attention into action',
      color: 'from-secondary-400 to-secondary-600'
    }
  ]

  const portfolioItems = [
    {
      title: 'Brand Evolution',
      client: 'Tech Startup',
      image: 'bg-gradient-to-br from-primary-400 to-secondary-500',
      tags: ['Branding', 'Strategy']
    },
    {
      title: 'Social Campaign',
      client: 'Fashion Brand',
      image: 'bg-gradient-to-br from-coral-400 to-pink-500',
      tags: ['Social Media', 'Content']
    },
    {
      title: 'AI Integration',
      client: 'E-commerce Platform',
      image: 'bg-gradient-to-br from-lime-400 to-green-500',
      tags: ['AI', 'Automation']
    },
    {
      title: 'Digital Campaign',
      client: 'Finance App',
      image: 'bg-gradient-to-br from-secondary-400 to-primary-500',
      tags: ['Advertising', 'Digital']
    },
    {
      title: 'Visual Identity',
      client: 'Restaurant Chain',
      image: 'bg-gradient-to-br from-purple-400 to-pink-500',
      tags: ['Branding', 'Design']
    },
    {
      title: 'Content Strategy',
      client: 'Healthcare Provider',
      image: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      tags: ['Strategy', 'Content']
    }
  ]

  const testimonials = [
    {
      quote: "JKG Design Prodigy transformed our brand from invisible to unforgettable. Their creative vision is unmatched!",
      author: "Sarah Chen",
      role: "CEO, TechVentures",
      rating: 5
    },
    {
      quote: "The AI automation tools they implemented saved us 30 hours per week. Game-changing for our team!",
      author: "Michael Okonkwo",
      role: "Marketing Director, AfricaHub",
      rating: 5
    },
    {
      quote: "Their social media strategy doubled our engagement in just 2 months. Incredible results!",
      author: "Emma Watson",
      role: "Founder, EcoStyle",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <DemoNavigation currentDemo={currentDemo} setCurrentDemo={setCurrentDemo} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentDemo === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section with Bold Graphics */}
              <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-coral-500 opacity-90">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                </div>
                
                {/* Floating Shapes Animation */}
                <motion.div
                  className="absolute top-20 left-10 w-64 h-64 bg-lime-400 rounded-full opacity-20 blur-3xl"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-10 w-96 h-96 bg-coral-400 rounded-full opacity-20 blur-3xl"
                  animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Hero Content */}
                <div className="relative z-10 container-africa text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Where Creativity Meets Innovation
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
                      Crafting Brands That
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-coral-300">
                        Speak Volumes
                      </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                      Transform your vision into reality with cutting-edge design, 
                      AI-powered automation, and creative excellence that drives results.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                      <motion.button
                        onClick={() => setCurrentDemo('onboarding')}
                        className="group px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg transition-all duration-300 flex items-center shadow-2xl hover:shadow-3xl hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Experience Our Platform
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                      </motion.button>
                      
                      <motion.button
                        className="group px-10 py-5 bg-transparent border-2 border-white/50 text-white rounded-full font-bold text-lg transition-all duration-300 flex items-center hover:bg-white/10 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-5 h-5 mr-3" />
                        Watch Demo Reel
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                  </div>
                </motion.div>
              </section>

              {/* Services Snapshot Section */}
              <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="container-africa">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                      Services That Drive
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-coral-500"> Success</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      From brand strategy to AI automation, we deliver comprehensive creative solutions
                    </p>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        <div className="h-full p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-full`}></div>
                          
                          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
                            <service.icon className="w-8 h-8 text-white" />
                          </div>
                          
                          <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                            {service.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          
                          <button className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                            Learn More
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Portfolio Preview Section */}
              <section className="py-24 bg-gray-50">
                <div className="container-africa">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                      Work That
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-lime-500"> Inspires</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      Explore our portfolio of transformative creative projects
                    </p>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                      >
                        <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
                          <div className={`absolute inset-0 ${item.image}`}></div>
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                              <h3 className="text-2xl font-display font-bold text-white mb-2">
                                {item.title}
                              </h3>
                              <p className="text-white/80 mb-4">{item.client}</p>
                              <div className="flex gap-2">
                                {item.tags.map((tag, i) => (
                                  <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* View Project Icon */}
                          <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <ArrowRight className="w-5 h-5 text-gray-900" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-12">
                    <motion.button
                      className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Full Portfolio
                    </motion.button>
                  </div>
                </div>
              </section>

              {/* CRM Demo Preview Section */}
              <section className="py-24 bg-white">
                <div className="container-africa">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                  >
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-coral-100 rounded-full text-primary-700 text-sm font-medium mb-6">
                      <Zap className="w-4 h-4 mr-2" />
                      Revolutionary CRM Platform
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                      Manage Projects Like
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-lime-500"> Never Before</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Experience our cutting-edge client management system with AI-powered insights, 
                      real-time collaboration, and seamless workflow automation
                    </p>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="space-y-6">
                        {[
                          {
                            icon: Users,
                            title: 'Smart Client Onboarding',
                            description: 'AI-powered questionnaires that adapt to your client\'s needs'
                          },
                          {
                            icon: Monitor,
                            title: 'Real-Time Project Dashboard',
                            description: 'Track progress, deadlines, and team collaboration in one place'
                          },
                          {
                            icon: CheckCircle2,
                            title: 'Streamlined Asset Review',
                            description: 'Get feedback and approvals faster with our intuitive review system'
                          },
                          {
                            icon: BarChart3,
                            title: 'Advanced Analytics',
                            description: 'Make data-driven decisions with comprehensive insights'
                          }
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-4 group cursor-pointer"
                            onClick={() => setCurrentDemo(
                              index === 0 ? 'onboarding' : 
                              index === 1 ? 'dashboard' : 
                              index === 2 ? 'assets' : 'crm'
                            )}
                          >
                            <div className="p-3 bg-gradient-to-br from-primary-100 to-coral-100 rounded-xl group-hover:scale-110 transition-transform">
                              <feature.icon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {feature.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.button
                        onClick={() => setCurrentDemo('onboarding')}
                        className="mt-10 px-8 py-4 bg-gradient-to-r from-coral-500 to-primary-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Try Interactive Demo
                        <ArrowRight className="w-5 h-5 ml-3" />
                      </motion.button>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="relative h-[600px] bg-gradient-to-br from-primary-100 via-coral-50 to-lime-100 rounded-3xl p-8 shadow-2xl">
                        {/* Mockup Dashboard Preview */}
                        <div className="h-full bg-white rounded-2xl shadow-inner p-6 overflow-hidden">
                          <div className="flex items-center space-x-2 mb-6">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="h-8 bg-gradient-to-r from-primary-200 to-coral-200 rounded-lg animate-pulse"></div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-24 bg-gradient-to-br from-lime-100 to-lime-200 rounded-lg animate-pulse"></div>
                              <div className="h-24 bg-gradient-to-br from-coral-100 to-coral-200 rounded-lg animate-pulse"></div>
                              <div className="h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg animate-pulse"></div>
                            </div>
                            <div className="h-40 bg-gradient-to-r from-secondary-100 to-primary-100 rounded-lg animate-pulse"></div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="h-32 bg-gradient-to-br from-coral-100 to-lime-100 rounded-lg animate-pulse"></div>
                              <div className="h-32 bg-gradient-to-br from-primary-100 to-coral-100 rounded-lg animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <motion.div
                          className="absolute -top-4 -right-4 w-20 h-20 bg-lime-400 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold"
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          AI
                        </motion.div>
                        
                        <motion.div
                          className="absolute -bottom-4 -left-4 w-24 h-24 bg-coral-500 rounded-full shadow-xl flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <TrendingUp className="w-10 h-10 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Testimonials Section */}
              <section className="py-24 bg-gradient-to-br from-primary-50 via-coral-50 to-lime-50">
                <div className="container-africa">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                      Clients Who
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-coral-500"> Love Our Work</span>
                    </h2>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-8 rounded-3xl shadow-xl"
                      >
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div>
                          <div className="font-display font-bold text-gray-900">
                            {testimonial.author}
                          </div>
                          <div className="text-gray-600">
                            {testimonial.role}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-24 bg-gradient-to-r from-primary-600 via-secondary-600 to-coral-600">
                <div className="container-africa text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                      Ready to Transform Your Brand?
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                      Join hundreds of successful brands that have elevated their creative game with JKG Design Prodigy
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <motion.button
                        onClick={() => setCurrentDemo('onboarding')}
                        className="px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Your Journey
                      </motion.button>
                      
                      <motion.button
                        className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book a Consultation
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </section>
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