<template>
  <div id="app">
    <Index />
    <Temp />
    <Pm />
    <Humidtiy />
    <Air />
    <Map />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Index from "@/components/index.vue";
import Temp from "@/components/temprature.vue";
import Pm from "@/components/pm.vue";
import Humidtiy from "@/components/humiditiy.vue";
import Air from "@/components/airRate.vue";
import Map from "@/components/map.vue";
export default Vue.extend({
  name: "App",
  components: {
    Index,
    Temp,
    Pm,
    Humidtiy,
    Air,
    Map,
  },
  async created() {
    let cityone = this.axios.get("data/changzhou.json");
    let citytwo = this.axios.get("data/nanjing.json");
    let citythree = this.axios.get("data/wuxi.json");
    let cityfour = this.axios.get("data/yangzhou.json");
    let cityfive = this.axios.get("data/zhenjiang.json");
    let [
      { data: firdata },
      { data: secdata },
      { data: thirdata },
      { data: fourdata },
      { data: fifdata },
    ] = await Promise.all([cityone, citytwo, citythree, cityfour, cityfive]);
    this.$store.state.fivecity.push(
      firdata,
      secdata,
      thirdata,
      fourdata,
      fifdata
    );
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
