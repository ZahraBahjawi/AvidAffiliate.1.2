import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, RefreshCw, Users, Clock } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FormDraft {
  id: string;
  session_id: string;
  website_url: string;
  name: string;
  email: string;
  step: string;
  last_active_field: string | null;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
}

interface FormDraftsViewerProps {
  onBack?: () => void;
}

export const FormDraftsViewer: React.FC<FormDraftsViewerProps> = ({ onBack }) => {
  const [drafts, setDrafts] = useState<FormDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'abandoned' | 'submitted'>('abandoned');

  const loadDrafts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('form_drafts')
        .select('*')
        .order('updated_at', { ascending: false });

      if (filter === 'abandoned') {
        query = query.is('submitted_at', null);
      } else if (filter === 'submitted') {
        query = query.not('submitted_at', 'is', null);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading drafts:', error);
      } else {
        setDrafts(data || []);
      }
    } catch (err) {
      console.error('Failed to load drafts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrafts();
  }, [filter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-900">Form Drafts</h1>
            </div>
            <button
              onClick={loadDrafts}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('abandoned')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'abandoned'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Abandoned ({drafts.filter(d => !d.submitted_at).length})
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'submitted'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Submitted ({drafts.filter(d => d.submitted_at).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({drafts.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading drafts...</p>
          </div>
        ) : drafts.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts found</h3>
            <p className="text-gray-600">
              {filter === 'abandoned' && 'No abandoned forms yet.'}
              {filter === 'submitted' && 'No submitted forms yet.'}
              {filter === 'all' && 'No form data captured yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {draft.name || 'No name provided'}
                      </h3>
                      {draft.submitted_at ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                          Submitted
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                          Abandoned
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{draft.email || 'No email provided'}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {getTimeSince(draft.updated_at)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Website URL</p>
                    <p className="text-gray-900 font-medium break-all">
                      {draft.website_url || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Last Active Field</p>
                    <p className="text-gray-900 font-medium">
                      {draft.last_active_field || 'None'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Created</p>
                    <p className="text-gray-900">{formatDate(draft.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Last Updated</p>
                    <p className="text-gray-900">{formatDate(draft.updated_at)}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-mono">
                    Session: {draft.session_id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
