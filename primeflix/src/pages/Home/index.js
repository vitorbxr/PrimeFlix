import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './style.css';

function Home () {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadFilmes () {
      //buscar a api com os seguintes parametros
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "d47b49bdd4e1fcd40a4af8231e647db1",
          language: "pt-br",
          page: 1,
        }
      })
      //console.log(response.data.results.slice(0,10));
      //buscar 10 filmes
      setFilmes(response.data.results.slice(0, 10))
      setLoading(false)
    }
    loadFilmes()
  }, [])
//equanto nao carrega os filmes mostra um loading
  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {/*percorrer e listar 10 filmes*/}
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home;