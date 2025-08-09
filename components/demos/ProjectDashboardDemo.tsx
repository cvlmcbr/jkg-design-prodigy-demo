'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MessageCircle,
  FileImage,
  Play,
  TrendingUp,
  Target
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ProjectPhase {
  id: string
  name: string
  status: 'completed' | 'in-progress' | 'upcoming'
  progress: number
  startDate: string
  endDate: string
  deliverables: string[]
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  status: 'online' | 'busy' | 'offline'
}

const mockProject = {
  id: 'KMP-001',
  name: 'Kampala Coffee Co. Rebrand',
  client: 'Kampala Coffee Company',
  status: 'in-progress',
  progress: 65,
  budget: '$12,500',
  spent: '$8,125',
  startDate: '2025-01-15',
  deadline: '2025-03-15',
  nextMilestone: 'Logo Presentation',
  nextMilestoneDate: '2025-02-10'
}

const projectPhases: ProjectPhase[] = [
  {
    id: 'discovery',
    name: 'Discovery & Strategy',
    status: 'completed',
    progress: 100,
    startDate: '2025-01-15',
    endDate: '2025-01-25',
    deliverables: ['Brand Audit', 'Competitor Analysis', 'Strategic Brief']
  },
  {
    id: 'concept',
    name: 'Concept Development',
    status: 'completed',
    progress: 100,
    startDate: '2025-01-26',
    endDate: '2025-02-05',
    deliverables: ['Mood Boards', 'Style Exploration', 'Concept Presentation']
  },
  {
    id: 'design',
    name: 'Design Development',
    status: 'in-progress',
    progress: 75,
    startDate: '2025-02-06',
    endDate: '2025-02-20',
    deliverables: ['Logo Design', 'Color Palette', 'Typography System']
  },
  {
    id: 'refinement',
    name: 'Refinement & Testing',
    status: 'upcoming',
    progress: 0,
    startDate: '2025-02-21',
    endDate: '2025-03-05',
    deliverables: ['Logo Refinements', 'Application Testing', 'Guidelines']
  },
  {
    id: 'delivery',
    name: 'Final Delivery',
    status: 'upcoming',
    progress: 0,
    startDate: '2025-03-06',
    endDate: '2025-03-15',
    deliverables: ['Brand Guidelines', 'Asset Library', 'Implementation Support']
  }
]

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Mbeki', role: 'Creative Director', avatar: '/avatars/sarah.jpg', status: 'online' },
  { id: '2', name: 'James Okello', role: 'Brand Designer', avatar: '/avatars/james.jpg', status: 'online' },
  { id: '3', name: 'Amina Hassan', role: 'Project Manager', avatar: '/avatars/amina.jpg', status: 'busy' },
  { id: '4', name: 'David Kato', role: 'Strategy Lead', avatar: '/avatars/david.jpg', status: 'offline' }
]

const recentUpdates = [
  {
    id: '1',
    type: 'milestone',
    message: 'Concept presentation completed successfully',
    timestamp: '2 hours ago',
    author: 'Sarah Mbeki'
  },
  {
    id: '2',
    type: 'feedback',
    message: 'Client approved initial logo concepts',
    timestamp: '5 hours ago',
    author: 'Amina Hassan'
  },
  {
    id: '3',
    type: 'asset',
    message: 'Logo variations uploaded for review',
    timestamp: '1 day ago',
    author: 'James Okello'
  }
]

export default function ProjectDashboardDemo() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const simulateProgress = () => {
    setIsSimulating(true)
    toast.success('🚀 Simulating real-time project progress...')
    
    setTimeout(() => {
      toast.success('✅ Logo concept approved! Moving to next phase.')
      setIsSimulating(false)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'upcoming': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMemberStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-white via-secondary-50 to-lime-50">
      <div className="container-africa">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-100 to-lime-100 backdrop-blur-sm rounded-full text-secondary-700 text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            AI-Powered Project Dashboard
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Live Project
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-lime-500">
              Tracking
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Monitor project progress in real-time with AI-powered insights, cultural milestone celebrations, and intelligent status updates.
          </p>

          <button
            onClick={simulateProgress}
            disabled={isSimulating}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center mx-auto ${
              isSimulating 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-gradient-to-r from-secondary-500 to-lime-500 hover:from-secondary-600 hover:to-lime-600 text-white shadow-xl hover:shadow-2xl hover:scale-105'
            }`}
          >
            <Play className="w-4 h-4 mr-2" />
            {isSimulating ? 'Simulating...' : 'Simulate Progress Update'}
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {mockProject.name}
                  </h2>
                  <p className="text-gray-600">
                    Project ID: {mockProject.id} • Client: {mockProject.client}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                    In Progress
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{mockProject.progress}%</div>
                  <div className="text-gray-600 text-sm">Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{mockProject.budget}</div>
                  <div className="text-gray-600 text-sm">Total Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{mockProject.spent}</div>
                  <div className="text-gray-600 text-sm">Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">25</div>
                  <div className="text-gray-600 text-sm">Days Left</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{mockProject.progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${mockProject.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Next Milestone */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Next Milestone</h3>
                    <p className="text-gray-600">{mockProject.nextMilestone}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      Feb 10
                    </div>
                    <div className="text-sm text-gray-600">Due Date</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Project Timeline</h3>
                <div className="text-sm text-gray-600">
                  {currentTime.toLocaleTimeString('en-UG', { 
                    timeZone: 'Africa/Kampala',
                    hour: '2-digit',
                    minute: '2-digit'
                  })} EAT
                </div>
              </div>

              <div className="space-y-6">
                {projectPhases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className="relative">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          phase.status === 'completed' ? 'bg-green-500 border-green-500' :
                          phase.status === 'in-progress' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                          'bg-gray-200 border-gray-300'
                        }`}></div>
                        {index < projectPhases.length - 1 && (
                          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 ${
                            phase.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>

                      {/* Phase Content */}
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                          className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                                {phase.status === 'in-progress' ? 'In Progress' :
                                 phase.status === 'completed' ? 'Completed' : 'Upcoming'}
                              </span>
                              <div className="text-sm text-gray-500">
                                {phase.progress}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${
                                phase.status === 'completed' ? 'bg-green-500' :
                                phase.status === 'in-progress' ? 'bg-blue-500' :
                                'bg-gray-300'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${phase.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.2 * index }}
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {selectedPhase === phase.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 p-4 bg-gray-50 rounded-xl"
                            >
                              <h5 className="font-medium text-gray-900 mb-3">Deliverables:</h5>
                              <div className="grid gap-2">
                                {phase.deliverables.map((deliverable, idx) => (
                                  <div key={idx} className="flex items-center space-x-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span className="text-gray-700">{deliverable}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Team Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Team Members</h3>
              
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getMemberStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Start Team Chat
              </button>
            </motion.div>

            {/* Recent Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Updates</h3>
              
              <div className="space-y-4">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="flex space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      update.type === 'milestone' ? 'bg-green-500' :
                      update.type === 'feedback' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}>
                      {update.type === 'milestone' ? <CheckCircle2 className="w-4 h-4" /> :
                       update.type === 'feedback' ? <MessageCircle className="w-4 h-4" /> :
                       <FileImage className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{update.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{update.author}</span>
                        <span className="text-xs text-gray-500">{update.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View All Updates
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl shadow-xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4">Performance Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-orange-100">On Time Delivery</span>
                  <span className="font-bold">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-100">Client Satisfaction</span>
                  <span className="font-bold">4.9★</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-100">Budget Efficiency</span>
                  <span className="font-bold">98%</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="text-sm">Project trending ahead of schedule</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}