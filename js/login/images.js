const extract = require('extract-zip');
const Download = require('receive-file');
const dataVersion = require('../rest/version.js');
const jsonfile = require('jsonfile');
const fsExtra = require('fs-extra');
const fs = require('fs');
const alert = require('../manager/interface/alert.js');

module.exports = { validate }

function validate() {
    return new Promise((resolve, reject) => {
        dataVersion.listImg().then((retorno) => {
            let ultimaVersao = Math.max(...retorno.map(o => o.versao));
            if (fs.existsSync('./img/version.json')) {
                jsonfile.readFile('./img/version.json').then(local => {
                    if (ultimaVersao > local.versao) {
                        atualizaImagens(ultimaVersao).then(() => {
                            resolve();
                        })
                    } else {
                        resolve();
                    }
                })
            } else {
                atualizaImagens(ultimaVersao).then(() => {
                    resolve();
                })
            }
        }).catch(err => reject(err));
    });
}

function atualizaImagens(ultimaVersao) {
    return new Promise((resolve, reject) => {
        fsExtra.emptyDir('./img/').then(() => {
            download().then(() => {
                jsonfile.writeFile('./img/version.json', { versao: ultimaVersao }, { spaces: 2 }).then(() => {
                    fsExtra.removeSync('./img/img.zip');
                    resolve();
                })
            })
        }).catch((err) => { reject(err); });
    })
}

function download() {
    alert.message(document.querySelector('#alert-message'), 'Updating card images, please wait a few seconds...', 'warning');
    const options = {
        directory: "./img/",
        filename: "img.zip",
        timeout: 100000
    }
    return new Promise((resolve, reject) => {
        Download('https://tabletop-simulator-mods.s3.amazonaws.com/img.zip', options).then(() => {
            extractZip('./img/img.zip', __dirname + '../../../img/').then(() => {
                resolve();
            })
        }).catch((err) => { reject(err); });
    });
}

function extractZip(source, target) {
    return new Promise((resolve, reject) => {
        extract(source, { dir: target }).then(() => {
            resolve();
        }).catch((err) => { reject(err); });
    });
}