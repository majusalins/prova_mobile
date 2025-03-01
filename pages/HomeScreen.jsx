import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import { TOKEN } from '@env';

const API_URL = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`;

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`, // Passando o token Bearer aqui
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleNavigateToSearch = () => {
    navigation.navigate('Search');
  };

  const handleNavigateToCategories = () => {
    navigation.navigate('Categories');
  };

  const handleNavigateToMovieDetails = (movieId) => {
    navigation.navigate('MovieDetails', { movieId }); // Passando o movieId para a tela de detalhes
  };

  const renderItem = ({ item }) => (
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
      <Text style={styles.infoText}>Bem-vindo ao Movie Search App!</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.movieList}
      />
      <TouchableOpacity style={styles.button} onPress={handleNavigateToSearch}>
        <Text style={styles.buttonText}>Começar a Buscar Filmes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToCategories}>
        <Text style={styles.buttonText}>Categorias</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 10,
  },
  movieList: {
    alignItems: 'center',
  },
  movieContainer: {
    marginBottom: 20,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
