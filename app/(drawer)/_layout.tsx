import { Drawer } from "expo-router/drawer";

import CustomDrawer from "@/components/CustomDrawer";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: "rgba(0,0,0,0.2)",
        drawerStyle: {
          // width: "78%",
          // borderTopRightRadius: 28,
          // borderBottomRightRadius: 28,
          // overflow: "hidden",
          // borderWidth: 1,
          // borderColor: "green",
          // padding: 0,
          // margin: 0,
        },
      }}
    />
  );
}
