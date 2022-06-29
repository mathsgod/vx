<script setup>
import { createForm, getMe, $axios } from "@"

const me = await getMe()

const form = createForm()
form.setLabelPosition("top")
form.setData(me)
form.add("Username").input("username")
form.add("Email").email("email")
form.add("First name").required().input("first_name")
form.add("Last name").input("last_name");

me.save = () => {
  return $axios.patch("/User/" + me.user_id, {
    username: me.username,
    email: me.email,
    first_name: me.first_name,
    last_name: me.last_name
  });
};

const render = form.render();


</script>
<template>
  <render />
</template>