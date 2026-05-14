// components/LegalScreen.tsx

import React from "react";

import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

import { COLORS } from "@/theme/colors";

import { LegalContent } from "@/constant/legalContent";

type Props = {
  data: LegalContent;
};

const LegalScreen = ({ data }: Props) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient
        colors={[COLORS.primary, "#6D4BEF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{data.pageTitle}</Text>

        <Text style={styles.updatedAt}>Last Updated • {data.updatedAt}</Text>
      </LinearGradient>

      {/* CONTENT */}
      <View style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.introduction}>{data.introduction}</Text>

          {data.sections.map((section, index) => (
            <View key={`${section.title}-${index}`} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>

              {section.content.map((item, itemIndex) => (
                <View key={`${itemIndex}`} style={styles.pointContainer}>
                  <View style={styles.dot} />

                  <Text style={styles.pointText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LegalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  header: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  backButton: {
    position: "absolute",
    left: 16,
    top: 18,
    zIndex: 10,
    padding: 6,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.white,
    textAlign: "center",
  },

  updatedAt: {
    marginTop: 8,
    color: "#E9DFFF",
    fontSize: 13,
  },

  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },

  scrollContent: {
    padding: 22,
    paddingBottom: 40,
  },

  introduction: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
    marginBottom: 28,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },

  pointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingRight: 8,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    marginTop: 8,
    marginRight: 12,
  },

  pointText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
});
