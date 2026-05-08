import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  keyboardType?: "numeric" | "default" | "email-address" | "phone-pad";
  err?: string;
};

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  keyboardType = "default",
  err,
}: Props) => {
  const [secureText, setSecureText] = useState(isPassword);
  const hasError = !!err;

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, hasError && styles.errorBorder]}>
        <Ionicons
          name={isPassword ? "lock-closed-outline" : "person-outline"}
          size={20}
          color={COLORS.textMuted}
          style={styles.inputIcon}
        />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        {isPassword && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {hasError && <Text style={styles.err}>{err}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  inputContainer: {
    height: 58,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },

  errorBorder: {
    borderColor: "#EF4444",
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },

  eyeButton: {
    paddingLeft: 10,
  },

  err: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
});
