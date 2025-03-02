import { Image } from "expo-image";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


const Similar = ({ item, index,mediaType }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => {
      router.push({
        pathname: "/movies/similarDetails/[id]",
        params: { id: item.id, mediaType: mediaType, start: "" },
      })
    }} >
      <Image
        source={{ uri: `http://192.168.0.111:5001/api/v1/${item.poster_path}` }}
        style={{ width: 150, height: 180, marginLeft: index != 0 && 20 }}
        contentFit="cover"
        transition={500}
      />
    </TouchableOpacity>
  );
};

export default Similar;

// import { View, Text } from "react-native";

// const Similar = ({ item }) => {
//   console.log("Similar component received:", item);
//   return (
//     <View>
//       <Text style={{ color: 'white' }}>{item.title || item.name}</Text>
//     </View>
//   );
// };
//  export default Similar