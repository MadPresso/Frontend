<template>
  <div class="">

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

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

export class Config {
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
    this.brewTemperature = 100;
    this.steamTemperature = 140.0;

    this.shotTimerEnabled = false;
    this.shotTimerSeconds = 100;

    this.preInfusionEnabled = false;
    this.preInfusionSeconds = 2;

    this.pumpControlEnabled = true;
    this.pumpControlPercentageStart = 100;
    this.pumpControlPercentageEnd = 100;
    this.pumpControlSeconds = 100;

    this.pidP = 1;
    this.pidI = 2;
    this.pidD = 3;
  }
}

@Component
export default class Settings extends Vue {
  timer!: number

  syncSuccessNotification: boolean;
  syncErrorNotification: boolean;

  config: Config = new Config();
  @Watch('config', { deep: true })
  onPropertyChanged() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      console.log("TIMER FIRE " + JSON.stringify(this.config))
      clearInterval(this.timer);
      this.syncErrorNotification = true;
    },1000);
  }

  constructor() {
    super();
    this.syncSuccessNotification = false;
    this.syncErrorNotification = "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section {
    margin-bottom: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
