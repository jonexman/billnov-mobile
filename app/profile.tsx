import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock user data
const mockUser = {
  name: "JOHN",
  username: "jonexman",
  email: "akumakalujohn@gmail.com",
  phoneNumber: "08063952432",
  dateOfBirth: "",
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Profile Picture */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={require("../assets/images/profile-placeholder.png")}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.infoContainer}>
          {/* Name */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{mockUser.name}</Text>
            <View style={styles.separator} />
          </View>

          {/* Username */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoValue}>{mockUser.username}</Text>
            <View style={styles.separator} />
          </View>

          {/* Email */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{mockUser.email}</Text>
            <View style={styles.separator} />
          </View>

          {/* Phone number */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Phone number</Text>
            <Text style={styles.infoValue}>{mockUser.phoneNumber}</Text>
            <View style={styles.separator} />
          </View>

          {/* Date of Birth */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <Text style={styles.infoValue}>{mockUser.dateOfBirth || " "}</Text>
            <View style={styles.separator} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#001871",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  infoSection: {
    marginVertical: 8,
  },
  infoLabel: {
    color: "#444",
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    color: "#555",
    fontSize: 16,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 4,
  },
});
