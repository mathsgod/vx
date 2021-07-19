<template>
  <div>
    <vx-table remote="/MailLog/index?_entry=data" searchable>
      <template v-slot:search="table">
        <el-form
          :inline="true"
          v-on:submit.native.prevent
          class="ml-2 mr-2"
          :model="table.search"
        >
          <el-form-item label="From">
            <el-input
              v-model="table.search.from"
              v-on:keyup.enter.native="table.onSearch"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Subject">
            <el-input
              v-model="table.search.subject"
              v-on:keyup.enter.native="table.onSearch"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Created time">
            <el-date-picker
              v-model="table.search.created_time"
              type="daterage"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot>
        <el-table-column label="ID" prop="maillog_id" sortable="custom"></el-table-column>
        <el-table-column label="From" prop="from" sortable="custom"></el-table-column>
        <el-table-column label="To" prop="to" sortable="custom"></el-table-column>
        <el-table-column
          label="Subject"
          prop="subject"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          label="Created time"
          prop="created_time"
          sortable="custom"
        ></el-table-column>
      </template>
    </vx-table>

    <vx-button type="view"></vx-button>
    <vx-button type="delete"></vx-button>
    <vx-button type="update"></vx-button>
  </div>
</template>
<script>
export default {};
</script>
