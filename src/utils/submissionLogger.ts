// Form submission logging utility
export interface FormSubmission {
  id: string;
  timestamp: string;
  type: 'audit' | 'contact' | 'services';
  data: any;
  userAgent?: string;
  referrer?: string;
}

export interface AuditSubmission extends FormSubmission {
  type: 'audit';
  data: {
    url: string;
    name: string;
    email: string;
    trafficTier: string;
    earningsTier: string;
  };
}

export interface ContactSubmission extends FormSubmission {
  type: 'contact';
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

export interface ServicesSubmission extends FormSubmission {
  type: 'services';
  data: {
    name: string;
    email: string;
    website: string;
    trafficTier: string;
    revenueTier: string;
    goals: string;
    message: string;
  };
}

// Generate unique ID for submissions
const generateSubmissionId = (): string => {
  return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Log a form submission
export const logFormSubmission = (type: FormSubmission['type'], data: any): string => {
  try {
    const submissionId = generateSubmissionId();
    
    const submission: FormSubmission = {
      id: submissionId,
      timestamp: new Date().toISOString(),
      type,
      data,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    };

    // Get existing submissions
    const existingSubmissions = getFormSubmissions();
    
    // Add new submission
    const updatedSubmissions = [submission, ...existingSubmissions];
    
    // Store in localStorage (keep last 100 submissions)
    const submissionsToStore = updatedSubmissions.slice(0, 100);
    localStorage.setItem('avidaffiliate_submissions', JSON.stringify(submissionsToStore));
    
    // Also log to console for immediate visibility
    console.log('📝 Report Card Request Logged:', {
      id: submissionId,
      type,
      timestamp: submission.timestamp,
      data: type === 'audit' ? {
        email: data.email, 
        url: data.url, 
        traffic: data.trafficTier 
      } : data
    });
    
    return submissionId;
  } catch (error) {
    console.error('Failed to log form submission:', error);
    return '';
  }
};

// Retrieve all form submissions
export const getFormSubmissions = (): FormSubmission[] => {
  try {
    const stored = localStorage.getItem('avidaffiliate_submissions');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve form submissions:', error);
    return [];
  }
};

// Get submissions by type
export const getSubmissionsByType = (type: FormSubmission['type']): FormSubmission[] => {
  return getFormSubmissions().filter(submission => submission.type === type);
};

// Get submissions from last N days
export const getRecentSubmissions = (days: number = 7): FormSubmission[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return getFormSubmissions().filter(submission => 
    new Date(submission.timestamp) >= cutoffDate
  );
};

// Export submissions as CSV
export const exportSubmissionsAsCSV = (): string => {
  const submissions = getFormSubmissions();
  
  if (submissions.length === 0) {
    return 'No submissions to export';
  }
  
  // CSV headers
  const headers = ['ID', 'Timestamp', 'Type', 'Name', 'Email', 'Website/Subject', 'Additional Info'];
  
  // Convert submissions to CSV rows
  const rows = submissions.map(submission => {
    const { id, timestamp, type, data } = submission;
    
    let name = '';
    let email = '';
    let websiteOrSubject = '';
    let additionalInfo = '';
    
    switch (type) {
      case 'audit':
        name = data.name || '';
        email = data.email || '';
        websiteOrSubject = data.url || '';
        additionalInfo = `Traffic: ${data.trafficTier}, Earnings: ${data.earningsTier}`;
        break;
      case 'contact':
        name = data.name || '';
        email = data.email || '';
        websiteOrSubject = data.subject || '';
        additionalInfo = data.message || '';
        break;
      case 'services':
        name = data.name || '';
        email = data.email || '';
        websiteOrSubject = data.website || '';
        additionalInfo = `Traffic: ${data.trafficTier}, Revenue: ${data.revenueTier}, Goals: ${data.goals}`;
        break;
    }
    
    return [
      id,
      timestamp,
      type,
      name,
      email,
      websiteOrSubject,
      additionalInfo
    ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',');
  });
  
  return [headers.join(','), ...rows].join('\n');
};

// Clear all submissions (admin function)
export const clearAllSubmissions = (): void => {
  localStorage.removeItem('avidaffiliate_submissions');
  console.log('🗑️ All report card requests cleared');
};

// Get submission statistics
export const getSubmissionStats = () => {
  const submissions = getFormSubmissions();
  const recent = getRecentSubmissions(7);
  
  return {
    total: submissions.length,
    lastWeek: recent.length,
    byType: {
      audit: submissions.filter(s => s.type === 'audit').length,
      contact: submissions.filter(s => s.type === 'contact').length,
      services: submissions.filter(s => s.type === 'services').length
    },
    latest: submissions[0]?.timestamp || null
  };
};