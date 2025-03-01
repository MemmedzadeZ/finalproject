import { 
  Text, 
  View, 
  ImageBackground, 
  FlatList, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import TVShows from '../../components/movies/shows/TvShows';
import TrendingMovies from "../../components/movies/trending/TrendingMovies";

// import fdd from "../details/index"

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width - 40;
  const [path, setPath] = useState("");

  const getTrendingMovies = async () => {
    try {
      const response = await fetch("http://192.168.0.111:5001/api/v1/movie/trending");

      if (response.ok) {
        const datas = await response.json();
        console.log("Trending Movies Data:", datas);
        setTrendingMovies(datas.content);
        setPath(datas.content.length > 0 ? datas.content[0].poster_path : "");
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
        console.log("Trending TV Shows Data:", datas);
        setTrendingTVShows(datas.content);
      }
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  };
  

  useEffect(() => {
    getTrendingMovies();
    getTrendingTVShows();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground 
        source={{ uri: `${imageUrl}${path}` }}
        style={[styles.imageBackground, { width, height: 470 }]}
      >
        <TouchableOpacity 
          onPress={() => router.push({
    pathname: "/movies/details/[id]",
    params: { id: trendingMovies[0].id, mediaType: trendingMovies[0].media_type, start: "start" }
  })}
          style={[styles.playButton, { width: (width - 40) / 2 }]}
        >
          <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.moreInfoButton, { width: (width - 40) / 2 }]}
        >
          <Text style={styles.moreInfoText}>More Info</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Text style={styles.sectionTitle}>Trending Movies</Text>

      <FlatList
        data={trendingMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TrendingMovies item={item} index={index} />
        )}
      />




      <Text style={styles.sectionTitle}>Popular TV Shows</Text>

       <FlatList
        data={trendingTVShows}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20,marginBottom:50 }}
        renderItem={({ item, index }) => (
          <TVShows item={item} index={index} />
        )}
      /> 

 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 20,
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
});

export default Movies;
