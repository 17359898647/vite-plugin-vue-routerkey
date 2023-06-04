import { describe, expect, it } from 'vitest'
import { getFiles } from '../src/utils'
import { getFilesName } from '../src'

describe('getFiles', () => {
  it('should return the dirname of the url', () => {
    const prefix = '/src/views'
    const fileNameList = Array.from({ length: 5 }, (v, k) => {
      const suffixArr = ['.vue', '.js', '.ts', '.jsx', '.tsx']
      return `${prefix}/demoView/${k}${suffixArr[k % 5]}`
    })
    expect(fileNameList).toMatchInlineSnapshot(`
      [
        "/src/views/demoView/0.vue",
        "/src/views/demoView/1.js",
        "/src/views/demoView/2.ts", 
        "/src/views/demoView/3.jsx",
        "/src/views/demoView/4.tsx",
      ]
    `)
    expect(fileNameList.map((url: string) => getFiles({ url }))).toMatchInlineSnapshot(`
      [
        "/demoView/0",
        "/demoView/1",
        "/demoView/2",
        "/demoView/3",
        "/demoView/4",
      ]
    `)
  })
  it('get fileList', () => {
    expect(getFilesName({ dir: '/views' })).toMatchInlineSnapshot(`
      "
       // /views/AboutView/AboutView.tsx 
       '/AboutView/AboutView' 
       // /views/Assembly/DemoView.tsx 
       | '/Assembly/DemoView' 
       // /views/Assembly/IconView.tsx 
       | '/Assembly/IconView' 
       // /views/Assembly/ModalView.tsx 
       | '/Assembly/ModalView' 
       // /views/Assembly/OptionsForm.tsx 
       | '/Assembly/OptionsForm' 
       // /views/Assembly/SelectText.tsx 
       | '/Assembly/SelectText' 
       // /views/BaseView/HomeView.tsx 
       | '/BaseView/HomeView' 
       // /views/Assembly/ChartView/ChartView.tsx 
       | '/Assembly/ChartView/ChartView'"
    `)
  })
})
