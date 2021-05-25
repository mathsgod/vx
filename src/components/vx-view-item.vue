<template>
  <tr>
    <td class="p-50 text-right-card-text font-weight-bold" v-text="label"></td>
    <td class="p-50"><slot></slot></td>
  </tr>
</template>
<script>
export default {
  props: {
    label: String,
  },
};
</script>