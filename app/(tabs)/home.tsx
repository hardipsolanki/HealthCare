// app/(tabs)/home.tsx

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import QuickActionCard from "@/components/QuickActionCard";
import SectionHeader from "@/components/SectionHeader";
import SummaryCard from "@/components/SummaryCard";
import { COLORS } from "@/theme/colors";

const summaryData = [
  {
    id: 1,
    title: "Heart Rate",
    value: "72 bpm",
    icon: "heart",
    color: "#FF6B81",
  },
  {
    id: 2,
    title: "Steps",
    value: "4,350",
    subValue: "/10,000",
    icon: "footsteps",
    color: "#4CAF50",
  },
  {
    id: 3,
    title: "Water",
    value: "6 Glass",
    subValue: "/8 Glass",
    icon: "water",
    color: "#3B82F6",
  },
];

const quickActions = [
  {
    id: 1,
    title: "Upload\nDocuments",
    icon: "document-text",
    bg: "#E8F7EE",
    iconColor: "#22C55E",
  },
  {
    id: 2,
    title: "My\nDocuments",
    icon: "document",
    bg: "#EEF2FF",
    iconColor: "#2563EB",
  },
  {
    id: 3,
    title: "Appointments",
    icon: "calendar",
    bg: "#F3E8FF",
    iconColor: "#9333EA",
  },
  {
    id: 4,
    title: "Health\nRecords",
    icon: "medkit",
    bg: "#FFE4E6",
    iconColor: "#EF4444",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

        {/* ================= TOP PURPLE AREA ================= */}

        <LinearGradient
          colors={["#7F5AF0", "#6D4BEF", "#5B3DF5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topSection}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="menu-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.notificationContainer}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={COLORS.white}
              />

              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* USER SECTION */}

          <View style={styles.userRow}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.avatar}
            />

            <View style={styles.userContent}>
              <Text style={styles.greeting}>Hi, Priya! 👋</Text>

              <Text style={styles.subGreeting}>Good morning</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ================= WHITE BODY ================= */}

        <View style={styles.bodyContainer}>
          {/* HEALTH OVERVIEW */}

          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={["#FFFFFF", "#F4F3FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.overviewCard}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.overviewTitle}>Health Overview</Text>

                <Text style={styles.overviewSubTitle}>
                  Complete insights about your health
                </Text>
              </View>

              <View style={styles.pulseContainer}>
                <Ionicons name="pulse" size={34} color={COLORS.primary} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* TODAY SUMMARY */}
          <View style={styles.todaySummary}>
            <SectionHeader title="Today's Summary" />

            <View style={styles.summaryRow}>
              {summaryData.map((item) => (
                <SummaryCard key={item.id} item={item} />
              ))}
            </View>
          </View>

          {/* QUICK ACTIONS */}

          <SectionHeader title="Quick Actions" />

          <View style={styles.quickActionRow}>
            {quickActions.map((item) => (
              <QuickActionCard key={item.id} item={item} />
            ))}
          </View>

          {/* APPOINTMENT */}

          <SectionHeader title="Upcoming Appointment" />

          <View style={styles.appointmentCard}>
            <View style={styles.appointmentLeft}>
              <View style={styles.doctorIconBox}>
                <Ionicons name="medical" size={20} color={COLORS.primary} />
              </View>

              <View>
                <Text style={styles.doctorName}>Dr. Rohan Mehta</Text>

                <Text style={styles.doctorSpeciality}>Cardiologist</Text>

                <Text style={styles.doctorTime}>24 May 2024 • 11:30 AM</Text>
              </View>
            </View>

            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
              style={styles.doctorImage}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    padding: 20,
    height: 190,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  notificationContainer: {
    position: "relative",
  },

  notificationBadge: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "#FF4D8D",
    position: "absolute",
    right: 1,
    top: 2,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 100,
  },

  userContent: {
    marginLeft: 14,
    flex: 1,
  },

  greeting: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "700",
  },

  subGreeting: {
    color: "#E9DFFF",
    fontSize: 15,
    marginTop: 6,
    fontWeight: "500",
  },

  bodyContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8FC",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },

  scrollContent: {},

  overviewCard: {
    borderRadius: 24,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    position: "absolute",
    top: -70,
    elevation: 2,
  },

  overviewTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  overviewSubTitle: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    width: 220,
  },

  pulseContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  todaySummary: {
    marginTop: 55,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  quickActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  appointmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,

    elevation: 1,
  },

  appointmentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  doctorIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  doctorSpeciality: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  doctorTime: {
    marginTop: 6,
    color: COLORS.textMuted,
    fontSize: 12,
  },

  doctorImage: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
});
