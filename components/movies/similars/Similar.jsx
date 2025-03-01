import { Image } from "react-native";

const Similar = ({ item, index }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Image
      source={{ uri: item.path ? `${imageUrl}${item.path}` : null }} // Check if path exists
      style={{ width: 120, height: 180, marginLeft: index !== 0 ? 20 : 0 }}
    />
  );
};
