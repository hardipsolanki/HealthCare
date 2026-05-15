// app/profile/index.tsx

import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ROUTES_PATH } from "@/constant";
import { TEXTS } from "@/constant/texts";
import { useAppSelector } from "@/store/hooks";
import { COLORS } from "@/theme/colors";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const menuItems = [
  {
    id: 2,
    title: TEXTS.profile.emergencyContacts,
    icon: <MaterialIcons name="contact-phone" size={20} color="#FF9F43" />,
  },
  {
    id: 3,
    title: TEXTS.profile.medicalInformation,
    icon: <Feather name="clipboard" size={20} color="#2ED573" />,
  },
  {
    id: 4,
    title: TEXTS.profile.notificationSettings,
    icon: <Ionicons name="notifications-outline" size={20} color="#7D5FFF" />,
  },
  {
    id: 5,
    title: TEXTS.profile.privacyPolicy,
    icon: <AntDesign name="safety" size={20} color="#FF5E7E" />,
    link: ROUTES_PATH.ligal,
    type: "privacy",
  },
  {
    id: 6,
    title: TEXTS.profile.termsConditions,
    icon: <Ionicons name="document-text-outline" size={20} color="#2ED573" />,
    link: ROUTES_PATH.ligal,
    type: "terms",
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <StatusBar barStyle="light-content" />

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=22",
            }}
            style={styles.profileImage}
          />

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.userName}</Text>

            <Text style={styles.userEmail}>{user?.email}</Text>

            <Text style={styles.userPhone}>{user?.phone}</Text>
          </View>

          {/* <TouchableOpacity activeOpacity={0.8} style={styles.editButton}>
            <Feather name="edit-2" size={14} color={COLORS.white} />
          </TouchableOpacity> */}
        </View>

        {/* Scrollable Section */}
        <View style={styles.bottomContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.menuContainer}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  style={styles.menuItem}
                  {...(item.link && {
                    onPress: () =>
                      router.push({
                        pathname: item.link,
                        params: { type: item.type },
                      }),
                  })}
                >
                  <View style={styles.menuLeft}>
                    <View style={styles.iconContainer}>{item.icon}</View>

                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: COLORS.secondary,
  },

  scrollContainer: {
    paddingBottom: 30,
  },

  header: {
    flex: 1,
    paddingTop: 14,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 24,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  profileCard: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },

  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: COLORS.white,
  },

  userInfo: {
    flex: 1,
    marginLeft: 14,
  },

  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 13,
    color: COLORS.purpleTextLight,
    marginBottom: 4,
  },

  userPhone: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },

  editButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomContainer: {
    flex: 1,
    marginTop: 22,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 14,
  },

  menuItem: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.textLight,
    justifyContent: "center",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 14,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
});
