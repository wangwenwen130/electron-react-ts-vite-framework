const { Arch, build, Platform } = require('electron-builder');
const { log } = require('./printColor.js');
const { productName, version } = require('../package.json');
const { spawn } = require('child_process');
const { join } = require('path');

const packDir = 'release/' + version;
const startPackName = productName + '.exe';
const installPackName = productName + '_' + version + '.exe';
const startExePath = join(process.cwd(), packDir, 'win-ia32-unpacked', startPackName);
const installExePath = join(process.cwd(), packDir, installPackName);

const toBuild = () => {
  log.yellow('--发布-打包任务--开始--');
  build({
    targets: Platform.WINDOWS.createTarget(['nsis'], Arch.ia32),
    config: {
      afterSign: async () => {
        log.green('--运行包--已生成--');
        /** 在这里进行运行包签名 */
        log.green('--运行包--开始签名--');
        await sign(startExePath);
        log.green('--运行包--签名结束--');
      },
    },
  })
    .then(async (res) => {
      log.green('--安装包--打包完成--');
      /** 在这里进行安装包签名 */
      log.green('--安装包--开始签名--');
      await sign(installExePath);
      log.green('--安装包--签名结束--');
      log.yellow('--发布-打包任务--已完成--');
    })
    .catch((err) => {
      log.red('--打包失败--', err);
    });
};

toBuild();

const sign = async (filePath) => {
  console.log(filePath);
  return await new Promise((resolve, reject) => {
    const params = [
      '-F',
      'auth_id=xxxxxxxxxxxxxxxxxx',  // 签名的权限
      '-F',
      'fd=SHA256',
      '-F',
      'file=@' + filePath,
      '-F',
      'cert_type=SHA256',
      'http://10.1.13.230/sign/sign.php', // 签名的链接
      '-k',
      '-f',
      '-o',
      filePath,
    ];

    const curl = spawn('curl', params, { shell: true });
    curl.stdout.on('data', (data) => {
      log.blue('---签名中--- 日志---', data.toString());
    });

    curl.stderr.on('data', (data) => {
      log.blue('---签名中---日志---', data.toString());
    });

    curl.on('close', (code) => {
      log.blue('close', code);
      if (code !== 0) {
        log.red('签名失败');
        reject(new Error('签名失败'));
      } else {
        log.green(filePath + '--签名成功--');
        resolve();
      }
    });
  });
};
