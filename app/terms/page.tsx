import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollText } from "lucide-react";

export const metadata = {
  title: "Terms of Service - Micro Tools Hub",
  description: "Terms of service and conditions for using Micro Tools Hub",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ScrollText className="mr-2 h-6 w-6" />
            Terms of Service
          </CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Micro Tools Hub, you accept and agree to be
              bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
            <ul className="list-disc pl-6">
              <li>
                Permission is granted to temporarily use our tools for personal,
                non-commercial use.
              </li>
              <li>
                This license shall automatically terminate if you violate any of
                these restrictions.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
            <p>
              The tools and services are provided &quot;as is&quot;. We make no
              warranties, expressed or implied, and hereby disclaim all
              warranties, including without limitation:
            </p>
            <ul className="list-disc pl-6">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
            <p>
              In no event shall Micro Tools Hub be liable for any damages
              arising out of the use or inability to use our tools and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Advertisements</h2>
            <p>
              Our website displays third-party advertisements. We are not
              responsible for the content of these advertisements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Revisions</h2>
            <p>
              We reserve the right to update these terms at any time. You are
              expected to check this page periodically for changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of your jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
            <p>
              Questions about the Terms of Service should be sent to:
              terms@microtools.com
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
