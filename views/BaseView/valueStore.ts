import { map, random } from 'lodash-es'

export interface dataType {
  title: string
  icon: string
  count: number
  prefix?: string
  suffix?: string
  iconColor?: string
}
export const useValueStore = defineStore('valueStore', () => {
  const randomArr = (length: number) => {
    return Array.from({ length }, () => random(0, 99999999, true))
  }
  const pieRandomNum = () => {
    return random(30, 100)
  }
  const pieValue = ref<
    {
      value: number
      name: string
    }[]
  >([
    { value: pieRandomNum(), name: '吃' },
    { value: pieRandomNum(), name: '喝' },
    { value: pieRandomNum(), name: '嫖' },
    { value: pieRandomNum(), name: '赌' },
  ])
  const DownloadValue = ref(randomArr(10))
  const RegisterValue = ref(randomArr(10))
  const dataValue = ref<dataType[]>([
    {
      title: '访问量',
      icon: 'ant-design:bar-chart-outlined',
      count: randomArr(1)[0],
      iconColor: '#1890ff',
    },
    {
      title: '成交额',
      icon: 'ant-design:money-collect-outlined',
      count: randomArr(1)[0],
      prefix: '￥',
      suffix: '元',
      iconColor: '#13c2c2',
    },
    {
      title: '下载数',
      icon: 'carbon:document-download',
      count: randomArr(1)[0],
      iconColor: '#2f54eb',
    },
    {
      title: '成交数',
      icon: 'ant-design:trademark-circle-outlined',
      count: randomArr(1)[0],
      iconColor: '#faad14',
    },
  ])
  const randomValue = () => {
    pieValue.value = map(pieValue.value, item => ({
      ...item,
      value: pieRandomNum(),
    }))
    DownloadValue.value = randomArr(10)
    RegisterValue.value = randomArr(10)
    dataValue.value = map(dataValue.value, item => ({
      ...item,
      count: randomArr(1)[0],
    }))
  }
  const {
    resume: startTime,
    pause: stop,
    isActive,
  } = useIntervalFn(() => {
    randomValue()
  }, 1000)
  const ControlChange = (start?: boolean) => {
    start ? startTime() : stop()
    return {
      pauseValueChange: stop,
      restartValueChange: () => {
        startTime()
      },
      isActive,
    }
  }
  return {
    pieValue,
    DownloadValue,
    RegisterValue,
    dataValue,
    randomValue,
    ControlChange,
  }
})
