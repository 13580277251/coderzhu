const program = require('commander')
const {
    createProjectAction,
    addcomponent,
    addpageAndRouter,
    addStore
} = require('./actions')

const createCommands = () => {
    // <>为必选参数  []为必选参数
    // command创建指令
    // description指令描述
    // action创建回调函数
    program
        .command("create <project> [others...]")
        .description('clone a repository into a folder')
        .action(createProjectAction);

    program
        .command("addcpn <name>")
        .description('add vue component，例如：why addcpn hello world -d src/components')
        // 指令为why addcpn NavBar -d 后面接路径或者不接（有默认路径）
        .action((name) => {
            addcomponent(name, program.dest || 'src/components')
        })

    program
        .command('addpage <page>')
        .description('add vue page and router config, 例如：why addpage Home [-d src/pages]')
        .action((page) => {
            addpageAndRouter(page, program.dest || `src/pages/${page.toLowerCase()}` )
        })

    program
        .command('addstore <name>')
        .description('add vuex store ,例如:why addstore Home -d src/store')
        .action((name) => {
            addStore(name, program.dest || `src/store/modules/${name.toLowerCase()}`)
        })
}

module.exports = createCommands