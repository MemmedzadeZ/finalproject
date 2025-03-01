import { Text, View, Platform, TouchableOpacity,Image } from "react-native";
import React, { useState } from "react";
import Input from '../../components/input/Input'
import { useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames"; // Importing Tailwind
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const [data, setdata] = useState({});
  const os = Platform.OS;
  const router = useRouter();

  const register = async() => {
    try{
      const response = await fetch("http://192.168.0.111:5001/api/v1/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "Accept":  "application/json"
        },
        body: JSON.stringify(data),
      });

      if(response.ok)
      {
        router.push("/auth/login");
      }
    }
    catch(error){
      console.error(error);
    }
  }




  return (
    <View style={tw`bg-black flex-1 p-5`}>

      <Image 
              source={require("../../assets/images/netflixlogo.png")} // Replace with your image path
            
            />
      


      <Text style={tw`font-bold text-white text-4xl mt-48`}>Sign Up</Text>

     <Input
  name="username"
  value={data?.username || ""}
  placeholder="Username"
  setdata={setdata} // Burada düzəliş etdik
  style={[tw`bg-gray-800 text-white text-base py-4 px-4 mt-4 rounded-md border border-gray-500`, os === "ios" ? tw`py-4` : {}]}
/>

<Input
  name="email"
  value={data?.email || ""}
  placeholder="Email"
  setdata={setdata} // Burada düzəliş etdik
  style={[tw`bg-gray-800 text-white text-base py-4 px-4 mt-4 rounded-md border border-gray-500`, os === "ios" ? tw`py-4` : {}]}
/>

<Input
  name="password"
  value={data?.password || ""}
  placeholder="Password"
  setdata={setdata} // Burada düzəliş etdik
  style={[tw`bg-gray-800 text-white text-base py-4 px-4 mt-4 rounded-md border border-gray-500`, os === "ios" ? tw`py-4` : {}]}
/>

      <TouchableOpacity onPress={register} style={tw`bg-red-600 rounded-md items-center mt-6`}>
        <Text style={tw`text-white font-medium text-base py-3`}>Sign Up</Text>
      </TouchableOpacity>

      <View style={tw`flex-row justify-center mt-6`}>
        <Text style={tw`text-gray-400 text-base`}>Already have an account?</Text>
        <Text
          style={tw`ml-2 text-white font-medium text-base`}
          onPress={() => router.push("auth/login")}
        >
          Sign in
        </Text>
      </View>
    </View>
  );
};

export default Register;
