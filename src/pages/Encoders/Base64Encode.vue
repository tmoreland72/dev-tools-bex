<template>
   <PageBase title="Base64">
      <section class="column q-gutter-y-lg">
         <!-- Base64 Encode -->
         <section class="column q-gutter-y-xs text-accent">
            <div class="text-subtitle2">Base64 Encode</div>
            <section class="row q-gutter-x-xs">
               <q-input
                  autofocus
                  autogrow
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="String"
                  outlined
                  placeholder="Paste string here..."
                  stack-label
                  v-model="string"
                  style="min-width: 300px"
               />
               <div class="col">
                  <q-btn
                     color="secondary"
                     icon="encryption"
                     label="Encode"
                     no-caps
                     @click="encodeString"
                  />
               </div>
            </section>
            <section v-show="encoded">
               <q-input
                  autogrow
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  outlined
                  readonly
                  v-model="encoded"
                  style="min-width: 300px"
               >
                  <template v-slot:append>
                     <q-icon
                        name="content_copy"
                        @click="copyToClipboard('encoded')"
                     />
                  </template>
               </q-input>
            </section>
         </section>

         <!-- Base64 Decode -->
         <section class="column q-gutter-y-xs text-accent">
            <div class="text-subtitle2">Base64 Decode</div>
            <section class="row q-gutter-x-xs">
               <q-input
                  autofocus
                  autogrow
                  bg-color="white"
                  color="primary"
                  dense
                  hide-bottom-space
                  input-class="text-primary"
                  label="Encoded String"
                  outlined
                  placeholder="Paste encoded string here..."
                  stack-label
                  v-model="encodedString"
                  style="min-width: 300px"
               />
               <div class="col">
                  <q-btn
                     color="secondary"
                     icon="no_encryption"
                     label="Decode"
                     no-caps
                     @click="decodeString"
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
   name: 'Base64Page',

   components: {
      PageBase: defineAsyncComponent(() => import('components/PagesBase.vue')),
   },

   setup() {
      const string = ref('')
      const encoded = ref('')
      const encodedString = ref('')
      const decoded = ref('')

      return {
         string,
         encoded,
         encodedString,
         decoded,
         async encodeString() {
            try {
               encoded.value = btoa(string.value)
               console.log('encoded', encoded.value)
            } catch (error) {
               console.error('Base64 Encode', error.message)
               Notify.create({type: 'negative', message: error.message})
               encoded.value = ''
            }
         },
         async decodeString() {
            try {
               decoded.value = atob(encodedString.value)
               console.log('decoded', decoded.value)
            } catch (error) {
               console.error('Base64 Decode', error.message)
               Notify.create({type: 'negative', message: error.message})
               encoded.value = ''
            }
         },
         reset() {
            string.value = ''
            encoded.value = ''
            encodedString.value = ''
            decoded.value = ''
         },
         async copyToClipboard(value) {
            try {
               switch (value) {
                  case 'encoded':
                     await _copyToClipboard(encoded.value)
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
