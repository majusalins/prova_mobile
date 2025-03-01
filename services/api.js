//services/api
import axios from "axios";
import { TOKEN } from '@env'

const API_KEY = TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  method: "GET",
  params: { include_adult: "false", language: "pt-BR", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const searchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    return null;
  }
};

export default api;
