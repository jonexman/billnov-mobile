import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SettingItem as SettingItemType,
  SettingSection as SettingSectionType,
} from "../types";
import SettingItem from "./SettingItem";

interface SettingSectionProps {
  section: SettingSectionType;
  onItemPress: (item: SettingItemType) => void;
}

export function SettingSection({ section, onItemPress }: SettingSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{section.title}</Text>
      <View style={styles.itemsContainer}>
        {section.items.map((item) => (
          <SettingItem key={item.id} item={item} onPress={onItemPress} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    color: "#6E6E73",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  itemsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default SettingSection;
