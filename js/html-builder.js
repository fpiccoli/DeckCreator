module.exports = {
  create(){
    return {node:'root',child:[]};
  },
  addElement(root, tag, atributos){
    root.child.push({
      node:'element',
      tag:tag,
      attr: atributos,
      child:[],
      addChild:function(tag, atributos){
        console.log(tag, atributos);
        //this.addElement(root.child, tag, atributos)
    }
  });
    return root;
  },
  addText(){

  }
}
