import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { TOKEN } from '@env'; // Certifique-se de que o TOKEN está correto no arquivo .env

const GENRES_API_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR';
const MOVIES_BY_GENRE_URL = 'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=';

const CategoriesScreen = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(GENRES_API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`  // Usando o Bearer Token no cabeçalho
          }
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error.response ? error.response.data : error);
      }
    };

    fetchGenres();
  }, []);

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await axios.get(`${MOVIES_BY_GENRE_URL}${genreId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`  // Usando o Bearer Token no cabeçalho
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes por gênero:', error.response ? error.response.data : error);
    }
  };

  const handleNavigateToMovieDetails = (movieId) => {
    navigation.navigate('MovieDetails', { movieId }); // Passando o ID do filme para a tela de detalhes
  };

  const renderGenreItem = ({ item }) => (
    <TouchableOpacity
      style={styles.genreButton}
      onPress={() => fetchMoviesByGenre(item.id)}
    >
      <Text style={styles.genreText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleNavigateToMovieDetails(item.id)}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }}
          style={styles.poster}
        />
      </TouchableOpacity>
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Categorias de Filmes</Text>

      <FlatList
        data={genres}
        renderItem={renderGenreItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreList}
      />

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 10,
    textAlign: 'center',
  },
  genreList: {
    marginBottom: 20,
  },
  genreButton: {
    backgroundColor: '#6200ea',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  movieContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoriesScreen;
