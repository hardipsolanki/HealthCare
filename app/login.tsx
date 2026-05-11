import CustomButton from "@/components/Button";
import CustomInput from "@/components/Input";
import { ROUTES_PATH } from "@/constant";
import { TEXTS } from "@/constant/texts";
import { saveAuthToStorage } from "@/features/auth/authSlice";
import { useLoginUser } from "@/hooks/mutations/useLogin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { COLORS } from "@/theme/colors";
import { ApiError, LoginInput, LoginResponse } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userDispatchLoading = useAppSelector((state) => state.auth.isLoading);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLoginUser();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    login(data, {
      onSuccess: (response) => {
        const loginResponse = response as LoginResponse;
        dispatch(
          saveAuthToStorage({
            token: loginResponse.data.data.accessToken,
            user: loginResponse.data.data.patient,
          }),
        )
          .unwrap()
          .then(() => {
            Toast.show({
              type: "success",
              text1: "Login successful",
              text2: loginResponse.data.status.description,
            });
            router.push(ROUTES_PATH.Index);
          });
      },
      onError: (error: ApiError) => {
        Toast.show({ type: "error", text1: error.data?.message });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <View style={styles.heart}>
            <Text style={styles.plus}>+</Text>
          </View>
        </View>

        <Text style={styles.appTitle}>{TEXTS.login.appTitle}</Text>

        <Text style={styles.subTitle}>{TEXTS.login.subTitle}</Text>
      </LinearGradient>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.welcome}>{TEXTS.login.welcome}</Text>

        <Text style={styles.signIn}>{TEXTS.login.signIn}</Text>

        {/* Email */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Enter valid email",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder={TEXTS.login.emailPlaceholder}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              err={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be 6 characters",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder={TEXTS.login.passwordPlaceholder}
              value={value}
              onChangeText={onChange}
              isPassword
              err={errors.password?.message}
            />
          )}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>{TEXTS.login.forgotPassword}</Text>
        </TouchableOpacity>

        <CustomButton
          title={TEXTS.login.loginButton}
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
        />

        <View style={styles.signupText}>
          <Text>{TEXTS.login.noAccount}</Text>

          <Link href="/signup" style={styles.signUp}>
            {TEXTS.login.signUp}
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  header: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    marginBottom: 10,
  },

  heart: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  plus: {
    color: COLORS.secondary,
    fontSize: 34,
    fontWeight: "bold",
  },

  appTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "700",
  },

  subTitle: {
    color: COLORS.textLight,
    marginTop: 5,
    fontSize: 14,
  },

  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -20,
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  signIn: {
    color: COLORS.textSecondary,
    marginTop: 5,
    marginBottom: 25,
  },

  forgot: {
    alignSelf: "flex-end",
    color: COLORS.secondary,
    marginBottom: 25,
    fontWeight: "600",
  },

  signupText: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  signUp: {
    color: COLORS.secondary,
    fontWeight: "700",
  },
});

// import React from "react";
// import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import Svg, { Path } from "react-native-svg";

// const { width } = Dimensions.get("window");

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* Top Gradient Section */}
//       <LinearGradient
//         colors={["#7B2FF7", "#F107A3"]}
//         start={{ x: 0, y: 1 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.topSection}
//       >
//         {/* Small Dots */}
//         <View style={styles.dotsContainer}>
//           {[...Array(12)].map((_, i) => (
//             <View key={i} style={styles.dot} />
//           ))}
//         </View>

//         {/* Logo */}
//         <View style={styles.logoContainer}>
//           <Text style={styles.logo}>❤</Text>
//           <Text style={styles.plus}>+</Text>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>HealthCare</Text>
//         <Text style={styles.subtitle}>Your Health, Our Priority</Text>

//         {/* White Curve */}
//         <View style={styles.curveContainer}>
//           <Svg width={width} height={140} viewBox={`0 0 ${width} 140`}>
//             <Path
//               d={`
//                 M0 75
//                 C60 10, 130 20, 180 55
//                 C230 90, 290 120, ${width} 55
//                 L${width} 140
//                 L0 140
//                 Z
//               `}
//               fill="white"
//             />
//           </Svg>
//         </View>
//       </LinearGradient>

//       {/* Bottom Content */}
//       <View style={styles.bottomSection}>
//         <Text style={styles.welcome}>Welcome Back 👋</Text>
//         <Text style={styles.description}>Sign in to continue</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   topSection: {
//     height: 340,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//     overflow: "hidden",
//   },

//   dotsContainer: {
//     position: "absolute",
//     top: 60,
//     left: 30,
//     width: 50,
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },

//   dot: {
//     width: 4,
//     height: 4,
//     borderRadius: 10,
//     backgroundColor: "rgba(255,255,255,0.5)",
//     margin: 4,
//   },

//   logoContainer: {
//     width: 90,
//     height: 90,
//     borderRadius: 30,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     position: "relative",
//   },

//   logo: {
//     fontSize: 42,
//     color: "#F107A3",
//   },

//   plus: {
//     position: "absolute",
//     right: 28,
//     top: 30,
//     fontSize: 22,
//     color: "#F107A3",
//     fontWeight: "700",
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: "700",
//     color: "#fff",
//   },

//   subtitle: {
//     fontSize: 15,
//     color: "#fff",
//     marginTop: 6,
//   },

//   curveContainer: {
//     position: "absolute",
//     bottom: -2,
//   },

//   bottomSection: {
//     paddingHorizontal: 28,
//     marginTop: 10,
//   },

//   welcome: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#111",
//   },

//   description: {
//     marginTop: 8,
//     fontSize: 15,
//     color: "#777",
//   },
// });
