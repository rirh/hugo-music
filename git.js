#!/usr/bin/env node
const { exec } = require('shelljs');
const git = require('simple-git')();
const CFonts = require('cfonts');
//获取命令信息
const program = require('commander');
//输入交互
const inquirer = require('inquirer')
//加载
const ora = require('ora')
const AR = {
    loading: ora({
        text: 'loading...'
    }),
    verse: function () {
        exec('node lib/verse')
    },
    lint: function () {
        exec('yarn lint')
    },
    start: function () {
        exec('yarn start ')
    },
    git: function () {
        const clg = (str) => {
            CFonts.say(str, {
                font: 'block', // define the font face
                align: 'left', // define text alignment
                colors: ['#fff', '#ff8344'], // define all colors
                background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
                letterSpacing: 1, // define letter spacing
                lineHeight: 1, // define the line height
                space: true, // define if the output text should have empty lines on top and on the bottom
                maxLength: '0', // define how many character can be on one line
            });
        }
        this.loading.start()
        git
            .add('./*', () => {
                this.loading.color = 'blue';
                this.loading.text = 'add...';
            })
            .commit("await", () => {
                this.loading.color = 'blue';
                this.loading.text = 'commiting...';
            })
            .push('origin', 'master', () => {
                this.loading.color = 'blue';
                this.loading.text = 'pushing...';
                this.loading.succeed();
                this.loading.stop();
                clg('push done!')
                exec('say push done');

            });
    },

}

program
    .version('1.0.0')
    .parse(process.argv)
program
    .command('runner')
    .alias('run')
    .description('开始质疑')
    .action(option => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: '可提供的操作：',
                choices: [
                    {
                        name: 'git（提交更新）',
                        value: 'git'
                    },

                ]
            }
        ]).then(function (answers) {
            switch (answers.action) {
                case 'git':
                    AR.git();
                    break;
                case 'verse':
                    AR.verse()
                    break;
                case 'lint':
                    AR.lint()
                    break;
                case 'start':
                    AR.start()
                    break;

                default:
                    break;
            }
        })
    })
    AR.git();
    
// program.parse(process.argv);