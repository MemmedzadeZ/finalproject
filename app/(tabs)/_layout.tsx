import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [storageData, setStorageData] = useState<{ token: string | null; first: string | null }>({
    token: null,
    first: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedFirst] = await Promise.all([
          AsyncStorage.getItem("token"),
          AsyncStorage.getItem("first"),
        ]);

        console.log("Stored Token:", storedToken);
        console.log("Stored First:", storedFirst);

        setStorageData({ token: storedToken, first: storedFirst });
      } catch (error) {
        console.error("AsyncStorage Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? "light"].tint} />
      </View>
    );
  }

  const { token, first } = storageData;

  return <Redirect href={first ? "/onboard" : token ? "/auth/login" : "/movies"} />;
}
