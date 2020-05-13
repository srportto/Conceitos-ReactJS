import React,{useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";
import ItemLI from "./components/ItemLI";

function App() {

  // criando array vazio para receber response dos gets da api chamada usando controle de estado/imutabilidade
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {

    let response = await api.post('/repositories',{
      title: `Novo repositorio ${Date.now()}`,
      url:   'https://github.com/srportto/Conceitos-Nodejs',
      techs: ["nodeJS", "javaScript", "UUID"]	

    });

    let repository = response.data;

    setRepositories([...repositories,repository]);

  }

  async function handleRemoveRepository(id) {

    let response = await api.delete(`/repositories/${id}`);
    //let repository = response.data;

    //console.log(response.status);;

    if(response.status === 204){

      // captura a posição de um vetor 
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      const repositoriesAtual = repositories;

      repositoriesAtual.splice(repositoryIndex,1);
            
      setRepositories([...repositoriesAtual]);

    }

    
  }




  return (
    <div>
      <ul data-testid="repository-list">
        <>
          {repositories.map(repository => 
            <ItemLI key={repository.id} title={repository.title}>        
                <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>      
            </ItemLI>)        
          }
        </>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
