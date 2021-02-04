<template>
  <div class="container">
    <b-loading is-full-page v-model="isLoading" :can-cancel="true"></b-loading>

    <section>
      <h6 class="subtitle">Current Temperature</h6>
      <h1 class="title is-1">{{ status.temperature }} °C</h1>
    </section>

    <section>
      <h6 class="subtitle">Target Temperature</h6>
      <h3 class="title is-3">{{ status.targetTemperature }} °C</h3>
    </section>

    <section>
      <h6 class="subtitle">Heater power</h6>
      <b-progress type="is-danger" :value="status.heaterPowerPercentage" show-value>
        {{ status.heaterPowerPercentage }} %
      </b-progress>
    </section>

    <section>
      <b-button size="is-large"
                type="is-primary"
                icon-left="cog"
                @click="navigateToMachineConfig()">
                Settings
      </b-button>
    </section>
    <section>
      <b-button size="is-large"
                type="is-primary"
                icon-left="wifi-cog"
                @click="navigateToNetworkConfig()">
                Wifi
      </b-button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export class FirmwareStatus {
  temperature: number;
  targetTemperature: number;
  heaterPowerPercentage: number;

  constructor() {
    this.temperature = -Infinity;
    this.targetTemperature = -Infinity;
    this.heaterPowerPercentage = 0;
  }
}

@Component
export default class Status extends Vue {
  status: FirmwareStatus = new FirmwareStatus();
  isLoading: boolean;
  timer!: number;

  constructor() {
    super();
    this.isLoading = true;
  }

  load() {
    Vue.axios.get("/api/v1/status").then((response) => {
      this.status.temperature = response.data['temperature'];
      this.status.targetTemperature = response.data['targetTemperature'];
      this.status.heaterPowerPercentage = response.data['heaterPowerPercentage'];
      this.isLoading = false;
    }).catch((error) => {
      console.log(error);
      this.isLoading = true;
    })
  }

  mounted() {
    this.timer = setInterval(() => {
      this.load();
    }, 1000)
  }

  destroyed() {
    clearInterval(this.timer);
  }

  navigateToMachineConfig() {
    this.$router.push('/settings/machine');
  }

  navigateToNetworkConfig() {
    this.$router.push('/settings/network');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section {
    margin-bottom: 30px;
  }
</style>
