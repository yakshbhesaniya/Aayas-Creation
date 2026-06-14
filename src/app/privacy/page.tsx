import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { alternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Aayas Creation — how we collect, use, and protect your information.",
  alternates: alternates("/privacy"),
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: "3rem 1rem", maxWidth: 820 }}>
      <h1>Privacy Policy</h1>
      <p className="text-secondary" style={{ marginTop: ".5rem" }}>
        Last updated: 14 June 2026
      </p>

      <p style={{ marginTop: "1.5rem" }}>
        This Privacy Policy explains how Aayas Creation (&quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your
        information when you visit our website{" "}
        <a href={SITE_URL}>{SITE_URL.replace(/^https?:\/\//, "")}</a>, contact us,
        or interact with our brand. Aayas Creation is a handmade jewellery brand
        based in Ahmedabad, Gujarat, India.
      </p>

      <h2 style={{ marginTop: "2rem" }}>Information we collect</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>Contact details you provide:</strong> when you submit our bulk
          order form, lead form, or contact us, we may collect your name, email
          address, phone number, and message.
        </li>
        <li>
          <strong>Basic usage data:</strong> standard, non-identifying analytics
          such as pages visited, which our hosting and analytics providers may
          collect automatically.
        </li>
      </ul>

      <h2 style={{ marginTop: "2rem" }}>How we use your information</h2>
      <ul style={{ lineHeight: 1.9 }}>
        <li>To respond to your enquiries and process bulk or wholesale orders.</li>
        <li>To send you information you have requested about our products.</li>
        <li>To improve our website, products, and customer experience.</li>
      </ul>

      <h2 style={{ marginTop: "2rem" }}>Sharing of information</h2>
      <p>
        We do not sell your personal information. We may share limited information
        with trusted service providers who help us operate our website and
        communicate with you (for example, our website host and our email-sending
        provider), only as needed to provide these services.
      </p>

      <h2 style={{ marginTop: "2rem" }}>Third-party links and platforms</h2>
      <p>
        Our website links to third-party platforms such as Amazon, Instagram,
        Facebook, and Pinterest. We also publish our own product images to our own
        Pinterest business account. These platforms have their own privacy
        policies, and we are not responsible for their practices. Please review
        their policies when you visit them.
      </p>

      <h2 style={{ marginTop: "2rem" }}>Data retention</h2>
      <p>
        We keep the information you provide only for as long as needed to respond
        to your enquiry, fulfil orders, or as required by law, after which it is
        deleted or anonymised.
      </p>

      <h2 style={{ marginTop: "2rem" }}>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal
        information you have shared with us by contacting us at the details below.
      </p>

      <h2 style={{ marginTop: "2rem" }}>Contact us</h2>
      <p>
        If you have any questions about this Privacy Policy or your information,
        contact us at:
      </p>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          Email:{" "}
          <a href="mailto:aayascreation@gmail.com">aayascreation@gmail.com</a>
        </li>
        <li>
          Phone: <a href="tel:+919104861625">+91 9104861625</a>
        </li>
        <li>Location: Ahmedabad, Gujarat, India</li>
      </ul>

      <p style={{ marginTop: "2rem" }} className="text-secondary">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with a revised &quot;Last updated&quot; date.
      </p>
    </div>
  );
}
