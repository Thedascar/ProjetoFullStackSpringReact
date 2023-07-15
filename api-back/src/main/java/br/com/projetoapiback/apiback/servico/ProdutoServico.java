package br.com.projetoapiback.apiback.servico;

import br.com.projetoapiback.apiback.modelo.ProdutoModelo;
import br.com.projetoapiback.apiback.modelo.RespostaModelo;
import br.com.projetoapiback.apiback.repositorio.ProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProdutoServico {

    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private RespostaModelo respostaModelo;

    public Iterable<ProdutoModelo> listar(){
        return produtoRepositorio.findAll();
    }


    public ResponseEntity<?> cadastraralterar(ProdutoModelo produtoModelo,String acao){
        if(produtoModelo.getNome().equals("")){
            respostaModelo.setMensagem("o nome do produto é obrigatorio");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        } else if (produtoModelo.getMarca().equals("")) {
            return new ResponseEntity<RespostaModelo>(respostaModelo,HttpStatus.BAD_REQUEST);
        }
        if(acao.equals("cadastrar")){
            return new ResponseEntity<ProdutoModelo>(produtoRepositorio.save(produtoModelo),HttpStatus.CREATED);
        }else{
            return new ResponseEntity<ProdutoModelo>(produtoRepositorio.save(produtoModelo),HttpStatus.OK);
        }

    }

    public ResponseEntity<RespostaModelo> remover(long id){
        produtoRepositorio.deleteById(id);
        respostaModelo.setMensagem("Produto removido");
        return new ResponseEntity<RespostaModelo>(respostaModelo,HttpStatus.OK);
    }

}
