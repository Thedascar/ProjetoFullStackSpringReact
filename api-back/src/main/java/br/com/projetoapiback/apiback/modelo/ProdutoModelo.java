package br.com.projetoapiback.apiback.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "tb_produto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoModelo {

    @Id
    @GeneratedValue
    private Long id;
    private String nome;
    private String marca;
}
