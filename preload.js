// electron接收传参或主动talk

// preload.js

let {ipcRenderer} = require('electron');
let fs = require('fs');
let path = require('path');

window.saveDataToFile = function (name, fileString, callback) {
  let fPath = path.join('C:\\Users\\melon\\Desktop\\新建文件夹', name);
  fs.writeFileSync(fPath, fileString);
  callback(`write file to ${'fPath'} success`);
  ipcRenderer.send('write_file_success', 'args aaa'); // 比如收到请求关闭窗口
};

ipcRenderer.on('saveDataToFileSuccessListener', (e, args) => {
  window.saveDataToFileSuccessListener(args[0]);
});

window.fromWebToElectron = function (a, callback) {
  console.log('electron收到远端的传参', a);
  callback('config result'); // 回调给远端的请求数据，如 config
  ipcRenderer.send('close', 'args bbb'); // 比如收到请求关闭窗口
};

ipcRenderer.on('ifElectronWantClose', (e, args) => {
  window.ifElectronWantClose(args[0]);
});