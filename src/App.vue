<template>
  <div id="app">
    <template v-if="isPageNotFound">
      <router-view />
    </template>
    <template v-else>
      <navbar />
      <main>
        <div class="container">
          <vue-page-transition name="fade-in-right">
            <router-view />
          </vue-page-transition>
        </div>
      </main>
    </template>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  computed: {
    isPageNotFound() {
      return this.$route.name === 'pagenotfound'
    },
  },
  components: { Navbar },
}
</script>

<style lang="scss">
@import './styles/style.scss';
</style>
