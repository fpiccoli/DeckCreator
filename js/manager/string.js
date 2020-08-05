module.exports = { replaceAll, getNome }

function replaceAll(str, de, para){
  var pos = str.indexOf(de);
  while (pos > -1){
    str = str.replace(de, para);
    pos = str.indexOf(de);
  }
  return (str);
}

function getNome(string){
  string = replaceAll(string, 'á','a');
  string = replaceAll(string, 'â','a');
  string = replaceAll(string, 'ã','a');
  string = replaceAll(string, 'ó','o');
  string = replaceAll(string, 'ô','o');
  string = replaceAll(string, 'é','e');
  string = replaceAll(string, 'ê','e');
  string = replaceAll(string, 'í','i');
  string = replaceAll(string, 'ú','u');
  string = replaceSpecialChar(string);
  string = replaceAll(string, '_','-');
  return string.toLowerCase();
}

function replaceSpecialChar(str){
  return str.replace(/[^a-zA-Z0-9]/g,'_');
}
