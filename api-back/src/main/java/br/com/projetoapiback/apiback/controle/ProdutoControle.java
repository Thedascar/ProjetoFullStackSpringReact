package br.com.projetoapiback.apiback.controle;

import br.com.projetoapiback.apiback.modelo.ProdutoModelo;
import br.com.projetoapiback.apiback.modelo.RespostaModelo;
import br.com.projetoapiback.apiback.servico.ProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") // cors libera a api para qualquer porta... podemos tambem adicionar uma porta especifica
public class ProdutoControle {

    @Autowired
    private ProdutoServico produtoServico;

    @GetMapping("listar")
    public Iterable<ProdutoModelo> listar(){
        return produtoServico.listar();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo produtoModelo){
        return produtoServico.cadastraralterar(produtoModelo,"cadastrar");
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModelo produtoModelo){
        return produtoServico.cadastraralterar(produtoModelo,"alterar");
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id){
        return produtoServico.remover(id);
    }

}
