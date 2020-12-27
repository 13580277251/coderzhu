const program = require('commander')

const helpOptions = () => {
    // 怎加自己的options（可选参数）
    program.option('-w --why','a zhu cli')
    // 传入参数dest
    program.option('-d --dest <dest>','a destination folder, 例如：-d /src/components')

    // 监听指令--help
    program.on('--help',function(){
        console.log('');
        console.log('Other');
    })
}

module.exports = helpOptions