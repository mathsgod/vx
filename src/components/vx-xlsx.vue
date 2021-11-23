<script>
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/src/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default {
  props: {
    value: Array,
  },
  data() {
    return {
      instance: null,
      filters: false,
    };
  },

  render(h) {
    let columns = [];
    this.filters = this.$attrs.filters;

    this.$slots.default.forEach((item) => {
      if (
        item.componentOptions &&
        item.componentOptions.tag === "vx-xlsx-column"
      ) {
        columns.push(item.componentOptions.propsData);
      }
    });

    //let data = [];
    // this.value.forEach((item) => {
    //   let row = [];
    //   columns.forEach((column) => {
    //     row.push(item[column.field]);
    //   });
    //   data.push(row);
    // });
    // console.log(columns);

    let element = h("div");
    this.$nextTick(() => {
      if (!this.instance) {
        this.instance = jspreadsheet(element.elm, {
          columns: columns,
          data: this.value,
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
          filters: this.filters,
        });
        Object.assign(this, this.instance);
      } else {
        this.instance.setData(this.value);
      }
    });

    return [element];
  },
  methods: {
    getData() {
      let columns = [];

      this.$slots.default.forEach((item) => {
        if (
          item.componentOptions &&
          item.componentOptions.tag === "vx-xlsx-column"
        ) {
          columns.push(item.componentOptions.propsData);
        }
      });

      let data = [];
      this.value.forEach((item) => {
        let row = [];
        columns.forEach((column) => {
          row.push(item[column.field]);
        });
        data.push(row);
      });

      return data;
    },
  },
};
</script>