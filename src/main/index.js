'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
let storage = require('electron-json-storage')
let axios = require('axios')
// let log = require('electron-log')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let token
let domain

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  storage.getMany(['token', 'domain'], (error, data) => {
    if (!error) {
      token = data.token
      domain = data.domain
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('getrepositories', (event, options) => {
  console.log('>> Main')
  console.log(options)
  let limit = 50
  let page = 1
  if (options !== undefined) {
    limit = options.limit || limit
    page = options.page || page
  }
  let response
  axios.get('https://' + domain + '.deploybot.com/api/v1/repositories', {
    headers: {'X-Api-Token': token},
    params: {
      limit: limit,
      page: page
    }
  }).then(response => {
    console.log(response)
    response = response.data
  }).catch(error => {
    response = error
  })
  event.sender.send('getrepositories-response', response)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
