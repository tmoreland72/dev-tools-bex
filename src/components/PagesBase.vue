<template>
   <q-page
      class="q-pa-md bg-primary text-accent"
      style="width: 640px; max-width: 50%"
   >
      <section class="column q-gutter-y-md">
         <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" label="Home" :to="{name: 'home'}" />
            <q-breadcrumbs-el exact icon="widgets" :label="title" />
         </q-breadcrumbs>

         <span class="text-h6">{{ title }}</span>
      </section>
      <slot key="slot"></slot>
   </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
   name: 'PagesBase',

   props: {
      title: {
         type: String,
         required: true,
      },
   },
})
</script>

<style lang="sass"></style>
