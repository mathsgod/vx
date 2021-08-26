<template>
  <div class="file-manager-application vx-file-manager">
    <div class="content-area-wrapper vx-file-manager-content">
      <div class="sidebar-left">
        <div class="sidebar">
          <div class="sidebar-file-manager" :class="{ show: showSidebar }">
            <div class="sidebar-inner">
              <!-- sidebar menu links starts -->
              <!-- add file button -->
              <el-dropdown
                class="w-100 pl-2 pt-2 pr-2 mb-2"
                @command="addNew"
                trigger="click"
              >
                <el-button
                  type="primary"
                  class="w-100"
                  :disabled="type != null"
                >
                  Add New
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    command="folder"
                    v-t="'Folder'"
                  ></el-dropdown-item>
                  <el-dropdown-item
                    command="file"
                    v-t="'File'"
                  ></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- add file button ends -->

              <!-- sidebar list items starts  -->
              <div class="sidebar-list" ref="sidebarList">
                <!-- links for file manager sidebar -->
                <el-tree
                  draggable
                  class="mb-2"
                  ref="tree"
                  lazy
                  :load="loadNode"
                  @node-click="handleNodeClick"
                  node-key="path"
                  :expand-on-click-node="false"
                  :default-expanded-keys="[base]"
                  @node-drag-end="handleDragEnd"
                  :allow-drop="allowDrop"
                  @node-drop="handleDrop"
                  :highlight-current="true"
                ></el-tree>
                <a
                  @click="listFiles('recent')"
                  href="javascript:void(0)"
                  class="list-group-item list-group-item-action"
                >
                  <i data-feather="clock" class="mr-50 font-medium-3"></i>
                  <span class="align-middle">Recents</span>
                </a>

                <vx-file-manager-labels
                  :file-type="fileType"
                  :value="type"
                  @input="listFiles($event)"
                ></vx-file-manager-labels>

                <!-- links for file manager sidebar ends -->

                <!-- storage status of file manager starts-->
                <!-- div class="storage-status mb-1 px-2">
                  <h6 class="section-label mb-1">Storage Status</h6>
                  <div class="d-flex align-items-center cursor-pointer">
                    <i data-feather="server" class="font-large-1"></i>
                    <div class="file-manager-progress ml-1">
                      <span>68GB used of 100GB</span>
                      <div
                        class="progress progress-bar-primary my-50"
                        style="height: 6px"
                      >
                        <div
                          class="progress-bar"
                          role="progressbar"
                          aria-valuenow="80"
                          aria-valuemin="80"
                          aria-valuemax="100"
                          style="width: 80%"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div -->
                <!-- storage status of file manager ends-->
              </div>
              <!-- side bar list items ends  -->
              <!-- sidebar menu links ends -->
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="content-wrapper">
          <div class="content-header row"></div>
          <div class="content-body">
            <!-- overlay container -->
            <div
              class="body-content-overlay"
              ref="overlay"
              @click="showSidebar = false"
              :class="{ show: showSidebar }"
            ></div>

            <!-- file manager app content starts -->
            <div class="file-manager-main-content">
              <!-- search area start -->
              <div
                class="
                  file-manager-content-header
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <div class="d-flex align-items-center">
                  <div
                    @click="showSidebar = !showSidebar"
                    class="
                      sidebar-toggle
                      d-block d-xl-none
                      float-left
                      align-middle
                      ml-1
                    "
                  >
                    <i data-feather="menu" class="font-medium-5"></i>
                  </div>
                  <div
                    class="
                      input-group input-group-merge
                      shadow-none
                      m-0
                      flex-grow-1
                    "
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text border-0">
                        <vx-icon name="search" width="14"></vx-icon>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control files-filter border-0 bg-transparent"
                      :placeholder="$t('Search')"
                      @keyup="onSearch($event)"
                      v-model="search_text"
                    />
                  </div>
                </div>

                <div class="d-flex align-items-center">
                  <el-button-group
                    v-if="selectedFolder.length + selectedFile.length > 0"
                  >
                    <el-button
                      class="el-icon-delete"
                      @click="deleteSelected"
                    ></el-button>
                    <el-button
                      @click="showSelectFolder = true"
                      v-if="selectedFile.length > 0"
                      >Move</el-button
                    >
                  </el-button-group>

                  <el-button-group>
                    <el-button
                      icon="el-icon-menu"
                      class="active"
                      @click="mode = 'grid'"
                    ></el-button>
                    <el-button @click="mode = 'list'"
                      ><i class="fa fa-list"></i
                    ></el-button>
                  </el-button-group>
                </div>
              </div>
              <!-- search area ends here -->

              <div class="file-manager-content-body" ref="fileContent">
                <template v-if="file_uploader">
                  <el-upload
                    ref="uploads"
                    class="upload-demo"
                    drag
                    :action="action"
                    multiple
                    :headers="uploadHeaders"
                    :data="{ path: selectedPath }"
                    :on-success="onSuccessUpload"
                    :on-error="onErrorUpload"
                    :accept="accept"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      Drop file here or <em>click to upload</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                      Files with a size less than {{ $vx.file_upload_max_size }}
                    </div>
                  </el-upload>

                  <el-divider></el-divider>
                </template>

                <!-- Folders Container Starts -->
                <div
                  class="view-container"
                  :class="mode == 'list' ? 'list-view' : ''"
                >
                  <h6 class="files-section-title mt-25 mb-75">Folders</h6>
                  <div class="files-header">
                    <h6 class="font-weight-bold mb-0" v-t="'Name'"></h6>
                    <div>
                      <h6
                        class="
                          font-weight-bold
                          file-item-size
                          d-inline-block
                          mb-0
                        "
                        v-t="'Size'"
                      ></h6>
                      <h6
                        class="
                          font-weight-bold
                          file-last-modified
                          d-inline-block
                          mb-0
                        "
                        v-t="'Date modified'"
                      ></h6>
                      <h6 class="font-weight-bold d-inline-block mr-1 mb-0">
                        Actions
                      </h6>
                    </div>
                  </div>

                  <div
                    class="card file-manager-item folder level-up"
                    v-if="showLevelUp"
                    @click="onLevelUp"
                  >
                    <div class="card-img-top file-logo-wrapper">
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-center
                          w-100
                        "
                      >
                        <i class="fa fa-arrow-up"></i>
                      </div>
                    </div>
                    <div class="card-body pl-2 pt-0 pb-1">
                      <div class="content-wrapper">
                        <p class="card-text file-name mb-0">...</p>
                      </div>
                    </div>
                  </div>

                  <vx-file-manager-folder
                    v-for="(folder, index) in folders"
                    :key="index"
                    :folder="folder"
                    @delete="deleteFolder($event)"
                    @selected="selectFolder($event)"
                    @unselected="unselectFolder($event)"
                    @rename="renameFolder($event)"
                    @input="folderClicked($event)"
                  ></vx-file-manager-folder>

                  <div
                    class="flex-grow-1 align-items-center no-result mb-3"
                    v-if="search_text != '' && folders.length == 0"
                  >
                    <i class="fa fa-exclamation-circle mr-50"></i>
                    No Results
                  </div>
                </div>
                <!-- /Folders Container Ends -->

                <!-- Files Container Starts -->
                <div
                  class="view-container"
                  :class="mode == 'list' ? 'list-view' : ''"
                >
                  <h6 class="files-section-title mt-2 mb-75">Files</h6>

                  <vx-file-manager-file
                    v-for="f in files"
                    :key="f.path"
                    :file="f"
                    @delete="deleteFile($event)"
                    @rename="renameFile($event)"
                    @duplicate="duplicateFile($event)"
                    @selected="selectedFile.push($event)"
                    @unselected="
                      selectedFile = selectedFile.filter((s) => s != $event)
                    "
                    @input="inputFile($event)"
                  ></vx-file-manager-file>

                  <div
                    class="flex-grow-1 align-items-center no-result mb-3"
                    v-if="search_text != '' && files.length == 0"
                  >
                    <i class="fa fa-exclamation-circle mr-50"></i>
                    No Results
                  </div>
                </div>
                <!-- /Files Container Ends -->
              </div>
            </div>
            <!-- file manager app content ends -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-if="showSelectFolder"
      title="Select folder ..."
      :visible.sync="showSelectFolder"
    >
      <el-tree
        ref="tree2"
        lazy
        :load="loadNode"
        node-key="path"
        :expand-on-click-node="false"
        :default-expanded-keys="[base]"
        :highlight-current="true"
        class="mb-1"
      ></el-tree>
      <el-button
        type="primary"
        @click="moveSelectedTo($refs.tree2.getCurrentNode())"
        >Select</el-button
      >
    </el-dialog>
  </div>
