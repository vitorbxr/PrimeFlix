import { Link } from "react-router-dom";
import './style.css'

function Erro () {
  return (
    <div className="not-found">
      <h1>Erro 404</h1>
      <h2>Pagina não encontrada...</h2>
      <Link to='/'>Ver todos os filmes</Link>
    </div>
  )
}

export default Erro;