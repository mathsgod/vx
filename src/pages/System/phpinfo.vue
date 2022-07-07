<script setup>
import { $axios } from '@';
let { data: html } = await $axios.get('/System/phpinfo');
</script>
<template>
    <iframe :srcdoc="html" width="100%" style="height:80vh;border:0;"></iframe>
</template>