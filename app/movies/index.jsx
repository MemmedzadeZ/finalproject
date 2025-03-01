import { 
  Text, 
  View, 
  ImageBackground, 
  FlatList, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe"; // YouTube player component
import TVShows from '../../components/movies/shows/TvShows';
import TrendingMovies from "../../components/movies/trending/TrendingMovies";

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");  // YouTube video key
  const [path, setPath] = useState("");
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width - 40;

  const getTrendingMovies = async () => {
    try {
      const response = await fetch("http://192.168.0.111:5001/api/v1/movie/trending");
      if (response.ok) {
        const datas = await response.json();
        setTrendingMovies(datas.content);
        setPath(datas.content.length > 0 ? datas.content[0].poster_path : "");
        setTrailerKey(datas.content.length > 0 ? datas.content[0].trailer_key : ""); // Assuming trailer_key in data
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const getTrendingTVShows = async () => {
    try {
      const response = await fetch("http://192.168.0.111:5001/api/v1/tv/trending");
      if (response.ok) {
        const datas = await response.json();
        setTrendingTVShows(datas.content);
      }
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  };

  const handleLogout = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    getTrendingMovies();
    getTrendingTVShows();
  }, []);

  const handlePlayPress = () => {
    setIsPlaying(true);  // Set video to play
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);  // Close video and go back to normal UI
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
        <Image source={require("../../assets/images/netflixlogo.png")} style={{ width: 150, height: 40 }} />
        <TouchableOpacity onPress={handleLogout}>
          <Image source={require("../../assets/images/logout.png")} style={{ width: 30, height: 30, marginLeft: 170 }} />
        </TouchableOpacity>
      </View>

      <ImageBackground 
        source={{ uri: `${imageUrl}${path}` }} 
        style={[styles.imageBackground, { width, height: 470 }]}
      >
        {isPlaying ? (
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseVideo}>
            <Text style={styles.closeButtonText}>X</Text>
            <YoutubePlayer
              style = {styles.youtubevideo}
            height={225}
            play={isPlaying}
            videoId={trailerKey}
            onChangeState={(state) => { /* handle state change if needed */ }}
          />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={[styles.playButton, { width: (width - 40) / 2 }]} onPress={handlePlayPress}>
              <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/movies/details/[id]", params: { id: trendingMovies[0].id } })}
              style={[styles.moreInfoButton, { width: (width - 40) / 2 }]}
            >
              <Text style={styles.moreInfoText}>More Info</Text>
            </TouchableOpacity>
          </>
        )}
      </ImageBackground>

      

      <Text style={styles.sectionTitle}>Trending Movies</Text>
      <FlatList
        data={trendingMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <TrendingMovies item={item} />}
      />

      <Text style={styles.sectionTitle}>Popular TV Shows</Text>
      <FlatList
        data={trendingTVShows}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <TVShows item={item} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 6,
  },
  imageBackground: {
    borderRadius: 10,
    marginTop: 32,
    overflow: "hidden",
  },
  
  playButton: {
    position: "absolute",
    left: 8,
    bottom: 24,
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 12,
  },
  playText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  moreInfoButton: {
    position: "absolute",
    right: 8,
    bottom: 24,
    borderRadius: 6,
    backgroundColor: "#4B5563",
    alignItems: "center",
    paddingVertical: 12,
  },
  moreInfoText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    color: "white",
    marginTop: 16,
  },
  listContainer: {
    marginTop: 20,
    marginBottom: 48,
  },
  closeButton: {
    position: "absolute",
    width:300,
    top: 270,
    right: 20,

    backgroundColor: "transparent",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  youtubevideo: {
    width:450
    
  },
  closeButtonText: {
    color: "red",
    left:280,
    fontWeight: "bold",
  },
  videoContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent background for video
    paddingTop: 50,
    borderRadius: 10,
  },
});

export default Movies;
