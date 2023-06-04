import {format, parse} from 'node:path'

const defaultOptions = {
  url: '',
  delString: '/src/views',
}

export function getFiles(options?: {
  url: string
  delString?: '/src/views' | '/src/pages' | string
}) {
  const { url, delString = '/src/views' } = options || defaultOptions
  const { name, dir } = parse(url)
  return format({
    dir: dir.replace(delString, ''),
    name,
  })
}
