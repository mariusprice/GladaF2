"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useVisitorLocation } from "@/hooks/useVisitorLocation"
import { getVisitorCity, getLocationFromBrowser, reverseGeocode, getNearestCity, SWEDISH_CITIES } from "@/lib/location"
import { MapPin, Globe, Smartphone, Wifi } from "lucide-react"

export default function LocationTestPage() {
  const { city, loading, error } = useVisitorLocation()
  const [ipCity, setIpCity] = useState<string | null>(null)
  const [browserLocation, setBrowserLocation] = useState<{latitude: number, longitude: number} | null>(null)
  const [reverseGeocodedCity, setReverseGeocodedCity] = useState<string | null>(null)
  const [testing, setTesting] = useState(false)

  const testLocationServices = async () => {
    setTesting(true)
    
    try {
      // Test IP geolocation
      const ipResult = await getVisitorCity()
      setIpCity(ipResult)
      
      // Test browser geolocation
      try {
        const browserResult = await getLocationFromBrowser()
        setBrowserLocation(browserResult)
        
        // Test reverse geocoding
        const geocodedCity = await reverseGeocode(browserResult.latitude, browserResult.longitude)
        setReverseGeocodedCity(geocodedCity)
      } catch (browserError) {
        console.log('Browser geolocation failed:', browserError)
      }
    } catch (error) {
      console.error('Location testing failed:', error)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Platsdetektering Test
              </h1>
              <p className="text-xl text-gray-600">
                Testa och debugga platsdetekteringsfunktionen
              </p>
            </div>

            {/* Current Location Display */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span>Aktuell Plats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>Hämtar plats...</span>
                  </div>
                ) : error ? (
                  <div className="text-red-600">
                    <p>Fel: {error}</p>
                  </div>
                ) : city ? (
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="bg-blue-600">
                      {city}
                    </Badge>
                    <span className="text-gray-600">Dina Fönster {city}</span>
                  </div>
                ) : (
                  <div className="text-gray-500">Ingen plats hittad</div>
                )}
              </CardContent>
            </Card>

            {/* Test Services */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Testa Platsdetektering</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testLocationServices} 
                  disabled={testing}
                  className="mb-4"
                >
                  {testing ? 'Testar...' : 'Testa Alla Tjänster'}
                </Button>

                <div className="space-y-4">
                  {/* IP Geolocation Result */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Wifi className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">IP Geolocation:</p>
                      <p className="text-sm text-gray-600">
                        {ipCity ? `${ipCity} → ${getNearestCity(ipCity)}` : 'Inte testad'}
                      </p>
                    </div>
                  </div>

                  {/* Browser Geolocation Result */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Browser Geolocation:</p>
                      <p className="text-sm text-gray-600">
                        {browserLocation 
                          ? `${browserLocation.latitude.toFixed(4)}, ${browserLocation.longitude.toFixed(4)}`
                          : 'Inte tillgänglig'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Reverse Geocoding Result */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Reverse Geocoding:</p>
                      <p className="text-sm text-gray-600">
                        {reverseGeocodedCity 
                          ? `${reverseGeocodedCity} → ${getNearestCity(reverseGeocodedCity)}`
                          : 'Inte tillgänglig'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Swedish Cities List */}
            <Card>
              <CardHeader>
                <CardTitle>Städer Vi Tjänar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {SWEDISH_CITIES.map((cityName) => (
                    <Badge 
                      key={cityName} 
                      variant={city === cityName ? "default" : "secondary"}
                      className={city === cityName ? "bg-blue-600" : ""}
                    >
                      {cityName}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 