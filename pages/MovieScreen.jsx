import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { TOKEN } from '@env'; // O mesmo token de autenticação

const MovieDetailsScreen = ({ route }) => {
  const { movieId } = route.params; // Pegando o movieId passado
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <Text>Carregando...</Text>; // Exibindo uma mensagem enquanto os detalhes não carregam
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.releaseDate}>Data de lançamento: {movie.release_date}</Text>
      <Text style={styles.rating}>Avaliação: {movie.vote_average}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    marginTop: 20,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  overview: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  releaseDate: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ea',
    marginTop: 10,
  },
});

export default MovieDetailsScreen;
