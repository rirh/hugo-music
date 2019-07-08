#!/usr/bin/env node
const shell = require('shelljs');
// eslint-disable-next-line no-unused-vars
const { argv } = require('yargs');
const CFonts = require('cfonts');

// eslint-disable-next-line consistent-return
const exe = (cmd) => {
  let result;
  try {
    result = shell.exec(cmd);
    if (result.code) {
      console.error(result);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
exe('say 开始提交git!');
exe('git add .');
exe("git commit -m 'await' ");
exe('git push');
CFonts.say('TigerZH!', {
  font: 'block', // define the font face
  align: 'left', // define text alignment
  colors: ['#fff'], // define all colors
  background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
});
exe('say all done!');
