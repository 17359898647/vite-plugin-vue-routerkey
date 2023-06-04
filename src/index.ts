import { writeFile } from 'node:fs/promises'
import type { PluginOption } from 'vite'
import fq from 'fast-glob'
import { getFiles } from './utils'

interface optionsType {
  dir?: '/src/views' | '/src/pages' | string
  dts?: string
}
const defaultOptions: optionsType = {
  dir: '/src/views',
  dts: '/routerKey.d.ts',
}
export function getFilesName(options?: optionsType) {
  let routerTypeKeys = ''
  const { dts = '/routerKey.d.ts', dir: delString = '/src/views' } = options || defaultOptions
  const absolvePath = process.cwd()
  const files = fq.sync(`${absolvePath}${delString}/**/*.{vue,jsx,tsx}`)
  files.forEach((file) => {
    const url = file.replace(absolvePath, '')
    const _file = getFiles({ url, delString })
    if (!_file.includes('components')) {
      routerTypeKeys = routerTypeKeys
        ? `${routerTypeKeys} \n // ${url} \n | '${_file}'`
        : `\n // ${url} \n '${_file}'`
    }
  })
  writeFile(`${absolvePath}${dts}`, `type routerTypeKeys = ${routerTypeKeys}`, 'utf-8')
  return routerTypeKeys
}
export function vitePluginRouterKey(options?: optionsType): PluginOption {
  const { dir: url } = options || defaultOptions
  return {
    name: 'vite-plugin-router-key',
    configResolved() {
      getFilesName(options)
    },
    configureServer(server) {
      server.watcher.on('change', (file) => {
        if (file.includes(url!))
          getFilesName(options)
      })
    },
    apply: 'serve',
  }
}
