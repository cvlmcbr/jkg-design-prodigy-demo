'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileImage, 
  Video,
  FileText,
  Download,
  Eye,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Share2,
  Filter,
  Grid3X3,
  List,
  Search,
  Tag,
  Calendar,
  User,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Asset {
  id: string
  name: string
  type: 'image' | 'video' | 'document'
  version: number
  status: 'pending' | 'approved' | 'revision' | 'rejected'
  uploadDate: string
  size: string
  dimensions?: string
  thumbnail: string
  project: string
  tags: string[]
  comments: AssetComment[]
  approvals: AssetApproval[]
  lastModified: string
}

interface AssetComment {
  id: string
  author: string
  message: string
  timestamp: string
  position?: { x: number; y: number }
  status: 'active' | 'resolved'
  type: 'feedback' | 'approval' | 'general'
}

interface AssetApproval {
  id: string
  approver: string
  status: 'approved' | 'rejected' | 'pending'
  timestamp: string
  feedback?: string
}

const mockAssets: Asset[] = [
  {
    id: 'asset-001',
    name: 'Kampala Coffee Logo - Primary.svg',
    type: 'image',
    version: 3,
    status: 'pending',
    uploadDate: '2025-02-08',
    lastModified: '2025-02-08 14:30',
    size: '245 KB',
    dimensions: '2400x1200px',
    thumbnail: '/demo-assets/logo-primary.jpg',
    project: 'Kampala Coffee Rebrand',
    tags: ['logo', 'primary', 'final'],
    comments: [
      {
        id: 'c1',
        author: 'David Mukasa (Client)',
        message: 'Love the coffee bean integration! Can we see it in darker brown?',
        timestamp: '2 hours ago',
        status: 'active',
        type: 'feedback'
      },
      {
        id: 'c2',
        author: 'Sarah Mbeki',
        message: 'Added darker variations as requested. Ready for review.',
        timestamp: '1 hour ago',
        status: 'active',
        type: 'general'
      }
    ],
    approvals: [
      {
        id: 'a1',
        approver: 'David Mukasa',
        status: 'pending',
        timestamp: '',
        feedback: 'Reviewing color variations...'
      }
    ]
  },
  {
    id: 'asset-002',
    name: 'Brand Guidelines - v2.1.pdf',
    type: 'document',
    version: 2,
    status: 'approved',
    uploadDate: '2025-02-07',
    lastModified: '2025-02-07 16:45',
    size: '12.4 MB',
    thumbnail: '/demo-assets/brand-guidelines.jpg',
    project: 'Kampala Coffee Rebrand',
    tags: ['guidelines', 'brand', 'final'],
    comments: [
      {
        id: 'c3',
        author: 'Amina Hassan',
        message: 'Typography section looks perfect! Client approved.',
        timestamp: '1 day ago',
        status: 'resolved',
        type: 'approval'
      }
    ],
    approvals: [
      {
        id: 'a2',
        approver: 'David Mukasa',
        status: 'approved',
        timestamp: '1 day ago',
        feedback: 'Excellent work on the brand personality section!'
      }
    ]
  },
  {
    id: 'asset-003',
    name: 'Logo Animation - WhatsApp.mp4',
    type: 'video',
    version: 1,
    status: 'revision',
    uploadDate: '2025-02-06',
    lastModified: '2025-02-06 11:20',
    size: '8.9 MB',
    dimensions: '1920x1080px',
    thumbnail: '/demo-assets/logo-animation.jpg',
    project: 'Kampala Coffee Rebrand',
    tags: ['animation', 'social', 'whatsapp'],
    comments: [
      {
        id: 'c4',
        author: 'David Mukasa (Client)',
        message: 'Animation is smooth, but can we make it 2 seconds longer?',
        timestamp: '2 days ago',
        status: 'active',
        type: 'feedback'
      },
      {
        id: 'c5',
        author: 'James Okello',
        message: 'Working on extended version. Will upload by tomorrow.',
        timestamp: '1 day ago',
        status: 'active',
        type: 'general'
      }
    ],
    approvals: [
      {
        id: 'a3',
        approver: 'David Mukasa',
        status: 'rejected',
        timestamp: '2 days ago',
        feedback: 'Please extend duration and add coffee steam effect'
      }
    ]
  }
]

const projectFilter = ['All Projects', 'Kampala Coffee Rebrand', 'East African Bank', 'Safari Tours Ltd']
const statusFilter = ['All Status', 'Pending Review', 'Approved', 'Needs Revision', 'Rejected']
const typeFilter = ['All Types', 'Images', 'Videos', 'Documents']

