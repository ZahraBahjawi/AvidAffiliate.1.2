import React, { useState, useEffect } from 'react';
import { Download, Trash2, Eye, Calendar, Users, Mail, Globe } from 'lucide-react';
import { 
  getFormSubmissions, 
  getSubmissionStats, 
  exportSubmissionsAsCSV, 
  clearAllSubmissions,
  FormSubmission 
} from '../utils/submissionLogger';

export const SubmissionLogger: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'audit' | 'contact' | 'services'>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allSubmissions = getFormSubmissions();
    setSubmissions(allSubmissions);
    setStats(getSubmissionStats());
  };

  const filteredSubmissions = selectedType === 'all' 
    ? submissions 
    : submissions.filter(s => s.type === selectedType);

  const handleExport = () => {
    const csv = exportSubmissionsAsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avidaffiliate-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all submissions? This cannot be undone.')) {
      clearAllSubmissions();
      loadData();
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audit': return <Globe className="h-4 w-4" />;
      case 'contact': return <Mail className="h-4 w-4" />;
      case 'services': return <Users className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'audit': return 'bg-blue-100 text-blue-800';
      case 'contact': return 'bg-green-100 text-green-800';
      case 'services': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Submission Log</h1>
          
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-blue-800">Total Submissions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{stats.lastWeek}</div>
                <div className="text-sm text-green-800">Last 7 Days</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{stats.byType.audit}</div>
                <div className="text-sm text-purple-800">Audit Requests</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">{stats.byType.services}</div>
                <div className="text-sm text-orange-800">Service Inquiries</div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="audit">Audit Requests</option>
                <option value="contact">Contact Forms</option>
                <option value="services">Service Inquiries</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Submissions ({filteredSubmissions.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredSubmissions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No submissions found for the selected filter.
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div key={submission.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(submission.type)}`}>
                          {getTypeIcon(submission.type)}
                          <span className="ml-1 capitalize">{submission.type}</span>
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(submission.timestamp)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Name:</span>
                          <span className="ml-2 text-gray-900">{submission.data.name || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-900">{submission.data.email || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            {submission.type === 'audit' ? 'Website:' : 
                             submission.type === 'contact' ? 'Subject:' : 'Website:'}
                          </span>
                          <span className="ml-2 text-gray-900">
                            {submission.type === 'audit' ? submission.data.url :
                             submission.type === 'contact' ? submission.data.subject :
                             submission.data.website}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowDetails(showDetails === submission.id ? null : submission.id)}
                      className="ml-4 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      {showDetails === submission.id ? 'Hide' : 'Details'}
                    </button>
                  </div>
                  
                  {showDetails === submission.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(submission, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};