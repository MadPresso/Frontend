<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon'
import {
  mdiCog,
  mdiCogs,
  mdiWifiCog,
  mdiGithub,
  mdiCheck,
  mdiClose,
  mdiPlus,
  mdiMinus,
  mdiSignalCellular1,
  mdiSignalCellular2,
  mdiSignalCellular3,
  mdiWifi,
  mdiAccessPoint,
} from '@mdi/js';

const icons = {
  "check": mdiCheck,
  "close": mdiClose,
  "cog": mdiCog,
  "cogs": mdiCogs,
  "github": mdiGithub,
  "wifi-cog": mdiWifiCog,
  "plus": mdiPlus,
  "minus": mdiMinus,
  "signal-cellular-1": mdiSignalCellular1,
  "signal-cellular-2": mdiSignalCellular2,
  "signal-cellular-3": mdiSignalCellular3,
  "wifi": mdiWifi,
  "access-point": mdiAccessPoint,
};

export default {
  components: {
    SvgIcon,
  },
  props: ['icon','size'],
  computed: {
    path: function() {
      return icons[this.icon[1]];
    },
    iconName: function() {
      return this.icon[1];
    }
  },
}
</script>

<style lang="css">
  .icon {
    vertical-align: middle;
    height: 1rem;
  }

  .icon svg {
    fill: none !important;
  }
</style>