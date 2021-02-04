<template>
  <div class="container">
    <b-loading is-full-page v-model="isLoading" :can-cancel="true"></b-loading>
    <section>
        <b-field>
            <b-radio-button v-model="networkConfig.mode"
                native-value="STA"
                type="is-outlined">
                <b-icon icon="wifi"></b-icon>
                <span>Wifi client</span>
            </b-radio-button>

            <b-radio-button v-model="networkConfig.mode"
                native-value="AP"
                type="is-outlined">
                <b-icon icon="access-point"></b-icon>
                <span>Access point</span>
            </b-radio-button>
        </b-field>
    </section>

    <section v-if="networkConfig.mode == 'STA'">
      <b-table
          :data="scannedWifis"
          :loading="isScanning"
          :selected.sync="selectedWifi"
          focusable>
        <b-table-column field="ssid" label="SSID" v-slot="props">
          {{ props.row.ssid }}
          <b-tag v-if="props.row.ssid == networkConfig.staSSID"
            rounded>
            connected
          </b-tag>
        </b-table-column>

        <b-table-column field="rssi" label="Strength" numeric v-slot="props">
          <b-icon icon="lock" size="is-small" v-if="props.row.encrypted" />
          <b-icon :icon="iconForRssi(props.row.rssi)"  />
        </b-table-column>
      </b-table>
      <b-button icon-left="sync" size="is-small" type="is-primay is-light" @click="scan()" :disabled="isScanning">Scan</b-button>
    </section>
    <section v-else-if="networkConfig.mode == 'AP'">
      <span class="is-1">
      In access point mode, the name of the name of the network will be <strong>{{ networkConfig.apSSID }}</strong> with no passphrase.
      </span>
    </section>

    <section>
      <b-button size="is-large"
                type="is-primary"
                icon-left="check"
                @click="applyConfig()">
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

export class FirmwareScannedWifi {
  ssid: string;
  rssi: number;
  encrypted: boolean;

  constructor(obj: any) {
    this.ssid = obj["ssid"];
    this.rssi = obj["rssi"];
    this.encrypted = obj["encrypted"];
  }
}

export class FirmwareNetworkConfig {
  mode: string;
  staSSID: string;
  apSSID: string;
  passphrase: string;

  constructor(obj: any) {
    this.mode = obj["mode"];
    this.staSSID = obj["staSSID"];
    this.apSSID = obj["apSSID"];
    this.passphrase = obj["passphrase"];
  }
}

@Component
export default class NetworkConfig extends Vue {
  isScanning: boolean;
  isLoading: boolean;
  mode!: string;

  networkConfig: FirmwareNetworkConfig;
  scannedWifis: Array<FirmwareScannedWifi>;
  selectedWifi: FirmwareScannedWifi;

  constructor() {
    super();
    this.isLoading = true;
    this.isScanning = true;
    this.networkConfig = new FirmwareNetworkConfig({});
    this.scannedWifis = new Array<FirmwareScannedWifi>();
    this.selectedWifi = new FirmwareScannedWifi({});
    this.mode = "";
    this.load();
    this.scan();
  }

  sortWifis() {
    this.scannedWifis = this.scannedWifis.sort((left, right): number => {
      if (left.rssi > right.rssi)
        return -1;
      if (left.rssi < right.rssi)
        return 1;

      return 0;
    })
  }

  iconForRssi(rssi: number): string {
    let quality = 0;

    if (rssi <= -100) {
      quality = 0;
    } else if (rssi >= -50) {
      quality = 100;
    } else {
      quality = 2 * (rssi + 100);
    }

    if (quality >= 67)
      return "signal-cellular-3";

    if (quality >= 33)
      return "signal-cellular-2";

    return "signal-cellular-1";
  }

  load() {
    this.isLoading = true;

    Vue.axios.get("/api/v1/config/network").then((response) => {
      this.networkConfig = new FirmwareNetworkConfig(response.data);
    })
    .catch(() => {
      this.$buefy.toast.open('Error loading network config!')
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

  save() {
    console.log(JSON.stringify(this.networkConfig));
    Vue.axios.post("/api/v1/config/network", this.networkConfig).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.$router.push('/');
    })
  }

  scan() {
    this.isScanning = true;
    this.scannedWifis = [];

    Vue.axios.get("/api/v1/wifis").then((response) => {
      response.data.forEach((element: any) => {
        const wifi = new FirmwareScannedWifi(element);
        this.scannedWifis.push(wifi);
        if (wifi.ssid == this.networkConfig.staSSID)
          this.selectedWifi = wifi;
      })
      this.sortWifis();
    })
    .catch(() => {
      this.$buefy.toast.open('Error scanning wifis!')
    })
    .finally(() => {
      this.isScanning = false;
    })
  }

  applyConfig() {
    if (this.networkConfig.mode == 'STA') {
      if (this.selectedWifi.encrypted) {
        this.$buefy.dialog.prompt({
          message: `Enter the passphrase for this selected Wifi.`,
          inputAttrs: {
            passwordReveal: true,
            type: 'password',
          },
          trapFocus: true,
          onConfirm: (value) => {
            this.networkConfig.staSSID = this.selectedWifi.ssid;
            this.networkConfig.passphrase = value;
            this.save();
          }
        })
      } else {
        this.$buefy.dialog.confirm({
          message: 'Ready to connect to the selected network?',
          onConfirm: () => {
            this.networkConfig.staSSID = this.selectedWifi.ssid;
            this.save();
          }
        })
      }
    } else {
      this.$buefy.dialog.confirm({
        message: 'Enable access point mode?',
        onConfirm: () => this.save()
      })
    }
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

  .control {
    width: 100%;
  }

  button {
    margin-right: 10px;;
  }
</style>
