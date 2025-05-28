const { rebuild } = require('@electron/rebuild')
const path = require('path')
const fs = require('fs-extra')

const buildPath = path.join(__dirname, '../ezdesk_api') // 根据实际路径调整
const ezdeskApiPath = path.join(buildPath, 'build/Release/ezdesk.node')
const ezdeskDllPath = path.join(buildPath, 'ezdesk_api.dll')
const targetPath = path.join(__dirname, '../resource')

rebuild({
  buildPath,
  force: true,
  // 确保与项目中使用的 Electron 版本一致
  electronVersion: '22.3.27',
  arch: process.arch,
  onlyModules: [],
})
  .then(() => {
    try {
      const nodePath = path.join(targetPath, '/ezdesk.node')
      const dllPath = path.join(targetPath, '/ezdesk_api.dll')

      fs.existsSync(nodePath) && fs.chmodSync(nodePath, 0o666)
      fs.existsSync(dllPath) && fs.chmodSync(dllPath, 0o666)
      
      fs.copyFileSync(ezdeskApiPath, nodePath)
      fs.copyFileSync(ezdeskDllPath, dllPath)
      console.log('🚀 ~ file ~ copy ~ succeeded:')
    } catch (error) {
      console.log('🚀 ~ file ~ copy ~ error:', error)
    }
  })
  .catch((err) => {
    console.error('Rebuild failed:', err)
  })
