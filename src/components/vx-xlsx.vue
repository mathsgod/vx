<script>
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/src/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default {
  props: {
    value: Array,
    test: String,
    fullscreen: Boolean,
    search: Boolean,
  },
  data() {
    return {
      instance: null,
    };
  },

  render(h) {
    let columns = [];

    const snakeToCamel = (str) =>
      str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
          group.toUpperCase().replace("-", "")
        );

    this.$slots.default.forEach((item) => {
      if (
        item.componentOptions &&
        item.componentOptions.tag === "vx-xlsx-column"
      ) {
        columns.push(item.componentOptions.propsData);
      }
    });

    let options = this.$props;
    for (let attr of Object.entries(this.$attrs)) {
      options[snakeToCamel(attr[0])] = attr[1];
    }

    options.columns = columns;
    options.data = this.value;
    options.filters = this.$attrs.filters;

    options = Object.assign(options, {
      onundo: (target, events) => {

        events.records.forEach((record) => {
          let column = columns[record.col];
          let name = column.name;

          this.value[record.row][name] = record.oldValue;
        });
          this.$emit("input", this.value);
      },
      onmoverow: (target, oldRowNumber, newRowNumber) => {
        this.value.splice(
          newRowNumber,
          0,
          this.value.splice(oldRowNumber, 1)[0]
        );
        this.$emit("input", this.value);
      },
      ondeleterow: (target, rowNumber) => {
        this.value.splice(rowNumber, 1);
        this.$emit("input", this.value);
      },
      oninsertrow: (target, rowNumber, insertBefore) => {
        let row = {};
        columns.forEach((column) => {
          row[column.field] = "";
        });
        if (insertBefore) {
          this.value.splice(rowNumber, 0, row);
        } else {
          this.value.splice(rowNumber + 1, 0, row);
        }
        this.$emit("input", this.value);
      },
      onchange: (target, cell, colNumber, rowNumber) => {
        let value = this.instance.getValueFromCoords(colNumber, rowNumber);
        let column = columns[colNumber];
        let name = column.name;
        this.value[rowNumber][name] = value;
        this.$emit("input", this.value);
      },
      onsort: (target, colNumber, order) => {
        let column = columns[colNumber];
        let name = column.name;
        this.value.sort((a, b) => {
          if (order === 1) {
            return a[name] > b[name] ? 1 : -1;
          } else {
            return a[name] > b[name] ? -1 : 1;
          }
        });
      },
    });

    let element = h("div");
    this.$nextTick(() => {
      if (!this.instance) {
        this.instance = jspreadsheet(element.elm, options);
      } else {
        this.instance.setData(this.value);
      }
    });

    return [element];
  },
  methods: {
    getRowData(rowNumber) {
      return this.instance.getRowData(rowNumber);
    },
    getData() {
      return this.instance.getData();
    },
  },
};
</script>