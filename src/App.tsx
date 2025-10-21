import React, { useState, useEffect } from 'react'
import './App.css'
import api from './api/api'
type EstudanteType = {
  _id: string,
  nome: string,
  idade: number
}
function App() {
  useEffect(() => {
    api.get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch((error)=>{console.log(error); alert("Error get data:"+error?.mensagem)})
  }, [])
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
        const nome = formData.get("nome")
        const preco = formData.get("preco")
        const descricao = formData.get("descricao")
        const urlfoto = formData.get("urlfoto")
    const produto = {nome,preco,descricao,urlfoto}
    api.post("/produtos",produto)
    .then((response) => setProdutos([...produtos, response.data]))
    .catch((error)=>{console.log(error); alert("Error post data:"+error?.mensagem)})
  }

  return (
    <>
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Nome' value={nome}
          onChange={(e) => setNome(e.target.value)} />

        <input type="number" placeholder='Idade' value={idade}
          onChange={(e) => setIdade(Number(e.target.value))} />
          
        <button type='submit'>Cadastrar</button>
      </form>

      <h1>Lista de Estudantes</h1>
      <div className="container-estudantes">
        {
          estudantes.map((estudante) => {
            return (
              <div key={estudante._id}>
                <h2>{estudante.nome}</h2>
                <p>Idade: {estudante.idade}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
