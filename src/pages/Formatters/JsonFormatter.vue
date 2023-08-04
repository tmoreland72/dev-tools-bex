<template>
   <PageBase title="JSON Formatter">
      <section class="column q-gutter-y-lg">
         <!-- Pretty JSON -->
         <section class="column q-gutter-y-sm text-accent">
            <div class="text-subtitle2">Beautify JSON</div>
            <q-input
               autofocus
               autogrow
               bg-color="white"
               color="primary"
               dense
               hide-bottom-space
               input-class="text-primary"
               label="json"
               outlined
               placeholder="Paste json here..."
               stack-label
               v-model="json"
               style="min-width: 300px"
            />
            <div class="col">
               <q-btn
                  color="secondary"
                  icon="data_object"
                  label="Format"
                  no-caps
                  @click="clickFormat"
               />
            </div>
            <section v-show="markdown" style="max-width: 472px">
               <q-card class="q-pa-xs" bordered flat>
                  <q-markdown
                     content-class="bg-white text-primary"
                     no-line-numbers
                     show-copy
                     :src="markdown"
                  />
               </q-card>
            </section>
         </section>

         <!-- Page Actions -->
         <section class="row q-gutter-sm">
            <q-btn
               color="secondary"
               icon="navigate_before"
               label="Back"
               no-caps
               size="sm"
               :to="{name: 'home'}"
            />
         </section>
      </section>
   </PageBase>
</template>

<script>
import {defineAsyncComponent, defineComponent, ref} from 'vue'
import {Notify, copyToClipboard as _copyToClipboard} from 'quasar'
import prettier from 'prettier/standalone'
import parser from 'prettier/parser-babel'

const prettierOptions = {
   parser: 'json-stringify',
   plugins: [parser],
   tabWidth: 3,
   semi: false,
   singleQuote: true,
   jxsSingleQuote: true,
}

export default defineComponent({
   name: 'FormatterJsonPage',

   components: {
      PageBase: defineAsyncComponent(() => import('components/PagesBase.vue')),
   },

   setup() {
      const json = ref('')
      const formatted = ref('')
      const markdown = ref('')

      return {
         json,
         formatted,
         markdown,
         async clickFormat() {
            try {
               console.log('prettier', prettier)
               console.log('getSupportInfo', prettier.getSupportInfo())
               const result = prettier.format(json.value, prettierOptions)
               console.log('result', result)
               formatted.value = result
               let md = '```json\r\n'
               md += result
               md += '```'
               markdown.value = md
            } catch (e) {
               console.error('FormatterJson', 'clickFormat', e.message)
               Notify.create({type: 'negative', message: e.message})
               formatted.value = ''
            }
         },
         reset() {
            json.value = ''
            formatted.value = ''
            markdown.value = ''
         },
      }
   },
})
</script>

<style lang="sass"></style>
