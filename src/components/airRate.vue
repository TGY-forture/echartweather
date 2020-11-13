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
  computed: {
    ...mapGetters(["airRate"]),
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 3000);
  },
  methods: {
    init() {
      let el = this.$refs.airtype;
      let mychart = echarts.init(el, "chalk");
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
        series: [
          {
            type: "pie",
            data: this.airRate,
          },
        ],
        // legend: {
        //   show: true,
        //   icon: "circle",
        //   data: ["湿度"],
        // },
      };
      mychart.setOption(option);
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