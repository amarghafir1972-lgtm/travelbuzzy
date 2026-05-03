import LegalLayout from "./LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="TravelBuzzy is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how you can control it."
      lastUpdated="May 2, 2026"
    >
      <h2>1. Who We Are</h2>
      <p>
        TravelBuzzy ("we", "us", "our") operates the website travelbuzzy.com. We are an independent travel media and affiliate publishing company. Our registered contact email is <strong>privacy@travelbuzzy.com</strong>.
      </p>

      <h2>2. What Data We Collect</h2>
      <h3>2.1 Data You Provide Directly</h3>
      <ul>
        <li><strong>Email address</strong> — when you subscribe to our newsletter</li>
        <li><strong>Name</strong> — if optionally provided on form submission</li>
        <li><strong>Messages</strong> — when you contact us via email or contact form</li>
      </ul>

      <h3>2.2 Data Collected Automatically</h3>
      <ul>
        <li><strong>IP address</strong> — logged by our hosting provider and analytics tools</li>
        <li><strong>Browser and device type</strong></li>
        <li><strong>Pages visited and time spent</strong></li>
        <li><strong>Referring URL</strong> — the page that linked you to our site</li>
        <li><strong>Clicks on affiliate links</strong> — tracked via affiliate network scripts</li>
        <li><strong>Cookies and similar tracking technologies</strong> — see our Cookie Policy for details</li>
      </ul>

      <h3>2.3 Data From Third Parties</h3>
      <p>
        Affiliate networks (such as Booking.com, Expedia, and similar partners) may share aggregated, anonymised conversion data with us — for example, that a booking occurred after a referral from our site. We do not receive personally identifiable information about individual bookings from affiliate partners.
      </p>

      <h2>3. How We Use Your Data</h2>
      <ul>
        <li>To send you our newsletter and deal alerts (email subscribers only)</li>
        <li>To respond to enquiries you send us</li>
        <li>To analyse site traffic and improve our content</li>
        <li>To measure affiliate link performance and editorial quality</li>
        <li>To comply with legal obligations</li>
        <li>To detect and prevent fraud or abuse</li>
      </ul>
      <p>
        We do not sell, rent, or trade your personal data to third parties for their own marketing purposes.
      </p>

      <h2>4. Legal Basis for Processing (GDPR)</h2>
      <p>If you are in the European Economic Area (EEA) or UK, we process your data under the following legal bases:</p>
      <ul>
        <li><strong>Consent</strong> — for newsletter subscriptions and non-essential cookies</li>
        <li><strong>Legitimate interests</strong> — for site analytics, fraud prevention, and improving our service</li>
        <li><strong>Contractual necessity</strong> — to respond to enquiries you initiate</li>
        <li><strong>Legal obligation</strong> — where required by law</li>
      </ul>

      <h2>5. Cookies</h2>
      <p>
        We use cookies and similar technologies to operate and improve the site. For a detailed breakdown of which cookies we use and how to manage them, please read our <a href="/cookie-policy">Cookie Policy</a>.
      </p>

      <h2>6. Third-Party Services</h2>
      <p>We use the following categories of third-party services that may process your data:</p>
      <ul>
        <li><strong>Analytics</strong> — e.g. Google Analytics (anonymised IP), Plausible, or similar. Used to understand traffic patterns.</li>
        <li><strong>Email marketing</strong> — e.g. Mailchimp, ConvertKit, or similar. Used to send newsletters to subscribers.</li>
        <li><strong>Affiliate networks</strong> — e.g. Booking.com Partner Programme, Commission Junction, Impact, ShareASale. These set their own tracking cookies when you click affiliate links.</li>
        <li><strong>Hosting &amp; CDN</strong> — our hosting provider may log basic access data.</li>
        <li><strong>Advertising</strong> — we may display display advertising (e.g. Google AdSense) in the future, which would involve third-party ad technology.</li>
      </ul>
      <p>Each of these third parties has its own privacy policy. We encourage you to review them.</p>

      <h2>7. Data Retention</h2>
      <ul>
        <li><strong>Newsletter subscribers</strong> — data is retained until you unsubscribe, after which it is deleted within 30 days</li>
        <li><strong>Contact enquiries</strong> — retained for up to 2 years or as required to resolve your enquiry</li>
        <li><strong>Server logs</strong> — retained for up to 90 days</li>
        <li><strong>Analytics data</strong> — typically retained for 26 months in aggregated, anonymised form</li>
      </ul>

      <h2>8. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
      <ul>
        <li><strong>Access</strong> — request a copy of the data we hold about you</li>
        <li><strong>Rectification</strong> — request correction of inaccurate data</li>
        <li><strong>Erasure</strong> — request deletion of your data ("right to be forgotten")</li>
        <li><strong>Restriction</strong> — request that we limit processing of your data</li>
        <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
        <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
        <li><strong>Withdraw consent</strong> — at any time, where processing is based on consent</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at <strong>privacy@travelbuzzy.com</strong>. We will respond within 30 days.
      </p>
      <p>
        If you are in the EEA or UK and believe we are processing your data unlawfully, you have the right to lodge a complaint with your national data protection authority.
      </p>

      <h2>9. California Privacy Rights (CCPA)</h2>
      <p>
        If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete your information, and the right to opt out of the sale of personal information. <strong>TravelBuzzy does not sell personal information.</strong> To exercise your CCPA rights, contact us at <strong>privacy@travelbuzzy.com</strong>.
      </p>

      <h2>10. Children's Privacy</h2>
      <p>
        TravelBuzzy is not directed at children under the age of 13 (or 16 in the EEA). We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this page periodically. Continued use of the site after any changes constitutes acceptance of the revised policy.
      </p>

      <h2>12. Contact</h2>
      <p>
        For any privacy-related questions or to exercise your rights, contact us at <strong>privacy@travelbuzzy.com</strong>.
      </p>
    </LegalLayout>
  );
}
