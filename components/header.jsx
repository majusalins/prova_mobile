import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/logo.png")} // Altere para o caminho da sua imagem
        style={styles.logo}
      />
      <Text style={styles.title}>Movie Search App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    padding: 20,
    alignItems: "center",
    flexDirection: "row", // Alinha a imagem e o texto na horizontal
    justifyContent: "center", // Alinha ao centro
  },
  logo: {
    width: 30, // Largura da imagem
    height: 30, // Altura da imagem
    marginRight: 10, // Espaço entre a imagem e o texto
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
