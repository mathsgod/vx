<template>
  <div>
    <el-input label="hello"></el-input>
    <vx-table
      remote="/User/list?t=0&amp;_entry=ds"
      border
      show-view
      show-update
      show-delete
    >
      <template v-slot:search="table"
        ><el-form
          :size="table.size"
          :inline="true"
          v-on:submit.native.prevent
          class="ml-2 mr-2"
        ></el-form
      ></template>
      <template v-slot="table"
        ><el-table-column width="70"
          ><template slot-scope="props"
            ><el-button
              v-if="props.row.__view__"
              icon="el-icon-search"
              type="primary"
              size="mini"
              v-on:click="$router.push(props.row.__view__.value)"
            ></el-button></template></el-table-column
        ><el-table-column width="70"
          ><template v-slot:default="props"
            ><el-button
              v-if="props.row.__update__"
              icon="el-icon-edit"
              type="warning"
              size="mini"
              v-on:click="$router.push(props.row.__update__.value)"
            ></el-button></template></el-table-column
        ><el-table-column width="70"
          ><template v-slot:default="props"
            ><el-button
              v-if="props.row.__delete__"
              icon="el-icon-close"
              type="danger"
              size="mini"
              v-on:click="table.delete(props.row.__delete__.value)"
            ></el-button></template></el-table-column
        ><el-table-column
          label="Username"
          prop="username"
          sortable="custom"
          label-class-name="d-flex align-items-center"
          ><template v-slot:header
            ><div class="d-flex flex-column">
              Username
              
              
              <el-input
                v-on:click.native.stop
                v-model="table.search.username"
                clearable
              ></el-input></div></template></el-table-column
        ><el-table-column
          label="First name"
          prop="first_name"
          sortable="custom"
        ></el-table-column
        ><el-table-column
          label="Last name"
          prop="last_name"
          sortable="custom"
        ></el-table-column
        ><el-table-column label="Phone" prop="phone" sortable="custom"></el-table-column
        ><el-table-column label="Email" prop="email" sortable="custom"></el-table-column
        ><el-table-column
          label="Join date"
          prop="join_date"
          sortable="custom"
          label-class-name="d-flex align-items-center"
          ><template v-slot:header
            ><div class="d-flex flex-column">
              Join date<el-input
                v-on:click.native.stop
                v-model="table.search.join_date"
                clearable
              ></el-input></div></template></el-table-column
        ><el-table-column
          label="Language"
          prop="language"
          sortable="custom"
          :filters="[
            { text: 'English', value: 'en' },
            { text: '\u4e2d\u6587', value: 'zh-hk' },
          ]"
          column-key="language"
        ></el-table-column></template
    ></vx-table>

    <vx-button type="view"></vx-button>
    <vx-button type="delete"></vx-button>
    <vx-button type="update"></vx-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      data: [{ test: 1 }],
    };
  },
};
</script>
