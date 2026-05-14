// app/privacy-policy.tsx

import React from "react";

import LegalScreen from "@/components/LegalScreen";

import { PRIVACY_POLICY } from "@/constant/legalContent";

const PrivacyPolicyPage = () => {
  return <LegalScreen data={PRIVACY_POLICY} />;
};

export default PrivacyPolicyPage;
