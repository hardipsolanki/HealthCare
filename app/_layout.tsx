import { ROUTES } from "@/constant";
import { queryClient } from "@/lib/queryClient";
import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
const RootLayout = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen
                name={ROUTES.DRAWER}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.INDEX}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.TABS}
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
              <Stack.Screen
                name={ROUTES.ADD_DOCUMENT}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.DOCUMENT_DETAILS}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.TermsOfConditions}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.PrivacyPolicy}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.UploadDocSuccess}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.UploadingDocument}
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
            <Toast />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
