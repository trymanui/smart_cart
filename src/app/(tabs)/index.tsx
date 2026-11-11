import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser, useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();

  // Route protection guard: Kick user out to sign-in if they are logged out
  useEffect(() => {
    if (isSignedIn === false) {
      router.replace("/sign-in" as any);
    }
  }, [isSignedIn]);

  // Handle Logout Button Click
  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Welcome Home!</Text>

        {/* Safely display the user's primary email address */}
        <Text style={styles.subtitle}>
          Logged in as: {"\n"}
          <Text style={styles.emailText}>
            {user?.primaryEmailAddress?.emailAddress || "Loading user..."}
          </Text>
        </Text>
      </View>

      <View style={styles.dashboardPlaceholder}>
        <Text style={styles.placeholderText}>
          Your awesome app dashboard starts here.
        </Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={onSignOutPress}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  emailText: {
    fontWeight: "600",
    color: "#333",
  },
  dashboardPlaceholder: {
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  placeholderText: {
    color: "#aaa",
    fontSize: 15,
    textAlign: "center",
  },
  signOutButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ff3b30",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signOutText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "bold",
  },
});
