<template>
  <div>
    <el-collapse v-if="searchable">
      <el-collapse-item title="Search" name="search">
        <slot
          name="search"
          v-bind:search="search"
          v-bind:on-search="onSearch"
          :size="size"
        ></slot>
        <div>
          <el-button @click="onSearch" :size="size">Search</el-button>
          <el-button @click="resetSearch" :size="size">Reset</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>

    <vx-card class="shadow-none" :body-style="{ padding: '0px' }">
      <vx-card-body>
        <div
          v-if="pagination"
          class="d-flex justify-content-between align-items-center mx-0 row"
        >
          <div class="d-flex col-sm-12 col-md-6 align-items-center p-50">
            <div>
              Show
              <el-tooltip content="每頁顯示" placement="top">
                <el-select v-model="localPerPage" style="width: 70px" :size="size">
                  <el-option
                    v-for="(p, index) in pageLengthOption"
                    :value="p"
                    v-text="p"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-tooltip>
              entries
            </div>
          </div>

          <div class="d-flex col-sm-12 col-md-6 justify-content-end">
            <div class="p-50">
              <el-tooltip content="Reload" placement="top">
                <el-button
                  @click="reload"
                  icon="el-icon-refresh-right"
                  :size="size"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>

        <el-table
          :size="size"
          :data="data"
          @sort-change="sortChanged"
          v-loading="loading"
          @filter-change="filterChanged"
        >
          <slot v-bind:delete="onDelete" v-bind:reload="reload"></slot>
        </el-table>
        <vs-pagination v-if="pagination" :total="total" v-model="page"></vs-pagination>
      </vx-card-body>
    </vx-card>
  </div>
</template>
<script>
export default {
  props: {
    remote: String,
    per_page: {
      type: Number,
      default: 10,
    },
    pageLengthOption: {
      type: Array,
      default() {
        return [10, 25, 50, 100];
      },
    },
    searchable: Boolean,
    showView: Boolean,
    showUpdate: Boolean,
    showDelete: Boolean,
    pagination: {
      type: Boolean,
      default: true,
    },
    size: String,
  },
  data() {
    return {
      localPerPage: this.per_page,
      page: 1,
      data: [],
      total: 0,
      sort: null,
      showSearch: false,
      search: {},
      loading: false,
      filters: {},
    };
  },
  created() {
    this.reload();
  },
  watch: {
    page() {
      this.reload();
    },
  },
  methods: {
    resetSearch() {
      this.search = {};
      this.onSearch();
    },
    filterChanged(filters) {
      this.filters = filters;
      this.reload();
    },
    onDelete(uri) {
      this.$confirm("Are you sure?", { type: "warning" }).then(async () => {
        let resp = await this.$vx.delete(uri);
        if (resp.status == 204) {
          this.$message.success("Deleted");
          this.reload();
        } else {
          this.$alert(resp.statusText);
        }
      });
    },
    onSearch() {
      this.page = 1;
      this.reload();
    },
    sortChanged({ column, prop, order }) {
      console.log(column);
      if (!order) {
        this.sort = null;
      } else {
        this.sort = prop + "|" + order;
      }
      this.reload();
    },
    reload() {
      this.loading = true;

      return this.$vx
        .get(this.remote, {
          params: {
            page: this.page,
            per_page: this.pagination ? this.per_page : null,
            sort: this.sort,
            search: this.search,
            filter: this.filters,
            show_view: this.showView,
            show_update: this.showUpdate,
            show_delete: this.showDelete,
          },
        })
        .then((resp) => {
          resp = resp.data;

          this.loading = false;

          this.total = Math.ceil(resp.total / this.per_page);
          this.data = resp.data;
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$router.push("/");
            return;
          }
        });
    },
  },
};
</script>