</template>

<style scoped>
.vx-file-manager-content {
  line-height: 1;
}
</style>

<script>
import "../assets/css/plugins/extensions/ext-component-tree.css";
import "../assets/css/pages/app-file-manager.css";
import PerfectScrollbar from "perfect-scrollbar";
import VxFileManagerFile from "./vx-file-manager-file.vue";
import VxFileManagerFolder from "./vx-file-manager-folder.vue";
import feather from "feather-icons";
import VxFileManagerLabels from "./vx-file-manager-labels.vue";

export default {
  name: "vx-file-manager",
  components: {
    "vx-file-manager-file": VxFileManagerFile,
    "vx-file-manager-folder": VxFileManagerFolder,
    VxFileManagerLabels,
  },
  props: {
    base: {
      type: String,
      default: "",
    },
    defaultAction: {
      default: "preview",
      type: String,
    },
    fileType: String,
    accept: String,
  },
  data() {
    return {
      showSelectFolder: false,
      showSidebar: false,
      parentPath: "",
      selectedPath: this.base,
      selectedNode: null,
      files: [],
      folders: [],
      mode: "list",
      selectedFolder: [],
      selectedFile: [],
      file_uploader: false,
      action: "",
      uploadHeaders: null,
      type: null,
      search_text: "",
    };
  },
  created() {
    this.reloadContent();
    this.action = this.$vx.endpoint + "FileManager/uploadFile";
    this.uploadHeaders = {
      Authorization: "Bearer " + this.$vx.accessToken,
    };
  },
  mounted() {
    new PerfectScrollbar(this.$refs.fileContent);
    feather.replace({
      width: 14,
      height: 14,
    });
  },

  watch: {
    selectedPath() {
      this.reloadContent();
    },
  },
  computed: {
    showLevelUp() {
      if (this.selectedPath == "") {
        return false;
      }
      return true;
    },
  },
  methods: {
    async moveSelectedTo(selectedNode) {
      if (!selectedNode) return;
      await this.$confirm(`Move selected file to ${selectedNode.path}?`);

      this.showSelectFolder = false;

      for (let file of this.selectedFile) {
        await this.$vx.post("FileManager/moveFile", {
          path: file,
          target: selectedNode.path,
        });
      }

      this.selectedFile = [];
      this.reloadContent();
    },
    allowDrop(draggingNode, dropNode, type) {
      if (type == "inner") return true;
      return false;
    },
    async handleDrop(draggingNode, dropNode) {
      try {
        await this.$confirm(
          `Moving ${draggingNode.data.path} to ${dropNode.data.path}`,
          {
            type: "warning",
          }
        );
        await this.moveFolder(draggingNode.data.path, dropNode.data.path);

        //reload target
        let node = this.$refs.tree.getNode(dropNode.data.path);
        node.loaded = false;
        node.expand();
      } catch (e) {
        let data = draggingNode.data;
        let pNode = this.$refs.tree.getNode(data.location);
        pNode.loaded = false;
        pNode.expand();
      }
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("drop end");
      return;
      console.log(
        "tree drag end: ",
        draggingNode,
        dropNode && dropNode.label,
        dropType,
        ev
      );
      console.log(ev);
      ev.preventDefault();

      return false;
    },
    onSearch() {
      this.$nextTick(this.reloadContent);
    },
    onLevelUp() {
      console.log(this.parentPath);
      this.folderClicked(this.parentPath);
    },
    folderClicked(path) {
      this.$refs.tree.setCurrentKey(path);
      this.selectedPath = path;
    },
    //file clicked
    inputFile(path) {
      this.$emit("input", path);
    },
    onErrorUpload(err) {
      console.log(err);
      this.$message.error("upload failed!");
    },
    onSuccessUpload() {
      this.reloadContent();
      this.$refs.uploads.clearFiles();
    },
    async listFiles(type) {
      this.type = type;
      this.reloadContent();
    },
    deleteSelected() {
      this.$confirm("Delete?").then(async () => {
        for (let p of this.selectedFolder) {
          await this.$vx.post("FileManager/deleteFolder", {
            path: p,
          });
          await this.$refs.tree.remove(p);
        }

        for (let file of this.selectedFile) {
          await this.$vx.post("FileManager/deleteFile", {
            path: file,
          });
        }
        this.selectedFolder = [];
        this.selectedFile = [];
        this.reloadContent();
      });
    },
    selectFolder(path) {
      this.selectedFolder.push(path);
    },
    unselectFolder(path) {
      this.selectedFolder = this.selectedFolder.filter((s) => s != path);
    },
    addNew(command) {
      let current_node = this.$refs.tree.getCurrentNode();
      if (!current_node) {
        this.$message.warning("Please select folder");
        return;
      }

      if (command == "file") {
        this.file_uploader = true;
      }
      if (command == "folder") {
        this.$prompt("Please input new folder name").then(async ({ value }) => {
          let { data } = await this.$vx.post("FileManager/createFolder", {
            path: this.selectedPath + "/" + value,
          });

          this.$refs.tree.append(data, this.$refs.tree.getCurrentNode());
          await this.reloadContent();
        });
      }
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        /*       let { data } = await this.$vx.get("FileManager/listDirectory", {
          params: {
            path: this.base,
          },
        });
        console.log(data); */

        resolve([
          {
            label: "My storage",
            path: this.base,
          },
        ]);

        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.base);
        });

        return;
      }

      let { data } = await this.$vx.get("FileManager/listDirectory", {
        params: {
          path: node.data.path,
        },
      });

      return resolve(data);
    },
    handleNodeClick(data) {
      this.type = null;
      this.selectedPath = data.path;
      this.selectedNode = data;
      this.selectedFolder = [];
    },
    async reloadContent() {
      this.file_uploader = false;
      this.selectedFolder = [];
      this.selectedFile = [];

      if (this.type) {
        if (this.type == "recent") {
          let { data } = await this.$vx.get("FileManager/listRecentFiles", {
            params: {
              file_type: this.fileType,
            },
          });
          this.files = data;
          this.folders = [];

          return;
        }

        {
          let { data } = await this.$vx.get("FileManager/listFiles", {
            params: {
              path: this.base,
              type: this.type,
            },
          });
          if (data.error) {
            this.$message.error(data.error.message);
            return;
          }
          this.files = data;
          this.folders = [];
        }

        return;
      }
      this.files = [];
      this.folders = [];

      let { data } = await this.$vx.get("FileManager/listContents", {
        params: {
          path: this.selectedPath,
          file_type: this.fileType,
          search: this.search_text,
        },
      });

      this.parentPath = data.parent;
      this.files = data.files;
      this.folders = data.folders;
    },
    async deleteFile(file) {
      await this.$vx.post("FileManager/deleteFile", {
        path: file,
      });
      this.reloadContent();
    },
    async renameFile(data) {
      let resp = (await this.$vx.post("FileManager/renameFile", data)).data;
      if (resp.error) {
        this.$message.error(resp.error.message);
      } else {
        this.reloadContent();
      }
    },
    async duplicateFile(path) {
      await this.$vx.post("FileManager/duplicateFile", {
        path,
      });
      this.reloadContent();
    },
    async deleteFolder(path) {
      await this.$vx.post("FileManager/deleteFolder", {
        path,
      });
      this.reloadContent();
      this.$refs.tree.remove(path);
    },
    async renameFolder(data) {
      let newNode = (await this.$vx.post("FileManager/renameFolder", data))
        .data;
      this.reloadContent();
      this.$refs.tree.remove(data.path);
      this.$refs.tree.append(newNode, this.selectedNode);
    },
    async moveFolder(path, target) {
      let { data } = await this.$vx.post("FileManager/moveFolder", {
        path,
        target,
      });
      if (data.error) {
        this.$alert(data.error.message, { type: "error" });
      }
      this.reloadContent();
    },
  },
};
</script>
