// app/terms-and-conditions.tsx

import React from "react";

import LegalScreen from "@/components/LegalScreen";

import { TERMS_AND_CONDITIONS } from "@/constant/legalContent";

const TermsAndConditionsPage = () => {
  return <LegalScreen data={TERMS_AND_CONDITIONS} />;
};

export default TermsAndConditionsPage;
