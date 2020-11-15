import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function singleDataGet(item: string, sourcedata: object[]): number[] {
  if (sourcedata.length == 0) return []
  let cities: any = sourcedata;
  let ret: number[] = []
  for (let i = 0; i < 5; i++) {
    ret.push(parseInt(cities[i].data[item]))
  }
  return ret
}

export default new Vuex.Store({
  state: {
    fivecity: [],     //5个城市天气数据
    mapdata: [],    //地图数据
    citylocation: [], //5个城市经纬度数据
    city: {}           //所有城市经纬度对照表
  },
  getters: {
    aqi(state) {      //天气aqi指数
      let cities: any = state.fivecity;
      if (cities.length == 0) return []
      let arr: number[][] = [];
      let len = cities.length;

      for (let i = 0; i < len; i++) {
        let forecast = cities[i].data.forecast;
        let tmp: number[] = []
        for (let j = 0; j < 15; j++) {
          tmp.push(forecast[j].aqi)
        }
        arr.push(tmp)
      }
      return arr;
    },
    lowAndHightemp(state) {   //最高温和最低温
      let cities: any = state.fivecity;
      if (cities.length == 0) return []
      let temp: number[][] = [];
      let forecast = cities[0].data.forecast;
      for (let j = 0; j < 15; j++) {
        let low = parseInt(forecast[j].low.split(' ')[1]);
        let high = parseInt(forecast[j].high.split(' ')[1]);
        temp.push([low, high])
      }
      return temp
    },
    date(state) {             //日期
      if (state.fivecity.length == 0) return []
      let forarr = (state.fivecity[0] as any).data.forecast;
      let date: number[] = []
      for (let i = 0; i < 15; i++) {
        date.push(parseInt(forarr[i].date))
      }
      return date
    },
    cityName(state) {         //5个城市名
      if (state.fivecity.length == 0) return []
      let name: string[] = [];
      for (let i = 0; i < 5; i++) {
        name.push(state.fivecity[i]['cityInfo']["city"])
      }
      return name
    },
    currTemp(state) {         //今日温度
      return singleDataGet('wendu', state.fivecity);
    },
    currHumidity(state) {     //今日湿度
      return singleDataGet('shidu', state.fivecity);
    },
    pm(state) {               //pm2.5
      return singleDataGet('pm25', state.fivecity);
    },
    pm10(state) {             //pm10
      return singleDataGet('pm10', state.fivecity)
    },
    airRate(state) {          //天气类型占比分类
      let cities: any = state.fivecity;
      if (cities.length == 0) return []
      let series = new Map();
      let typedata: object[] = [];
      let len = cities.length;
      for (let i = 0; i < len; i++) {
        let forecast = cities[i].data.forecast;
        for (let j = 0; j < 15; j++) {
          if (series.has(forecast[j].type)) {
            let t = series.get(forecast[j].type)
            t += 1;
            series.set(forecast[j].type, t);
          } else {
            series.set(forecast[j].type, 1)
          }
        }
      }
      series.forEach((val, key) => {
        typedata.push({ name: key, value: val })
      })
      return typedata
    },
  },
  mutations: {
    firData(state, payload: object[]) {   //初始化城市数据
      state.fivecity.push(
        ...(payload as never[])
      );
    },
    initMap(state, mapdata) {             //初始化地图数据
      state.mapdata = mapdata
    },
    initGeo(state, geoarr) {              //初始化坐标数据
      state.citylocation.push(...(geoarr as never[]))
    },
    initCity(state, dat) {
      state.city = dat
    },
    changeData(state, data) {             //切换城市数据
      state.fivecity.shift();
      state.fivecity.push(data as never);
    },
    // changeMap(state, nval) {
    //   state.mapdata.shift();
    //   state.mapdata.push(nval as never);
    // },
    changeGeo(state, nval) {
      state.citylocation.shift();
      state.citylocation.push(nval as never);
    }
  },
  actions: {
    async initData({ commit, dispatch }) {
      let baseurl = 'http://localhost:8081/data/'
      let cityone = axios.get(baseurl + "changzhou.json");
      let citytwo = axios.get(baseurl + "nanjing.json");
      let citythree = axios.get(baseurl + "wuxi.json");
      let cityfour = axios.get(baseurl + "yangzhou.json");
      let cityfive = axios.get(baseurl + "zhenjiang.json");
      let [
        { data: firdata },
        { data: secdata },
        { data: thirdata },
        { data: fourdata },
        { data: fifdata }
      ] = await Promise.all([cityone, citytwo, citythree, cityfour, cityfive]);
      let { data: mapdata } = await axios.get("data/province/jiangsu.json")
      commit('initMap', mapdata)
      commit('firData', [firdata, secdata, thirdata, fourdata, fifdata])
      await dispatch('getLongitudeAndLatitude')
    },
    async getLongitudeAndLatitude({ commit }) {
      let baseurl = 'http://localhost:8081/data/'
      let { data: geo } = await axios.get(baseurl + 'geo.json');
      let dat = [];
      let zhenjiang = geo['镇江'];
      let changzhou = geo['常州'];
      let wuxi = geo['无锡'];
      let nanjiang = geo['南京'];
      let yangzhou = geo['扬州'];
      dat.push(zhenjiang, changzhou, wuxi, nanjiang, yangzhou)
      commit('initCity', geo)       //得到经纬度对照列表对象
      commit('initGeo', dat)
    },
    async getNewCity({ state, commit }, { citycode, item }) {
      let { data } = await axios.get('http://localhost:3000/' + citycode)
      commit('changeData', data)
      let zero = state.fivecity[0]['cityInfo']['parent']
      let diff = new Map([[zero, 0]]);
      let cnt = 1;
      for (let i = 1; i < 5; i++) {
        if (diff.has(state.fivecity[i]['cityInfo']['parent'])) {
          cnt++;
        }
      }
      if (cnt != 5) {    //5个城市不在同一省份，切换为中国地图
        ({ data } = await axios.get('http://localhost:8081/data/china.json'))
      }
      commit('initMap', data);
      commit('changeGeo', (state as any).city[item])
    }
  },
  modules: {
  },
  strict: true
})
