import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import { toast } from 'react-toastify';

function Favoritos () {
  const [filmes, setFilmes] = useState([])
  useEffect(() => {
    //criando a lista de filmes salvos no local storage
    const minhaLista = localStorage.getItem("@primeflix")
    setFilmes(JSON.parse(minhaLista) || [])
  }, [])
  function excluirFilme (id) {
    //filtra todos os filmes diferentes do id escolido
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id)
    })
    //devolve todos os filmes menos o com o id escolhido
    setFilmes(filtroFilmes)
    toast.success("Filme removido com sucesso!")
    //salva no local storage todos os filmes menos o com o id escolhido
    localStorage.setItem("@primeflix",JSON.stringify(filtroFilmes))
  }
  return (
    <div className='meus-filmes'>
      <h1>Tela Favoritos</h1>
      {filmes.length === 0 && <span>Você não possui filmes salvos</span>}
      {/*listando filmes*/}
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;