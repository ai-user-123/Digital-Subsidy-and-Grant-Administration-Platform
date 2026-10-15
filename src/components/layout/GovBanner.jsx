import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck } from 'lucide-react';

export const GovBanner = () => {
  const { user, quickSwitchRole, demoAccounts } = useAuth();

  return (
    <div
      style={{
        backgroundColor: 'var(--panel-dark)',
        color: 'var(--text-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: '6px 24px',
        fontSize: '11px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
          Government of India — Public Financial Management &amp; Direct Benefit Transfer Cell
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <UserCheck size={13} /> Quick demo switcher:
        </span>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {demoAccounts.map((acc) => {
            const isActive = user?.username === acc.username;
            return (
              <button
                key={acc.username}
                onClick={() => quickSwitchRole(acc)}
                title={`Switch to ${acc.label}`}
                style={{
                  backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#0a0b0e' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '3px',
                  padding: '2px 7px',
                  fontSize: '10px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {acc.username}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
