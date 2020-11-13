<template>
  <div class="map">
    <div ref="smap" class="corrmap"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import "../assets/js/chalk";
export default Vue.extend({
  name: "Map",
  mounted() {
    setTimeout(() => {
      this.init();
    }, 3000);
  },
  methods: {
    async init() {
      let el = this.$refs.smap;
      let mychart = echarts.init(el, "chalk");
      let { data: mapdata } = await this.axios.get("data/china.json");
      echarts.registerMap("china", mapdata);
      let option = {
        title: {
          show: true,
          text: "当前省市",
          left: "5%",
          top: "2%",
        },
        series: [
          {
            type: "map",
            map: "china",
          },
        ],
      };
      mychart.setOption(option);
      mychart.on("click", async (arg: any) => {
        let { data: nmap } = await this.axios.get("data/province/jiangsu.json");
        echarts.registerMap("jiangsu", nmap);
        mychart.setOption({
          series: [
            {
              map: "jiangsu",
            },
          ],
        });
      });
    },
  },
});
</script>


<style lang="scss">
.map {
  .corrmap {
    width: 600px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>