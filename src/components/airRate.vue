<template>
  <div class="air">
    <div ref="airtype" class="qual"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import "../assets/js/chalk";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "Air",
  data() {
    return {
      chart: null,
      timer: null,
    };
  },
  computed: {
    ...mapGetters(["airRate"]),
  },
  watch: {
    airRate: function () {
      if (this.timer) {
        clearTimeout((this as any).timer);
      }
      (this as any).timer = setTimeout(() => {
        this.updateChart();
      }, 1000);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let el = this.$refs.airtype;
      this.chart = echarts.init(el, "chalk");
      let legendtext = this.airRate.map((item: any) => {
        return item.name;
      });
      let option = {
        title: {
          show: true,
          text: "各类型天气占比",
          left: "5%",
          top: "2%",
        },
        grid: {
          show: false,
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            data: this.airRate,
            radius: ["50%", "75%"],
            itemStyle: {
              borderWidth: 5,
              borderColor: "#222733",
            },
            tooltip: {
              formatter: "天气类型:{b}<br/>占比:{d}%",
            },
          },
        ],
        legend: {
          show: true,
          icon: "circle",
          data: legendtext,
          orient: "vertical",
          right: 24,
          top: "20%",
        },
      };
      (this as any).chart.setOption(option);
    },
    updateChart() {
      let legendtext = this.airRate.map((item: any) => {
        return item.name;
      });
      let noption = {
        series: [
          {
            data: this.airRate,
            tooltip: {
              formatter: "天气类型:{b}<br/>占比:{d}%",
            },
          },
        ],
        legend: {
          data: legendtext,
        },
      };
      (this as any).chart.setOption(noption);
    },
  },
});
</script>

<style lang="scss">
.air {
  .qual {
    margin: 0 auto;
    width: 600px;
    height: 300px;
  }
}
</style>