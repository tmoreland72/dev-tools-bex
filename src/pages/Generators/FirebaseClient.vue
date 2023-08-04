<template>
   <PageBase title="Firebase Client Generator">
      <section class="column q-gutter-y-lg">
         <!-- Generator -->
         <section class="column q-gutter-y-sm text-accent">
            <q-select
               bg-color="white"
               dense
               emit-value
               hide-bottom-space
               label="Options"
               map-options
               outlined
               :options="codeOptions"
               v-model="code"
            />
            <div class="col">
               <q-btn
                  color="secondary"
                  icon="code"
                  label="Generate Code"
                  no-caps
                  @click="clickGenerate"
               />
            </div>
            <section v-show="markdown" style="max-width: 472px">
               <q-card class="q-pa-xs" bordered flat>
                  <q-markdown no-line-numbers show-copy :src="markdown" />
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
            <q-btn
               v-if="markdown"
               color="secondary"
               icon="restart_alt"
               label="Reset Page"
               no-caps
               size="sm"
               @click="reset"
            />
         </section>
      </section>
   </PageBase>
</template>

<script>
import {defineAsyncComponent, defineComponent, ref} from 'vue'
import {Notify, copyToClipboard as _copyToClipboard} from 'quasar'

export default defineComponent({
   name: 'FirebaseClientGenerator',

   components: {
      PageBase: defineAsyncComponent(() => import('components/PagesBase.vue')),
   },

   setup() {
      const code = ref('q-boot-firebase')
      const markdown = ref('')

      return {
         code,
         codeOptions: [
            {label: 'Quasar Boot File', value: 'q-boot-firebase'},
            {label: 'Firestore Utility File', value: 'q-common-db'},
         ],
         markdown,
         async clickGenerate() {
            try {
               const js = await import(`!raw-loader!./src/${code.value}`)
               let md = '```js\r\n'
               md += js.default
               md += '\r\n```'
               markdown.value = md
            } catch (e) {
               console.error(
                  'FirebaseClientGenerator',
                  'clickGenerate',
                  e.message
               )
               Notify.create({type: 'negative', message: e.message})
               markdown.value = ''
            }
         },
         reset() {
            code.value = 'boot'
            markdown.value = ''
         },
      }
   },
})
</script>

<style lang="sass"></style>
