"use client";

import { useState, useEffect } from 'react';
import { getVisitorLocation } from '@/lib/location';

export const useVisitorLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLoading(true);
        setError(null);
        const detectedCity = await getVisitorLocation();
        setCity(detectedCity);
      } catch (err) {
        console.error('Error detecting location:', err);
        setError('Kunde inte hitta din plats');
        setCity('Göteborg'); // Fallback
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  return { city, loading, error };
}; 