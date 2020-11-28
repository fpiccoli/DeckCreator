module.exports = function ListaDeCartaBuilder() {
  let lista = [];

  let obj = {
    preenche: function (){
      return lista;
    },
    addItem: function (qtde, classe, sub){
      for(let i = 0; i < qtde; i++){
        lista.push({class: classe, subtype: sub});
      }
      return this;
    }
  }
  return obj;
}
