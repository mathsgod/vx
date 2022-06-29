<script setup>
import { createForm, $axios } from "@";


const { data } = await $axios.get("/System/setting");

data.save = () => {
    return $axios.post("/System/setting", data);
};u


let f = createForm();
f.setData(data);

f.add("VX URL").input("vx_url");

let i = f.add("Company");
i.input("company");
i.helpBlock("Company name");

f.add("Copyright name").input("copyright_name");
f.add("Copyright year").input("copyright_year");
f.add("Copyright url").input("copyright_url");

f.add("Email from").email("mail_form");

f.addDivider("Login").setContentPosition("left");

f.add("Allow remember me").checkbox("allow_remember_me");

f.addDivider("2 step verification").setContentPosition("left");

f.add("2 Step verification").switch("two_step_verification");
f.add("White list").input("two_step_verification_whitelist");

f.addDivider();

let r = f.add("Biometric authentication");
r.switch("biometric_authentication");
r.helpBlock("Only https can use Biometric authentication");

f.addDivider("File manager").setContentPosition("left");
f.add("Show file manager").switch("file_manager_show");

f.addDivider();
f.add("Custom css").textarea("css");

f.add("Custom js").textarea("js");


const render = f.render();
</script>

<template>
    <render />
</template>