import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Dimensions, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router";
import Boarding from "../../components/Boarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Watch on any device",
    description: "Stream on your phone, tablet, laptop and TV without paying more.",
    image: require("../../assets/images/laptop.png"),
  },
  {
    id: "2",
    title: "3, 2, 1,... download!",
    description: "Always have something to watch offline.",
    image: require("../../assets/images/download.png"),
  },
  {
    id: "3",
    title: "No pesky contracts.",
    description: "Cancel anytime.",
    image: require("../../assets/images/population.png"),
  },
  {
    id: "4",
    title: "How do I watch?",
    description: "Members that subscribe to Netflix can watch here in the app.",
  },
];

const Board = () => {
  const [boardIndex, setBoardIndex] = useState(0);
  const lastIndex = data.length - 1;
  const router = useRouter();

  const bg = boardIndex === lastIndex ? require("../../assets/images/background-image.png") : null;

  // Gecikməni azaltmaq üçün funksiyanı useCallback ilə bükürük
  const finish = useCallback(() => {
    if (boardIndex < lastIndex) {
      setBoardIndex((prevState) => prevState + 1);
    } else {
      AsyncStorage.setItem("first", "yes");
      router.push("/auth/login");
    }
  }, [boardIndex, lastIndex, router]);

  useEffect(() => {
    // FlatList-in scrolling zamanı performansı yaxşılaşdırır
    const timeout = setTimeout(() => {
      setBoardIndex((prev) => Math.min(prev, lastIndex));
    }, 100);
    return () => clearTimeout(timeout);
  }, [boardIndex, lastIndex]);

  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <View style={tw`flex-row items-center mt-10`}>
        <Text style={tw`ml-40 mt-22 text-sm text-white`}>Help</Text>
      </View>

      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={2} // İlk iki elementi render edir, performansı artırır
        renderItem={({ item }) => (
          <View style={[tw`items-center`, { width }]}>
            <Image source={item.image} resizeMode="contain" style={{ width: width * 0.8, height: height * 0.4 }} />
            <Boarding item={item} boardIndex={boardIndex} lastIndex={lastIndex} />
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setBoardIndex(index);
        }}
      />

      <View style={tw`flex-row mb-9 items-center`}>
        {data.map((_, index) => (
          <View
            key={index}
            style={tw`w-2.5 h-2.5 rounded-full mx-2 ${boardIndex === index ? "bg-red-600" : "bg-gray-400"}`}
          />
        ))}
      </View>

      <TouchableOpacity onPress={finish} style={[tw`bg-red-600 mb-2 py-2 items-center`, { width: width - 20 }]}>
        <Text style={tw`font-bold text-sm text-black`}>NEXT</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Board;
