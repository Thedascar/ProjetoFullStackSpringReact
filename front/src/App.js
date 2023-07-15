import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //objetoProduto
  const produto = {
    id:0,
    nome:'',
    marca:''
  }

  //Use State
  const [btnCadastrar,setBtnCadastrar] = useState(true)
  const [produtos,setProdutos] = useState([]);
  const [objProduto,setObjProduto] = useState(produto);


  //UseEffect
  useEffect(() =>{
    fetch(("http://localhost:8080/listar"))
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  },[]);


  // obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  // cadastrar produto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar",{
      method:'post',body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_covertido => {
      if(retorno_covertido.mensagem !== undefined){
        alert(retorno_covertido.mensagem);
      }else{
        setProdutos([...produtos,retorno_covertido]);
        alert('produto cadastrado com sucesso!!');
        limparFormulario();
      }
    })
  }

  // alterar
  const alterar = () => {
    fetch("http://localhost:8080/alterar",{
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_covertido => {
      if(retorno_covertido.mensagem !== undefined){
        alert(retorno_covertido.mensagem);
      }else{
        
        // mensagem 
        alert('produto alterado com sucesso');
         // copia do vetor de produtos
        let vetorTemp = [...produtos];

        // indice
        let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      // remover produto do vetor temp
      vetorTemp[indice] = objProduto
      
      // atualizar o vetor de produtos
      setProdutos(vetorTemp);

        // limapr formualrio
        limparFormulario();
      }
    })
  }

  //remover produto
  const remover = () => {
    fetch("http://localhost:8080/remover/"+objProduto.id,{
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_covertido => {
      // mensagem
      alert(retorno_covertido.mensagem)
      // copia do vetor de produtos
      let vetorTemp = [...produtos];

      // indice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      // remover produto do vetor temp
      vetorTemp.splice(indice,1);
      
      // atualizar o vetor de produtos
      setProdutos(vetorTemp);

      // limpar formulario
      limparFormulario();
    })
  }

  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  // selecionar produto
  const selecionarProduto = (indice) => {
      setObjProduto(produtos[indice]);
      setBtnCadastrar(false);
  }

  // retorno
  // <p>{JSON.stringify(objProduto)}</p> teste
  //<p>{JSON.stringify(produtos)}</p> teste
  return (
    <div>
     
        <Formulario alterar={alterar}remover={remover}obj={objProduto}botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} cancelar={limparFormulario}/>
        <Tabela selecionar={selecionarProduto}vetor={produtos}/>
    </div>
  );
}

export default App;
