import { toValue } from '@vueuse/core'
import { random } from 'lodash-es'
import { NButton, NCard } from 'naive-ui'
import { HModal } from '@/components/HModal/HModal'
import { UseForm } from '@/components/useForm'
import type { JsonType, UseFormMethods } from '@/components/useForm'

export const ModalView = defineComponent({
  name: 'ModalView',
  setup() {
    const [show, setShow] = useToggle(false)
    const [loading, setLoading] = useToggle(false)
    const name = ref(null)
    const age = ref(null)
    const formValue = ref({
      name,
      age,
    })
    const formRef = ref<UseFormMethods>()
    const options = ref<JsonType<keyof typeof formValue.value>[]>([
      {
        type: 'input',
        name: 'name',
        label: '姓名',
        inputConfig: {
          placeholder: '请输入姓名',
        },
      },
      {
        type: 'input',
        name: 'age',
        label: '年龄',
        inputConfig: {
          placeholder: '请输入年龄',
        },
      },
    ])
    return () => (
      <NCard title={'弹窗'}>
        <HModal
          v-model:show={show.value}
          class="!w-auto"
          loading={loading.value}
          onCancel={() => {
            toValue(formRef)?.reset()
            return 123
          }}
          onConfirm={async () => {
            setLoading(true)
            await sleep(3000)
            setLoading(false)
            const result = random(0, 1, true)
            console.log(result)
            if (result > 0.5) {
              createMsg('失败', {
                type: 'error',
              })
              return false
            }
            createMsg('成功', {
              type: 'success',
            })
          }}
        >
          <UseForm ref={formRef} options={options.value} v-model:formValue={formValue.value} />
        </HModal>
        <NButton
          onClick={() => setShow(true)}
        >
          打开
        </NButton>
      </NCard>
    )
  },
})
