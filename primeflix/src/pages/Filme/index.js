import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import { toast } from 'react-toastify';

function Filme () {
  const { id } = useParams();
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
//buscando o filme escolhido pelo id  
  useEffect(() => {
    async function loadFilme () {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "d47b49bdd4e1fcd40a4af8231e647db1",
          language: "pt-br",
        }
      })
      //usando uma promisse, dois casos de uso
      // se encontrar o filme cai no then
        .then((response) => {
          setFilme(response.data)
          setLoading(false)
        })
        //se nao encontrar o filme cai no catch
        .catch(() => {
          console.log('filme nao encontrado')
          navigate("/", { replace: true })
          return;
        })
      
    }
    loadFilme();
    
    //desmontando componente
    return (() => {
      console.log("Componente desmontado")
    })
  }, [navigate,id])

  //funcao salvar filme no local storage
  function salvarFilme () {
    const minhalista = localStorage.getItem('@primeflix');
    let filmesSalvos = JSON.parse(minhalista) || [];
    // verificando se ja existe algum filme salvo em este id
    const temFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
    if (temFilme) {
      toast.warn('Este filme já está salvo')
      return;
    }
    //salvando filme no array do local storage
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success('Filme Salvo com sucesso!')

  }
  
  if (loading) {
    return (
      <div className='filme-info'>
        <h1>Carregando Detalhes</h1>
      </div>
    )
  }
  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação {parseFloat(filme.vote_average).toFixed(2)} / 10</strong>
      <div className='area-buttons'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${filme.title}`} target="blank" rel="noreferrer">Trailer</a>
        </button>
      </div>
    </div>
  )
}

export default Filme;