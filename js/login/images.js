const extract = require('extract-zip');
const Download = require('receive-file');
const dataVersion = require('../rest/version.js');
const jsonfile = require('jsonfile');
const fsExtra = require('fs-extra');
const fs = require('fs');
const alert = require('../manager/interface/alert.js');
const path = require('../manager/path.js').getPathLogin();
const pathZip = require('../manager/path.js').getPathZip();

module.exports = { validate }

function validate(user) {
    return new Promise((resolve, reject) => {
        let game = 'mrbc';
        if (user.game === 'M&D') game = 'md';

        dataVersion.list(game).then((retorno) => {
            let ultimaVersao = Math.max(...retorno.map(o => o.versao));
            if (fs.existsSync(path + game + '-version.json')) {
                jsonfile.readFile(path + game + '-version.json').then(local => {
                    if (ultimaVersao > local.versao) {
                        atualizaImagens(game, ultimaVersao).then(() => {
                            resolve();
                        })
                    } else {
                        resolve();
                    }
                })
            } else {
                atualizaImagens(game, ultimaVersao).then(() => {
                    resolve();
                })
            }
        }).catch(err => reject(err));
    });
}

function atualizaImagens(game, ultimaVersao) {
    return new Promise((resolve, reject) => {
        download(game).then(() => {
            jsonfile.writeFile(path + game + '-version.json', { versao: ultimaVersao }, { spaces: 2 }).then(() => {
                fsExtra.removeSync(path + 'img.zip');
                resolve();
            })
        }).catch((err) => { reject(err); });
    })
}

function download(game) {
    alert.message(document.querySelector('#alert-message'), 'Updating card images, please wait a few seconds...', 'warning');
    const options = {
        directory: path,
        filename: "img.zip",
        timeout: 100000
    }
    return new Promise((resolve, reject) => {

        Download('https://tabletop-simulator-mods.s3.amazonaws.com/' + game + '/img.zip', options).then(() => {
            extractZip(path + '/img.zip', __dirname + pathZip).then(() => {
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