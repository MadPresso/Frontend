<template>
  <div id="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand centered">
        <b-icon icon="coffee" size="is-large" />
        <h3 class="title is-3 centered">MadPresso</h3>
      </div>

      <div id="navbar" class="navbar-menu">
        <div class="navbar-start">
        </div>
      </div>
    </nav>

    <div class="container main is-max-desktop">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Settings from './components/Settings.vue';
import Status from './components/Status.vue';

@Component({
  components: {
    Settings,
    Status,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #16b81e;
  margin-top: 60px; */
}

.centered {
  text-align: center;
  vertical-align: middle;
}

.main {
  text-align: center;
  vertical-align: middle;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 600px;
}

</style>
