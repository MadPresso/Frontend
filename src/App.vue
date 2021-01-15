<template>
  <div>

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <b-icon icon="coffee" size="is-large" />

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>
          <a class="navbar-item">
            Documentation
          </a>
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column"/>
      <div class="column">
        <Settings/>
      </div>
      <div class="column"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Settings from './components/Settings.vue';

@Component({
  components: {
    Settings,
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
