<template>
  <div>
    <jspreadsheet
      :data="data"
      :allow-insert-row="false"
      :allow-delete-row="false"
    ></jspreadsheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { type: "text", label: "A" },
        { type: "text", label: "B" },
        { type: "text", label: "C" },
      ],
      data: [
        ["a", "b", "c"],
        ["a", "b", "c"],
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
  },
};
</script>
