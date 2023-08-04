<template>
   <PageBase title="JWT Decoder">
      <section class="column q-gutter-y-lg">
         <!-- JWT Decode -->
         <section class="column q-gutter-y-xs text-accent">
            <div class="text-subtitle2">JWT Decode</div>
            <section class="row q-gutter-x-xs">
               <q-input
                  autofocus
                  autogrow
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Token"
                  outlined
                  placeholder="Paste token here..."
                  stack-label
                  v-model="token"
                  style="min-width: 300px"
               />
               <div class="col">
                  <q-btn
                     color="secondary"
                     icon="no_encryption"
                     label="Decode"
                     no-caps
                     @click="decodeToken"
                  />
               </div>
            </section>
            <section v-show="decoded">
               <q-input
                  autogrow
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  outlined
                  readonly
                  v-model="decoded"
                  style="min-width: 300px"
               >
                  <template v-slot:append>
                     <q-icon
                        name="content_copy"
                        @click="copyToClipboard('decoded')"
                     />
                  </template>
               </q-input>
            </section>
         </section>

         <section class="row q-gutter-sm">
            <q-btn
               color="secondary"
               icon="navigate_before"
               label="Back"
               no-caps
               :to="{name: 'home'}"
            />
            <q-btn
               v-if="token"
               color="secondary"
               icon="backspace"
               label="Clear"
               no-caps
               @click="reset"
            />
         </section>
      </section>
   </PageBase>
</template>

<script>
import {defineAsyncComponent, defineComponent, inject, ref} from 'vue'
import {Notify, copyToClipboard as _copyToClipboard} from 'quasar'

export default defineComponent({
   name: 'JwtDecodePage',

   components: {
      PageBase: defineAsyncComponent(() => import('components/PagesBase.vue')),
   },

   setup() {
      const axios = inject('axios')

      const token = ref('')
      const decoded = ref('')

      return {
         token,
         decoded,
         async decodeToken() {
            try {
               const result = await axios.post('/jwt/decode', {
                  token: token.value,
               })
               console.log('result', result)
               if (result.statusText === 'OK') {
                  const data = result.data
                  decoded.value = JSON.stringify(data, null, 3)
                  console.log('decoded', decoded.value)
               }
            } catch (error) {
               console.error('JwtDecode', error.message)
               Notify.create({type: 'negative', message: error.message})
               decoded.value = ''
            }
         },
         reset() {
            token.value = ''
            decoded.value = ''
         },
         async copyToClipboard(value) {
            try {
               switch (value) {
                  case 'decoded':
                     await _copyToClipboard(decoded.value)
                     break
               }
               Notify.create('Copied')
            } catch (e) {
               console.error('copyToClipboard', 'value', value, e.message)
               Notify.create({type: 'negative', message: 'Copy failed'})
            }
         },
      }
   },
})
</script>

<style lang="sass"></style>
