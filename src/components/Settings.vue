<template>
  <div class="container">
    <b-loading is-full-page v-model="isLoading" :can-cancel="false"></b-loading>

    <b-notification
      auto-close
      type="is-success"
      v-model="syncSuccessNotification"
      has-icon
      role="alert"
      aria-close-label="Close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </b-notification>

    <b-notification
      auto-close
      type="is-danger"
      v-model="syncErrorNotification"
      has-icon
      role="alert"
      aria-close-label="Close notification">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </b-notification>

    <section>
      <h1 class="title">Temperature Settings</h1>
      <b-field label="Brew Temperature (°C)">
        <b-numberinput v-model="config.brewTemperature" min="80" max="110" step="0.1" size="is-large"/>
      </b-field>

      <b-field label="Steam Temperature (°C)">
        <b-numberinput v-model="config.steamTemperature" min="80" max="160" step="0.1"/>
      </b-field>
    </section>

    <section>
      <h1 class="title">Pump control</h1>
      <b-field>
        <b-checkbox v-model="config.pumpControlEnabled">Enabled</b-checkbox>
      </b-field>

      <div :hidden="!config.pumpControlEnabled">
        <b-field label="Duration (seconds)">
          <b-numberinput v-model="config.pumpControlSeconds" min="0" max="100" />
        </b-field>

        <b-field label="Percentage on shot start">
          <b-numberinput v-model="config.pumpControlPercentageStart" min="0" max="100" />
        </b-field>

        <b-field label="Percentage on shot end">
          <b-numberinput v-model="config.pumpControlPercentageEnd" min="0" max="100" />
        </b-field>
      </div>
    </section>

    <section>
      <h1 class="title">Shot timer</h1>
      <b-field>
        <b-checkbox v-model="config.shotTimerEnabled">Enabled</b-checkbox>
      </b-field>

      <div :hidden="!config.shotTimerEnabled">
        <b-field label="Duration (seconds)">
          <b-numberinput v-model="config.shotTimerSeconds" min="5" max="60" />
        </b-field>
      </div>
    </section>

    <section>
      <h1 class="title">Pre-infusion</h1>
      <b-field>
        <b-checkbox v-model="config.preInfusionEnabled">Enabled</b-checkbox>
      </b-field>

      <div :hidden="!config.preInfusionEnabled">
        <b-field label="Duration (seconds)">
          <b-numberinput v-model="config.preInfusionSeconds" min="1" max="10" />
        </b-field>
      </div>
    </section>

    <section>
      <h1 class="title">PID parameters</h1>
      <b-field label="Proportional Coefficient (P)">
        <b-numberinput v-model="config.pidP" />
      </b-field>
      <b-field label="Integral Coefficient (I)">
        <b-numberinput v-model="config.pidI" />
      </b-field>
      <b-field label="Differential Coefficient (D)">
        <b-numberinput v-model="config.pidD" />
      </b-field>
    </section>

    <section>
      <b-button size="is-large"
                type="is-primary"
                icon-left="check"
                @click="applyConfig()">
                Apply
      </b-button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export class FirmwareConfig {
  brewTemperature!: number;
  steamTemperature: number;

  shotTimerEnabled: boolean;
  shotTimerSeconds: number;

  preInfusionEnabled: boolean;
  preInfusionSeconds: number;

  pumpControlEnabled: boolean;
  pumpControlPercentageStart: number;
  pumpControlPercentageEnd: number;
  pumpControlSeconds: number;

  pidP: number;
  pidI: number;
  pidD: number;

  constructor() {
    this.brewTemperature = NaN;
    this.steamTemperature = NaN;

    this.shotTimerEnabled = false;
    this.shotTimerSeconds = NaN;

    this.preInfusionEnabled = false;
    this.preInfusionSeconds = NaN;

    this.pumpControlEnabled = true;
    this.pumpControlPercentageStart = NaN;
    this.pumpControlPercentageEnd = NaN;
    this.pumpControlSeconds = NaN;

    this.pidP = NaN;
    this.pidI = NaN;
    this.pidD = NaN;
  }
}

@Component
export default class Settings extends Vue {
  syncSuccessNotification: boolean;
  syncErrorNotification: boolean;
  isLoading: boolean;

  config: FirmwareConfig = new FirmwareConfig();

  constructor() {
    super();
    this.syncSuccessNotification = false;
    this.syncErrorNotification = false;
    this.isLoading = true;
    this.load();
  }

  load() {
    Vue.axios.get("/api/v1/config").then((response) => {
      this.config.brewTemperature = response.data['brewTemperature'];
      this.config.steamTemperature = response.data['steamTemperature'];

      this.config.shotTimerEnabled = response.data['shotTimerEnabled'];
      this.config.shotTimerSeconds = response.data['shotTimerSeconds'];

      this.config.preInfusionEnabled = response.data['preInfusionEnabled'];
      this.config.preInfusionSeconds = response.data['preInfusionSeconds'];

      this.config.pumpControlEnabled = response.data['pumpControlEnabled'];
      this.config.pumpControlPercentageStart = response.data['pumpControlPercentageStart'];
      this.config.pumpControlPercentageEnd = response.data['pumpControlPercentageEnd'];
      this.config.pumpControlSeconds = response.data['pumpControlSeconds'];

      this.config.pidP = response.data['pidP'];
      this.config.pidI = response.data['pidI'];
      this.config.pidD = response.data['pidD'];

      this.isLoading = false;

      console.log("this.config.pumpControlEnabled ", this.config.pumpControlEnabled);
    })
  }

  applyConfig() {
    Vue.axios.post("/api/v1/config", this.config).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.$router.push('/');
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section {
    margin-bottom: 50px;
  }
</style>
