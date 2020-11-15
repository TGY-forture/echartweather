<template>
  <div class="tool">
    <span class="custom-icon custom-icon-toolsbar" @click="showTool"></span>
    <div
      class="pop"
      v-show="show"
      :class="[show ? 'animate__animated animate__backInDown' : '']"
      @click="inCity"
    >
      <span class="custom-icon custom-icon-fresh"></span>
      <span> 选择城市</span>
    </div>
    <div
      class="zoom"
      v-show="ensure"
      :class="[ensure ? 'animate__animated animate__zoomIn' : '']"
    >
      <input class="inp" type="text" v-model="city" placeholder="请输入城市" />
      <p @click="dis">确定</p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  name: "Tool",
  data() {
    return {
      show: false,
      ensure: false,
      city: "",
    };
  },
  methods: {
    ...mapActions(["getNewCity"]),
    showTool() {
      if (!this.ensure) {
        this.show = !this.show;
      }
    },
    inCity() {
      this.ensure = true;
      this.show = false;
    },
    async dis() {
      let putval = this.city.trim();
      this.ensure = false;
      if (putval == "") {
        alert("请输入合法城市名");
        return;
      }
      let { data: res } = await this.axios.get("data/citydata.json");
      if (res[putval]) {
        this.getNewCity({ citycode: res[putval], item: putval });
      }
    },
  },
});
</script>
<style lang="scss">
.tool {
  background-color: #ff7979;
  position: fixed;
  left: 50%;
  top: 50%;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  .custom-icon-toolsbar {
    font-size: 34px;
    color: white;
    cursor: pointer;
  }
  .pop {
    width: 200px;
    position: absolute;
    top: -1.9em;
    left: -83px;
    background-color: white;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #3498db;
    border-radius: 18px;
    cursor: pointer;
    .custom-icon-fresh {
      font-size: 24px;
      color: #9b59b6;
      vertical-align: middle;
    }
    &:active {
      background-color: #d2dae2;
    }
  }
  .zoom {
    position: fixed;
    top: -80px;
    left: -83px;
    .inp {
      // display: inline-block;
      width: 200px;
      height: 30px;
      border: 1px solid white;
      border-radius: 8px;
      outline: none;
      text-align: center;
      &:focus {
        box-shadow: 1px 1px 3px 2px #22a6b3, 1px -1px 3px 2px #22a6b3,
          -1px 1px 3px 2px #22a6b3, -1px -1px 3px 2px #22a6b3;
      }
    }
    p {
      margin: 5px auto;
      text-align: center;
      width: 50px;
      height: 30px;
      color: white;
      border: none;
      border-radius: 5px;
      background-color: #22a6b3;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>