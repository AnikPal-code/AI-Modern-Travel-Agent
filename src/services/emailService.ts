// Email Service - Send itinerary via backend

interface EmailRequest {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  messageId?: string;
}

const EMAIL_BACKEND_URL = process.env.REACT_APP_EMAIL_BACKEND_URL || 'http://localhost:3001';

export const sendItineraryEmail = async (emailData: EmailRequest): Promise<EmailResponse> => {
  try {
    console.log('📧 Sending itinerary email...');
    console.log('To:', emailData.to_email);

    const response = await fetch(`${EMAIL_BACKEND_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result: EmailResponse = await response.json();

    if (!response.ok) {
      console.error('❌ Email sending failed:', result.error);
      throw new Error(result.error || 'Failed to send email');
    }

    console.log('✅ Email sent successfully!');
    return result;
  } catch (error) {
    console.error('❌ Email service error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Email backend is not running. Please start it with: cd email-backend && npm install && npm start');
      }
      throw error;
    }
    
    throw new Error('Failed to send email');
  }
};

export const checkEmailBackend = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${EMAIL_BACKEND_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
