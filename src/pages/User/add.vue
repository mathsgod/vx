<script setup>
import { createForm } from "@";
import { $axios } from "@/lib";
const form = createForm();
let user = {};
form.setData(user);
form.add("Username").required().input("username");
form.add("Password").required().password("password");
form.add("First name").required().input("first_name");
form.add("Last name").input("last_name");
form.add("Phone").input("phone");
form.add("Email").required().email("email");

form.add("Address").input("addr1");
form.add(" ").input("addr2");
form.add("").input("addr2");

form.add("Join date").required().datePicker("join_date");

form.add("Status").required().select("status", [
  {
    label: "Active",
    value: 0
  },
  {
    label: "Inactive",
    value: 1
  }
]);

form.add("Expiry date").datePicker("expiry_date");

form.add("Language").select("language", [
  {
    label: "English",
    value: "en"
  },
  {
    label: "中文",
    value: "zh-hk"
  }
]);

form.add("Default page").input("default_page");

let { data: { data: UserGroup } } = await $axios.get("/UserGroup?fields[]=usergroup_id&fields[]=name")

form.add("User group").multiSelect("user_group", UserGroup.map(item => {
  return {
    label: item.name,
    value: item.usergroup_id
  }
}));


const render = form.render();

</script>
<template>
  <render />
</template>

