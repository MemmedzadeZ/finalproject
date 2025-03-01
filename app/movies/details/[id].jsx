import { Text, View, Dimensions, FlatList, ScrollView, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubePlayer from "react-native-youtube-iframe";
import Similar from "../../../components/movies/similars/Similar";
import tw from "tailwind-react-native-classnames";

const Details = () => {
  const [data, setData] = useState({});
  const [similar, setSimilar] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const { id, mediaType, start } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const width = Dimensions.get('window').width - 40;

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
        `http://192.168.0.111:5001/api/v1/${mediaType}/${id}/similar`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const apiData = await response.json();
      setSimilar(apiData.similar);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    getData();
    getTrailer();
    getSimilar();
  }, []);

  return (
    <ScrollView style={tw`bg-black h-full w-full py-[40px]`}>
      <YoutubePlayer
        height={225}
        play={start === "start" ? true : playing}
        videoId={trailerKey}
        onChangeState={onStateChange}
      />
      <Text style={tw`font-robotoRegular text-4xl text-white mt-[20px] ml-[20px]`}>
        {mediaType === "movie" ? data.title : data.name}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row ml-[20px] mr-[20px] mt-[20px]`}>
        {genres.map((item, index) => (
          <View key={item.id} style={tw`bg-[#27272A] p-[20px] rounded-[4px] ${index !== 0 ? "ml-[20px]" : ""}`}>
            <Text style={tw`text-white font-inter18ptRegular text-[12px] leading-[24px]`}>
              {item.name}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Text style={[tw`mt-[20px] ml-[20px] text-white font-poppinsRegular text-[14px] leading-[24px]`, { width: width }]}>
        {data.overview}
      </Text>

      <Text style={tw`ml-[20px] mt-[30px] text-white text-[20px] leading-[32px] font-robotoRegular`}>
        Similar TV Shows
      </Text>

      <FlatList
        data={similar}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`ml-[20px] mt-[20px] mb-[50px]`}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => <Similar item={item} index={index} />}
      />
    </ScrollView>
  );
};

export default Details;
