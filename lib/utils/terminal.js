// 执行终端命令的相关代码

const { rejects } = require('assert');
const { spawn } = require('child_process');
const { resolve } = require('path');

const commandSpawn = (...args) => {
    return new Promise((resolve,reject) => {
        // 开启一个新的进程
        const childProcess = spawn(...args);
        // 将进程运行的流放入全局process的文件流中，可以在执行命令的时候看到
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        childProcess.on("close", () => {
            resolve()
        })
    })
}

module.exports = {
    commandSpawn
}