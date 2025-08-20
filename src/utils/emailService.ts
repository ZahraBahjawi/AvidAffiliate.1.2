import emailjs from 'emailjs-com';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  USER_ID: 'your_user_id', // Replace with your EmailJS user ID
  TEMPLATES: {
    AUDIT_REQUEST: 'template_audit', // Replace with your template ID
    CONTACT_FORM: 'template_contact', // Replace with your template ID
    SERVICES_INQUIRY: 'template_services' // Replace with your template ID
  }
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.USER_ID);

// Send confirmation email via EmailJS
export const sendConfirmationEmail = async (
  templateType: 'audit' | 'contact' | 'services',
  userData: any
): Promise<boolean> => {
  try {
    let templateId = '';
    let templateParams = {};

    switch (templateType) {
      case 'audit':
        templateId = EMAILJS_CONFIG.TEMPLATES.AUDIT_REQUEST;
        templateParams = {
          to_email: userData.email,
          to_name: userData.name,
          website_url: userData.url,
          traffic_tier: userData.trafficTier,
          earnings_tier: userData.earningsTier,
          from_name: 'AvidAffiliate Team'
        };
        break;
      case 'contact':
        templateId = EMAILJS_CONFIG.TEMPLATES.CONTACT_FORM;
        templateParams = {
          to_email: userData.email,
          to_name: userData.name,
          subject: userData.subject,
          message: userData.message,
          from_name: 'AvidAffiliate Team'
        };
        break;
      case 'services':
        templateId = EMAILJS_CONFIG.TEMPLATES.SERVICES_INQUIRY;
        templateParams = {
          to_email: userData.email,
          to_name: userData.name,
          website: userData.website,
          traffic_tier: userData.trafficTier,
          revenue_tier: userData.revenueTier,
          goals: userData.goals,
          from_name: 'AvidAffiliate Team'
        };
        break;
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      templateId,
      templateParams
    );

    console.log('✅ Confirmation email sent:', result);
    return true;
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    return false;
  }
};

// Email notification service for audit process
export interface EmailNotificationData {
  userEmail: string;
  userName: string;
  websiteUrl: string;
  auditId: string;
}

export interface AuditResultsData extends EmailNotificationData {
  scorecardData: {
    score: string;
    unmonetized_links: number;
    broken_links: number;
    better_program_links: number;
    estimated_monthly_uplift: number;
  };
  auditSummary: string;
}

// Email templates
const getAuditStartedEmailTemplate = (data: EmailNotificationData) => ({
  subject: `🚀 Your AvidAffiliate Report Card Generation Has Started - ${data.websiteUrl}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Audit Started - AvidAffiliate</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 40px 30px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .highlight-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .status-badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin: 10px 0; }
        .timeline { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .timeline-item { display: flex; align-items: center; margin: 10px 0; }
        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; margin-right: 15px; }
        .timeline-dot.active { background: #10b981; }
        .timeline-dot.pending { background: #e5e7eb; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
        .website-info { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">AvidAffiliate</div>
          <h1 style="margin: 0; font-size: 28px;">Your Report Card Generation is Now Running!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We're analyzing your website for affiliate revenue opportunities</p>
        </div>
        
        <div class="content">
          <p>Hi ${data.userName},</p>
          
          <p>Great news! We've successfully started generating your comprehensive affiliate report card. Our advanced analysis system is now working to uncover hidden revenue opportunities on your website.</p>
          
          <div class="website-info">
            <strong>Website Being Analyzed:</strong><br>
            <a href="${data.websiteUrl}" style="color: #3b82f6; text-decoration: none;">${data.websiteUrl}</a>
          </div>
          
          <div class="status-badge">✅ Analysis In Progress</div>
          
          <div class="highlight-box">
            <h3 style="margin-top: 0; color: #1e40af;">What We're Analyzing:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Link Monetization Opportunities</strong> - Identifying unmonetized outbound links</li>
              <li><strong>Broken Link Detection</strong> - Finding and cataloging broken affiliate links</li>
              <li><strong>Commission Rate Optimization</strong> - Discovering higher-paying affiliate programs</li>
              <li><strong>Revenue Projection Modeling</strong> - Calculating your potential monthly uplift</li>
              <li><strong>Competitive Analysis</strong> - Benchmarking against industry standards</li>
            </ul>
          </div>
          
          <div class="timeline">
            <h3 style="margin-top: 0; color: #374151;">Report Card Progress Timeline:</h3>
            <div class="timeline-item">
              <div class="timeline-dot active"></div>
              <span><strong>Analysis Started</strong> - Report card generation initiated</span>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot pending"></div>
              <span><strong>Link Analysis</strong> - Scanning all outbound links (Est. 30-60 min)</span>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot pending"></div>
              <span><strong>Opportunity Identification</strong> - Finding monetization gaps (Est. 15-30 min)</span>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot pending"></div>
              <span><strong>Report Generation</strong> - Creating your personalized report card (Est. 15 min)</span>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot pending"></div>
              <span><strong>Results Delivered</strong> - Complete report card sent to your inbox</span>
            </div>
          </div>
          
          <p><strong>Estimated Completion Time:</strong> 1-2 hours</p>
          <p>You'll receive another email as soon as your detailed report card is ready, including actionable recommendations.</p>
          
          <p>Questions while you wait? Simply reply to this email - we're here to help!</p>
          
          <p>Best regards,<br>
          <strong>The AvidAffiliate Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>AvidAffiliate</strong> - Affiliate Revenue Optimization</p>
          <p>This email was sent regarding your report card request for ${data.websiteUrl}</p>
          <p>Request ID: ${data.auditId}</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Hi ${data.userName},

Your AvidAffiliate report card generation has started!

We're now generating your report card for ${data.websiteUrl} to uncover hidden affiliate revenue opportunities.

What we're analyzing:
- Link monetization opportunities (up to 1,000 links)
- Broken link detection  
- Commission rate optimization
- Revenue projection modeling
- Competitive analysis

Estimated completion time: 1-2 hours

You'll receive your detailed report card via email as soon as the analysis is complete.

Questions? Simply reply to this email.

Best regards,
The AvidAffiliate Team

Request ID: ${data.auditId}
  `
});

