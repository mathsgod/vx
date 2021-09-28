<template>
  <div>
    <apexchart
      type="radialBar"
      :series="series1"
      :options="opt1"
      width="250"
    ></apexchart>

    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>

    <el-card>
      <el-descriptions title="User Info" :column="1">
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province</el-descriptions-item
        >
      </el-descriptions>
    </el-card>

    <vx-div :remote="remote" @loading="a" @loaded="b"></vx-div>
    <el-button @click="click1">load</el-button>
    <el-button @click="click2">load2</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      opt1: {
        grid: {
          padding: {
            bottom: 30,
          },
        },
        stroke: {
          lineCap: "round",
        },
        colors:["#51e5a8"],
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
