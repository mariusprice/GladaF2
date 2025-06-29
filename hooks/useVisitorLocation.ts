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
        // Set a fallback city instead of showing an error to the user
        setCity('Göteborg');
        setError(null); // Don't show error to user for location detection
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  return { city, loading, error };
}; 