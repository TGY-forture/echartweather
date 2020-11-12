import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function singleDataGet(item: string, sourcedata: object[]): number[] {
  let cities: any = sourcedata;
  let len = cities.length;
  let ret: number[] = []
  for (let i = 0; i < len; i++) {
    ret.push(parseInt(cities[i].data[item]))
  }
  return ret
}

export default new Vuex.Store({
  state: {
    fivecity: []
  },
  getters: {
    aqi(state) {
      let cities: any = state.fivecity;
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
    lowAndHightemp(state) {
      let cities: any = state.fivecity;
      let temp: number[][] = [];
      let forecast = cities[0].data.forecast;
      for (let j = 0; j < 15; j++) {
        let low = parseInt(forecast[j].low.split(' ')[1]);
        let high = parseInt(forecast[j].high.split(' ')[1]);
        temp.push([low, high])
      }
      return temp
    },
    date(state) {
      let forarr = (state.fivecity[0] as any).data.forecast;
      let date: number[] = []
      for (let i = 0; i < 15; i++) {
        date.push(parseInt(forarr[i].date))
      }
      return date
    },
    cityName(state) {
      let name: string[] = [];
      for (let i = 0; i < 5; i++) {
        name.push(state.fivecity[i]['cityInfo']["city"])
      }
      return name
    },
    currTemp(state) {
      return singleDataGet('wendu', state.fivecity);
    },
    currHumidity(state) {
      return singleDataGet('shidu', state.fivecity);
    },
    pm(state) {
      return singleDataGet('pm25', state.fivecity);
    },
    airRate(state) {
      let cities: any = state.fivecity;
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
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
