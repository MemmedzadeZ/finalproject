import { Image } from "expo-image";

const Similar = ({ item, index }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Image
      source={{ uri: item.path ? `${imageUrl}${item.path}` : null }} // Əgər path yoxdursa, null qaytar
      style={{ width: 120, height: 180, marginLeft: index !== 0 ? 20 : 0 }}
      contentFit="cover"
      transition={500}
    />
  );
};

export default Similar;
