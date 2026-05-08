import CustomButton from "@/components/Button";
import CustomInput from "@/components/Input";
import { TEXTS } from "@/constant/texts";
import { COLORS } from "@/theme/colors";
import { LoginInput } from "@/types";
import { Link } from "expo-router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
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

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log("Login Data:", data);
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
