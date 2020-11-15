<template>
  <div class="map">
    <div ref="smap" class="corrmap"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import echarts from "echarts";
import "../assets/js/chalk";
export default Vue.extend({
  name: "Map",
  data() {
    return {
      mychart: null,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["mapdata", "citylocation"]),
  },
  watch: {
    mapdata: function () {
      this.updateChart();
    },
  },
  methods: {
    async init() {
      let el = this.$refs.smap;
      this.mychart = echarts.init(el, "chalk");
      //echarts的 setOption方法会改变 vuex数据,不能直接修改，先做深拷贝
      let deepcopydata = this.deepClone(this.mapdata);
      echarts.registerMap("currmap", deepcopydata);
      let option = {
        title: {
          show: true,
          text: "当前城市分布",
          left: "5%",
          top: "2%",
        },
        geo: {
          show: true,
          map: "currmap",
          roam: "scale",
        },
        series: [
          {
            type: "effectScatter",
            color: "blue",
            coordinateSystem: "geo",
            data: this.citylocation,
            rippleEffect: {
              brushType: "stroke",
              color: "green",
            },
          },
        ],
      };
      (this as any).mychart.setOption(option);
    },
    updateChart() {
      let deepcopydata = this.deepClone(this.mapdata);
      echarts.registerMap("currmap", deepcopydata);
      let noption = {
        geo: {
          map: "currmap",
        },
        series: [
          {
            data: this.citylocation,
          },
        ],
      };
      (this as any).mychart.setOption(noption);
    },
    deepClone(v: any) {
      let t = null;
      let res: any;
      if (Object.prototype.toString.call(v) == "[object Array]") {
        t = [];
        for (let i = 0; i < v.length; i++) {
          res = this.deepClone(v[i]);
          t.push(res);
        }
      } else if (Object.prototype.toString.call(v) == "[object Object]") {
        t = {};
        for (let key in v) {
          res = this.deepClone(v[key]);
          (t as any)[key] = res;
        }
      }
      return t === null ? v : t;
    },
  },
});
</script>
<style lang="scss">
.map {
  .corrmap {
    width: 600px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>