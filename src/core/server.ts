import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { getPortPromise } from 'portfinder'
import launchEditor from 'launch-editor'
import chalk from 'chalk'
import type { Options } from '../types'
import { defaultPort } from './constant'

export const serverInfo = {
  status: 0,
  port: defaultPort,
}

async function startServer(options: Options) {
  const server = createServer((req, res) => {
    if (!req.url || !req.url?.startsWith('/launch-editor')) {
      res.writeHead(404)
      res.end('Not Found')
      return
    }
    const params = new URLSearchParams(req.url.split('?')[1])
    const file = params.get('file') as string
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Private-Network': 'true',
    })
    res.end('success')
    launchEditor(resolve('.', file), options.editor)
  })

  try {
    const port = await getPortPromise({ port: options.serverPort })
    server.listen(port)
    console.warn(chalk.cyan.bold('[unplugin-locator]') + chalk.yellow(` Server listening on port ${port}`))
    serverInfo.status = 1
    serverInfo.port = port
  }
  catch (err) {
    console.warn(chalk.red.bold('[unplugin-locator]') + chalk(` Server failed to start`))
    serverInfo.status = 0
    throw err
  }
}

export default startServer
