import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, DEMO_ACCOUNTS } from '../../constants/roles';
import { Shield, Lock, User, LogIn, KeyRound, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { login, quickSwitchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostLoginRedirect = (roles = []) => {
    const from = location.state?.from?.pathname;
    if (from && from !== '/login') {
      navigate(from, { replace: true });
      return;
    }

    if (roles.includes(ROLES.ADMIN)) {
      navigate('/admin/dashboard', { replace: true });
    } else if (
      roles.includes(ROLES.FIELD_OFFICER) ||
      roles.includes(ROLES.DISTRICT_OFFICER) ||
      roles.includes(ROLES.FINANCE_OFFICER)
    ) {
      navigate('/officer/dashboard', { replace: true });
    } else {
      navigate('/beneficiary/dashboard', { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!username.trim() || !password.trim()) {
      setFormError('Please enter both username and password.');
      return;
    }

    setSubmitting(true);
    try {
      const data = await login(username.trim(), password);
      handlePostLoginRedirect(data.roles);
    } catch (err) {
      setFormError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickLogin = async (account) => {
    setUsername(account.username);
    setPassword(account.password);
    setSubmitting(true);
    setFormError('');
    try {
      const data = await quickSwitchRole(account);
      handlePostLoginRedirect(data.roles);
    } catch (err) {
      setFormError(err.message || 'Quick login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--gov-slate-100)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {/* Card Header */}
        <div
          style={{
            backgroundColor: 'var(--panel-dark)',
            color: 'var(--text-primary)',
            padding: '28px 32px',
            textAlign: 'center',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 12px',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            GS
          </div>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Government Subsidy Portal
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Single Sign-On for Beneficiaries, Verification Officers & Administrators
          </p>
        </div>

        <div style={{ padding: '32px' }}>
          {formError && (
            <div
              style={{
                backgroundColor: 'var(--gov-crimson-50)',
                border: '1px solid var(--gov-crimson-100)',
                color: 'var(--gov-crimson-700)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Official Username or Identity ID <span className="required">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <User
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--gov-slate-400)',
                  }}
                />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="e.g. admin, field_officer1, farmer_john"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={submitting}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Password <span className="required">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--gov-slate-400)',
                  }}
                />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="Enter your confidential password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submitting}
              style={{ width: '100%', marginTop: '8px' }}
              icon={LogIn}
            >
              Authenticate & Access Portal
            </Button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--gov-navy-900)',
                marginBottom: '10px',
              }}
            >
              <Sparkles size={14} color="var(--gov-gold-500)" />
              <span>1-Click Test Login with Pre-Configured Backend Accounts:</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  disabled={submitting}
                  style={{
                    backgroundColor: 'var(--gov-slate-50)',
                    border: '1px solid var(--gov-slate-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gov-navy-800)' }}>
                    {acc.label}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    Username: {acc.username}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
            New Beneficiary?{' '}
            <Link to="/register" style={{ fontWeight: 600, color: 'var(--gov-navy-700)' }}>
              Register for Grant Subsidies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
