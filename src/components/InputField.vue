<template>
   <div class="column q-gutter-y-xs text-accent">
      <div>{{ label }}<span v-if="required" class="text-negative">*</span></div>
      <q-input
         :data-cy="dataCy"
         input-class="text-primary"
         :autofocus="autofocus_"
         :autogrow="autogrow_"
         bg-color="white"
         color="primary"
         dense
         hide-bottom-space
         lazy-rules
         :mask="mask"
         outlined
         :placeholder="placeholder"
         :readonly="readonly_"
         :rules="rules"
         :step="step"
         :type="type_"
         unmasked-value
         v-model="vModel"
         style="min-width: 300px"
      >
         <template v-slot:append>
            <q-icon
               v-if="type === 'password'"
               :name="showPassword ? 'visibility_off' : 'visibility'"
               class="cursor-pointer"
               @click="showPassword = !showPassword"
            />
         </template>
      </q-input>
   </div>
</template>

<script>
import {defineComponent, computed, ref} from 'vue'

export default defineComponent({
   name: 'InputFieldComponent',

   inheritAttrs: false,

   emits: ['update:modelValue'],

   props: {
      label: {
         type: String,
         required: true,
      },
      mask: {
         type: String,
      },
      modelValue: {
         type: [String, Number],
         required: true,
      },
      placeholder: {
         type: String,
         default: '',
      },
      readonly: {
         type: [String, Boolean],
         default: false,
      },
      required: {
         type: [String, Boolean],
         default: false,
      },
      type: {
         type: String,
         default: 'text',
      },
      step: {
         type: String,
      },
      autofocus: {
         type: [String, Boolean],
         default: false,
      },
      autogrow: {
         type: [String, Boolean],
         default: false,
      },
      dataCy: {
         type: String,
      },
   },

   setup(props, {emit}) {
      const showPassword = ref(false)

      const vModel = computed({
         get: () => {
            return props.modelValue
         },
         set: (v) => {
            emit('update:modelValue', v)
         },
      })
      const autogrow_ = computed(() => {
         return props.autogrow === false ? false : true
      })
      const autofocus_ = computed(() => {
         return props.autofocus === false ? false : true
      })
      const readonly_ = computed(() => {
         return props.readonly === false ? false : true
      })

      const rules = [
         (value) => !props.required || value.length > 0 || 'Value is required',
      ]

      const type_ = computed(() => {
         switch (props.type) {
            case 'password':
               return showPassword.value ? 'text' : 'password'
            default:
               return props.type
         }
      })

      return {
         vModel,
         showPassword,
         autogrow_,
         autofocus_,
         readonly_,
         rules,
         type_,
      }
   },
})
</script>

<style lang="sass"></style>
