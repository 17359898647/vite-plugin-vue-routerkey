import { NButton, NCard, NSpace } from 'naive-ui'
import { defineComponent } from 'vue'
import { SvgIcon } from '@/components/SvgIcon/SvgIcon'
import type { JsonType, UseFormMethods, rulesType } from '@/components/useForm'
import { UseForm } from '@/components/useForm'

export const OptionsForm = defineComponent({
  name: 'UseForm',
  setup() {
    // 一天的时间戳
    const oneDate = 24 * 60 * 60 * 1000
    const name = ref(null)
    const gender = ref(null)
    const address = ref(null)
    const eat = ref(null)
    const check = ref(null)
    const date = ref([Date.now() + oneDate, Date.now() + oneDate])
    const formValue = ref({
      name,
      gender,
      address,
      eat,
      check,
      date,
    })
    const demo = ref([
      {
        type: 'input',
        name: 'name',
        span: 12,
        label: ref('姓名'),
        inputConfig: {
          placeholder: '请输入姓名',
        },
      },
      {
        type: 'radio',
        name: 'gender',
        label: '性别',
        span: 4,
        space: 0,
        radioConfig: {
          radioType: 'radioButton',
          options: [
            {
              label: '男',
              value: '男',
            },
            {
              label: '女',
              value: '女',
              disabled: true,
            },
          ],
        },
      },
      {
        type: 'radio',
        name: 'gender',
        label: '性别',
        span: 4,
        radioConfig: {
          radioType: 'radioButton',
          options: [
            {
              label: '男',
              value: '男',
            },
            {
              label: '女',
              value: '女',
            },
          ],
        },
      },
      {
        type: 'radio',
        name: 'gender',
        label: '性别',
        span: 4,
        space: 0,
        radioConfig: {
          radioType: 'radio',
          options: [
            {
              label: '男',
              value: '男',
            },
            {
              label: '女',
              value: '女',
            },
          ],
        },
      },
      {
        type: 'select',
        name: 'address',
        label: '地址',
        span: 12,
        selectConfig: {
          placeholder: '请选择地址',
          options: [
            {
              label: '北京',
              value: '北京',
            },
            {
              label: '南京',
              value: '南京',
            },
          ],
        },
      },
      {
        type: 'switch',
        name: 'eat',
        label: '是否吃饭',
        span: 6,
        switchConfig: {
          checkedTitle: '吃了',
          uncheckedTitle: '没吃',
          loading: true,
          checkedIcon: 'ic:sharp-airline-seat-recline-extra',
          uncheckedIcon: 'ic:sharp-airline-seat-recline-normal',
        },
      },
      {
        type: 'switch',
        name: 'eat',
        label: '我和你一样',
        span: 6,
        switchConfig: {
          checkedTitle: '吃了吃了',
          uncheckedTitle: '没吃没吃',
          checkedIcon: 'material-symbols:theater-comedy',
          uncheckedIcon: 'material-symbols:theater-comedy-outline',
        },
      },
      {
        type: 'check',
        name: 'check',
        label: '爱好',
        span: 12,
        checkConfig: {
          max: 2,
          min: 1,
          options: [
            {
              label: '唱',
              value: '唱',
              disabled: true,
            },
            {
              label: '跳',
              value: '跳',
            },
            {
              label: 'rap',
              value: 'rap',
            },
            {
              label: '篮球',
              value: '篮球',
            },
          ],
        },
      },
      {
        type: 'date',
        name: 'date',
        label: '日期',
        span: 12,
        dateConfig: {
          type: 'datetimerange',
          placeholder: '请选择日期',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          format: 'yyyy/MM/dd HH:mm:ss',
          separator: () => <SvgIcon lineIcon={'material-symbols:roundabout-right'} />,
          isIcon: () => <SvgIcon lineIcon={'material-symbols:10mp-outline'} />,
          clearable: true,
          isDateDisabled: (timeStamp: number) => {
            return timeStamp < Date.now()
          },
          isTimeDisabled: () => {
            return {
              isHourDisabled: (hour: number) => {
                return hour <= 6 || hour >= 18
              },
              isMinuteDisabled: (minute: number) => {
                return minute < 30
              },
              isSecondDisabled: (second: number) => {
                return second < 30
              },
            }
          },
        },
      },
    ] as JsonType<keyof typeof formValue.value>[])
    const rules: rulesType<typeof formValue.value> = {
      name: [
        {
          required: true,
          message: '请输入姓名',
        },
      ],
    }
    const FormRef = ref<UseFormMethods>()
    const validate = () => {
      FormRef.value
        ?.validate()
        .then(() => {
          console.log('校验成功')
        })
        .catch(() => {
          createMsg('校验失败', { type: 'error' })
        })
    }
    const reset = () => {
      FormRef.value?.reset()
    }
    return () => {
      return (
        <div class={['h-full']}>
          <NCard class={'h-full'} title={'配置化表单'}>
            <UseForm
              v-model:formValue={formValue.value}
              ref={FormRef}
              formConfig={{
                xGap: 20,
                labelPlacement: 'top',
                rules,
              }}
              options={demo.value}
            />
            <NSpace size={12} class="mb-4">
              <NButton onClick={validate}>校验</NButton>
              <NButton onClick={reset}>重置</NButton>
            </NSpace>
            <NCard title={'数据'} contentStyle={{ overflow: 'hidden' } as myTypes.CSSProperties}>
              <pre>{JSON.stringify(formValue.value, null, 2)}</pre>
            </NCard>
          </NCard>
        </div>
      )
    }
  },
})
