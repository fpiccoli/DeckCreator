module.exports = {
  message(campo, message, color){
    campo.innerHTML = '<div class="alert alert-'+color+'">'+message+'</div>';
    setTimeout(function(){
      campo.innerHTML = '';
    }, 10000);
  }
}
