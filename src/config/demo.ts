// Demo Configuration - Shows enterprise features for portfolio
// In production, these would come from environment variables and database

export const DEMO_CONFIG = {
  // Simulate different subscription tiers
  user: {
    id: 'demo-user-123',
    email: 'demo@example.com',
    subscriptionTier: 'premium', // 'free' | 'premium' | 'enterprise'
    emailsUsedThisMonth: 45,
    emailLimit: 10000,
    joinDate: '2024-01-15'
  },

  // Feature flags based on subscription
  features: {
    free: {
      emailsPerMonth: 100,
      aiRequests: 50,
      templates: ['basic'],
      analytics: false,
      customBranding: false,
      prioritySupport: false
    },
    premium: {
      emailsPerMonth: 10000,
      aiRequests: 1000,
      templates: ['basic', 'luxury', 'business', 'family'],
      analytics: true,
      customBranding: true,
      prioritySupport: true,
      advancedFilters: true
    },
    enterprise: {
      emailsPerMonth: 100000,
      aiRequests: 10000,
      templates: 'all',
      analytics: 'advanced',
      customBranding: true,
      whiteLabel: true,
      apiAccess: true,
      dedicatedSupport: true
    }
  },

  // Email provider configuration (for demo)
  emailProviders: {
    primary: {
      name: 'resend',
      status: 'active',
      dailyLimit: 10000,
      monthlyUsage: 2450
    },
    fallback: {
      name: 'sendgrid',
      status: 'standby',
      dailyLimit: 5000,
      monthlyUsage: 0
    }
  },

  // Analytics data (simulated)
  analytics: {
    thisMonth: {
      emailsSent: 2450,
      deliveryRate: 98.2,
      openRate: 72.5,
      clickRate: 18.3,
      bounceRate: 1.8
    },
    lastMonth: {
      emailsSent: 1890,
      deliveryRate: 97.8,
      openRate: 69.1,
      clickRate: 16.7,
      bounceRate: 2.2
    }
  },

  // Premium templates
  templates: {
    basic: {
      name: 'Basic Travel Itinerary',
      description: 'Simple, clean design',
      preview: '/templates/basic-preview.png'
    },
    luxury: {
      name: 'Luxury Travel Experience',
      description: 'Premium design with gold accents',
      preview: '/templates/luxury-preview.png',
      premium: true
    },
    business: {
      name: 'Business Travel Professional',
      description: 'Corporate-focused layout',
      preview: '/templates/business-preview.png',
      premium: true
    },
    family: {
      name: 'Family Adventure',
      description: 'Fun, colorful design for families',
      preview: '/templates/family-preview.png',
      premium: true
    }
  }
};

// Helper functions for demo
export const getCurrentUserFeatures = () => {
  return DEMO_CONFIG.features[DEMO_CONFIG.user.subscriptionTier as keyof typeof DEMO_CONFIG.features];
};

export const canSendEmail = () => {
  const features = getCurrentUserFeatures();
  return DEMO_CONFIG.user.emailsUsedThisMonth < features.emailsPerMonth;
};

export const getEmailsRemaining = () => {
  const features = getCurrentUserFeatures();
  return features.emailsPerMonth - DEMO_CONFIG.user.emailsUsedThisMonth;
};

export const getUpgradeMessage = () => {
  const tier = DEMO_CONFIG.user.subscriptionTier;
  
  if (tier === 'free') {
    return 'Upgrade to Premium for 10,000 emails/month, advanced templates, and analytics!';
  } else if (tier === 'premium') {
    return 'Upgrade to Enterprise for unlimited emails, white-label options, and API access!';
  }
  
  return 'You have access to all Enterprise features!';
};