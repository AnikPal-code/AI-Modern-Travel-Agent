import React from 'react';
import { DEMO_CONFIG, getCurrentUserFeatures, getEmailsRemaining, getUpgradeMessage } from '../config/demo';
import './Dashboard.css';

export default function Dashboard() {
  const features = getCurrentUserFeatures();
  const emailsRemaining = getEmailsRemaining();
  const upgradeMessage = getUpgradeMessage();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 TravelHelperAI Dashboard</h2>
        <div className="subscription-badge">
          <span className={`badge ${DEMO_CONFIG.user.subscriptionTier}`}>
            {DEMO_CONFIG.user.subscriptionTier.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Usage Stats */}
        <div className="dashboard-card">
          <h3>📈 Usage This Month</h3>
          <div className="stat-row">
            <span>Emails Sent:</span>
            <span className="stat-value">{DEMO_CONFIG.user.emailsUsedThisMonth.toLocaleString()}</span>
          </div>
          <div className="stat-row">
            <span>Emails Remaining:</span>
            <span className="stat-value">{emailsRemaining.toLocaleString()}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(DEMO_CONFIG.user.emailsUsedThisMonth / features.emailsPerMonth) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Email Analytics */}
        <div className="dashboard-card">
          <h3>📧 Email Performance</h3>
          <div className="stat-row">
            <span>Delivery Rate:</span>
            <span className="stat-value success">{DEMO_CONFIG.analytics.thisMonth.deliveryRate}%</span>
          </div>
          <div className="stat-row">
            <span>Open Rate:</span>
            <span className="stat-value">{DEMO_CONFIG.analytics.thisMonth.openRate}%</span>
          </div>
          <div className="stat-row">
            <span>Click Rate:</span>
            <span className="stat-value">{DEMO_CONFIG.analytics.thisMonth.clickRate}%</span>
          </div>
        </div>

        {/* Provider Status */}
        <div className="dashboard-card">
          <h3>🚀 Email Providers</h3>
          <div className="provider-status">
            <div className="provider">
              <span className="provider-name">
                <span className="status-dot active"></span>
                {DEMO_CONFIG.emailProviders.primary.name}
              </span>
              <span className="provider-usage">
                {DEMO_CONFIG.emailProviders.primary.monthlyUsage.toLocaleString()} sent
              </span>
            </div>
            <div className="provider">
              <span className="provider-name">
                <span className="status-dot standby"></span>
                {DEMO_CONFIG.emailProviders.fallback.name}
              </span>
              <span className="provider-usage">Standby</span>
            </div>
          </div>
        </div>

        {/* Available Templates */}
        <div className="dashboard-card">
          <h3>🎨 Email Templates</h3>
          <div className="templates-grid">
            {Object.entries(DEMO_CONFIG.templates).map(([key, template]) => (
              <div 
                key={key} 
                className={`template-card ${template.premium && DEMO_CONFIG.user.subscriptionTier === 'free' ? 'locked' : ''}`}
              >
                <div className="template-name">{template.name}</div>
                <div className="template-desc">{template.description}</div>
                {template.premium && DEMO_CONFIG.user.subscriptionTier === 'free' && (
                  <div className="premium-lock">🔒 Premium</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      {DEMO_CONFIG.user.subscriptionTier !== 'enterprise' && (
        <div className="upgrade-banner">
          <div className="upgrade-content">
            <h3>🚀 Ready to Scale?</h3>
            <p>{upgradeMessage}</p>
            <button className="upgrade-btn">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}