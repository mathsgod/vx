<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item v-for="route in routes">
          <q-item-section>
            <router-link :to="route.path">{{ route.path }}</router-link>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <suspense>
        <router-view />
      </suspense>

    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import routes from './routes'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      routes,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  mounted() {
    this.$vx.init();
  }

}
</script>