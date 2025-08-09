'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Sparkles,
  MessageSquare,
  FileText,
  Palette,
  TrendingUp,
  Target,
  Lightbulb,
  Bot,
  Cpu,
  BarChart3,
  Clock,
  Play,
  RotateCcw,
  Download,
  Eye,
  Share2,
  Settings,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

interface AIFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: 'content' | 'design' | 'analytics' | 'automation'
  status: 'available' | 'beta' | 'coming-soon'
  complexity: 'simple' | 'advanced' | 'expert'
}

interface DemoResult {
  id: string
  type: 'text' | 'design' | 'analysis' | 'prediction'
  title: string
  content: string
  metadata?: {
    confidence: number
    processingTime: number
    suggestions: string[]
  }
}

const aiFeatures: AIFeature[] = [
  {
    id: 'brief-generator',
    title: 'Smart Brief Generator',
    description: 'Generate comprehensive creative briefs from simple client inputs using cultural intelligence',
    icon: FileText,
    category: 'content',
    status: 'available',
    complexity: 'simple'
  },
  {
    id: 'brand-personality',
    title: 'Brand Personality AI',
    description: 'Analyze and define brand personalities based on East African cultural values and market context',
    icon: Palette,
    category: 'design',
    status: 'available',
    complexity: 'advanced'
  },
  {
    id: 'content-optimizer',
    title: 'Cultural Content Optimizer',
    description: 'Optimize marketing content for local languages, cultural nuances, and regional preferences',
    icon: Target,
    category: 'content',
    status: 'available',
    complexity: 'advanced'
  },
  {
    id: 'trend-predictor',
    title: 'Market Trend Predictor',
    description: 'Predict design trends and consumer preferences specific to East African markets',
    icon: TrendingUp,
    category: 'analytics',
    status: 'beta',
    complexity: 'expert'
  },
  {
    id: 'whatsapp-assistant',
    title: 'WhatsApp Business AI',
    description: 'Automated client communication with cultural awareness and business context understanding',
    icon: MessageSquare,
    category: 'automation',
    status: 'available',
    complexity: 'simple'
  },
  {
    id: 'design-analyzer',
    title: 'Design Performance Analyzer',
    description: 'AI-powered analysis of design effectiveness across different East African demographics',
    icon: BarChart3,
    category: 'analytics',
    status: 'beta',
    complexity: 'advanced'
  },
  {
    id: 'project-predictor',
    title: 'Project Success Predictor',
    description: 'Predict project outcomes and identify potential risks using historical data and market insights',
    icon: Brain,
    category: 'analytics',
    status: 'available',
    complexity: 'expert'
  },
  {
    id: 'creative-ideator',
    title: 'Cultural Creative Ideator',
    description: 'Generate culturally relevant creative concepts and campaign ideas for local markets',
    icon: Lightbulb,
    category: 'design',
    status: 'coming-soon',
    complexity: 'advanced'
  }
]

const categoryColors = {
  content: 'from-blue-500 to-cyan-500',
  design: 'from-purple-500 to-pink-500',
  analytics: 'from-green-500 to-emerald-500',
  automation: 'from-orange-500 to-red-500'
}

const statusColors = {
  available: 'bg-green-100 text-green-700',
  beta: 'bg-yellow-100 text-yellow-700',
  'coming-soon': 'bg-gray-100 text-gray-700'
}

const complexityColors = {
  simple: 'bg-blue-100 text-blue-700',
  advanced: 'bg-purple-100 text-purple-700',
  expert: 'bg-red-100 text-red-700'
}

