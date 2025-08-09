'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  DollarSign,
  TrendingUp,
  Calendar,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Star,
  Eye,
  Edit,
  Plus,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  Building,
  Globe,
  Smartphone,
  Zap,
  ArrowUp,
  ArrowDown,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  location: string
  status: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  value: number
  probability: number
  source: string
  lastContact: string
  nextAction: string
  assignedTo: string
  tags: string[]
  createdAt: string
  notes: string
}

interface DashboardStats {
  totalLeads: number
  qualifiedLeads: number
  totalValue: number
  conversionRate: number
  avgDealSize: number
  monthlyGrowth: number
}

const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Sarah Nakamura',
    company: 'East African Tech Hub',
    email: 'sarah@eastafricantech.com',
    phone: '+256 701 234 567',
    location: 'Kampala, Uganda',
    status: 'qualified',
    value: 25000,
    probability: 75,
    source: 'WhatsApp',
    lastContact: '2 hours ago',
    nextAction: 'Send proposal by Friday',
    assignedTo: 'Alex Johnson',
    tags: ['enterprise', 'tech', 'priority'],
    createdAt: '2025-02-06',
    notes: 'Looking for complete brand redesign and website. Budget confirmed at $25k.'
  },
  {
    id: 'lead-002',
    name: 'David Mbeki',
    company: 'Savanna Coffee Roasters',
    email: 'david@savannacoffee.co.tz',
    phone: '+255 754 123 456',
    location: 'Dar es Salaam, Tanzania',
    status: 'proposal',
    value: 12000,
    probability: 60,
    source: 'Referral',
    lastContact: '1 day ago',
    nextAction: 'Follow up on proposal',
    assignedTo: 'Maria Santos',
    tags: ['coffee', 'packaging', 'referral'],
    createdAt: '2025-02-04',
    notes: 'Expanding to Kenyan market. Need packaging and brand guidelines.'
  },
  {
    id: 'lead-003',
    name: 'Amina Hassan',
    company: 'Nairobi Fashion Week',
    email: 'amina@nairobifashionweek.ke',
    phone: '+254 722 345 678',
    location: 'Nairobi, Kenya',
    status: 'negotiation',
    value: 35000,
    probability: 85,
    source: 'Social Media',
    lastContact: '4 hours ago',
    nextAction: 'Contract review meeting',
    assignedTo: 'James Wilson',
    tags: ['fashion', 'events', 'premium'],
    createdAt: '2025-02-01',
    notes: 'Annual event branding. Multi-year potential. Very interested in our cultural approach.'
  },
  {
    id: 'lead-004',
    name: 'Robert Kigali',
    company: 'Rwanda Innovation Hub',
    email: 'robert@rwinnovation.rw',
    phone: '+250 788 123 456',
    location: 'Kigali, Rwanda',
    status: 'new',
    value: 8000,
    probability: 30,
    source: 'Website',
    lastContact: '2 days ago',
    nextAction: 'Discovery call scheduled',
    assignedTo: 'Alex Johnson',
    tags: ['startup', 'tech', 'new'],
    createdAt: '2025-02-08',
    notes: 'New inquiry through website contact form. Startup incubator looking for brand identity.'
  }
]

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  qualified: 'bg-green-100 text-green-700',
  proposal: 'bg-yellow-100 text-yellow-700',
  negotiation: 'bg-purple-100 text-purple-700',
  won: 'bg-emerald-100 text-emerald-700',
  lost: 'bg-red-100 text-red-700'
}

const sourceColors = {
  'WhatsApp': 'bg-green-500',
  'Referral': 'bg-blue-500',
  'Social Media': 'bg-pink-500',
  'Website': 'bg-purple-500',
  'Email': 'bg-orange-500'
}

