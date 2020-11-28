module.exports = function ListaDeCartaBuilder() {
  let lista = [];

  let obj = {
    preenche: function (){
      return lista;
    },
    addPure: function (qtde, classe){
      for(let i = 0; i < qtde; i++){
        lista.push({name: classe, subtype: 'Pure', main: classe, sub: classe});
      }
      return this;
    },
    addHybrid: function (qtde, classe, main, sub){
      for(let i = 0; i < qtde; i++){
        lista.push({name: classe, subtype: 'Hybrid', main: main, sub: sub});
      }
      return this;
    }
  }
  return obj;
}
