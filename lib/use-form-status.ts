'use client';

import { useState, useEffect, useCallback } from 'react';

export function useFormStatus(formType: string, userId: string | undefined) {
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!userId) {
      setChecking(false);
      return;
    }

    fetch('/api/form-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, formType }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitted(data.exists);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [userId, formType]);

  return { submitted, checking };
}
