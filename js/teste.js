
let panelBody = document.querySelector('.panel-body');
const jsonfile = require('jsonfile-promised');
const fs = require('fs');


var heroes = fetch('http://gdurl.com/KM4u');
//var cards = fetch('http://gdurl.com/dAE9');

heroes.then(function(response) {
  response.text().then(function(text) {
    console.log(JSON.parse(text));
  });
});


panelBody.innerHTML = '<div class="col-lg-12">'+

                            '<div class="row">'+

                                '<div class="col-lg-1">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/FgOP" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/mqNM" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/bvmc" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/0Bi2" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/ONCg" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-1">'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div class="col-lg-1">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/gBNo" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/DS6e" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/BG6I" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/Blzx" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/lUeN" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-1">'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div class="col-lg-1">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/RtqC" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/5EBZ" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/hIzs" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-2">'+
                                    '<img src="http://gdurl.com/Osif" height="100%" width="100%">'+
                                '</div>'+
                                '<div class="col-lg-1">'+
                                '</div>'+
                            '</div>';
