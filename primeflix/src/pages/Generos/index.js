import { useEffect, useState } from "react";
import api from "../../services/api";

function Generos () {
  const [generos, setGeneros] = useState([])
  
  useEffect(() => {
    async function loadGeneros(){
      const response = await api.get("genre/movie/list", {
        params: {
          api_key: "d47b49bdd4e1fcd40a4af8231e647db1",
          language: "pt-br",
        }
      })
      //console.log(response.data.genres)
      setGeneros(response.data.genres)
    }
    loadGeneros();
  },[])
  return (
    <div>
      <h1>Generos</h1>
      <div>
        {generos.map((genero) => {
          return (
            <article>
              <strong>{genero.name}</strong>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Generos;