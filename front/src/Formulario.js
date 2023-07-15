function Formulario({alterar,remover,botao,eventoTeclado,cadastrar,obj,cancelar}){
    return(
        <form>
            <input type="text" value={obj.nome}onChange={eventoTeclado} name='nome'placeholder="Nome" className="form-control" />
            <input type="text" value={obj.marca} onChange={eventoTeclado} name='marca'placeholder="Marca" className="form-control" />

            {
                botao
                ?
                <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary" />
                :
                <div>
                    <input type="button" onClick={alterar}value="Alterar" className="btn btn-warning" />
                    <input type="button" onClick={remover} value="Remover" className="btn btn-danger" />
                    <input type="button" value="Cancelar" onClick={cancelar}className="btn btn-secondary" />
                    
                </div>
            }
 
            
          
            </form>
    )
}
export default Formulario;