import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";


const TVShows = ({ item, index }) => {

    const imageUrl = "https://image.tmdb.org/t/p/w500";


    return (

        <TouchableOpacity onPress={() =>
        router.push({
          pathname: "/movies/details/[id]",
          params: { id: item.id, mediaType: item.media_type,start:"" },
        })
      }> 
           <Image
  source={{ uri: `${imageUrl}${item.poster_path}` }} // 'path' əvəzinə 'poster_path' yoxla
  style={{ width: 120, height: 180, marginLeft: index !== 0 ? 10 : 0 }}
  contentFit="cover"
  transition={500}
/>


        </TouchableOpacity>
    );

}

export default TVShows;
