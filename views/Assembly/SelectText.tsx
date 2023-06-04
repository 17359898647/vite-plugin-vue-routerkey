import { NCard, NInput } from 'naive-ui'
import { selectText } from '@/composables/selectText'

export const SelectText = defineComponent({
  name: 'HeightText',
  setup() {
    const { select, target, result } = selectText({
      SelectStyle: {
        color: 'red',
        fontWeight: 'bold',
      } as myTypes.CSSProperties,
    })
    target.value = '这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字'
    return () => (
      <div class={'h-full'}>
        <NCard class={['min-h-full']} title={'文字高亮'}>
          <div v-html={result.value} />
          <NInput v-model:value={target.value} />
          <NInput v-model:value={select.value} placeholder={'输入对应文字，匹配结果'} />
        </NCard>
      </div>
    )
  },
})
