import { View } from 'react-native-web';
import Similar from '../../components/movies/similars/Similar';
import { FlatList } from 'react-native';

const Details = () => {

    return (


        <View>

            <Text>Salamm</Text>
            <FlatList
           data={trendingMovies}
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={styles.listContainer}
           renderItem={({ item, index }) => (
             <Similar item={item} index={index} />
           )}
           />

        </View>
    );
}

export default Details;