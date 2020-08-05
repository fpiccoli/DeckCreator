module.exports = {
  replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
      str = str.replace(de, para);
      pos = str.indexOf(de);
    }
    return (str);
  },
  replaceSpecialChar(str){
    return str.replace(/[^a-zA-Z0-9]/g,'_');
  },
  getNome(string){
    string = this.replaceAll(string, 'á','a');
    string = this.replaceAll(string, 'â','a');
    string = this.replaceAll(string, 'ã','a');
    string = this.replaceAll(string, 'ó','o');
    string = this.replaceAll(string, 'ô','o');
    string = this.replaceAll(string, 'é','e');
    string = this.replaceAll(string, 'ê','e');
    string = this.replaceAll(string, 'í','i');
    string = this.replaceAll(string, 'ú','u');
    string = this.replaceSpecialChar(string);
    string = this.replaceAll(string, '_','-');
    return string.toLowerCase();
  }
}
