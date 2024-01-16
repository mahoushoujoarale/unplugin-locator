import { createServer } from 'node:http'
import { getPortPromise } from 'portfinder'
import launchEditor from 'launch-editor'
import chalk from 'chalk'
import type { Options } from '../../types'
import { defaultPort } from '../constant'

export const serverInfo = {
  status: 0,
  port: defaultPort,
}

async function startServer(options: Options) {
  if (serverInfo.status)
    return
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
    launchEditor(file, options.editor)
  })

  try {
    const port = await getPortPromise({ port: options.serverPort })
    server.listen(port)
    console.warn(chalk.yellow(`[unplugin-locator] Server listening on port ${port}`))
    serverInfo.status = 1
    serverInfo.port = port
  }
  catch (err) {
    console.warn(chalk.red(`[unplugin-locator] Server failed to start`))
    serverInfo.status = 0
    throw err
  }
}

export default startServer
