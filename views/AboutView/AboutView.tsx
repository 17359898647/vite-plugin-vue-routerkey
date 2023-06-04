import { NCard } from 'naive-ui'

export const AboutView = defineComponent({
  name: 'AboutView',
  setup() {
    const { meta } = getCurrentRouter()
    return () => (
      <NCard title={meta.value?.isTitle}>
        <div>AboutView</div>
      </NCard>
    )
  },
})
