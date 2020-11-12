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
        },
        grid: {
          show: false,
        },
        series: [
          {
            name: "gaowen",
            type: "bar",
            data: low,
          },
          {
            name: "diwen",
            type: "bar",
            data: high,
          },
        ],
        legend: {
          show: true,
          icon: "circle",
          data: ["diwen", "gaowen"],
        },
        xAxis: {
          name: "日期",
          type: "category",
          data: this.date,
          // boundaryGap: false,
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
.lowhigh {
  width: 600px;
  height: 300px;
}
</style>