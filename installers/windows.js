const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
.then(createWindowsInstaller)
.catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'deckcreator-win32-x64/'),
    authors: 'Filipe Piccoli',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'DeckCreator.exe',
    setupExe: 'DeckCreatorSetup.exe',
    setupIcon:  path.join(rootPath, 'build', 'icon.ico'),
    loadingGif:  path.join(rootPath, 'build', 'installer.gif'),
    name: 'DeckCreator'
  })
}
