<template>
  <div id="app">
    <transition name="fade">
        <loading v-if="getLoading" />
    </transition>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loading from '@/components/loading/loading'
export default {
    name: 'App',
    components: {
        loading
    },
    computed: {
        ...mapGetters(['getLoading'])
    }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