export default function AIFeaturesDemo() {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isProcessing, setIsProcessing] = useState(false)
  const [demoResults, setDemoResults] = useState<DemoResult[]>([])
  const [processingStep, setProcessingStep] = useState<string>('')

  const categories = [
    { id: 'all', label: 'All Features', icon: Sparkles },
    { id: 'content', label: 'Content AI', icon: FileText },
    { id: 'design', label: 'Design AI', icon: Palette },
    { id: 'analytics', label: 'Analytics AI', icon: BarChart3 },
    { id: 'automation', label: 'Automation AI', icon: Bot }
  ]

  const filteredFeatures = activeCategory === 'all' 
    ? aiFeatures 
    : aiFeatures.filter(feature => feature.category === activeCategory)

  const simulateAIProcessing = async (feature: AIFeature) => {
    setIsProcessing(true)
    setProcessingStep('Initializing AI models...')
    
    const steps = [
      'Loading cultural intelligence database...',
      'Analyzing market context...',
      'Processing with neural networks...',
      'Applying East African optimizations...',
      'Generating results...',
      'Quality validation complete!'
    ]

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i])
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    // Generate mock result based on feature type
    let result: DemoResult

    switch (feature.id) {
      case 'brief-generator':
        result = {
          id: Date.now().toString(),
          type: 'text',
          title: 'Generated Creative Brief',
          content: `**Project:** Kampala Coffee Co. Rebrand\n\n**Objective:** Create a modern, culturally authentic brand identity that honors Ugandan coffee heritage while appealing to urban millennials across East Africa.\n\n**Target Audience:** \n- Primary: Urban professionals 25-40 in Kampala, Nairobi, Dar es Salaam\n- Secondary: Coffee enthusiasts seeking authentic African experiences\n\n**Cultural Considerations:**\n- Incorporate traditional coffee ceremony elements\n- Use earth tones reflecting Ugandan landscapes\n- Respect for community and sharing values\n\n**Key Messages:**\n- "From our soil to your soul" - emphasizing origin and authenticity\n- Community-focused coffee experience\n- Pride in Ugandan heritage\n\n**Deliverables:** Logo, brand guidelines, packaging design, digital assets\n**Timeline:** 6-8 weeks\n**Budget Estimate:** $15,000 - $25,000`,
          metadata: {
            confidence: 94,
            processingTime: 1.2,
            suggestions: [
              'Consider adding Swahili tagline options',
              'Research local coffee ceremony traditions',
              'Plan focus groups in target cities'
            ]
          }
        }
        break
      
      case 'brand-personality':
        result = {
          id: Date.now().toString(),
          type: 'analysis',
          title: 'Brand Personality Analysis',
          content: `**Primary Personality Traits:**\n\n🏛️ **Traditional (35%)** - Rooted in heritage and cultural values\n🚀 **Innovative (28%)** - Forward-thinking and modern approach\n😊 **Friendly (22%)** - Warm, welcoming, community-focused\n✨ **Premium (15%)** - Quality-focused and aspirational\n\n**Cultural Alignment:**\n- **Ubuntu Philosophy**: Strong community focus resonates with East African values\n- **Heritage Pride**: Celebration of local traditions and craftsmanship\n- **Progressive Spirit**: Balance of tradition with modern innovation\n\n**Market Positioning:**\n- Position as "authentically progressive" - honoring roots while embracing future\n- Emphasize community impact and local sourcing\n- Target urban professionals who value cultural authenticity\n\n**Voice & Tone:**\n- Warm and welcoming like a traditional greeting\n- Confident but humble\n- Storytelling approach highlighting heritage`,
          metadata: {
            confidence: 89,
            processingTime: 2.1,
            suggestions: [
              'Test personality traits with focus groups',
              'Develop culture-specific messaging variants',
              'Create personality expression guidelines'
            ]
          }
        }
        break

      case 'trend-predictor':
        result = {
          id: Date.now().toString(),
          type: 'prediction',
          title: 'East African Design Trends 2025',
          content: `**Emerging Trends (Next 6 months):**\n\n📱 **Mobile-First Minimalism** (Confidence: 92%)\n- Clean interfaces optimized for smartphone usage\n- Bold typography for small screens\n- High contrast for outdoor visibility\n\n🌍 **Pan-African Color Stories** (Confidence: 87%)\n- Earth tones inspired by regional landscapes\n- Sunset oranges and sunrise golds\n- Traditional textile patterns in modern applications\n\n🤝 **Community-Centric Branding** (Confidence: 85%)\n- Ubuntu philosophy integration\n- Collective storytelling approaches\n- Social impact messaging\n\n**Market Drivers:**\n- Increased smartphone penetration (85% by Q3 2025)\n- Growing middle class purchasing power\n- Cultural pride movements\n- Environmental consciousness\n\n**Recommended Actions:**\n- Develop mobile-first design templates\n- Create cultural pattern libraries\n- Focus on authentic storytelling`,
          metadata: {
            confidence: 88,
            processingTime: 3.4,
            suggestions: [
              'Monitor social media trends weekly',
              'Survey target demographics monthly',
              'Track competitor adaptations'
            ]
          }
        }
        break

      default:
        result = {
          id: Date.now().toString(),
          type: 'text',
          title: `${feature.title} Results`,
          content: `AI analysis complete for ${feature.title}.\n\nThis feature demonstrates advanced AI capabilities specifically designed for East African creative markets, incorporating cultural intelligence and local market understanding.\n\n**Key Benefits:**\n- Cultural context awareness\n- Local market optimization\n- Multilingual support\n- Regional trend analysis\n\nReady for production deployment with comprehensive testing and validation.`,
          metadata: {
            confidence: 91,
            processingTime: 1.8,
            suggestions: [
              'Customize for specific market segments',
              'Integrate with existing workflows',
              'Schedule regular model updates'
            ]
          }
        }
    }

    setDemoResults(prev => [result, ...prev.slice(0, 4)]) // Keep last 5 results
    setIsProcessing(false)
    setProcessingStep('')
    
    toast.success(`🤖 ${feature.title} analysis complete! Results generated.`, {
      duration: 4000
    })
  }

  const demoScenarios = [
    {
      title: "Coffee Company Rebrand",
      description: "Watch AI generate a complete creative brief for a Ugandan coffee company",
      featureId: "brief-generator"
    },
    {
      title: "Fashion Brand Personality",
      description: "Analyze brand personality for a Kenyan fashion startup",
      featureId: "brand-personality"
    },
    {
      title: "2025 Design Trends",
      description: "Predict emerging design trends across East African markets",
      featureId: "trend-predictor"
    }
  ]

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-white via-primary-50 to-lime-50">
      <div className="container-africa">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-lime-100 backdrop-blur-sm rounded-full text-primary-700 text-sm font-medium mb-6">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Creative Intelligence
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Cultural AI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-lime-500">
              Features
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Advanced AI capabilities designed specifically for East African creative markets, 
            with cultural intelligence, local context understanding, and creative excellence.
          </p>

          {/* Quick Demo Scenarios */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {demoScenarios.map((scenario, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  const feature = aiFeatures.find(f => f.id === scenario.featureId)
                  if (feature) {
                    setSelectedFeature(feature)
                    simulateAIProcessing(feature)
                  }
                }}
                disabled={isProcessing}
                className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center shadow-lg hover:shadow-xl ${
                  isProcessing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4 mr-2" />
                {scenario.title}
              </motion.button>
            ))}
          </div>

          {/* Processing Indicator */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Cpu className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">AI Processing...</div>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">{processingStep}</div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 4.8, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-white text-purple-700 shadow-lg border-2 border-purple-200'
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* AI Features Grid */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {filteredFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-purple-200"
                  >
                    {/* Feature Header */}
                    <div className={`h-24 bg-gradient-to-r ${categoryColors[feature.category]} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[feature.status]}`}>
                          {feature.status === 'coming-soon' ? 'Coming Soon' : feature.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Feature Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Feature Metadata */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${complexityColors[feature.complexity]}`}>
                          {feature.complexity.charAt(0).toUpperCase() + feature.complexity.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {feature.category} AI
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            if (feature.status === 'available' || feature.status === 'beta') {
                              setSelectedFeature(feature)
                              simulateAIProcessing(feature)
                            } else {
                              toast('🚧 Feature coming soon! Join our waitlist for early access.', {
                                duration: 3000
                              })
                            }
                          }}
                          disabled={isProcessing || feature.status === 'coming-soon'}
                          className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                            feature.status === 'coming-soon'
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : isProcessing
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
                          }`}
                        >
                          {feature.status === 'coming-soon' ? (
                            <Clock className="w-4 h-4 mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {feature.status === 'coming-soon' ? 'Coming Soon' : 'Try Demo'}
                        </button>
                        
                        <button
                          onClick={() => toast('📚 Feature documentation opened!', { duration: 2000 })}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="sticky top-32"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">AI Results</h3>
                  <div className="text-sm text-gray-500">
                    {demoResults.length} generated
                  </div>
                </div>

                {demoResults.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      Try an AI feature to see results here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {demoResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {result.title}
                          </h4>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => toast.success('📋 Copied to clipboard!')}
                              className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                            >
                              <Share2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => toast.success('💾 Saved to projects!')}
                              className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                            >
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-700 line-clamp-3 mb-2">
                          {result.content.substring(0, 120)}...
                        </p>
                        
                        {result.metadata && (
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{result.metadata.confidence}% confidence</span>
                            <span>{result.metadata.processingTime}s</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* AI Statistics */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">AI Performance</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Accuracy Rate</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">94%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Processing Speed</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">89%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cultural Context</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">96%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => toast.success('⚙️ AI settings panel opened!')}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Settings
                    </button>
                    <button
                      onClick={() => toast.success('📊 Analytics dashboard opened!')}
                      className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Details Modal */}
        <AnimatePresence>
          {selectedFeature && demoResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedFeature(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${categoryColors[selectedFeature.category]} flex items-center justify-center`}>
                        <selectedFeature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedFeature.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedFeature.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFeature(null)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Latest Result */}
                  {demoResults.length > 0 && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {demoResults[0].title}
                        </h3>
                        <div className="flex items-center space-x-4">
                          {demoResults[0].metadata && (
                            <>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">{demoResults[0].metadata.confidence}%</span> confidence
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">{demoResults[0].metadata.processingTime}s</span> processing
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-line text-gray-700">
                          {demoResults[0].content}
                        </div>
                      </div>

                      {demoResults[0].metadata?.suggestions && (
                        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                          <h4 className="font-semibold text-gray-900 mb-3">AI Suggestions:</h4>
                          <ul className="space-y-2">
                            {demoResults[0].metadata.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                                <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-4 mt-6">
                        <button
                          onClick={() => toast.success('📋 Results copied to clipboard!')}
                          className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Copy Results
                        </button>
                        <button
                          onClick={() => toast.success('💾 Results saved to project files!')}
                          className="px-6 py-3 bg-white border border-purple-200 hover:border-purple-300 text-purple-700 rounded-xl font-medium transition-colors flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFeature(selectedFeature)
                            simulateAIProcessing(selectedFeature)
                          }}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Regenerate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}