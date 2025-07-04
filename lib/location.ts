export const SWEDISH_CITIES = [
  'Varberg',
  'Åskloster', 
  'Väröbacka', 
  'Bua', 
  'Frillesås', 
  'Åsa', 
  'Kullavik', 
  'Särö', 
  'Kungsbacka', 
  'Billdal', 
  'Askim', 
  'Mölndal', 
  'Göteborg', 
  'Kungälv', 
  'Torslanda'
];

export const getVisitorCity = async (): Promise<string | null> => {
  // Temporarily disable IP geolocation to prevent fetch errors
  // TODO: Re-enable when a more reliable service is found
  console.log('IP geolocation temporarily disabled');
  return null;
  
  // Original code commented out for now:
  /*
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.error('Error fetching visitor city:', error);
    // Don't throw the error, just return null to allow fallback
    return null;
  }
  */
};

export const getNearestCity = (userCity: string | null): string => {
  if (!userCity) return 'Göteborg'; // Default fallback
  
  const normalizedUserCity = userCity.toLowerCase();
  
  // First, try exact match
  const exactMatch = SWEDISH_CITIES.find(city => 
    city.toLowerCase() === normalizedUserCity
  );
  if (exactMatch) return exactMatch;
  
  // Then try partial match
  const partialMatch = SWEDISH_CITIES.find(city => 
    city.toLowerCase().includes(normalizedUserCity) ||
    normalizedUserCity.includes(city.toLowerCase())
  );
  if (partialMatch) return partialMatch;
  
  // If no match found, return default
  return 'Göteborg';
};

export const getLocationFromBrowser = (): Promise<{latitude: number, longitude: number}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

export const reverseGeocode = async (latitude: number, longitude: number): Promise<string | null> => {
  // Temporarily disable reverse geocoding to prevent fetch errors
  // TODO: Re-enable when needed
  console.log('Reverse geocoding temporarily disabled');
  return null;
  
  // Original code commented out for now:
  /*
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
    );
    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
  */
};

export const getVisitorLocation = async (): Promise<string> => {
  try {
    const userCity = await getVisitorCity(); // Only IP-based
    const nearestCity = getNearestCity(userCity);
    return nearestCity;
  } catch (error) {
    console.error('IP geolocation failed:', error);
    // Always return a fallback city instead of throwing
    return 'Göteborg'; // Fallback
  }
}; 