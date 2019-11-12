#!/usr/bin/env node
const program = require('commander');
const childProcess = require('child_process');
const fs = require('fs');

const CYPRESS_BASE_TEST_PATH = 'cypress/integration/';

const getCypressInlineCommand = (openScreenShot, openVideo) => {
  if (!openScreenShot && !openVideo) { return '' }
  let inlineCommand = '--config ';
  if (openScreenShot) { inlineCommand = inlineCommand + 'screenshotsFolder="cypress/screenshots",' }
  if (openVideo) { inlineCommand = inlineCommand + 'video=true,' }
  return inlineCommand.slice(0, -1);
}

program
  .version('0.0.1')
  .usage('<commad> [option]');

program
  .command('open')
  .description('open cypress test runner')
  .action(() => {
    console.log('open cypress test runner');
    childProcess.exec('cypress open', {}, (error, stdout, stderr) => {
      if (error) {
        throw new Error(error);
      }
    })
  });
program
  .command('run [moduleNames...]')
  .description('run test files')
  .option('-s, --screenShot', 'automatically takes a screenshot when there is a failure in Run mode')
  .option('-v --video', 'automatically record a video when there is a failure in Run mode')
  .action((moduleNames, options) => {
    // 测试配置
    console.log('test config：');
    const openScreenShot = options.screenShot;
    const openVide = options.video;
    const testConfigCommand = getCypressInlineCommand(openScreenShot, openVide);
    console.log('openScreenShot', openScreenShot || false);
    console.log('openVide', openVide || false);
    console.log('====================================================================================================');
    if (moduleNames.length > 0) {
      console.log('It will check if the module exists');
      const modulePaths = [];
      // 模块检查
      moduleNames.forEach(item => {
        const theModulePath = `${CYPRESS_BASE_TEST_PATH}${item}`;
        const isExist = fs.existsSync(theModulePath);
        if (!isExist) {
          throw new Error(`can not find module ${item} in path "${theModulePath}"`);
        }
        modulePaths.push(theModulePath + '/**/*');
      });
      console.log('It will test assigned modules：');
      console.log(moduleNames.join(' '));
      console.log(`cypress run --spec "${modulePaths.join(',')}" ${testConfigCommand}`);
      // 调用cypress命令
      const cypressRun = childProcess.exec(`cypress run --spec "${modulePaths.join(',')}" ${testConfigCommand}`, {} , (error, stdout, stderr) => {
        if (error) {
          console.error('test does not pass');
        }
      });
      cypressRun.stdout.on('data', (data) => {
        console.log(data);
      });
      cypressRun.on('close', (code) => {
        console.log('test end!!!!!');
      });

    } else {
      console.log('It will test all modules');
      console.log(`cypress run ${testConfigCommand}`);
      // 调用cypress命令
      const cypressRun = childProcess.exec(`cypress run ${testConfigCommand}`, {} , (error, stdout, stderr) => {
        if (error) {
          console.error('test does not pass');
        }
      });
      cypressRun.stdout.on('data', (data) => {
        console.log(data);
      });
      cypressRun.on('close', (code) => {
        console.log('test end!!!!!');
      });
    }
  })
  
program.parse(process.argv);
// !program.args[0] && program.help();


