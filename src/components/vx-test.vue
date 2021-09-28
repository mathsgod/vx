<template>
  <div>
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
