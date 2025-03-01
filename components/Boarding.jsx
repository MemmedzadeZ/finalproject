import { Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const Boarding = ({ item, boardIndex, lastIndex }) => {
  return (
    <View style={tw`mt-[70px] items-center`}>
      {item.icon}
      <Text
        style={tw`${
          boardIndex == lastIndex ? "mt-[280px]" : "mt-[15px]"
        } font-bold text-[24px] leading-[28px] text-white`}
      >
        {item.title}
      </Text>
      <Text
        style={tw`${item.weight} text-center mt-[20px] text-[20px] leading-[23px] text-gray-400`}
      >
        {item.description}
      </Text>
    </View>
  );
};

export default Boarding;
