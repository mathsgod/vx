<script setup>
import { $axios } from '@';

let { data: html } = await $axios.get('/System/phpinfo');

</script>
<template>
    <div v-html="html"></div>
</template>