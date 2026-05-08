import CustomButton from "@/components/Button";
import CustomInput from "@/components/Input";
import { ROUTES_PATH } from "@/constant";
import { TEXTS } from "@/constant/texts";
import { useCreateUser } from "@/hooks/mutations/useCreateAccount";
import { COLORS } from "@/theme/colors";
import { ApiError, SignupInput } from "@/types";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Signup = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignupInput>({
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      age: 0,
      phone: "",
      terms: false,
    },
  });

  const { mutate: createUser, isPending } = useCreateUser();

  const router = useRouter();

  const onSubmit: SubmitHandler<SignupInput> = (data) => {
    const { terms, ...rest } = data;
    createUser(rest, {
      onSuccess: () => router.push(ROUTES_PATH.Login),
      onError: (error: ApiError) => {
        Toast.show({ type: "error", text1: error.data?.message });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{TEXTS.signup.title}</Text>

            <Text style={styles.subTitle}>{TEXTS.signup.subTitle}</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Username */}
            <Controller
              control={control}
              name="userName"
              rules={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Username"
                  value={value}
                  onChangeText={onChange}
                  err={errors.userName?.message}
                />
              )}
            />

            {/* First Name */}
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: "First name is required",
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="First Name"
                  value={value}
                  onChangeText={onChange}
                  err={errors.firstName?.message}
                />
              )}
            />

            {/* Last Name */}
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: "Last name is required",
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Last Name"
                  value={value}
                  onChangeText={onChange}
                  err={errors.lastName?.message}
                />
              )}
            />

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
                  placeholder="Email Address"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  err={errors.email?.message}
                />
              )}
            />

            {/* Phone */}
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Enter valid phone number",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Phone Number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  err={errors.phone?.message}
                />
              )}
            />

            {/* Age */}
            <Controller
              control={control}
              name="age"
              rules={{
                required: "Age is required",
                min: {
                  value: 1,
                  message: "Enter valid age",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Age"
                  value={value ? String(value) : ""}
                  onChangeText={(text) => onChange(Number(text))}
                  keyboardType="numeric"
                  err={errors.age?.message}
                />
              )}
            />

            {/* Gender */}
            <Controller
              control={control}
              name="gender"
              rules={{
                required: "Gender is required",
              }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onChange("male")}
                    style={[
                      styles.genderButton,
                      value === "male" && styles.activeGenderButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        value === "male" && styles.activeGenderText,
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onChange("female")}
                    style={[
                      styles.genderButton,
                      value === "female" && styles.activeGenderButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        value === "female" && styles.activeGenderText,
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {errors.gender && (
              <Text style={styles.errorText}>{errors.gender.message}</Text>
            )}

            {/* Password */}
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  err={errors.password?.message}
                />
              )}
            />

            {/* Terms */}
            <Controller
              control={control}
              name="terms"
              rules={{
                required: "Please accept Terms & Conditions",
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <TouchableOpacity
                    style={styles.termsContainer}
                    activeOpacity={0.8}
                    onPress={() => onChange(!value)}
                  >
                    <View style={[styles.checkbox, value && styles.checkedBox]}>
                      {value && <Text style={styles.checkIcon}>✓</Text>}
                    </View>

                    <Text style={styles.termsText}>
                      {TEXTS.signup.terms}{" "}
                      <Text style={styles.termsHighlight}>
                        {TEXTS.signup.agree}
                      </Text>
                    </Text>
                  </TouchableOpacity>

                  {errors.terms && (
                    <Text style={styles.errorText}>{errors.terms.message}</Text>
                  )}
                </>
              )}
            />

            {/* Button */}
            <CustomButton
              title={TEXTS.signup.createAccount}
              onPress={handleSubmit(onSubmit)}
              loading={isPending}
              disabled={isPending}
            />

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {TEXTS.signup.alreadyAccount}
              </Text>

              <Link href="/login" style={styles.loginText}>
                {TEXTS.signup.login}
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  headerContainer: {
    marginTop: 10,
    marginBottom: 35,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  subTitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  formContainer: {},

  genderContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },

  genderButton: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  activeGenderButton: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },

  genderText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },

  activeGenderText: {
    color: COLORS.white,
  },

  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  termsText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  termsHighlight: {
    color: COLORS.secondary,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },

  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  loginText: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 14,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  checkedBox: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },

  checkIcon: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
