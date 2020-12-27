// 是回调函数返回promise格式
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

// download现在已经接受promise形式了
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile } = require('../utils/utils')

// const open = require('open')

// 1.创建脚手架
const createProjectAction = async (project) => {
    console.log("zhujuliang help you create demo");
    // 1.clone项目
    await download( vueRepo, project, { clone:true })

    // 2.执行npm install
    await commandSpawn(process.platform === 'win32' ? 'npm.cmd' : npm, ['install'], {cwd: `./${project}` })

    // 3.执行npm run serve
    await commandSpawn(process.platform === 'win32' ? 'npm.cmd' : npm, ['run','serve'], {cwd: `./${project}` })

    // 4.默认打开浏览器,默认打开浏览器的一个方法，但是不写的时候就可以打开了不知道为什么
    // open("http://localhost:8080/")
}

// 2.添加组件
const addcomponent = async (name,dest) => {
    console.log("zhujuliang help you create component");
    // 一.本地版的复制粘贴添加组件
    // 读取模板文件路径
    // let template = fs.readFileSync(path.join(__dirname,'./template.vue'),'utf8')
    // // 替换模板文件中内容的名字标识
    // let content = template.replace(/componentName/g,name)
    // // 目标目录和目标文件路径
    // const root = './src/components/'
    // const targetDirPath = path.join(__dirname, root, name)
    // const targetfilePath = path.join(__dirname, root, name, `${name}.vue`)
    // // 判断是否有该目标目录，没有则创建
    // if(!fs.existsSync(targetDirPath)){
    //     console.log(targetDirPath);
    //     fs.mkdir(targetDirPath,{ recursive: true },(err) => {
    //         if(err) throw err;
    //         console.log('目录已创建');
    //     });
    // }
    // // 判断是否有目标文件。没有则创建
    // if(!fs.existsSync(targetfilePath)){
    //     fs.writeFile(targetfilePath,content,(err) => {
    //         if(err) throw err;
    //         console.log('文件已经创建');
    //     })
    // }

    
    // 1.有对应的ejs模板
    // 2.编译ejs模板 result
    const result = await compile("vue-component.ejs",{name, lowerName: name.toLowerCase() })
    // 3.将result写入到.vue文件中
    const targetPath = path.resolve(dest,`${name}.vue`) 
    writeToFile(targetPath,result,dest)
    // 4.放到对应的文件夹中
}

// 3.添加页面和路由
const addpageAndRouter = async (name ,dest) => {
    console.log("zhujuliang help you create pages");
    // 1.编译ejs模板
    const pageResult = await compile('vue-component.ejs',{name,lowerName:name.toLowerCase()})
    const routerResult = await compile('vue-router.ejs',{name,lowerName:name.toLowerCase()})
    // 2.写入模板
    const targetPagePath = path.resolve(dest, `${name}.vue`)
    const targetRouterPath = path.resolve(dest, 'router.js')
    writeToFile(targetPagePath,pageResult,dest)
    writeToFile(targetRouterPath,routerResult,dest)
}

// 4.添加vuex模板
const addStore = async (name,dest) => {
    console.log("zhujuliang help you create store");
    // 1.编译ejs模板
    const storeResult = await compile('vue-store.ejs',{name,lowerName:name.toLowerCase()})
    const typeResult = await compile('vue-types.ejs',{name,lowerName:name.toLowerCase()})
    // 2.写入模板
    const targetStore = path.resolve(dest,`${name}.js`)
    const typeStore = path.resolve(dest,`types.js`)
    writeToFile(targetStore,storeResult,dest)
    writeToFile(typeStore,typeResult,dest)
}

module.exports = {
    createProjectAction,
    addcomponent,
    addpageAndRouter,
    addStore
}