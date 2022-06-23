<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { createForm, createTable, getCurrentInstance } from "./lib";

import { ref } from 'vue';

/*  */

const user = ref({
  username: "abc",
  first_name: "first"
})
/* 

const f = createForm()
f.setData(user)
f.add('Username').addInput("username")
f.add('First name').addInput("first_name")
f.add("Date").addDatePicker("date")

f.add("Password").addPassword("password");

const render = f.render(); */

const onClick = () => {
  console.log(user.value);
};
</script>

<template>

  <div>

    <suspense>
      <router-view></router-view>
    </suspense>


  </div>


  <el-divider></el-divider>
  <div>
    <el-input v-model="password" type="password"></el-input>
    <el-button @click="login">Login</el-button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      password: "111111"
    }
  },
  async mounted() {
    await this.$vx.init();
    console.log("mounted", this.$route);
    this.$vx.setRoute(this.$route);
  },
  methods: {
    async login() {

      await this.$vx.login("admin", this.password);

    }

  }
}
</script>
