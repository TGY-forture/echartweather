<template>
  <div class="shidu">
    <div ref="humidtity" class="hum"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import "../assets/js/chalk";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "Humidtity",
  data() {
    return {
      chart: null,
      timer: null,
    };
  },
  computed: {
    ...mapGetters(["cityName", "currHumidity"]),
  },
  watch: {
    currHumidity: function () {
      if (this.timer) {
        clearTimeout((this as any).timer);
      }
      (this as any).timer = setTimeout(() => {
        this.updateChart();
      }, 800);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let el = this.$refs.humidtity;
      this.chart = echarts.init(el, "chalk");
      let option = {
        title: {
          show: true,
          text: "湿度指数",
          left: "5%",
          top: "2%",
        },
        grid: {
          show: false,
          top: "25%",
        },
        series: [
          {
            name: "湿度",
            type: "bar",
            data: this.currHumidity,
            barWidth: 20,
            label: {
              show: true,
              position: "right",
            },
            itemStyle: {
              barBorderRadius: [0, 10, 10, 0],
            },
          },
        ],
        legend: {
          show: true,
          top: 20,
          icon: "circle",
          data: ["湿度"],
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
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
      };
      (this as any).chart.setOption(option);
    },
    updateChart() {
      let noption = {
        series: [
          {
            data: this.currHumidity,
          },
        ],
        yAxis: {
          data: this.cityName,
        },
      };
      (this as any).chart.setOption(noption);
    },
  },
});
</script>

<style lang="scss">
.shidu {
  .hum {
    margin: 0 auto;
    width: 600px;
    height: 300px;
  }
}
</style>