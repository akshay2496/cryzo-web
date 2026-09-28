import { useCallback, useEffect, useState } from 'react';
import { fetchPlans } from '../services/api';

/**
 * Active subscription plans from the backend API.
 * status: 'loading' | 'ready' | 'error'
 */
export function usePlans() {
  const [state, setState] = useState({ status: 'loading', plans: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, status: 'loading' }));
    fetchPlans({ signal: ctrl.signal })
      .then((plans) => setState({ status: 'ready', plans }))
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        console.warn('[CRYZO] Could not load plans:', err?.message);
        setState({ status: 'error', plans: [] });
      });
    return () => ctrl.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
