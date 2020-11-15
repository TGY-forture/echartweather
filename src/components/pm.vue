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
  data() {
    return {
      chart: null,
      timer: null,
    };
  },
  computed: {
    ...mapGetters(["cityName", "currTemp", "pm", "pm10"]),
  },
  watch: {
    pm10: function () {
      if (this.timer) {
        clearTimeout((this as any).timer);
      }
      (this as any).timer = setTimeout(() => {
        this.updateChart();
      }, 500);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let el = this.$refs.singletemp;
      this.chart = echarts.init(el, "chalk");
      let option = {
        title: {
          show: true,
          text: "今日温度和PM2.5指数、PM10指数",
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
            stack: "s",
          },
          {
            name: "pm2.5",
            type: "line",
            data: this.pm,
            stack: "s",
          },
          {
            name: "pm10",
            type: "line",
            data: this.pm10,
            stack: "s",
          },
        ],
        legend: {
          show: true,
          top: 32,
          icon: "circle",
          data: ["温度", "pm2.5", "pm10"],
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
      (this as any).chart.setOption(option);
    },
    updateChart() {
      let noption = {
        xAxis: {
          data: this.cityName,
        },
        series: [
          {
            data: this.currTemp,
          },
          {
            data: this.pm,
          },
          {
            data: this.pm10,
          },
        ],
      };
      (this as any).chart.setOption(noption);
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