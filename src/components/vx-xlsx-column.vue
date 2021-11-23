<script>
export default {
  name: "vx-xlsx-column",
  props: {
    type: {
      type: String,
      default: "text",
    },
    title: String,
    width: Number,
    field: String,
    options: Object,
    source: Array,
    readOnly: Boolean,
    multiple: Boolean,
  },
  render(h) {
    return h("div");

    return null;
  },
};
</script>