<template>
  <div class="temp">
    <div ref="twotemp" class="lowhigh"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import { mapGetters } from "vuex";
import "../assets/js/chalk";
export default Vue.extend({
  name: "Temp",
  data() {
    return {
      chart: null,
      start: 0,
      end: 5,
      low: [],
      high: [],
      timer: null,
    };
  },
  computed: {
    ...mapGetters(["lowAndHightemp", "date"]),
  },
  created() {
    (this as any).timer = setInterval(() => {
      this.start += 5;
      this.end += 5;
      if (this.start >= 15) {
        this.start = 0;
        this.end = 5;
      }
      this.updateChart();
    }, 2000);
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let el = this.$refs.twotemp;
      this.chart = echarts.init(el, "chalk");
      this.low = this.lowAndHightemp.map((item: any) => {
        return item[0];
      });
      this.high = this.lowAndHightemp.map((item: any) => {
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
              width: 80,
              color: "#2d3443",
            },
          },
        },
        series: [
          {
            name: "低温",
            type: "bar",
            data: this.low.slice(this.start, this.end),
            itemStyle: {
              barBorderRadius: [16, 16, 0, 0],
            },
          },
          {
            name: "高温",
            type: "bar",
            data: this.high.slice(this.start, this.end),
            itemStyle: {
              barBorderRadius: [16, 16, 0, 0],
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
          data: this.date.slice(this.start, this.end),
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
      (this as any).chart.setOption(option);
    },
    updateChart() {
      let noption = {
        xAxis: {
          data: this.date.slice(this.start, this.end),
        },
        series: [
          {
            data: this.low.slice(this.start, this.end),
          },
          {
            data: this.high.slice(this.start, this.end),
          },
        ],
      };
      (this as any).chart.setOption(noption);
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