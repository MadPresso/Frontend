<template>
  <div class="container">
    <b-loading is-full-page v-model="isLoading" :can-cancel="false"></b-loading>

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
        <b-field>
          <b-checkbox v-model="config.preInfusionValveClosed">Close valve during pre-infusion</b-checkbox>
        </b-field>
        <b-field label="Pump Duration (seconds)">
          <b-numberinput v-model="config.preInfusionPumpSeconds" min="1" max="10" />
        </b-field>
        <b-field label="Pause Duration (seconds)">
          <b-numberinput v-model="config.preInfusionPauseSeconds" min="1" max="10" />
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
      <b-field label="Integral windup limit factor">
        <b-numberinput v-model="config.pidIntegralWindupLimit" />
      </b-field>
      <b-field label="Heater power during shots (percent)">
        <b-numberinput v-model="config.heaterPercentageDuringShot" />
      </b-field>
    </section>

    <section>
      <b-button size="is-large"
                type="is-primary"
                icon-left="check"
                @click="save()">
                Apply
      </b-button>
      <b-button size="is-large"
                type="is-primary"
                icon-left="close"
                @click="cancel()">
                Cancel
      </b-button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export class FirmwareConfig {
  brewTemperature: number;
  steamTemperature: number;

  shotTimerEnabled: boolean;
  shotTimerSeconds: number;

  preInfusionEnabled: boolean;
  preInfusionValveClosed: boolean;
  preInfusionPumpSeconds: number;
  preInfusionPauseSeconds: number;

  pumpControlEnabled: boolean;
  pumpControlPercentageStart: number;
  pumpControlPercentageEnd: number;
  pumpControlSeconds: number;

  pidP: number;
  pidI: number;
  pidD: number;
  pidIntegralWindupLimit: number;
  heaterPercentageDuringShot: number;

  constructor() {
    this.brewTemperature = NaN;
    this.steamTemperature = NaN;

    this.shotTimerEnabled = false;
    this.shotTimerSeconds = NaN;

    this.preInfusionEnabled = false;
    this.preInfusionValveClosed = true;
    this.preInfusionPumpSeconds = NaN;
    this.preInfusionPauseSeconds = NaN;

    this.pumpControlEnabled = false;
    this.pumpControlPercentageStart = NaN;
    this.pumpControlPercentageEnd = NaN;
    this.pumpControlSeconds = NaN;

    this.pidP = NaN;
    this.pidI = NaN;
    this.pidD = NaN;
    this.pidIntegralWindupLimit = NaN;
    this.heaterPercentageDuringShot = 0;
  }
}

@Component
export default class MachineConfig extends Vue {
  isLoading: boolean;

  config: FirmwareConfig = new FirmwareConfig();

  constructor() {
    super();
    this.isLoading = true;
    this.load();
  }

  load() {
    Vue.axios.get("/api/v1/config/machine").then((response) => {
      this.config.brewTemperature = response.data['brewTemperature'];
      this.config.steamTemperature = response.data['steamTemperature'];

      this.config.shotTimerEnabled = response.data['shotTimerEnabled'];
      this.config.shotTimerSeconds = response.data['shotTimerSeconds'];

      this.config.preInfusionEnabled = response.data['preInfusionEnabled'];
      this.config.preInfusionValveClosed = response.data['preInfusionValveClosed'];
      this.config.preInfusionPumpSeconds = response.data['preInfusionPumpSeconds'];
      this.config.preInfusionPauseSeconds = response.data['preInfusionPauseSeconds'];

      this.config.pumpControlEnabled = response.data['pumpControlEnabled'];
      this.config.pumpControlPercentageStart = response.data['pumpControlPercentageStart'];
      this.config.pumpControlPercentageEnd = response.data['pumpControlPercentageEnd'];
      this.config.pumpControlSeconds = response.data['pumpControlSeconds'];

      this.config.pidP = response.data['pidP'];
      this.config.pidI = response.data['pidI'];
      this.config.pidD = response.data['pidD'];
      this.config.pidIntegralWindupLimit = response.data['pidIntegralWindupLimit'];
      this.config.heaterPercentageDuringShot = response.data['heaterPercentageDuringShot'];

      this.isLoading = false;
    })
  }

  save() {
    Vue.axios.post("/api/v1/config/machine", this.config).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.$router.push('/');
    })
  }

  cancel() {
      this.$router.push('/');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section {
    margin-bottom: 50px;
  }

  button {
    margin-right: 10px;;
  }
</style>
