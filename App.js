import React, {useState} from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

// Importando os componentes
import Header from "./components/header"; // O componente Header
import HomeScreen from "./pages/HomeScreen"; // A página Home
import SearchScreen from "./pages/SearchScreen"; // A página de Busca de Filmes
import MovieDetailsScreen from "./pages/MovieScreen"; // Tela de detalhes do filme
import CategoriesScreen from "./pages/CategoriesScreen"; // Tela de categorias

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Tela Inicial */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <Header />,
            headerStyle: { backgroundColor: "#6200ea" },
          }}
        />
        
        {/* Tela de Busca */}
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTitle: () => <Header />,
            headerStyle: { backgroundColor: "#6200ea" },
          }}
        />
        
        {/* Tela de Detalhes do Filme */}
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{
            headerTitle: () => <Header />,
            headerStyle: { backgroundColor: "#6200ea" },
          }}
        />
        
        {/* Tela de Categorias */}
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerTitle: () => <Header />,
            headerStyle: { backgroundColor: "#6200ea" },
          }}
        />
      </Stack.Navigator>

      {/* Componente de Toast para notificações */}
      <Toast />
    </NavigationContainer>
  );
};

export default App;
