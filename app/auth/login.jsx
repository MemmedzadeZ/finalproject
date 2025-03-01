import { Text, View, Platform, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from '../../components/input/Input';
import { useState } from "react";
import { useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames"; // Import Tailwind

const Login = () => {
  const [data, setdata] = useState({}); // Burada 'setdata' funksiyasını istifadə edirik
  const os = Platform.OS;
  const router = useRouter();

  const login = async () => {
    try {
      const response = await fetch("http://192.168.0.111:5001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Server cavabı:", responseData);

      if (response.ok) {
        await AsyncStorage.setItem("token", responseData.token); // Tokeni yadda saxla
        console.log("Token saxlandı:", responseData.token);
        router.push("/movies");
      } else {
        console.error("Daxil olma uğursuz oldu:", responseData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Xəta:", error);
    }
  };

  return (
    <View style={tw`flex-1 p-5 bg-black`}>
      {/* Add Image on the top left */}
      <Image 
        source={require("../../assets/images/netflixlogo.png")} // Replace with your image path
      
      />

      <Text style={tw`font-bold text-white text-4xl mt-48`}>
        Sign In
      </Text>

      <Input
        name="email"
        setdata={setdata}
        value={data?.email}
        placeholder="Email"
        style={[tw`bg-gray-800 text-white text-base py-4 px-4 mt-7 rounded-md border border-gray-500`, os === "ios" ? tw`py-4` : {}]}
      />

      <Input
        name="password"
        setdata={setdata}  // Burada da `setdata` istifadə edin
        value={data?.password}
        placeholder="Password"
        style={[tw`bg-gray-800 text-white text-base py-4 px-4 mt-4 rounded-md border border-gray-500`, os === "ios" ? tw`py-4` : {}]}
      />

      <TouchableOpacity onPress={login} style={tw`bg-red-600 rounded-md items-center mt-6`}>
        <Text style={tw`text-white font-medium text-base py-3`}>Sign In</Text>
      </TouchableOpacity>

      <View style={tw`flex-row justify-center mt-6`}>
        <Text style={tw`text-gray-400 text-base`}>New to Netflix?</Text>

        <Text
          style={tw`ml-2 text-white font-medium text-base`}
          onPress={() => {
            router.push("auth/register");
            console.log("Navigating to Register page...");
          }}
        >
          Sign up now
        </Text>
      </View>
    </View>
  );
};

export default Login;
