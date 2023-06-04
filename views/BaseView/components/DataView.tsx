import { map } from 'lodash-es'
import { NCard, NGi, NGrid } from 'naive-ui'
import { defineComponent } from 'vue'
import { useValueStore } from '../valueStore'
import { CountTo } from '@/components/CountTo/CountTo'
import { SvgIcon } from '@/components/SvgIcon/SvgIcon'

export const DataView = defineComponent({
  name: 'DataView',
  setup() {
    const contentStyle: myTypes.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
    const valueStore = useValueStore()
    return () => (
      <NGrid xGap={8} yGap={8}>
        {valueStore.dataValue
          && map(valueStore.dataValue, item => (
            <NGi span={6}>
              <NCard hoverable title={item.title} class={['h-[110px]']} contentStyle={contentStyle}>
                <SvgIcon
                  class={['text-3xl']}
                  style={
                    item.iconColor && {
                      color: item.iconColor,
                    }
                  }
                  lineIcon={item.icon}
                />
                <CountTo
                  duration={500}
                  class={['text-xl']}
                  prefix={item?.prefix}
                  suffix={item?.suffix}
                  separator={','}
                  endValue={item.count}
                />
              </NCard>
            </NGi>
          ))}
      </NGrid>
    )
  },
})
