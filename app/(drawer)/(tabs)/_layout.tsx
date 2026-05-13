// app/(tabs)/_layout.tsx

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from "@gorhom/bottom-sheet";

import UploadBottomSheet from "@/components/UploadBottomSheet";
import { COLORS } from "@/theme/colors";

const TabsLayout = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // const openBottomSheet = () => {
  //   bottomSheetRef.current?.expand();
  // };

  // const closeBottomSheet = () => {
  //   bottomSheetRef.current?.close();
  // };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  return (
    <>
      <>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,

            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: "#98A2B3",
            tabBarStyle: {
              height: 70,
            },
          }}
        >
          {/* HOME */}

          <Tabs.Screen
            name="home"
            options={{
              title: "Home",

              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={22}
                  color={color}
                />
              ),
            }}
          />

          {/* DOCUMENTS */}

          <Tabs.Screen
            name="documents"
            options={{
              title: "Documents",

              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "document-text" : "document-text-outline"}
                  size={22}
                  color={color}
                />
              ),
            }}
          />

          {/* CENTER ADD BUTTON */}
          <Tabs.Screen
            name="dummy"
            options={{
              title: "",

              tabBarLabel: () => null,

              tabBarButton: () => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.addButton}
                  onPress={openBottomSheet}
                >
                  <Ionicons name="add" size={30} color={COLORS.white} />
                </TouchableOpacity>
              ),
            }}
          />
          {/* APPOINTMENTS */}

          <Tabs.Screen
            name="appointments"
            options={{
              title: "Appointments",

              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={22}
                  color={color}
                />
              ),
            }}
          />

          {/* PROFILE */}

          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",

              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={22}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
        <BottomSheetModal
          ref={bottomSheetRef}
          // index={-1}
          snapPoints={["52%"]}
          enablePanDownToClose
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              opacity={0.4}
            />
          )}
          handleIndicatorStyle={styles.indicator}
          backgroundStyle={styles.bottomSheetBackground}
        >
          <BottomSheetView style={styles.sheetContent}>
            <UploadBottomSheet onClose={closeBottomSheet} />
          </BottomSheetView>
        </BottomSheetModal>
      </>
    </>
  );
};

export default TabsLayout;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  addButton: {
    // width: 50,

    // height: 50,

    borderRadius: 100,

    backgroundColor: COLORS.primary,

    justifyContent: "center",

    alignItems: "center",

    // marginBottom: 28,
    marginTop: 8,

    shadowColor: COLORS.primary,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.35,

    shadowRadius: 10,

    elevation: 8,
  },
  indicator: {
    backgroundColor: "#D1D5DB",

    width: 55,

    height: 5,
  },

  bottomSheetBackground: {
    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    backgroundColor: COLORS.white,
  },

  sheetContent: {
    flex: 1,

    paddingHorizontal: 20,

    paddingTop: 10,
  },
});
