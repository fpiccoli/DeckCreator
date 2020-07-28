module.exports = function CartaBuilder() {
  let cnumber;
  let classe;
  let sub;

  let obj = {
    constroi: function (){
      return {cardnumber: cnumber, class: classe, subtype: sub};
    },
    comCardNumber: function (valor){
      cnumber = valor;
      return this;
    },
    comClass: function (valor){
      classe = valor;
      return this;
    },
    comSubtype: function (valor){
      sub = valor;
      return this;
    }
  }
  return obj;
}
