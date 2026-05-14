// constants/legalContent.ts

export type LegalSection = {
  title: string;
  content: string[];
};

export type LegalContent = {
  pageTitle: string;
  updatedAt: string;
  introduction: string;
  sections: LegalSection[];
};

export const PRIVACY_POLICY: LegalContent = {
  pageTitle: "Privacy Policy",

  updatedAt: "May 14, 2026",

  introduction:
    "Your privacy is important to us. This healthcare application is designed to securely manage your medical records, documents, and healthcare-related information while protecting your personal data.",

  sections: [
    {
      title: "Information We Collect",
      content: [
        "We may collect personal information such as your name, email address, uploaded medical documents, prescriptions, insurance files, and healthcare-related records.",
        "We may also collect device information, app usage data, and diagnostic logs to improve app performance.",
      ],
    },

    {
      title: "How We Use Your Information",
      content: [
        "To securely store and manage your healthcare documents.",
        "To improve app functionality, user experience, and customer support.",
        "To notify users regarding important account or security updates.",
      ],
    },

    {
      title: "Data Security",
      content: [
        "We use secure technologies and encryption methods to help protect your information.",
        "Uploaded files and healthcare data are stored securely and access is restricted to authorized users only.",
      ],
    },

    {
      title: "Sharing of Information",
      content: [
        "We do not sell your personal information.",
        "Your information may only be shared when legally required or when necessary to provide core application services.",
      ],
    },

    {
      title: "User Rights",
      content: [
        "Users may request deletion of their account and associated data.",
        "Users may update or modify uploaded information at any time through the application.",
      ],
    },

    {
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time.",
        "Continued use of the application after updates means you accept the revised policy.",
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalContent = {
  pageTitle: "Terms & Conditions",

  updatedAt: "May 14, 2026",

  introduction:
    "By using this healthcare application, you agree to follow these terms and conditions. Please read them carefully before using the app.",

  sections: [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing or using this application, you agree to comply with these terms.",
        "If you do not agree with any part of these terms, you should discontinue use of the application.",
      ],
    },

    {
      title: "Use of the Application",
      content: [
        "Users are responsible for maintaining accurate information within their account.",
        "You agree not to misuse the application or attempt unauthorized access to systems or data.",
      ],
    },

    {
      title: "Medical Disclaimer",
      content: [
        "This application is intended for document management and healthcare organization purposes only.",
        "The application does not provide medical diagnosis, treatment, or emergency healthcare services.",
      ],
    },

    {
      title: "User Content",
      content: [
        "Users retain ownership of uploaded documents and content.",
        "You are responsible for ensuring uploaded files do not violate laws or third-party rights.",
      ],
    },

    {
      title: "Limitation of Liability",
      content: [
        "We are not responsible for losses resulting from device failures, unauthorized access, or interruptions in service.",
        "The app is provided on an 'as available' basis without warranties of uninterrupted availability.",
      ],
    },

    {
      title: "Account Termination",
      content: [
        "We reserve the right to suspend or terminate accounts that violate these terms.",
        "Users may stop using the application at any time.",
      ],
    },

    {
      title: "Changes to Terms",
      content: [
        "These terms may be updated periodically.",
        "Continued use of the application after updates constitutes acceptance of revised terms.",
      ],
    },
  ],
};