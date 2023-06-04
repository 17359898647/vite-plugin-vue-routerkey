import { NCard, NGi, NGrid } from 'naive-ui'
import { defineComponent } from 'vue'
import { useValueStore } from '../valueStore'
import { LineView } from './LineView'
import { PieView } from './PieView'

export const HomeEcharts = defineComponent({
  name: 'HomeEcharts',
  setup() {
    const valueStore = useValueStore()
    return () => (
      <NGrid xGap={8} yGap={8}>
        <NGi span={18} class={['h-[360px]']}>
          <NCard class={['h-full']} hoverable>
            <LineView registerValue={valueStore.RegisterValue} downloadValue={valueStore.DownloadValue} />
          </NCard>
        </NGi>
        <NGi span={6} class={['h-[360px]']}>
          <NCard class={['h-full']} hoverable>
            <PieView dataValue={valueStore.pieValue} />
          </NCard>
        </NGi>
      </NGrid>
    )
  },
})
