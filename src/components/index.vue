<template>
  <div class="index">
    <div ref="lowtem" class="fir"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import echarts from "echarts";
import "../assets/js/chalk";
import "../assets/js/westeros";
export default Vue.extend({
  name: "Index",
  data() {
    return {
      sourcedata: null,
      xdata: [],
      ydata: [],
    };
  },
  computed: {
    ...mapGetters(["aqi", "date", "cityName"]),
  },
  mounted() {
    setTimeout(() => {
      this.initEcharts();
    }, 2000);
  },
  methods: {
    initEcharts() {
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
      ];
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
      ];
      let el = this.$refs.lowtem;
      let mychart = echarts.init(el, "chalk");
      let series = this.aqi.map((val: number, index: number) => {
        let tmp = {
          name: this.cityName[index],
          type: "line",
          data: this.aqi[index],
          stack: "cas",
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorArr1[index] },
              { offset: 1, color: colorArr2[index] },
            ]),
          },
        };
        return tmp;
      });
      let option = {
        title: {
          show: true,
          text: "空气指数",
          left: "5%",
          top: "2%",
        },
        grid: {
          show: false,
          top: "25%",
        },
        series,
        legend: {
          show: true,
          top: 20,
          icon: "roundRect",
          data: this.cityName,
        },
        xAxis: {
          name: "日期",
          type: "category",
          data: this.date,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          name: "aqi指数",
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
.index {
  .fir {
    margin: 0 auto;
    width: 600px;
    height: 300px;
  }
}
</style>