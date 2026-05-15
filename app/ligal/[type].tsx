import LegalScreen from "@/components/LegalScreen";
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "@/constant/legalContent";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const ligal = () => {
  const { type } = useLocalSearchParams<{ type: "terms" | "privacy" }>();
  return (
    <LegalScreen
      data={type === "privacy" ? PRIVACY_POLICY : TERMS_AND_CONDITIONS}
    />
  );
};

export default ligal;
