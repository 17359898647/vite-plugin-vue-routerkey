import { type PropType, type Ref, defineComponent } from 'vue'
import type { ECOption } from '@/composables/useEcharts'
import { useEcharts } from '@/composables/useEcharts'

export const LineView = defineComponent({
  name: 'LineView',
  props: {
    downloadValue: {
      type: Array as PropType<number[]>,
      required: true,
    },
    registerValue: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  setup(props) {
    const lineOptions = computed<ECOption>(() => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['下载量', '注册数'],
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            color: '#8e9dff',
            name: '下载量',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.25,
                    color: '#8e9dff',
                  },
                  {
                    offset: 1,
                    color: '#fff',
                  },
                ],
              },
            },
            emphasis: {
              focus: 'series',
            },
            data: props.downloadValue,
          },
          {
            color: '#26deca',
            name: '注册数',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.25,
                    color: '#26deca',
                  },
                  {
                    offset: 1,
                    color: '#fff',
                  },
                ],
              },
            },
            emphasis: {
              focus: 'series',
            },
            data: props.registerValue,
          },
        ],
      }
    }) as Ref<ECOption>
    const { domRef: lineRef } = useEcharts(lineOptions)
    return () => <div ref={lineRef} class={['LineView', 'wh-full']}></div>
  },
})
