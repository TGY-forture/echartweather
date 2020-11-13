<template>
  <div class="pm">
    <div ref="singletemp" class="ctemp"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import "../assets/js/chalk";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "Pm",
  computed: {
    ...mapGetters(["cityName", "currTemp", "pm"]),
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 3000);
  },
  methods: {
    init() {
      let el = this.$refs.singletemp;
      let mychart = echarts.init(el, "chalk");
      let option = {
        title: {
          show: true,
          text: "今日温度和PM2.5指数",
          left: "5%",
          top: "2%",
        },
        grid: {
          show: false,
          top: "25%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        series: [
          {
            name: "温度",
            type: "line",
            data: this.currTemp,
          },
          {
            name: "pm2.5",
            type: "line",
            data: this.pm,
          },
        ],
        legend: {
          show: true,
          top: 20,
          icon: "circle",
          data: ["温度", "pm2.5"],
        },
        xAxis: {
          name: "城市",
          type: "category",
          data: this.cityName,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      };
      mychart.setOption(option);
    },
  },
});
</script>
<style lang="scss">
.pm {
  .ctemp {
    margin: 0 auto;
    width: 600px;
    height: 300px;
  }
}
</style>