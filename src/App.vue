<template>
  <div id="app" v-if="chart">
    <Map />
    <Index />
    <Temp />
    <Pm />
    <Humidtiy />
    <Air />
    <Tool />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import Index from "@/components/index.vue";
import Temp from "@/components/temprature.vue";
import Pm from "@/components/pm.vue";
import Humidtiy from "@/components/humiditiy.vue";
import Air from "@/components/airRate.vue";
import Map from "@/components/map.vue";
import Tool from "@/components/toolbar.vue";
export default Vue.extend({
  name: "App",
  data() {
    return {
      chart: false,
    };
  },
  components: {
    Index,
    Temp,
    Pm,
    Humidtiy,
    Air,
    Map,
    Tool,
  },
  methods: {
    ...mapActions(["initData"]),
  },
  created() {
    this.$store.dispatch("initData").then(() => {
      this.chart = true;
    });
  },
});
</script>
<style lang="scss">
@import "@/assets/css/global.scss";
#app {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
}
@media (max-width: 1200px) {
  #app {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(1, 1fr);
    row-gap: 20px;
  }
}
</style>
