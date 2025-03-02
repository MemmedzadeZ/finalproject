import { Text, View, Dimensions, FlatList, ScrollView, Alert, TouchableOpacity, Image } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router"; // UseRouter for navigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";
import Similar from "../../../components/movies/similars/Similar";
import { StyleSheet } from "react-native"; // Stil üçün StyleSheet import edin
import TVShows from '../../../components/movies/shows/TvShows';

import TrendingMovies from "../../../components/movies/trending/TrendingMovies";

const Details = () => {
  const [data, setData] = useState({});
  const [similar, setSimilar] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);

  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const { id, mediaType, start } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const width = Dimensions.get('window').width - 40;
  const router = useRouter(); // UseRouter for navigation

  const getData = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.111:5001/api/v1/${mediaType}/${id}/details`
      );
      const apiData = await response.json();
      setGenres(apiData.content.genres);
      setData(apiData.content);
    } catch (error) {
      console.error(error);
    }
  };

  const getTrailer = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://192.168.0.111:5001/api/v1/${mediaType}/${id}/trailers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const apiData = await response.json();
      setTrailerKey(apiData.trailers[0].key);
    } catch (error) {
      console.error(error);
    }
  };

  const getSimilar = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(
      `http://192.168.0.111:5001/api/v1/movie/${id}/similar`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const apiData = await response.json();
    console.log("Similar data:", apiData); // Burada yoxlayırıq
    setSimilar(apiData.similar);
  } catch (error) {
    console.error("Error fetching similar:", error);
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

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const goBack = () => {
    router.back(); // Go back to the previous page
  };

  useEffect(() => {
    getData();
    getTrailer();
    getSimilar();
 getTrendingTVShows();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Image source={require("../../../assets/images/leftarrow.png")} style={styles.backIcon} />
      </TouchableOpacity>

      <YoutubePlayer
        height={225}
        play={start === "start" ? true : playing}
        videoId={trailerKey}
        onChangeState={onStateChange}
      />
      <Text style={styles.title}>
        {mediaType === "movie" ? data.title : data.name}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genresContainer}>
        {genres.map((item, index) => (
          <View key={item.id} style={[styles.genre, index !== 0 && styles.genreMargin]}>
            <Text style={styles.genreText}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={[styles.overview, { width: width }]}>
        {data.overview}
      </Text>

<Text style={styles.similarText}>Similar TV Shows</Text>


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
  scrollView: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    paddingTop: 40, 
  },
  backButton: {
    position: "absolute",
    top: -30,
    left:5,
    zIndex: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  genre: {
    backgroundColor: '#27272A',
    padding: 10,
    borderRadius: 4,
  },
  genreMargin: {
    marginLeft: 10,
  },
  genreText: {
    color: 'white',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
  },
  overview: {
    marginTop: 20,
    marginLeft: 20,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 24,
  },
similarText: {
  marginLeft: 20,
  marginTop: 30,
  fontSize: 20,
  lineHeight: 32,
  fontFamily: 'Roboto-Regular',
  fontWeight: '400', // font-normal
  color: '#FFFFFF',
},

  similarList: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 50,
  },
});

export default Details;
