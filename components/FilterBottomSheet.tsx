import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CustomButton from "@/components/Button";
import { TEXTS } from "@/constant/texts";
import { COLORS } from "@/theme/colors";

type Props = {
  onClose: () => void;

  onApply: (filters: {
    sort: {
      sortBy: string;
      orderBy: "asc" | "desc";
    };
  }) => void;
};

const sortOptions = ["title", "createdAt"];
const orderOptions = ["asc", "desc"];

const FilterBottomSheet = ({ onClose, onApply }: Props) => {
  const [sortBy, setSortBy] = useState("title");

  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  const resetFilters = () => {
    setSortBy("title");
    setOrderBy("asc");
  };

  const handleApply = () => {
    onApply({
      sort: {
        sortBy,
        orderBy,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.filters.filter}</Text>

        <TouchableOpacity onPress={resetFilters}>
          <Text style={styles.resetText}>{TEXTS.filters.reset}</Text>
        </TouchableOpacity>
      </View>

      {/* Sort By */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{TEXTS.filters.sortBy}</Text>

        <View style={styles.row}>
          {sortOptions.map((item) => {
            const active = sortBy === item;

            return (
              <TouchableOpacity
                key={item}
                style={[styles.optionButton, active && styles.activeOption]}
                onPress={() => setSortBy(item)}
              >
                <Text
                  style={[styles.optionText, active && styles.activeOptionText]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Order By */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{TEXTS.filters.orderBy}</Text>

        <View style={styles.row}>
          {orderOptions.map((item) => {
            const active = orderBy === item;

            return (
              <TouchableOpacity
                key={item}
                style={[styles.optionButton, active && styles.activeOption]}
                onPress={() => setOrderBy(item as "asc" | "desc")}
              >
                <Text
                  style={[styles.optionText, active && styles.activeOptionText]}
                >
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <CustomButton title={TEXTS.filters.applyFilters} onPress={handleApply} />
    </View>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.white,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  resetText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  inputBox: {
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
  },

  placeholderText: {
    color: COLORS.textMuted,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  optionButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },

  activeOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  activeOptionText: {
    color: COLORS.white,
  },
});
