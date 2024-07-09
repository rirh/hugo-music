#!/usr/bin/env node
/**
 * node 部署前端脚本
 */
//  pnpm i -D child_process@1.0.2 ora@5.4.0 inquirer@8.0.0
// # From 1.0.0 -> 1.0.1
// npm version patch

// # From 1.0.1 -> 1.1.0
// npm version minor

// # From 1.1.0 -> 2.0.0
// npm version major
// 此脚本仅适用个人
// import { exec } from "child_process";
// import ora from "ora";
// import inquirer from "inquirer";
// import _package from "../package.json" assert { type: "json" };
// import envs from "./env.json" assert { type: "json" };
// import dayjs from "dayjs";
const outputDir = "dist";
// 此脚本仅适用个人
var ora = require("ora");
const inquirer = require("inquirer");
const _package = require("../package.json");
// const { outputDir } = require("../vue.config");
const envs = require("./env.json");
const { exec } = require("child_process");
// 当前版本
const version = _package.version;
// 项目目录
const dirPath = `${process.cwd()}/${outputDir}`;
// 版本目录
const versionPath = `${dirPath}-${version}`;
const dayjs = require("dayjs");

inquirer
  .prompt({
    type: "rawlist",
    name: "commit",
    message: "请选择部署环境：",
    default: "stage",
    choices: envs.map((it) => `${it.name}: ${it.website}`),
  })
  .then(async (answers) => {
    const [name] = answers.commit.split(":");
    const index = envs.findIndex((it) => it.name === name);
    if (index > -1) {
      const it = envs[index];
      const spinner = ora({
        text: `${answers.commit}：部署中...`,
      }).start();
      const command = `npm run build:${it.mpmModel};
      cp -r ${dirPath} ${versionPath};
      scp -r ${dirPath} ${it.sshNmae}:${it.targetPath};
      scp -r ${versionPath} ${it.sshNmae}:${it.targetPath};
      rm -rf ${versionPath};
      `;
      console.log(command)

      exec(command, function (err) {
        if (err) throw err;
        spinner.succeed("部署完成");
        spinner.succeed(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      });
    }
  });
