import { DrawerContentComponentProps } from "@react-navigation/drawer";

import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ROUTES_PATH } from "@/constant";
import { TEXTS } from "@/constant/texts";
import { logoutUser } from "@/features/auth/authSlice";
import { useLogout } from "@/hooks/mutations/useLogout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { COLORS } from "@/theme/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import CustomModal from "./LogoutModal";
const drawerItems = [
  {
    icon: <Ionicons name="person-outline" size={22} color="#667085" />,
    title: TEXTS.drawer.myProfile,
    link: ROUTES_PATH.Profile,
  },

  {
    icon: (
      <MaterialCommunityIcons
        name="clipboard-text-outline"
        size={22}
        color="#667085"
      />
    ),
    title: TEXTS.drawer.healthRecords,
  },

  {
    icon: <Ionicons name="document-text-outline" size={22} color="#667085" />,
    title: TEXTS.drawer.myDocuments,
  },

  {
    icon: <Ionicons name="calendar-outline" size={22} color="#667085" />,
    title: TEXTS.drawer.appointments,
  },

  {
    icon: <Feather name="bell" size={21} color="#667085" />,
    title: TEXTS.drawer.reminders,
  },

  {
    icon: <Ionicons name="settings-outline" size={22} color="#667085" />,
    title: TEXTS.drawer.settings,
  },

  {
    icon: <MaterialIcons name="help-outline" size={22} color="#667085" />,
    title: TEXTS.drawer.termsOfConditions,
    link: ROUTES_PATH.ligal,
    type: "terms",
  },

  {
    icon: (
      <Ionicons name="information-circle-outline" size={22} color="#667085" />
    ),
    title: TEXTS.drawer.privacyPolicy,
    link: ROUTES_PATH.ligal,
    type: "privacy",
  },
];

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { mutate: logout, isPending } = useLogout();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* TOP PROFILE SECTION */}
      <StatusBar
        translucent={false}
        barStyle="light-content"
        backgroundColor={COLORS.white}
      />

      <View style={styles.topSection}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=22",
          }}
          style={styles.profileImage}
        />

        <View>
          <Text style={styles.userName}>{user?.userName}</Text>

          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      {/* MENU ITEMS */}

      <View style={styles.menuContainer}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.menuItem}
            onPress={() =>
              router.push({
                pathname: item.link as any,
                params: { type: item.type },
              })
            }
          >
            {item.icon}

            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LOGOUT */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.logoutButton}
        onPress={() => setLogoutModalVisible(true)}
      >
        <MaterialIcons name="logout" size={24} color={COLORS.red} />

        <Text style={styles.logoutText}>{TEXTS.drawer.logout}</Text>
      </TouchableOpacity>

      {logoutModalVisible && (
        <CustomModal
          visible={logoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          isLoading={isPending}
          actionBtnName="Logout"
          text={`Are you sure you want to{"\n"} logout from your account? `}
          onPress={() => {
            logout();
            dispatch(logoutUser())
              .unwrap()
              .then(() => {
                router.push(ROUTES_PATH.Login);
              });
          }}
        />
      )}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  topSection: {
    paddingTop: 38,
    paddingBottom: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: "100%",
  },

  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 100,
    marginRight: 14,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  userName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  email: {
    color: "#E9DFFF",
    fontSize: 13,
    fontWeight: "500",
  },

  menuContainer: {
    paddingTop: 16,
    paddingHorizontal: 18,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  menuText: {
    marginLeft: 16,
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  logoutText: {
    marginLeft: 14,
    color: COLORS.red,
    fontSize: 16,
    fontWeight: "600",
  },
});
