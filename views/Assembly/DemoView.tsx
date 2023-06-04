import { NButton, NCard } from 'naive-ui'
import { SvgIcon } from '@/components/SvgIcon/SvgIcon'

export const DemoView = defineComponent({
  name: 'DemoView',
  setup() {
    const count = ref(0)
    const _count = toRef(count)
    return () => (
      <NCard title={'测试组件'}>
        <NButton onClick={() => count.value++}>{count.value}</NButton>
        <NButton>{_count.value}</NButton>
        <SvgIcon lineIcon={'material-symbols:1k-rounded'} onClick={() => {
          console.log('click')
        }}/>
      </NCard>
    )
  },
})