export default function AssetReviewDemo() {
  const [assets] = useState<Asset[]>(mockAssets)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    project: 'All Projects',
    status: 'All Status',
    type: 'All Types'
  })
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(false)

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'image': return FileImage
      case 'video': return Video
      case 'document': return FileText
      default: return FileImage
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'revision': return 'text-orange-600 bg-orange-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle2
      case 'pending': return Clock
      case 'revision': return AlertCircle
      case 'rejected': return AlertCircle
      default: return Clock
    }
  }

  const handleApprove = (asset: Asset) => {
    toast.success(`✅ ${asset.name} approved! Client notification sent via WhatsApp.`)
  }

  const handleRequestRevision = (asset: Asset) => {
    toast.success(`📝 Revision requested for ${asset.name}. Designer notified.`)
  }

  const handleAddComment = (asset: Asset) => {
    if (!newComment.trim()) return
    
    toast.success('💬 Comment added! Client will receive WhatsApp notification.')
    setNewComment('')
    setShowComments(true)
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesProject = filters.project === 'All Projects' || asset.project === filters.project
    const matchesStatus = filters.status === 'All Status' || 
                         (filters.status === 'Pending Review' && asset.status === 'pending') ||
                         (filters.status === 'Approved' && asset.status === 'approved') ||
                         (filters.status === 'Needs Revision' && asset.status === 'revision') ||
                         (filters.status === 'Rejected' && asset.status === 'rejected')
    const matchesType = filters.type === 'All Types' ||
                       (filters.type === 'Images' && asset.type === 'image') ||
                       (filters.type === 'Videos' && asset.type === 'video') ||
                       (filters.type === 'Documents' && asset.type === 'document')
    
    return matchesSearch && matchesProject && matchesStatus && matchesType
  })

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container-africa">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Asset Review & Approval System
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Streamlined Asset Reviews
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Intuitive approval workflow with real-time collaboration, 
            instant WhatsApp notifications, and version control.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => toast.success('🚀 Simulating bulk approval workflow...')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Simulate Bulk Approval
            </button>
            
            <button
              onClick={() => toast.success('📱 WhatsApp integration demo activated!')}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl font-medium transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Test WhatsApp Notifications
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters & Search Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 sticky top-32"
            >
              <h3 className="font-bold text-gray-900 mb-6">Filters & Search</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Assets</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or tags..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* View Mode */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 p-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                      viewMode === 'grid' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4 mr-1" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 p-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                      viewMode === 'list' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4 mr-1" />
                    List
                  </button>
                </div>
              </div>

              {/* Project Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                <select
                  value={filters.project}
                  onChange={(e) => setFilters(prev => ({ ...prev, project: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  {projectFilter.map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  {statusFilter.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  {typeFilter.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Review</span>
                    <span className="font-medium text-yellow-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved Today</span>
                    <span className="font-medium text-green-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Needs Revision</span>
                    <span className="font-medium text-orange-600">1</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Asset Grid/List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Assets ({filteredAssets.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleTimeString('en-UG', { 
                    timeZone: 'Africa/Kampala',
                    hour: '2-digit',
                    minute: '2-digit'
                  })} EAT
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAssets.map((asset, index) => {
                    const StatusIcon = getStatusIcon(asset.status)
                    const AssetIcon = getAssetIcon(asset.type)
                    
                    return (
                      <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                      >
                        {/* Asset Preview */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
                            <AssetIcon className="w-8 h-8 text-gray-600" />
                          </div>
                          
                          {/* Status Badge */}
                          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {asset.status === 'pending' ? 'Pending' :
                             asset.status === 'approved' ? 'Approved' :
                             asset.status === 'revision' ? 'Revision' : 'Rejected'}
                          </div>

                          {/* Version Badge */}
                          <div className="absolute top-3 left-3 px-2 py-1 bg-black/20 backdrop-blur-sm text-white rounded-full text-xs">
                            v{asset.version}
                          </div>

                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                            <button
                              onClick={() => setSelectedAsset(asset)}
                              className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toast.success(`📥 Downloading ${asset.name}...`)}
                              className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toast.success(`🔗 Share link copied to clipboard!`)}
                              className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Asset Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 truncate" title={asset.name}>
                            {asset.name}
                          </h3>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(asset.uploadDate).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>{asset.size}</span>
                            {asset.dimensions && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{asset.dimensions}</span>
                              </>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {asset.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                                {tag}
                              </span>
                            ))}
                            {asset.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                                +{asset.tags.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Comments Count */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              <span>{asset.comments.length} comments</span>
                            </div>
                            
                            {asset.status === 'pending' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleRequestRevision(asset)}
                                  className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                  title="Request Revision"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleApprove(asset)}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Asset</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Version</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Size</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Modified</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredAssets.map((asset) => {
                          const AssetIcon = getAssetIcon(asset.type)
                          const StatusIcon = getStatusIcon(asset.status)
                          
                          return (
                            <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <AssetIcon className="w-5 h-5 text-gray-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 truncate max-w-xs" title={asset.name}>
                                      {asset.name}
                                    </div>
                                    <div className="text-sm text-gray-500">{asset.project}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 capitalize">{asset.type}</td>
                              <td className="px-6 py-4">
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {asset.status === 'pending' ? 'Pending' :
                                   asset.status === 'approved' ? 'Approved' :
                                   asset.status === 'revision' ? 'Revision' : 'Rejected'}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">v{asset.version}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{asset.size}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{asset.lastModified}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => setSelectedAsset(asset)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="View Details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => toast.success(`📥 Downloading ${asset.name}...`)}
                                    className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                    title="Download"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                  {asset.status === 'pending' && (
                                    <>
                                      <button
                                        onClick={() => handleRequestRevision(asset)}
                                        className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                        title="Request Revision"
                                      >
                                        <Edit3 className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleApprove(asset)}
                                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        title="Approve"
                                      >
                                        <CheckCircle2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Asset Detail Modal */}
        <AnimatePresence>
          {selectedAsset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedAsset(null)}
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
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedAsset.name}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Version {selectedAsset.version}</span>
                        <span>•</span>
                        <span>{selectedAsset.size}</span>
                        {selectedAsset.dimensions && (
                          <>
                            <span>•</span>
                            <span>{selectedAsset.dimensions}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAsset(null)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Asset Preview */}
                    <div>
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center mb-4">
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                          {React.createElement(getAssetIcon(selectedAsset.type), { 
                            className: "w-12 h-12 text-gray-600" 
                          })}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => toast.success(`📥 Downloading ${selectedAsset.name}...`)}
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                        >
                          <Download className="w-4 h-4 inline mr-2" />
                          Download
                        </button>
                        <button
                          onClick={() => toast.success(`🔗 Share link copied!`)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Asset Details & Comments */}
                    <div>
                      {/* Asset Info */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Asset Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Project:</span>
                            <span className="font-medium">{selectedAsset.project}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAsset.status)}`}>
                              {React.createElement(getStatusIcon(selectedAsset.status), { 
                                className: "w-3 h-3 inline mr-1" 
                              })}
                              {selectedAsset.status === 'pending' ? 'Pending' :
                               selectedAsset.status === 'approved' ? 'Approved' :
                               selectedAsset.status === 'revision' ? 'Revision' : 'Rejected'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Uploaded:</span>
                            <span className="font-medium">{new Date(selectedAsset.uploadDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Modified:</span>
                            <span className="font-medium">{selectedAsset.lastModified}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedAsset.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                              <Tag className="w-3 h-3 inline mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Approval Status */}
                      {selectedAsset.status === 'pending' && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleApprove(selectedAsset)}
                              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 inline mr-2" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleRequestRevision(selectedAsset)}
                              className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors"
                            >
                              <Edit3 className="w-4 h-4 inline mr-2" />
                              Request Revision
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Comments Section */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">
                            Comments ({selectedAsset.comments.length})
                          </h3>
                          <button
                            onClick={() => setShowComments(!showComments)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {showComments ? 'Hide' : 'Show'} Comments
                          </button>
                        </div>

                        <AnimatePresence>
                          {showComments && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-4"
                            >
                              {/* Add Comment */}
                              <div className="border-b border-gray-200 pb-4">
                                <textarea
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  placeholder="Add a comment or feedback..."
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                />
                                <div className="flex justify-end mt-2">
                                  <button
                                    onClick={() => handleAddComment(selectedAsset)}
                                    disabled={!newComment.trim()}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                      newComment.trim()
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                  >
                                    Add Comment
                                  </button>
                                </div>
                              </div>

                              {/* Comments List */}
                              <div className="space-y-4 max-h-60 overflow-y-auto">
                                {selectedAsset.comments.map((comment) => (
                                  <div key={comment.id} className="flex space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                      {comment.author.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-medium text-gray-900 text-sm">
                                          {comment.author}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {comment.timestamp}
                                        </span>
                                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                          comment.type === 'feedback' ? 'bg-orange-100 text-orange-700' :
                                          comment.type === 'approval' ? 'bg-green-100 text-green-700' :
                                          'bg-blue-100 text-blue-700'
                                        }`}>
                                          {comment.type}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-700">{comment.message}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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