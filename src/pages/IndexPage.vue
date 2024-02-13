<template>
   <q-page class="q-pa-sm bg-primary" style="width: 640px">
      <template v-for="(feature, index) in Object.keys(features)" :key="index">
         <q-item-label class="text-grey-4" header>{{ feature }}</q-item-label>
         <section class="q-px-md row q-gutter-sm">
            <q-btn
               v-for="f in features[feature]"
               :key="f.routeName"
               color="secondary"
               :label="f.label"
               no-caps
               :to="{name: f.routeName}"
            />
         </section>
      </template>
   </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
   name: 'IndexPage',

   setup() {
      return {
         features: {
            Converters: [{routeName: 'epochconverter', label: 'Epoch Time'}],
            Formatters: [
               {routeName: 'jsonformatter', label: 'JSON'},
               {routeName: 'cssformatter', label: 'CSS'},
               {routeName: 'htmlformatter', label: 'HTML'},
            ],
            Encoders: [
               {routeName: 'jwtdecoder', label: 'JWT'},
               {routeName: 'base64', label: 'Base64'},
            ],
            // Generators: [
            //    {routeName: 'firebase-client', label: 'Firebase Client'},
            //    {
            //       routeName: 'firebase-server',
            //       label: 'Firebase Functions (Server)',
            //    },
            //    {routeName: 'quasar', label: 'Quasar Framework'},
            //    {routeName: 'javascript', label: 'JavaScript (Plain)'},
            // ],
         },
      }
   },
})
</script>

<style lang="sass"></style>
