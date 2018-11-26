module.exports = {
  filtraCookies(cookies, nome){
    return cookies.filter(
      function(cookie){
        return cookie.domain == 'deckcreator.com' && cookie.name.includes(nome)
      });
    }
  }
