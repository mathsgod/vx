<script>
export default {
  name: "vx-xlsx-column",
  props: {
    type: {
      type: String,
      default: "text",
    },
    title: String,
    width: [Number, String],
    name: String,
    options: Object,
    source: Array,
    readOnly: Boolean,
    multiple: Boolean,
    mask: String,
    render: String,
    decimal: String,
    url: String,
    autocomplete: Boolean,
  },
  render(h) {
    return h("div");

    return null;
  },
};
</script>