<template>
  <div id="app">
    <div class="container main is-max-desktop">
      <router-view></router-view>
    </div>
    <footer id="footer" class="footer footer-small">
      <div class="content has-text-centered">
        <p>
          <strong>MadPresso</strong>
          |
          <a href="https://github.com/MadPresso/">
            <b-icon icon="github"></b-icon>
            GitHub project
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

html { height: 100% ;}

body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  padding-top: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

#footer {
  margin-top: auto;
  padding: 30px 0 30px 0;
}

.main {
  text-align: center;
  vertical-align: middle;
  /* padding-top: 40px; */
  padding-left: 20px;
  padding-right: 20px;
  max-width: 600px;
}

</style>
