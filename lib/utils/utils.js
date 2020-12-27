
const ejs = require('ejs');

const path = require('path');
const fs = require('fs');

// 编译ejs模板
const compile = (template,data) => {
    const templatePosition = `../template/${template}`;
    const templatePath = path.resolve(__dirname,templatePosition)

    return new Promise((resolve,reject) => {
        ejs.renderFile(templatePath, {data}, {}, (err, result) => {
            if(err) {
                console.log(err);
                reject(err)
                return;
            }

            resolve(result)
        })
    })
}

const writeToFile = (path,content,dest) => {
    if(!fs.existsSync(dest)){
        fs.mkdir(dest,{ recursive: true },(err) => {
            if(err) throw err;
            console.log('创建成功');
            return fs.promises.writeFile(path,content)
        });
    }else{
        return fs.promises.writeFile(path,content)
    }
}


module.exports = {
    compile,
    writeToFile
}