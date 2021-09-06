<template>
  <div>
    <el-card :body-style="{ padding: '1rem' }">
      <el-collapse v-if="searchable">
        <el-collapse-item name="search">
          <template v-slot:title>
            <i class="el-icon-search"></i>&nbsp;&nbsp;{{$t('Search')}}
          </template>
          <slot
            name="search"
            v-bind:search="search"
            v-bind:on-search="onSearch"
            :size="size"
          ></slot>

          <div class="ml-2 mr-2">
            <el-button
              @click="onSearch"
              :size="size"
              type="primary"
              v-t="'Search'"
            ></el-button>
            <el-button
              @click="resetSearch"
              :size="size"
              v-t="$t('Reset')"
            ></el-button>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div
        v-if="pagination"
        class="d-flex justify-content-between align-items-center mb-50 mt-50"
      >
        <div class="d-flex">
          <div>
            Show
            <el-tooltip content="每頁顯示" placement="top">
              <el-select
                v-model="localPerPage"
                style="width: 70px"
                :size="size"
              >
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

        <div class="d-flex justify-content-end">
          <el-tooltip :content="$t('Reload')" placement="top">
            <el-button
              @click="reload"
              icon="el-icon-refresh-right"
              :size="size"
            ></el-button>
          </el-tooltip>
        </div>
      </div>

      <el-table
        :size="size"
        :data="data"
        :default-sort="defaultSort"
        @sort-change="sortChanged"
        v-loading="loading"
        @filter-change="filterChanged"
        :border="border"
      >
        <slot
          v-bind:delete="onDelete"
          v-bind:reload="reload"
          :search="search"
        ></slot>
      </el-table>

      <template v-if="pagination">
        <div class="d-flex justify-content-between mx-0 row">
          <div class="col-sm-12 col-md-6 align-self-center">
            Showing {{ info.from }} to {{ info.to }} of {{ info.total }} entries
          </div>
          <div class="col-sm-12 col-md-6">
            <vs-pagination :total="total" v-model="page"></vs-pagination>
          </div>
        </div>
      </template>
    </el-card>
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
    defaultSort: Object,
    border: Boolean,
  },
  data() {
    return {
      localPerPage: this.per_page,
      page: 1,
      data: [],
      total: 0,
      sort: null,
      search: {},
      loading: false,
      filters: {},
      total_entries: 0,
    };
  },
  computed: {
    info() {
      return {
        from: (this.page - 1) * this.localPerPage + 1,
        to: Math.min(this.page * this.localPerPage, this.total_entries),
        total: this.total_entries,
      };
    },
  },
  created() {
    if (this.defaultSort) {
      this.sort = this.defaultSort.prop + "|" + this.defaultSort.order;
    }

    this.reload();
  },
  watch: {
    localPerPage() {
      this.reload();
    },
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
      let f = {};
      for (let c in filters) {
        if (filters[c].length > 0) {
          f[c] = filters[c];
        }
      }
      this.filters = f;
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
            per_page: this.pagination ? this.localPerPage : null,
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

          this.total = Math.ceil(resp.total / this.localPerPage);
          this.total_entries = resp.total;
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
