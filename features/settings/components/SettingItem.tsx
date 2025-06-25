import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SettingItem as SettingItemType } from "../types";

interface SettingItemProps {
  item: SettingItemType;
  onPress: (item: SettingItemType) => void;
}

export function SettingItem({ item, onPress }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${item.iconColor}15` }, // 15% opacity version of the icon color
          ]}
        >
          <Ionicons name={item.icon as any} size={18} color={item.iconColor} />
        </View>
        <Text style={styles.label}>{item.label}</Text>
      </View>

      {item.type === "toggle" ? (
        <Switch
          value={item.value}
          onValueChange={() => item.onToggle?.()}
          trackColor={{ false: "#D1D1D6", true: "#001871" }}
          thumbColor={"#FFFFFF"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color="gray" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: "#333333",
  },
});

export default SettingItem;
