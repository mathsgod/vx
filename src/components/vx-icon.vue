<script>
import feather from "feather-icons";
export default {
  props: {
    name: String,
  },
  render(h) {
    let icon = feather.icons[this.name];

    let attrs = { ...icon.attrs, ...this.attrs };

    return h("svg", {
      attrs,
      domProps: {
        innerHTML: icon.contents,
      },
    });
  },
};
</script>
