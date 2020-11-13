<template>
  <div class="temp">
    <div ref="twotemp" class="lowhigh"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import { mapGetters } from "vuex";
import "../assets/js/westeros";
import "../assets/js/chalk";
export default Vue.extend({
  name: "Temp",
  computed: {
    ...mapGetters(["lowAndHightemp", "date"]),
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 2000);
  },
  methods: {
    init() {
      let el = this.$refs.twotemp;
      let mychart = echarts.init(el, "chalk");
      let low = this.lowAndHightemp.map((item: any) => {
        return item[0];
      });
      let high = this.lowAndHightemp.map((item: any) => {
        return item[1];
      });
      let option = {
        title: {
          show: true,
          text: "最高温度和最低温度",
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
            type: "line",
            z: 0,
            lineStyle: {
              width: 30,
              color: "#2d3443",
            },
          },
        },
        series: [
          {
            name: "低温",
            type: "bar",
            data: low,
            itemStyle: {
              barBorderRadius: [6, 6, 0, 0],
            },
          },
          {
            name: "高温",
            type: "bar",
            data: high,
            itemStyle: {
              barBorderRadius: [6, 6, 0, 0],
            },
          },
        ],
        legend: {
          show: true,
          top: 20,
          icon: "circle",
          data: ["低温", "高温"],
        },
        xAxis: {
          name: "日期",
          type: "category",
          data: this.date,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          name: "温度值",
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
.temp {
  .lowhigh {
    margin: 0 auto;
    width: 600px;
    height: 300px;
  }
}
</style>