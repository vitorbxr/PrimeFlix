import axios from 'axios';

//Base da URL: https://api.themoviedb.org/3
//URL completa para mostras filmes em cartas: 
//https://api.themoviedb.org/3/movie/now_playing?api_key=d47b49bdd4e1fcd40a4af8231e647db1&language=pt-br
//API_Key:
//d47b49bdd4e1fcd40a4af8231e647db1

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});
export default api;