export default function CRMDashboardDemo() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [viewMode, setViewMode] = useState<'pipeline' | 'list' | 'analytics'>('pipeline')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showNewLeadForm, setShowNewLeadForm] = useState(false)

  const stats: DashboardStats = {
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(lead => ['qualified', 'proposal', 'negotiation'].includes(lead.status)).length,
    totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
    conversionRate: 68, // Mock data
    avgDealSize: leads.reduce((sum, lead) => sum + lead.value, 0) / leads.length,
    monthlyGrowth: 24 // Mock data
  }

  const pipelineStats = [
    { status: 'new', count: leads.filter(l => l.status === 'new').length, value: leads.filter(l => l.status === 'new').reduce((sum, l) => sum + l.value, 0) },
    { status: 'qualified', count: leads.filter(l => l.status === 'qualified').length, value: leads.filter(l => l.status === 'qualified').reduce((sum, l) => sum + l.value, 0) },
    { status: 'proposal', count: leads.filter(l => l.status === 'proposal').length, value: leads.filter(l => l.status === 'proposal').reduce((sum, l) => sum + l.value, 0) },
    { status: 'negotiation', count: leads.filter(l => l.status === 'negotiation').length, value: leads.filter(l => l.status === 'negotiation').reduce((sum, l) => sum + l.value, 0) },
    { status: 'won', count: leads.filter(l => l.status === 'won').length, value: leads.filter(l => l.status === 'won').reduce((sum, l) => sum + l.value, 0) },
    { status: 'lost', count: leads.filter(l => l.status === 'lost').length, value: leads.filter(l => l.status === 'lost').reduce((sum, l) => sum + l.value, 0) }
  ]

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const simulateAIInsight = () => {
    const insights = [
      "🎯 Amina from Nairobi Fashion Week is 85% likely to close this week - high priority follow up!",
      "📈 WhatsApp leads have 40% higher conversion rate - increase WhatsApp marketing",
      "🇺🇬 Uganda market showing strongest growth with 3 qualified leads this week",
      "💰 Average deal size increased 23% this month - pricing strategy is working",
      "🔄 2 leads haven't been contacted in 5+ days - automated reminder sent"
    ]
    
    const randomInsight = insights[Math.floor(Math.random() * insights.length)]
    toast.success(randomInsight, { duration: 6000 })
  }

  const moveLeadToStatus = (leadId: string, newStatus: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus as Lead['status'] } : lead
    ))
    toast.success(`Lead moved to ${newStatus}! WhatsApp notification sent.`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container-africa">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            AI-Powered CRM Dashboard
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Smart Lead Management
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Predictive analytics, WhatsApp integration, and cultural intelligence 
            for East African market optimization.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={simulateAIInsight}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              <Zap className="w-4 h-4 mr-2" />
              Generate AI Insights
            </button>
            
            <button
              onClick={() => setShowNewLeadForm(true)}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl font-medium transition-all duration-300 border border-gray-200 hover:border-gray-300 flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Lead
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalLeads}</div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.qualifiedLeads}</div>
            <div className="text-sm text-gray-600">Qualified</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{formatCurrency(stats.totalValue)}</div>
            <div className="text-sm text-gray-600">Pipeline Value</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversion</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{formatCurrency(stats.avgDealSize)}</div>
            <div className="text-sm text-gray-600">Avg Deal</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-1">
              <span className="text-2xl font-bold text-emerald-600">+{stats.monthlyGrowth}%</span>
              <ArrowUp className="w-4 h-4 text-emerald-600 ml-1" />
            </div>
            <div className="text-sm text-gray-600">Monthly Growth</div>
          </div>
        </motion.div>

        {/* View Mode Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          {[
            { id: 'pipeline', label: 'Sales Pipeline', icon: Target },
            { id: 'list', label: 'Lead List', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                viewMode === tab.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Sales Pipeline View */}
          {viewMode === 'pipeline' && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid lg:grid-cols-6 gap-4">
                {pipelineStats.map((stage, index) => (
                  <motion.div
                    key={stage.status}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-xl p-4"
                  >
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-gray-900 capitalize mb-2">{stage.status}</h3>
                      <div className="text-2xl font-bold text-orange-600 mb-1">{stage.count}</div>
                      <div className="text-sm text-gray-600">{formatCurrency(stage.value)}</div>
                    </div>
                    
                    <div className="space-y-3">
                      {leads
                        .filter(lead => lead.status === stage.status)
                        .slice(0, 3)
                        .map(lead => (
                          <motion.div
                            key={lead.id}
                            className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors group"
                            onClick={() => setSelectedLead(lead)}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="font-medium text-gray-900 text-sm mb-1 truncate">
                              {lead.name}
                            </div>
                            <div className="text-xs text-gray-600 mb-2 truncate">
                              {lead.company}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-orange-600">
                                {formatCurrency(lead.value)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {lead.probability}%
                              </span>
                            </div>
                            
                            {/* Source indicator */}
                            <div className="flex items-center mt-2">
                              <div className={`w-2 h-2 rounded-full ${sourceColors[lead.source as keyof typeof sourceColors]} mr-2`}></div>
                              <span className="text-xs text-gray-500">{lead.source}</span>
                            </div>
                          </motion.div>
                        ))}
                      
                      {leads.filter(lead => lead.status === stage.status).length > 3 && (
                        <div className="text-center text-xs text-gray-500 pt-2">
                          +{leads.filter(lead => lead.status === stage.status).length - 3} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search leads by name, company, or email..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Lead</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Probability</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Source</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Contact</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredLeads.map((lead) => (
                        <motion.tr
                          key={lead.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                                {lead.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{lead.name}</div>
                                <div className="text-sm text-gray-600">{lead.company}</div>
                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {lead.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {formatCurrency(lead.value)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-orange-600 h-2 rounded-full"
                                  style={{ width: `${lead.probability}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{lead.probability}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${sourceColors[lead.source as keyof typeof sourceColors]} mr-2`}></div>
                              <span className="text-sm text-gray-600">{lead.source}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {lead.lastContact}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => toast.success(`📱 WhatsApp chat opened with ${lead.name}`)}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="WhatsApp"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => toast.success(`☎️ Calling ${lead.name}...`)}
                                className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                title="Call"
                              >
                                <Phone className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics View */}
          {viewMode === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Pipeline Analytics */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Pipeline Analytics</h3>
                
                <div className="space-y-6">
                  {pipelineStats.map((stage, index) => (
                    <div key={stage.status}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 capitalize">{stage.status}</span>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{stage.count} leads</div>
                          <div className="text-sm text-gray-600">{formatCurrency(stage.value)}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(stage.value / stats.totalValue) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 * index }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Analytics */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Lead Sources</h3>
                
                <div className="space-y-4">
                  {Object.entries(
                    leads.reduce((acc, lead) => {
                      acc[lead.source] = (acc[lead.source] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                  ).map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${sourceColors[source as keyof typeof sourceColors]} mr-3`}></div>
                        <span className="font-medium text-gray-900">{source}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{count}</div>
                        <div className="text-sm text-gray-600">
                          {Math.round((count / leads.length) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">68%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">5.2</div>
                    <div className="text-sm text-gray-600">Avg Days to Close</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 mb-1">4.8★</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">🤖 AI Insights</h3>
                
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="font-medium mb-1">Best Performing Channel</div>
                    <div className="text-sm opacity-90">WhatsApp leads convert 40% better than average</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="font-medium mb-1">Optimal Contact Time</div>
                    <div className="text-sm opacity-90">2-4 PM EAT shows highest response rates</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="font-medium mb-1">Market Trend</div>
                    <div className="text-sm opacity-90">Tech sector leads increased 45% this quarter</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead Detail Modal */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedLead(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                        {selectedLead.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {selectedLead.name}
                        </h2>
                        <div className="text-gray-600 mb-2">{selectedLead.company}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedLead.location}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Lead Details */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{selectedLead.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{selectedLead.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{selectedLead.company}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-4">Deal Information</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Value:</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(selectedLead.value)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Probability:</span>
                          <span className="font-semibold text-gray-900">{selectedLead.probability}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Source:</span>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${sourceColors[selectedLead.source as keyof typeof sourceColors]} mr-2`}></div>
                            <span className="font-semibold text-gray-900">{selectedLead.source}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedLead.status]}`}>
                            {selectedLead.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Notes */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                          onClick={() => toast.success(`📱 WhatsApp chat opened with ${selectedLead.name}`)}
                          className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={() => toast.success(`☎️ Calling ${selectedLead.name}...`)}
                          className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                        <button
                          onClick={() => toast.success(`📧 Email composer opened for ${selectedLead.name}`)}
                          className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </button>
                        <button
                          onClick={() => toast.success(`📅 Meeting scheduled with ${selectedLead.name}`)}
                          className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Schedule</span>
                        </button>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-4">Move to Stage</h3>
                      
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {['qualified', 'proposal', 'negotiation', 'won', 'lost'].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              moveLeadToStatus(selectedLead.id, status)
                              setSelectedLead(null)
                            }}
                            disabled={selectedLead.status === status}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                              selectedLead.status === status
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
                      
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {selectedLead.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}