<template>
   <PageBase title="Epoch Converter">
      <section class="column q-gutter-y-lg">
         <!-- Current Time in Milliseconds -->
         <section class="column q-gutter-y-xs text-accent">
            <div class="text-subtitle2">Current Epoch Time (ms)</div>
            <q-input
               bg-color="white"
               color="primary"
               dense
               hide-bottom-space
               input-class="text-primary"
               outlined
               readonly
               v-model="currentEpoch"
               style="min-width: 300px"
            >
               <template v-slot:append>
                  <q-icon
                     name="content_copy"
                     @click="copyToClipboard('currentEpoch')"
                  />
               </template>
            </q-input>
         </section>

         <!-- Convert Epoch to Human Date -->
         <section class="column q-gutter-y-xs text-accent">
            <div class="text-subtitle2">Convert to Human date</div>
            <section class="row q-gutter-x-xs">
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  outlined
                  v-model="epochToHumanDate"
                  style="min-width: 300px"
               />
               <q-btn
                  color="secondary"
                  icon="directions_run"
                  label="Convert"
                  no-caps
                  @click="clickConvertToHumanDate"
               />
            </section>
            <section v-show="humanDateFromEpoch">
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  outlined
                  readonly
                  v-model="humanDateFromEpoch"
                  style="min-width: 300px"
               >
                  <template v-slot:append>
                     <q-icon
                        name="content_copy"
                        @click="copyToClipboard('humanDateFromEpoch')"
                     />
                  </template>
               </q-input>
            </section>
         </section>

         <!-- Convert Human Date to Epoch -->
         <section class="column q-gutter-y-xs text-accent">
            <div class="text-subtitle2">Convert to epoch</div>
            <section class="row q-gutter-x-xs">
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Mon"
                  mask="##"
                  outlined
                  stack-label
                  v-model="humanDateToEpoch.month"
                  style="width: 48px"
               />
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Day"
                  mask="##"
                  outlined
                  stack-label
                  v-model="humanDateToEpoch.day"
                  style="width: 48px"
               />
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Yr"
                  mask="####"
                  outlined
                  stack-label
                  v-model="humanDateToEpoch.year"
                  style="width: 56px"
               />
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Hr"
                  mask="##"
                  outlined
                  stack-label
                  v-model="humanDateToEpoch.hours"
                  style="width: 48px"
               />
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Min"
                  mask="##"
                  outlined
                  stack-label
                  v-model="humanDateToEpoch.minutes"
                  style="width: 48px"
               />
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Sec"
                  mask="##"
                  outlined
                  stack-label
                  v-model="humanDateToEpoch.seconds"
                  style="width: 48px"
               />
               <q-btn
                  color="secondary"
                  icon="directions_run"
                  label="Convert"
                  no-caps
                  @click="clickConvertToEpoch"
               />
            </section>
            <section v-show="epochFromHumanDate">
               <q-input
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  outlined
                  readonly
                  v-model="epochFromHumanDate"
                  style="min-width: 300px"
               >
                  <template v-slot:append>
                     <q-icon
                        name="content_copy"
                        @click="copyToClipboard('epochFromHumanDate')"
                     />
                  </template>
               </q-input>
            </section>
         </section>

         <!-- Page Actions -->
         <section class="row q-gutter-sm">
            <q-btn
               color="secondary"
               icon="navigate_before"
               label="Back"
               no-caps
               :to="{name: 'home'}"
            />
         </section>
      </section>
   </PageBase>
</template>

<script>
import {
   defineAsyncComponent,
   defineComponent,
   onMounted,
   onBeforeUnmount,
   inject,
   ref,
} from 'vue'
import {copyToClipboard as _copyToClipboard, Notify} from 'quasar'

export default defineComponent({
   name: 'JwtDecodePage',

   components: {
      PageBase: defineAsyncComponent(() => import('components/PagesBase.vue')),
   },

   setup() {
      const currentEpoch = ref('')
      const currentEpochInterval = ref(null)
      const epochToHumanDate = ref(new Date().valueOf())
      const humanDateFromEpoch = ref('')
      const humanDateToEpoch = ref({
         month: '',
         day: '',
         year: '',
         hours: '',
         minutes: '',
         seconds: '',
      })
      const epochFromHumanDate = ref(null)

      onMounted(() => {
         const now = new Date()

         humanDateToEpoch.value.month = now.getMonth() + 1
         humanDateToEpoch.value.day = now.getDate()
         humanDateToEpoch.value.year = now.getFullYear()
         humanDateToEpoch.value.hours = now.getHours()
         humanDateToEpoch.value.minutes = now.getMinutes()
         humanDateToEpoch.value.seconds = now.getSeconds()

         currentEpochInterval.value = setInterval(() => {
            currentEpoch.value = new Date().valueOf()
         }, 1)
      })

      onBeforeUnmount(() => {
         clearInterval(currentEpochInterval.value)
      })

      return {
         currentEpoch,
         epochToHumanDate,
         humanDateFromEpoch,
         humanDateToEpoch,
         epochFromHumanDate,
         async copyToClipboard(value) {
            try {
               switch (value) {
                  case 'currentEpoch':
                     await _copyToClipboard(currentEpoch.value)
                     break
                  case 'humanDateFromEpoch':
                     await _copyToClipboard(humanDateFromEpoch.value)
                     break
                  case 'epochFromHumanDate':
                     await _copyToClipboard(epochFromHumanDate.value)
                     break
               }
               Notify.create('Copied')
            } catch (e) {
               console.error('copyToClipboard', 'value', value, e.message)
               Notify.create({type: 'negative', message: 'Copy failed'})
            }
         },
         clickConvertToHumanDate() {
            try {
               const dt = new Date(Number(epochToHumanDate.value))
               humanDateFromEpoch.value = dt.toLocaleString()
            } catch (e) {
               console.error('clickConvertToHumanDate', e.message)
               Notify.create({type: 'negative', message: 'Conversion failed'})
            }
         },
         clickConvertToEpoch() {
            try {
               const dt = new Date(
                  Number(humanDateToEpoch.value.year),
                  Number(humanDateToEpoch.value.month) - 1,
                  Number(humanDateToEpoch.value.day),
                  Number(humanDateToEpoch.value.hours),
                  Number(humanDateToEpoch.value.minutes),
                  Number(humanDateToEpoch.value.seconds)
               )
               epochFromHumanDate.value = dt.valueOf()
            } catch (e) {
               console.error('clickConvertToEpoch', e.message)
               Notify.create({type: 'negative', message: 'Conversion failed'})
            }
         },
      }
   },
})
</script>

<style lang="sass"></style>
