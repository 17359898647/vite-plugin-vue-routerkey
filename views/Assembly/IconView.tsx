import { toValue } from '@vueuse/core'
import { map, shuffle, sortBy } from 'lodash-es'
import { NButton, NCard, NSpace } from 'naive-ui'
import ids from 'virtual:svg-icons-names'
import { TransitionGroup } from 'vue'
import { SvgIcon } from '@/components/SvgIcon/SvgIcon'
import { useSort } from '@/composables/useSort'

interface IconList {
  item: {
    name: string
    index: number
  }
  index?: number
}

export const IconView = defineComponent({
  name: 'IconView',
  setup() {
    const IconList = ref<IconList['item'][]>(
      Array.from([...ids, ...ids], (item: string, index) => ({
        name: item,
        index,
      })),
    )
    const createIconElement = reactify((config: IconList['item']) => {
      const {
        name,
        index,
      } = config
      return (
        <div class="z-1 max-h-100px w-100px overflow-hidden" key={name + index}>
          <NCard hoverable class={['h-full', 'w-full']}>
            <NSpace vertical align={'center'} size={10}>
              <SvgIcon localIcon={name} size={32} />
              <div class="whitespace-nowrap">{`序号${index}`}</div>
            </NSpace>
          </NCard>
        </div>
      )
    })
    const {
      resume,
      pause,
      isActive,
    } = useIntervalFn(
      () => {
        IconList.value = shuffle(IconList.value)
      },
      500,
      { immediate: false },
    )
    const sortIconList = () => {
      pause()
      IconList.value = sortBy(IconList.value, item => item.index)
    }
    const sortEl = ref<HTMLElement>()
    const { isDrag } = useSort(sortEl, IconList)
    onJoin(() => {
      resume()
    })
    onLeave(() => {
      pause()
    })
    return () => (
      <NCard title={'本地图标'}>
        <NSpace class="mb-10px" justify={'center'} size={10}>
          <NButton onClick={sortIconList}>顺序排序</NButton>
          <NButton
            onClick={() => {
              IconList.value = shuffle(IconList.value)
              console.log(IconList.value)
              // resume()
              isActive.value ? pause() : resume()
            }}
          >
            随机排序
          </NButton>
        </NSpace>
        <div
          ref={sortEl}
          class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-rows-[repeat(auto-fill,minmax(100px,1fr))] gap-10px"
        >
          <TransitionGroup name={isDrag.value ? undefined : 'tags'}
          >
            {
              map(IconList.value, item => toValue(createIconElement(item)))
            }
          </TransitionGroup>
        </div>
      </NCard>
    )
  },
})
