import { NCard, NSpace } from 'naive-ui'
import { echartsHelp } from './echartsHelp'

export const ChartView = defineComponent({
  name: 'ChartView',
  setup() {
    const echartArr = echartsHelp()
    return () => (
      <div>
        <NCard title={'echarts图表'}>
          <NSpace vertical size={16}>
            {unref(echartArr).map((item) => {
              return (
                <NCard class={['h-[640px]']}>
                  <div ref={item} class={['h-full']} />
                </NCard>
              )
            })}
          </NSpace>
        </NCard>
      </div>
    )
  },
})
