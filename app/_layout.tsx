import { ROUTES } from "@/constant";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name={ROUTES.INDEX}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ROUTES.LOGIN}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ROUTES.SIGNUP}
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Toast />
    </QueryClientProvider>
  );
}
