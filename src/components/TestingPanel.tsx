import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, TestTube } from 'lucide-react';

interface TestResult {
  form: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  timestamp: string;
}

export const TestingPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Show/hide with Ctrl+Shift+T
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const addTestResult = (form: string, status: TestResult['status'], message: string) => {
    const result: TestResult = {
      form,
      status,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const testForm = async (formName: string, testData: Record<string, any>) => {
    addTestResult(formName, 'pending', 'Testing form submission...');
    
    try {
      const formData = new FormData();
      formData.append('form-name', formName);
      
      Object.keys(testData).forEach(key => {
        formData.append(key, testData[key]);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        addTestResult(formName, 'success', 'Form submitted successfully!');
      } else {
        addTestResult(formName, 'error', `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      addTestResult(formName, 'error', `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test audit form
    await testForm('audit-request', {
      'website-url': 'https://test-website.com',
      'name': 'Test User',
      'email': 'test@example.com',
      'traffic-tier': '10k-50k',
      'earnings-tier': '100-1000',
      'accepted-terms': 'true'
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test contact form
    await testForm('contact-form', {
      'name': 'Test User',
      'email': 'test@example.com',
      'subject': 'Test Message',
      'message': 'This is a test message to verify form functionality.'
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test services form
    await testForm('services-inquiry', {
      'name': 'Test User',
      'email': 'test@example.com',
      'website': 'https://test-website.com',
      'traffic-tier': '50k-250k',
      'revenue-tier': '1000-5000',
      'goals': 'Test goals for form validation',
      'additional-info': 'Additional test information'
    });

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs opacity-0 hover:opacity-0 transition-opacity">
          Press Ctrl+Shift+T to open test panel
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <TestTube className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-semibold">Form Testing Panel</h2>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test All Forms
                </>
              )}
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No tests run yet. Click "Test All Forms" to start.
              </div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{result.form}</span>
                      <span className="text-xs text-gray-500">{result.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Testing Instructions:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Run tests on both local dev server and live Netlify site</li>
              <li>• Check Netlify dashboard for form submissions after testing</li>
              <li>• Verify confirmation emails are received (if configured)</li>
              <li>• Test with real email addresses for full validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};