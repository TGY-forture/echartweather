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
export default Vue.extend({
  name: "Index",
  data() {
    return {
      currindex: 1,
      curraqi: [],
      timer: null,
      mychart: null,
      colorArr1: [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
      ],
      colorArr2: [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
      ],
    };
  },
  computed: {
    ...mapGetters(["aqi", "date", "cityName"]),
  },
  created() {
    (this as any).timer = setInterval(() => {
      this.currindex++;
      if (this.currindex == 5) {
        this.currindex = 0;
      }
      this.curraqi = this.aqi[this.currindex];
      this.updateChart();
    }, 3000);
  },
  mounted() {
    this.initEcharts();
  },
  destroyed() {
    clearInterval((this as any).timer);
  },
  methods: {
    initEcharts() {
      let el = this.$refs.lowtem;
      this.mychart = echarts.init(el, "chalk");
      this.curraqi = this.aqi[this.currindex];

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
        series: [
          {
            name: this.cityName[this.currindex],
            type: "line",
            data: this.curraqi,
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.colorArr1[this.currindex] },
                { offset: 1, color: this.colorArr2[this.currindex] },
              ]),
            },
          },
        ],
        legend: {
          show: true,
          top: 20,
          icon: "roundRect",
          data: [this.cityName[this.currindex]],
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
      (this as any).mychart.setOption(option);
    },
    updateChart() {
      let noption = {
        legend: {
          data: [this.cityName[this.currindex]],
        },
        series: [
          {
            name: this.cityName[this.currindex],
            data: this.curraqi,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.colorArr1[this.currindex] },
                { offset: 1, color: this.colorArr2[this.currindex] },
              ]),
            },
          },
        ],
      };
      (this as any).mychart.setOption(noption);
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