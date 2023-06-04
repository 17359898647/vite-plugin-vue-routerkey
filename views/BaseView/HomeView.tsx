import { NButton, NCard, NGi, NGrid, NSpace } from 'naive-ui'
import { defineComponent } from 'vue'
import { DataView } from './components/DataView'
import { HomeEcharts } from './components/HomeEcharts'
import { useValueStore } from './valueStore'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const {
      ControlChange,
      randomValue,
    } = useValueStore()
    const {
      restartValueChange,
      pauseValueChange,
      isActive,
    } = ControlChange()
    onJoin(() => {
      restartValueChange()
    })
    onLeave(() => {
      pauseValueChange()
    })
    const spaceSize = 8
    const demoClick = () => {
      const value = ref(0)
      value.value += 1
      return {
        value,
        then: (fn: (fn: typeof demoClick) => void) => {
          fn(demoClick)
          return demoClick()
        },
      }
    }
    return () => (
      <NSpace vertical>
        <DataView />
        <HomeEcharts />
        <NGrid xGap={spaceSize} yGap={spaceSize}>
          <NGi span={14} class="h-460px">
            <NCard class="h-full">
              <NSpace size={spaceSize}>
                <NButton onClick={pauseValueChange} disabled={!isActive.value}>
                  暂停数据更新
                </NButton>
                <NButton onClick={restartValueChange} disabled={isActive.value}>
                  开始数据更新
                </NButton>
                <NButton onClick={randomValue}>数据更新</NButton>
              </NSpace>
            </NCard>
          </NGi>
        </NGrid>
      </NSpace>
    )
  },
})
