#!/usr/bin/env node

const program = require('commander');

const helpOptions = require('./lib/core/help');
const createCommands = require('./lib/core/create');

// 动态获取版本号  common.js不仅可以导入js文件还可以导入json文件
program.version(require('./package.json').version);

// 帮助和可选信息
helpOptions();
// 创建其他指令
createCommands();


// 解析传入的参数，process为node的全局变量
program.parse(process.argv);

