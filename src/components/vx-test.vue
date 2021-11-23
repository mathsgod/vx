<template>
  <div>
    <vx-xlsx v-model="data" :filters="true">
      <vx-xlsx-column name="first_name" title="First name" :width="220">
      </vx-xlsx-column>
      <vx-xlsx-column name="last_name" title="Last name" :width="120">
      </vx-xlsx-column>
      <vx-xlsx-column
        type="dropdown"
        name="test"
        title="drop down"
        :width="120"
        :source="['Apple', 'Bananas', 'Carrots', 'Oranges', 'Cheese']"
        :multiple="true"
      >
      </vx-xlsx-column>
    </vx-xlsx>

    <el-button @click="test">reset data</el-button>

    <el-button @click="getData">get data</el-button>
  </div>
</template>
<script>
import vxXlsx from "./vx-xlsx.vue";
import vxXlsxColumn from "./vx-xlsx-column.vue";
export default {
  components: { vxXlsx, vxXlsxColumn },
  data() {
    return {
      data: [
        { first_name: "Raymond", last_name: "Chong", user_id: 1 },
        { first_name: "Hello", user_id: 2 },
        { first_name: "World", test: ";Apple;Bananas;Hello", user_id: 3 },
      ],
      dialogVisible: false,
      xData: [],
      opt1: {
        grid: {
          padding: {
            bottom: 30,
          },
        },
        stroke: {
          lineCap: "round",
        },
        colors: ["#51e5a8"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#28C76F"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: "77%",
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                fontSize: "2.86rem",
                fontWeight: "600",
              },
            },
          },
        },
        sparklink: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      series1: [83],
      remote: "/System/test",
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    test() {
      this.data = [
        { first_name: "Raymond", last_name: "Chong" },
        { first_name: "Hello" },
        { first_name: "World" },
        { first_name: "World1" },
      ];
    },
    a() {
      console.log("loading");
    },
    b() {
      console.log("loaded");
    },
    click1() {
      this.remote = "/System/test?a=1";
    },
    click2() {
      this.remote = "/System/test?a=2";
    },
    getData() {
      console.log(this.data);
    },
  },
};
</script>
