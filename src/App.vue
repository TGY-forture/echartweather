<template>
  <div id="app">
    <Index />
    <Temp />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Index from "@/views/index.vue";
import Temp from "@/components/temprature.vue";
export default Vue.extend({
  name: "App",
  components: {
    Index,
    Temp,
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
</style>
