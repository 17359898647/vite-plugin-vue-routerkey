import { type PropType, type Ref, defineComponent } from 'vue'
import { type ECOption, useEcharts } from '@/composables/useEcharts'

export const PieView = defineComponent({
  name: 'PieView',
  props: {
    dataValue: {
      type: Array as PropType<
        {
          value: number
          name: string
        }[]
      >,
      required: true,
    },
  },
  setup(props) {
    const pieOptions = computed<ECOption>(() => {
      return {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: '1%',
          left: 'center',
          itemStyle: {
            borderWidth: 0,
          },
        },
        series: [
          {
            color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
            name: '娱乐活动',
            type: 'pie',
            radius: ['45%', '75%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
              },
            },
            labelLine: {
              show: false,
            },
            data: props.dataValue,
          },
        ],
      }
    }) as Ref<ECOption>
    const { domRef: PieRef } = useEcharts(pieOptions)
    return () => <div ref={PieRef} class={['w-full', 'h-full']} />
  },
})
