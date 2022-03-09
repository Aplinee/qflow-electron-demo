const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const { app } = require('electron')



  // and load the index.html of the app.
  mainWindow.loadURL('https://qingflow.com')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
let win;

ipcMain.on('close', (e, a) => {
 // mainWindow.webContents.send('ifElectronWantClose', [a]);
  win.hide();
  win.setSkipTaskbar(true);
  win = null;
});

ipcMain.on('write_file_success', (e, a) => {
  mainWindow.webContents.send('saveDataToFileSuccessListener', [a]);
});

app.on('ready', createWindow)
const electron = require('electron')
/*获取electron窗体的菜单栏*/
const Menu = electron.Menu
/*隐藏electron创听的菜单栏*/
Menu.setApplicationMenu(null)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://ssc.hnlcgame.cn') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
app.commandLine.appendSwitch('ignore-certificate-errors')