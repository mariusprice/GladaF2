"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function EmailPreviewPage() {
  const [formData, setFormData] = useState({
    firstName: "Anna",
    lastName: "Andersson",
    email: "anna.andersson@example.com",
    phone: "070-123 45 67",
    address: "Storgatan 123, 12345 Stockholm",
    propertyType: "House",
    description: "Vi har ett hus med 15 fönster på 2 våningar. Behöver regelbunden putsning 4 gånger per år. Fönstren är ganska höga på andra våningen."
  })

  // Owner email template (same as in send-email.ts)
  const generateOwnerEmailHtml = () => {
    const { firstName, lastName, email, phone, address, propertyType, description } = formData
    
    return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ny Offertförfrågan - Glada Fönster</title>
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://gladafonster.se https://glada-13-14.vercel.app; img-src 'self' https: data:; style-src 'unsafe-inline';">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
</head>
<body style="background: #f5f6fa; margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f5f6fa; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(80,69,229,0.07);">
          <tr>
            <td align="center" style="padding: 32px 24px 0 24px;">
              <img src="https://glada-13-14.vercel.app/glada-fonster-kungsbacka-happy.png" alt="Glada Fönster Logo" width="48" height="48" style="display:block; margin-bottom: 8px;" />
              <div style="color: #5045e5; font-weight: bold; font-size: 22px; margin-bottom: 8px;">Glada Fönster Städ AB</div>
              <div style="font-size: 15px; color: #444; font-style: italic; margin-bottom: 18px; max-width: 340px;">
                Vi putsar inte bara fönster – vi förvandlar dem till speglar så klara att du kommer att svära på att du kan se <span style="color:#5045e5; font-weight:600;">ABBA</span> sjunga <span style="font-weight:600;">"Dancing Queen"</span> i din trädgård.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f7f7fc; border-radius: 6px;">
                <tr>
                  <td style="padding: 24px 20px 20px 20px; color: #222; font-size: 16px;">
                    <div style="font-weight:600; margin-bottom: 12px;">Ny offertförfrågan mottagen!</div>
                    <div style="margin-bottom: 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #666;">Namn:</strong>
                            <div style="margin-top: 4px;">${firstName} ${lastName}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #666;">E-post:</strong>
                            <div style="margin-top: 4px;"><a href="mailto:${email}" style="color: #5045e5; text-decoration: none;">${email}</a></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #666;">Telefon:</strong>
                            <div style="margin-top: 4px;"><a href="tel:${phone}" style="color: #5045e5; text-decoration: none;">${phone}</a></div>
                          </td>
                        </tr>
                        ${address ? `
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #666;">Adress:</strong>
                            <div style="margin-top: 4px;">${address}</div>
                          </td>
                        </tr>
                        ` : ''}
                        ${propertyType ? `
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #666;">Fastighetstyp:</strong>
                            <div style="margin-top: 4px;">${propertyType}</div>
                          </td>
                        </tr>
                        ` : ''}
                        ${description ? `
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #666;">Beskrivning:</strong>
                            <div style="margin-top: 4px; white-space: pre-wrap;">${description}</div>
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <div style="margin-bottom: 8px;">För att svara kunden:</div>
                      <div style="margin-bottom: 4px;">• Svara på detta mail</div>
                      <div>• Ring <a href="tel:${phone}" style="color: #5045e5; text-decoration: none;">${phone}</a></div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 24px 32px 24px;">
              <a href="https://gladafonster.se/" style="color: #5045e5; font-size: 18px; font-weight: bold; text-decoration: underline;">https://gladafonster.se/</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  }

  // Customer email template (same as in send-email.ts)
  const generateCustomerEmailHtml = () => {
    const { firstName, lastName } = formData
    
    return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Glada Fönster Städ AB - Bekräftelse</title>
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://gladafonster.se https://glada-13-14.vercel.app; img-src 'self' https: data:; style-src 'unsafe-inline';">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
</head>
<body style="background: #f5f6fa; margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f5f6fa; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(80,69,229,0.07);">
          <tr>
            <td align="center" style="padding: 32px 24px 0 24px;">
              <img src="https://glada-13-14.vercel.app/glada-fonster-kungsbacka-happy.png" alt="Glada Fönster Logo" width="48" height="48" style="display:block; margin-bottom: 8px;" />
              <div style="color: #5045e5; font-weight: bold; font-size: 22px; margin-bottom: 8px;">Glada Fönster Städ AB</div>
              <div style="font-size: 15px; color: #444; font-style: italic; margin-bottom: 18px; max-width: 340px;">
                Vi putsar inte bara fönster – vi förvandlar dem till speglar så klara att du kommer att svära på att du kan se <span style="color:#5045e5; font-weight:600;">ABBA</span> sjunga <span style="font-weight:600;">"Dancing Queen"</span> i din trädgård.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f7f7fc; border-radius: 6px;">
                <tr>
                  <td style="padding: 24px 20px 20px 20px; color: #222; font-size: 16px;">
                    <div style="font-weight:600; margin-bottom: 12px;">Hej ${firstName}${lastName ? ' ' + lastName : ''},</div>
                    <div style="margin-bottom: 18px;">
                      Vi har mottagit din förfrågan och vill tacka dig för att du kontaktat Glada Fönster.<br><br>
                      Vi kommer att granska dina uppgifter och återkomma till dig med ett svar via e-post inom högst 2 timmar.<br><br>
                      Om du ringer oss <span style="font-weight:600;">svarar vi i genomsnitt inom 5 sekunder.</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                      Vänliga hälsningar,<br>
                      <span style="font-weight:600;">Glada Fönster</span>
                    </div>
                    <div style="color: #5045e5; font-size: 15px; margin-top: 8px;">
                      <span style="font-size:18px; vertical-align:middle;">📞</span>
                      <a href="tel:0728512420" style="color: #5045e5; text-decoration: none;">Telefon: 072-851-2420</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 24px 32px 24px;">
              <a href="https://gladafonster.se/" style="color: #5045e5; font-size: 18px; font-weight: bold; text-decoration: underline;">https://gladafonster.se/</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetToDefaults = () => {
    setFormData({
      firstName: "Anna",
      lastName: "Andersson", 
      email: "anna.andersson@example.com",
      phone: "070-123 45 67",
      address: "Storgatan 123, 12345 Stockholm",
      propertyType: "House",
      description: "Vi har ett hus med 15 fönster på 2 våningar. Behöver regelbunden putsning 4 gånger per år. Fönstren är ganska höga på andra våningen."
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Email Template Preview
              </h1>
              <p className="text-lg text-gray-600">
                Preview how your email templates will look with different customer data
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Data Input */}
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Sample Customer Data</span>
                    <Button onClick={resetToDefaults} variant="outline" size="sm">
                      Reset to Defaults
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Förnamn</label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Förnamn"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Efternamn</label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Efternamn"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-post</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="070-123 45 67"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Adress</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Adress"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fastighetstyp</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                    >
                      <option value="">Välj typ</option>
                      <option value="House">Hus</option>
                      <option value="Townhouse">Radhus</option>
                      <option value="Apartment">Lägenhet</option>
                      <option value="Office">Kontor</option>
                      <option value="Shop">Butik</option>
                      <option value="Other">Annat</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Beskrivning</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Beskriv dina behov..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Email Preview */}
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Email Templates Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="owner" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="owner">Owner Email</TabsTrigger>
                      <TabsTrigger value="customer">Customer Email</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="owner" className="mt-6">
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <strong>Subject:</strong> 🏠 Ny offertförfrågan från {formData.firstName} {formData.lastName} - Glada Fönster
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                          <iframe
                            srcDoc={generateOwnerEmailHtml()}
                            className="w-full h-96 border-0"
                            title="Owner Email Preview"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="customer" className="mt-6">
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <strong>Subject:</strong> Tack för din förfrågan till Glada Fönster!
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                          <iframe
                            srcDoc={generateCustomerEmailHtml()}
                            className="w-full h-96 border-0"
                            title="Customer Email Preview"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Card className="border-0 shadow-lg bg-blue-50/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Use This Preview</h3>
                  <p className="text-gray-600">
                    Modify the customer data on the left to see how the email templates will look with different information. 
                    This helps you verify that all fields are properly displayed before deploying to production.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 