const getAuditCompletedEmailTemplate = (data: AuditResultsData) => ({
  subject: `📊 Your AvidAffiliate Report Card Is Ready - ${data.scorecardData.score} Score!`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Audit Results - AvidAffiliate</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 40px 30px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .score-display { text-align: center; margin: 30px 0; }
        .score-circle { display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: ${data.scorecardData.score.startsWith('A') ? '#10b981' : data.scorecardData.score.startsWith('B') ? '#f59e0b' : '#ef4444'}; color: white; font-size: 48px; font-weight: bold; line-height: 120px; margin-bottom: 15px; }
        .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
        .metric-card { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #3b82f6; }
        .metric-value { font-size: 24px; font-weight: bold; color: #1e40af; margin-bottom: 5px; }
        .metric-label { font-size: 14px; color: #6b7280; }
        .highlight-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .button { display: inline-block; background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; font-size: 16px; }
        .footer { background: #f8fafc; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
        .website-info { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
        @media (max-width: 600px) { .metrics-grid { grid-template-columns: 1fr; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">AvidAffiliate</div>
          <h1 style="margin: 0; font-size: 28px;">🎉 Your Report Card Is Ready!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Comprehensive analysis complete with actionable insights</p>
        </div>
        
        <div class="content">
          <p>Hi ${data.userName},</p>
          
          <p>Excellent news! We've completed your comprehensive affiliate report card and discovered significant revenue optimization opportunities on your website.</p>
          
          <div class="website-info">
            <strong>Website Analyzed:</strong><br>
            <a href="${data.websiteUrl}" style="color: #3b82f6; text-decoration: none;">${data.websiteUrl}</a>
          </div>
          
          <div class="score-display">
            <div class="score-circle">${data.scorecardData.score}</div>
            <h2 style="margin: 0; color: #374151;">Overall Affiliate Health Grade</h2>
          </div>
          
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-value">${data.scorecardData.unmonetized_links}</div>
              <div class="metric-label">Unmonetized Links Found</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${data.scorecardData.broken_links}</div>
              <div class="metric-label">Broken Links Detected</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${data.scorecardData.better_program_links}</div>
              <div class="metric-label">Better Program Opportunities</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">$${data.scorecardData.estimated_monthly_uplift.toLocaleString()}</div>
              <div class="metric-label">Estimated Monthly Uplift</div>
            </div>
          </div>
          
          <div class="highlight-box">
            <h3 style="margin-top: 0; color: #065f46;">💰 Revenue Opportunity Summary:</h3>
            <p style="margin-bottom: 0;">${data.auditSummary}</p>
          </div>
          
          ${data.scorecardData.estimated_monthly_uplift > 1000 ? `
          <div class="warning-box">
            <h3 style="margin-top: 0; color: #92400e;">⚡ High-Impact Opportunity Detected!</h3>
            <p style="margin-bottom: 0;">Your website shows exceptional potential for revenue growth. We strongly recommend taking action on these findings to maximize your affiliate income.</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://avidaffiliate.com" class="button">
              📊 View Full Report Card
            </a>
          </div>
          
          <h3 style="color: #374151;">🚀 Next Steps:</h3>
          <ol style="padding-left: 20px;">
            <li><strong>Review Your Report Card:</strong> Click the link above to access your complete results</li>
            <li><strong>Prioritize Quick Wins:</strong> Start with the highest-impact, lowest-effort opportunities</li>
            <li><strong>Consider Full Audit & Implementation:</strong> Our comprehensive service can handle all technical aspects</li>
            <li><strong>Schedule a Strategy Call:</strong> Discuss custom optimization strategies with our experts</li>
          </ol>
          
          <p><strong>Questions about your results?</strong> Simply reply to this email or contact us at hello@avidaffiliate.com</p>
          
          <p>Congratulations on taking this important step toward maximizing your affiliate revenue!</p>
          
          <p>Best regards,<br>
          <strong>The AvidAffiliate Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>AvidAffiliate</strong> - Affiliate Revenue Optimization</p>
          <p>This email contains your report card for ${data.websiteUrl}</p>
          <p>Request ID: ${data.auditId} | Completed: ${new Date().toLocaleDateString()}</p>
          <p style="margin-top: 20px;">
            <a href="https://avidaffiliate.com/privacy" style="color: #6b7280; text-decoration: none;">Privacy Policy</a> | 
            <a href="https://avidaffiliate.com/terms" style="color: #6b7280; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Hi ${data.userName},

Your AvidAffiliate report card is ready!

Website Analyzed: ${data.websiteUrl}
Overall Grade: ${data.scorecardData.score}

KEY FINDINGS:
- Unmonetized Links: ${data.scorecardData.unmonetized_links}
- Broken Links: ${data.scorecardData.broken_links}  
- Better Program Opportunities: ${data.scorecardData.better_program_links}
- Estimated Monthly Uplift: $${data.scorecardData.estimated_monthly_uplift.toLocaleString()}

SUMMARY:
${data.auditSummary}

NEXT STEPS:
1. Review your complete report card at: https://avidaffiliate.com
2. Prioritize quick wins for immediate impact
3. Consider our comprehensive audit and implementation service
4. Schedule a strategy call with our experts

Questions? Reply to this email or contact hello@avidaffiliate.com

Best regards,
The AvidAffiliate Team

Request ID: ${data.auditId}
  `
});

// Email sending functions (these would integrate with your email service)
export const sendAuditStartedNotification = async (data: EmailNotificationData): Promise<boolean> => {
  try {
    const emailTemplate = getAuditStartedEmailTemplate(data);
    
    // In a real implementation, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun  
    // - AWS SES
    // - Postmark
    // - Resend
    
    console.log('📧 Sending report card started notification:', {
      to: data.userEmail,
      subject: emailTemplate.subject,
      requestId: data.auditId
    });
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll log the email content
    console.log('Email sent successfully to:', data.userEmail);
    
    return true;
  } catch (error) {
    console.error('Failed to send audit started notification:', error);
    return false;
  }
};

export const sendAuditCompletedNotification = async (data: AuditResultsData): Promise<boolean> => {
  try {
    const emailTemplate = getAuditCompletedEmailTemplate(data);
    
    console.log('📧 Sending report card completed notification:', {
      to: data.userEmail,
      subject: emailTemplate.subject,
      requestId: data.auditId,
      score: data.scorecardData.score,
      uplift: data.scorecardData.estimated_monthly_uplift
    });
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Email sent successfully to:', data.userEmail);
    
    return true;
  } catch (error) {
    console.error('Failed to send audit completed notification:', error);
    return false;
  }
};

// Helper function to generate audit summary
export const generateAuditSummary = (scorecardData: AuditResultsData['scorecardData']): string => {
  const { unmonetized_links, broken_links, better_program_links, estimated_monthly_uplift } = scorecardData;
  
  let summary = `Your website analysis revealed ${unmonetized_links} unmonetized link opportunities and ${broken_links} broken links that need attention. `;
  
  if (better_program_links > 0) {
    summary += `We also identified ${better_program_links} opportunities to upgrade to higher-paying affiliate programs. `;
  }
  
  if (estimated_monthly_uplift > 2000) {
    summary += `With an estimated monthly revenue uplift of $${estimated_monthly_uplift.toLocaleString()}, your website has exceptional monetization potential that could significantly impact your bottom line.`;
  } else if (estimated_monthly_uplift > 500) {
    summary += `The estimated monthly revenue uplift of $${estimated_monthly_uplift.toLocaleString()} represents a solid opportunity to boost your affiliate income.`;
  } else {
    summary += `The estimated monthly uplift of $${estimated_monthly_uplift.toLocaleString()} represents a solid foundation for growth through comprehensive audit and implementation.`;
  }
  
  return summary;
};

// Email service configuration (would be set via environment variables)
export const EMAIL_CONFIG = {
  FROM_EMAIL: 'hello@avidaffiliate.com',
  FROM_NAME: 'AvidAffiliate Team',
  REPLY_TO: 'hello@avidaffiliate.com',
  // Add your email service API keys here
  // SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  // MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  // etc.
};