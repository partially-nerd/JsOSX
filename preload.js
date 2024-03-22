const { contextBridge, remote, ipcRenderer } = require('electron');
const fs = require("fs");
const os = require("child_process");
const path = require("path");

let dir = "./";
ipcRenderer.on('argv', argv => {
  argv.forEach(arg => {
    if (arg.startsWith("--dir=")) {
      dir = arg.split("--dir=")[1];
    }
  });
});

// API FOR VERSIONS
contextBridge.exposeInMainWorld('env', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  working_dir: dir
})

// API FOR OS, AND FS
contextBridge.exposeInMainWorld('api', {
  cat: fs.readFileSync,
  ls: fs.readdirSync,
  echo: fs.writeFileSync,
  abs: path.resolve,
  system: (cmd) => {
    let arr = cmd.split(" ");
    console.log(arr);
    cmd = arr.shift();
    return os.spawnSync(cmd, arr, { stdio: "inherit", encoding: 'utf8', timeout: 10000 });
  },
  exec: cmd => os.execSync(cmd, { encoding: 'utf8', timeout: 10000 }),
  isDir: path => fs.statSync(path).isDirectory(),
})