import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView>
      <Link href="/login">Login</Link>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
