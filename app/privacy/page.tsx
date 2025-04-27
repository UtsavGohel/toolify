import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - Micro Tools Hub',
  description: 'Privacy policy and data collection practices for Micro Tools Hub',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Shield className="mr-2 h-6 w-6" />
            Privacy Policy
          </CardTitle>
          <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use our tools and services</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our website</li>
            </ul>
            <p>The information we collect may include:</p>
            <ul className="list-disc pl-6">
              <li>Usage data and analytics</li>
              <li>Device information</li>
              <li>IP address and location data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Analyze usage patterns</li>
              <li>Send periodic emails (if subscribed)</li>
              <li>Display relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to:</p>
            <ul className="list-disc pl-6">
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Provide personalized content and ads</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6">
              <li>Google Analytics for website analytics</li>
              <li>Google AdSense for displaying advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
            <p>We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: privacy@microtools.com</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}