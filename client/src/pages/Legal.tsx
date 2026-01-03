import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
}

function LegalLayout({ title, content }: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl font-display font-bold mb-8 text-white border-b border-white/10 pb-4">
              {title}
            </h1>
            <div className="prose prose-invert prose-headings:font-display prose-headings:text-gray-200 prose-p:text-gray-400 prose-li:text-gray-400 max-w-none">
              {content}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Privacy() {
  return (
    <LegalLayout 
      title="Privacy Policy" 
      content={
        <>
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          <p>
            At Cosmic Blueprint ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
          </p>
          <h3>1. Information We Collect</h3>
          <p>
            We collect the following types of information:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, date of birth, time of birth, and location of birth (required to generate astrology reports).</li>
            <li><strong>Payment Information:</strong> We do not store credit card details. All payments are processed securely through Stripe.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, and pages visited.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Generate and deliver your personalized astrology reports.</li>
            <li>Process transactions and send order confirmations.</li>
            <li>Improve our website and services.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h3>3. Data Sharing</h3>
          <p>
            We do not sell your personal data. We may share information with trusted third-party service providers (e.g., Stripe for payments, email delivery services) solely for the purpose of operating our business.
          </p>

          <h3>4. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </p>

          <h3>5. Contact Us</h3>
          <p>
            If you have questions about this policy, please contact us at support@cosmicblueprint.com.
          </p>
        </>
      } 
    />
  );
}

export function Terms() {
  return (
    <LegalLayout 
      title="Terms of Service" 
      content={
        <>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <p>
            Please read these Terms of Service ("Terms") carefully before using the Cosmic Blueprint website and services.
          </p>

          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.
          </p>

          <h3>2. Description of Service</h3>
          <p>
            Cosmic Blueprint provides personalized astrology reports based on the birth data you provide. These reports are for entertainment and informational purposes only.
          </p>

          <h3>3. User Responsibilities</h3>
          <p>
            You agree to provide accurate and complete birth information. We are not responsible for inaccurate reports resulting from incorrect data provided by you.
          </p>

          <h3>4. Refund Policy</h3>
          <p>
            Due to the personalized nature of our digital products, all sales are final. However, if you receive a defective or incorrect report due to a technical error on our part, please contact us for a replacement.
          </p>

          <h3>5. Intellectual Property</h3>
          <p>
            All content generated in our reports is the property of Cosmic Blueprint and is protected by copyright laws. You may not reproduce, distribute, or sell our reports without our written permission.
          </p>

          <h3>6. Limitation of Liability</h3>
          <p>
            Cosmic Blueprint shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>
        </>
      } 
    />
  );
}

export function Disclaimer() {
  return (
    <LegalLayout 
      title="Disclaimer" 
      content={
        <>
          <p>
            <strong>For Entertainment Purposes Only</strong>
          </p>
          <p>
            The information provided by Cosmic Blueprint in our astrology reports and on our website is for entertainment and personal growth purposes only. Astrology is not a proven science, and our reports should not be considered as absolute fact or prediction.
          </p>

          <h3>Not Professional Advice</h3>
          <p>
            Our services do not constitute professional advice of any kind, including but not limited to:
          </p>
          <ul>
            <li><strong>Medical Advice:</strong> We do not diagnose, treat, or cure any medical conditions. Always seek the advice of a qualified healthcare provider.</li>
            <li><strong>Legal Advice:</strong> Our reports do not replace the counsel of a licensed attorney.</li>
            <li><strong>Financial Advice:</strong> We are not financial advisors, and our insights should not be used as a basis for financial decisions.</li>
          </ul>

          <h3>Personal Responsibility</h3>
          <p>
            You acknowledge that you are solely responsible for your life choices and decisions. Cosmic Blueprint assumes no liability for any actions you take based on the information provided in our reports.
          </p>
        </>
      } 
    />
  );
}
