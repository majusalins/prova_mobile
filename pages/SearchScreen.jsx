import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Toast from 'react-native-toast-message';
import { searchMovies } from "../services/api";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearchChange = async (text) => {
    setQuery(text);

    if (text.length > 2) {
      try {
        const results = await searchMovies(text);
        if (results.length > 0) {
          setMovies(results);
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Filmes encontrados!',
            text2: `${results.length} filmes encontrados.`,
            visibilityTime: 3000,
          });
        } else {
          setMovies([]);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Nenhum filme encontrado.',
            text2: 'Tente outra pesquisa.',
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setMovies([]);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erro ao buscar filmes',
          text2: 'Tente novamente mais tarde.',
          visibilityTime: 3000,
        });
      }
    } else {
      setMovies([]);
    }
  };

  const handleSelectMovie = (movieId) => {
    navigation.navigate('MovieDetails', { movieId });
  };

  return (
    //<ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do filme"
          value={query}
          onChangeText={handleSearchChange}
        />
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectMovie(item.id)}>
              <View style={styles.movieItem}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieReleaseDate}>{item.release_date}</Text>
                <Text style={styles.movieOverview}>{item.overview}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    //</ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  searchInput: {
    height: 40,
    borderColor: "#6200ea",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  movieItem: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#e1e1e1",
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 16,
    color: "#6200ea",
  },
  movieReleaseDate: {
    fontSize: 14,
    color: "#333",
  },
  movieOverview: {
    fontSize: 12,
    color: "#666",
  },
});

export default SearchScreen;