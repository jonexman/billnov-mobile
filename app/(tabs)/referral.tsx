import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReferralScreen() {
  const handleGetReferralLink = () => {
    // In a real app, generate and copy the referral link
    // For now, just show an alert
    alert("Referral link copied to clipboard!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView className="flex-1 px-6 pt-4">
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold mb-2">
            Welcome to billnov <Text className="text-accent">Referral</Text>{" "}
            Program
          </Text>
          <Text className="text-gray-500 text-center">
            Get rewarded every time you refer a friend to trade. Share your ref
            code and earn some cash.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-base font-medium text-center mb-4">
            How it works
          </Text>

          <View className="border-b border-gray-200 w-12 mx-auto mb-6" />

          {/* Step 1 */}
          <View className="flex-row mb-6">
            <View className="flex-shrink-0 mr-4">
              <Image
                source={require("../../assets/images/refer-friend.png")}
                className="w-12 h-12 rounded-md"
              />
            </View>
            <View className="flex-1">
              <Text className="font-medium mb-1">Tell a friend</Text>
              <Text className="text-gray-500 text-sm">
                When you spread the word, you earn the reward. Let your friends
                in on the best trading experience while earning on the side.
              </Text>
            </View>
          </View>

          {/* Step 2 */}
          <View className="flex-row mb-6">
            <View className="flex-shrink-0 mr-4">
              <Image
                source={require("../../assets/images/copy-code.png")}
                className="w-12 h-12 rounded-md"
              />
            </View>
            <View className="flex-1">
              <Text className="font-medium mb-1">Copy referral link/code</Text>
              <Text className="text-gray-500 text-sm">
                You&apos;re One tap away from earning. Copy your unique referral
                link and get ready to cash in on every referral!
              </Text>
            </View>
          </View>

          {/* Step 3 */}
          <View className="flex-row mb-6">
            <View className="flex-shrink-0 mr-4">
              <Image
                source={require("../../assets/images/share-link.png")}
                className="w-12 h-12 rounded-md"
              />
            </View>
            <View className="flex-1">
              <Text className="font-medium mb-1">Share referral link/code</Text>
              <Text className="text-gray-500 text-sm">
                Share your link with friends across your favorite platforms and
                watch your wallet grow.
              </Text>
            </View>
          </View>

          {/* Step 4 */}
          <View className="flex-row mb-8">
            <View className="flex-shrink-0 mr-4">
              <Image
                source={require("../../assets/images/earn-rewards.png")}
                className="w-12 h-12 rounded-md"
              />
            </View>
            <View className="flex-1">
              <Text className="font-medium mb-1">Earn bonuses!</Text>
              <Text className="text-gray-500 text-sm">
                The more you refer, the bigger your rewards. Keep earning as
                your network trades.
              </Text>
            </View>
          </View>
        </View>

        {/* Referral Button */}
        <TouchableOpacity
          className="bg-primary py-4 rounded-full items-center mb-8"
          onPress={handleGetReferralLink}
        >
          <Text className="text-white font-bold">Get referral link</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
