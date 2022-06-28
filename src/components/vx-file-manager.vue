<script setup>
import VxFileManagerLabels from "./vx-file-manager-labels.vue";
import VxFileManagerPreview from "./vx-file-manager-preview.vue";
import VxFileManagerMove from "./vx-file-manager-move.vue";
import axios from "axios";

const pagination = {
  rowsPerPage: 0,
  "rows-per-page-options": [0],
};

const columns = ref([
  {
    name: "icon",
    label: "",
    field: "type",
  },
  {
    name: "name",
    label: "Name",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "last_modified",
    label: "Last Modified",
    field: "last_modified_human",
    align: "left",
  },
  {
    name: "size_display",
    label: "Size",
    field: "size_display",
    align: "left",
  },
  { name: "action" },
]);

const leftDrawerOpen = ref(false);
const search = ref("");
const showAdvanced = ref(false);
const showDateOptions = ref(false);
const exactPhrase = ref("");
const hasWords = ref("");
const excludeWords = ref("");
const byWebsite = ref("");
const byDate = ref("Any time");

function onClear() {
  exactPhrase.value = "";
  hasWords.value = "";
  excludeWords.value = "";
  byWebsite.value = "";
  byDate.value = "Any time";
}

function changeDate(option) {
  byDate.value = option;
  showDateOptions.value = false;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<template>
  <q-layout
    view="hHh lpR fFf"
    class="bg-white vx-file-manager"
    container
    :style="{ 'min-height': height }"
  >
    <q-header bordered class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.xs"
          shrink
          class="row items-center no-wrap"
        >
          <span class="q-ml-sm">File manager</span>
        </q-toolbar-title>

        <q-space />

        <q-input
          class="GNL__toolbar-input"
          outlined
          dense
          v-model="search"
          @keyup.enter="submitSearch"
          color="bg-grey-7 shadow-1"
          placeholder="Search for file name"
        >
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>

        <q-space />

        <q-btn v-if="showCloseButton" icon="close" flat round @click="$emit('close')"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="257"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item>
            <q-item-section>
              <q-btn icon="add" color="primary" label="New">
                <q-menu fit>
                  <q-list>
                    <q-item clickable v-close-popup @click="onNewFolder">
                      <q-item-section avatar
                        ><q-icon name="o_create_new_folder"></q-icon
                      ></q-item-section>
                      <q-item-section>Folder</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      v-close-popup
                      @click="$refs.file.pickFiles"
                    >
                      <q-item-section avatar
                        ><q-icon name="o_upload_file"></q-icon
                      ></q-item-section>
                      <q-item-section>Upload file </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>

          <q-expansion-item
            label="Storage"
            default-opened
            icon="o_storage"
            class="GNL__drawer-item"
            selectable
            @click="folder = ''"
          >
            <q-tree
              ref="tree1"
              class="q-pl-md"
              :nodes="folders"
              node-key="path"
              label-key="name"
              @lazy-load="onLazyLoad"
              v-model:selected="folder"
              no-selection-unset
            >
            </q-tree>
          </q-expansion-item>

          <q-separator inset class="q-my-sm" />

          <VxFileManagerLabels v-model:label="label" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer side="right" show-if-above bordered>
      <VxFileManagerPreview
        v-model:value="preview"
        v-if="preview"
      ></VxFileManagerPreview>
    </q-drawer>

    <q-page-container :style="{ height }">
      <q-file
        ref="file"
        v-model="uploadFiles"
        multiple
        name="file"
        v-show="false"
      ></q-file>

      <q-toolbar>
        <q-breadcrumbs>
          <q-breadcrumbs-el
            tag="a"
            label="Storage"
            @click="folder = ''"
            href="javascript:void(0)"
          ></q-breadcrumbs-el>
          <q-breadcrumbs-el
            tag="a"
            v-for="(b, index) in breadcrumbs"
            :label="b.label"
            :key="index"
            @click="onBreadcrumbClick(b)"
            href="javascript:void(0)"
          ></q-breadcrumbs-el>
        </q-breadcrumbs>
        <q-space></q-space>

        <q-btn flat round icon="o_drive_file_move" v-if="selected.length > 0">
          <VxFileManagerMove @input:folder="moveToFolder($event)" />
        </q-btn>

        <q-btn
          flat
          round
          icon="o_delete"
          @click="deleteSelected"
          v-if="selected.length > 0"
        ></q-btn>
        <q-btn
          flat
          round
          :icon="grid ? 'list_view' : 'grid_view'"
          @click="grid = !grid"
        ></q-btn>
      </q-toolbar>

      <template v-if="grid">
        <q-table
          title="Folders"
          flat
          bordered
          grid
          :columns="columns"
          :rows="fileFolders"
        >
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row">
                    <q-icon name="folder" size="1.7em"></q-icon>
                    <div class="text-subtitle2">{{ props.row.name }}</div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
        <q-table
          title="Files"
          flat
          bordered
          grid
          :columns="columns"
          :rows="files"
          :pagination="pagination"
        >
          <template v-slot:item="props"
            ><div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card class="my-card">
                <template v-if="canPreviewImage(props.row)">
                  <q-img
                    :src="`${endpoint}photo/0/${props.row.path}?w=200`"
                    lazy
                  ></q-img>
                </template>

                <q-card-section>
                  <div class="text-subtitle2">{{ props.row.name }}</div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </template>
      <template v-else>
        <q-table
          flat
          bordered
          :columns="columns"
          :rows="folderAndFiles"
          @row-dblclick="onDblclickRow"
          @row-click="onClickRow"
          :pagination="pagination"
          row-key="path"
          selection="multiple"
          v-model:selected="selected"
        >
          <template #body-cell-icon="props">
            <q-td>
              <q-icon
                name="folder"
                v-if="props.value == 'folder'"
                size="1.7em"
              />
              <q-icon name="description" v-else size="1.7em" />
            </q-td>
          </template>

          <template #body-cell-action="props">
            <q-td>
              <q-btn flat icon="more_vert">
                <q-menu>
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      @click="onDeleteRow(props.row)"
                    >
                      <q-item-section avatar
                        ><q-icon name="delete"></q-icon
                      ></q-item-section>
                      <q-item-section>Delete</q-item-section>
                    </q-item>

                    <q-item
                      v-if="props.row.type == 'file'"
                      clickable
                      v-close-popup
                      @click="onDownloadRow(props.row)"
                    >
                      <q-item-section avatar>
                        <q-icon name="download"></q-icon>
                      </q-item-section>
                      <q-item-section>Download</q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                      @click="onRenameRow(props.row)"
                    >
                      <q-item-section avatar>
                        <q-icon name="edit"></q-icon>
                      </q-item-section>
                      <q-item-section>Rename</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </template>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { fasEarthAmericas, fasFlask } from "@quasar/extras/fontawesome-v6";
import {
  deleteFile,
  deleteFolder,
  renameFile,
  renameFolder,
  createFolder,
  uploadFile,
  moveFile,
} from "./file-manager.js";
export default {
  props: {
    height: {
      type: String,
      default: "700px",
    },
    defaultAction: {
      default: "preview",
      type: String,
    },
    showCloseButton: Boolean,
  },
  data() {
    return {
      selected: [],
      folder: "",
      uploadFiles: [],
      endpoint: vx.endpoint,
      showSelectFolder: false,
      showSidebar: false,
      parentPath: "",

      selectedPath: this.base,
      selectedNode: null,
      files: "",
      folders: [],
      mode: "list",
      action: "",
      uploadHeaders: null,
      label: null,
      search_text: "",
      file_upload_max_size: "",
      grid: false,
      fileFolders: [],
      preview: null,
      search: "",
    };
  },
  created() {
    this.reloadContent();
  },
  computed: {
    breadcrumbs() {
      let breadcrumbs = [];

      if (this.folder.toString() == "") {
        return [];
      }

      let paths = this.folder.split("/");

      let ps = [];
      for (let p of paths) {
        ps.push(p);
        breadcrumbs.push({
          label: p,
          path: ps.join("/"),
        });
      }

      return breadcrumbs;
    },

    folderAndFiles() {
      return this.fileFolders.concat(this.files);
    },
  },
  watch: {
    search() {
      console.log(this.search);
    },
    async uploadFiles() {
      if (this.uploadFiles.length > 0) {
        for (let file of this.uploadFiles) {
          await uploadFile(this.folder, file);
        }

        this.reloadContent();
        this.uploadFiles = [];
      }
    },
    async folder(val) {
      await this.reloadContent();
      this.$refs.tree1.setExpanded(val, true);

      let folder = this.findFolder(val, this.folders);
      if (folder) {
        this.preview = folder;
      }
    },
    label() {
      this.reloadContent();
    },
  },
  methods: {
    submitSearch() {
      console.log("submit search");
      this.search_text = this.search;
      this.reloadContent();
    },

    moveToFolder(folder) {
      this.$q
        .dialog({
          title: "Move to folder",
          message: `Move to folder ${folder}?`,
          cancel: true,
        })
        .onOk(async () => {
          for (let row of this.selected) {
            await moveFile(row.path, folder);
          }

          this.reloadContent();
        });
    },
    deleteSelected() {
      this.$q
        .dialog({
          title: "Delete",
          message: "Are you sure you want to delete this files or folders?",
          cancel: true,
        })
        .onOk(async () => {
          for (let row of this.selected) {
            if (row.type == "folder") {
              await deleteFolder(row.path);
            } else {
              await deleteFile(row.path);
            }
          }
          this.selected = [];
          this.reloadContent();
        });
    },
    onDeleteRow(row) {
      if (row.type == "file") {
        this.$q
          .dialog({
            title: "Delete",
            message: "Are you sure you want to delete this file?",
            cancel: true,
          })
          .onOk(async () => {
            await deleteFile(row.path);
            this.reloadContent();
          });
      } else if (row.type == "folder") {
        this.$q
          .dialog({
            title: "Delete",
            message: "Are you sure you want to delete this folder?",
            cancel: true,
          })
          .onOk(async () => {
            await deleteFolder(row.path);
            this.$q.notify("Folder deleted");
            this.reloadContent();
          });
      }
    },
    onRenameRow(row) {
      this.$q
        .dialog({
          title: "Rename " + row.type,
          prompt: {
            label: "Name",
            model: row.name,
          },
          cancel: true,
        })
        .onOk(async (name) => {
          if (row.type == "file") {
            await renameFile(row.path, name);
          } else {
            await renameFolder(row.path, name);
          }

          this.reloadContent();
        });
    },
    onNewFolder() {
      this.$q
        .dialog({
          title: "New Folder",
          prompt: {
            label: "Name",
          },
          cancel: true,
        })
        .onOk(async (name) => {
          await createFolder(this.folder + "/" + name);
          this.reloadContent();
        });
    },
    onBreadcrumbClick(b) {
      this.folder = b.path;
    },
    onDblclickRow(evt, row, index) {
      if (row.type == "folder") {
        this.folder = row.path;
        return;
      }

      if (row.type == "file") {
        this.$emit("input", [row.path]);
      }
    },
    onClickRow(evt, row, index) {
      this.preview = row;
    },
    findFolder(path, folders) {
      for (let folder of folders || []) {
        if (folder.path == path) {
          return folder;
        }
        //find in children
        let found = this.findFolder(path, folder.children);
        if (found) {
          return found;
        }
      }
    },
    canPreviewImage(file) {
      if (file.mime_type == "image/jpeg") return true;
      if (file.mime_type == "image/png") return true;
      if (file.mime_type == "image/gif") return true;
      return false;
    },

    onSelectFolder(target) {
      console.log(target);
    },
    async onLazyLoad({ node, key, done, fail }) {
      let { data } = await vx.get("/FileManager/listDirectory", {
        params: {
          path: node.path,
        },
      });

      data.map((item) => {
        item.lazy = true;
        return item;
      });
      done(data);
    },

    async reloadContent() {
      if (this.label) {
        let { data } = await vx.get("/FileManager/listFiles", {
          params: {
            path: this.base,
            type: this.label,
          },
        });

        this.files = data.map((item) => {
          item.type = "file";
          return item;
        });
        this.fileFolders = [];
        return;
      }

      let { data } = await vx.get("/FileManager/listContents", {
        params: {
          path: this.folder,
          file_type: this.fileType,
          search: this.search_text,
        },
      });

      this.parentPath = data.parent;
      this.files = data.files.map((file) => {
        file.type = "file";
        return file;
      });

      let folder = this.findFolder(this.folder, this.folders);
      let folders = data.folders.map((f) => {
        f.type = "folder";
        f.lazy = true;
        return f;
      });

      if (folder) {
        folder.lazy = false;
        folder.children = folders;
      } else {
        this.folders = folders;
      }

      this.fileFolders = folders;
    },
  },
};
</script>

<style >
.vx-file-manager .q-tree__node--selected {
  border-radius: 0 24px 24px 0;
  background-color: #e8f0fe;
}
</style>

<style lang="sass">
.GNL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>