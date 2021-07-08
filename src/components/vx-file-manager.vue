<template>
  <div class="file-manager-application">
    <div class="content-area-wrapper vx-file-manager-content">
      <div class="sidebar-left">
        <div class="sidebar">
          <div class="sidebar-file-manager">
            <div class="sidebar-inner">
              <!-- sidebar menu links starts -->
              <!-- add file button -->
              <el-dropdown
                class="w-100 pl-2 pt-2 pr-2 mb-2"
                @command="addNew"
                trigger="click"
              >
                <el-button type="primary" class="w-100" :disabled="type != null">
                  Add New
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="folder">Folder</el-dropdown-item>
                  <el-dropdown-item command="file">File</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- add file button ends -->

              <!-- sidebar list items starts  -->
              <div class="sidebar-list" ref="sidebarList">
                <!-- links for file manager sidebar -->
                <el-tree
                  class="mb-2"
                  ref="tree"
                  lazy
                  :load="loadNode"
                  @node-click="handleNodeClick"
                  node-key="path"
                ></el-tree>
                <a
                  @click="listFiles('recent')"
                  href="javascript:void(0)"
                  class="list-group-item list-group-item-action"
                >
                  <i data-feather="clock" class="mr-50 font-medium-3"></i>
                  <span class="align-middle">Recents</span>
                </a>
                <div class="list-group list-group-labels">
                  <h6 class="section-label px-2 mb-1">Labels</h6>
                  <a
                    v-if="fileType == null"
                    @click="listFiles('document')"
                    href="javascript:void(0)"
                    class="list-group-item list-group-item-action"
                  >
                    <i data-feather="file-text" class="mr-50 font-medium-3"></i>
                    <span class="align-middle">Documents</span>
                  </a>
                  <a
                    v-if="fileType == null || fileType == 'image'"
                    @click="listFiles('image')"
                    href="javascript:void(0)"
                    class="list-group-item list-group-item-action"
                  >
                    <i data-feather="image" class="mr-50 font-medium-3"></i>
                    <span class="align-middle">Images</span>
                  </a>
                  <a
                    v-if="fileType == null"
                    @click="listFiles('video')"
                    href="javascript:void(0)"
                    class="list-group-item list-group-item-action"
                  >
                    <i data-feather="video" class="mr-50 font-medium-3"></i>
                    <span class="align-middle">Videos</span>
                  </a>
                  <a
                    v-if="fileType == null"
                    @click="listFiles('audio')"
                    href="javascript:void(0)"
                    class="list-group-item list-group-item-action"
                  >
                    <i data-feather="music" class="mr-50 font-medium-3"></i>
                    <span class="align-middle">Audio</span>
                  </a>
                  <a
                    v-if="fileType == null"
                    @click="listFiles('archive')"
                    href="javascript:void(0)"
                    class="list-group-item list-group-item-action"
                  >
                    <i data-feather="layers" class="mr-50 font-medium-3"></i>
                    <span class="align-middle">Archives</span>
                  </a>
                </div>
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
          <!-- file manager app content starts -->
          <div class="file-manager-main-content">
            <!-- search area start -->
            <div
              class="file-manager-content-header d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <!-- div
                  class="sidebar-toggle d-block d-xl-none float-left align-middle ml-1"
                >
                  <i data-feather="menu" class="font-medium-5"></i>
                </div>
                <div class="input-group input-group-merge shadow-none m-0 flex-grow-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text border-0">
                      <i data-feather="search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control files-filter border-0 bg-transparent"
                    placeholder="Search"
                  />
                </div-->
              </div>

              <div class="d-flex align-items-center">
                <el-button-group v-if="selectedFolder.length + selectedFile.length > 0">
                  <el-button class="el-icon-delete" @click="deleteSelected"></el-button>
                </el-button-group>

                <el-button-group>
                  <el-button
                    icon="el-icon-menu"
                    class="active"
                    @click="mode = 'grid'"
                  ></el-button>
                  <el-button @click="mode = 'list'"><i class="fa fa-list"></i></el-button>
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
                  :accept="accept"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">
                    Files with a size less than 10mb
                  </div>
                </el-upload>

                <el-divider></el-divider>
              </template>

              <!-- Folders Container Starts -->
              <div class="view-container" :class="mode == 'list' ? 'list-view' : ''">
                <h6 class="files-section-title mt-25 mb-75">Folders</h6>
                <div class="files-header">
                  <h6 class="font-weight-bold mb-0">Filename</h6>
                  <div>
                    <h6 class="font-weight-bold file-item-size d-inline-block mb-0">
                      Size
                    </h6>
                    <h6 class="font-weight-bold file-last-modified d-inline-block mb-0">
                      Last modified
                    </h6>
                    <h6 class="font-weight-bold d-inline-block mr-1 mb-0">Actions</h6>
                  </div>
                </div>
                <!-- div class="card file-manager-item folder level-up">
                  <div class="card-img-top file-logo-wrapper">
                    <div class="d-flex align-items-center justify-content-center w-100">
                      <i data-feather="arrow-up"></i>
                    </div>
                  </div>
                  <div class="card-body pl-2 pt-0 pb-1">
                    <div class="content-wrapper">
                      <p class="card-text file-name mb-0">...</p>
                    </div>
                  </div>
                </div -->

                <vx-file-manager-folder
                  v-for="(folder, index) in folders"
                  :key="index"
                  :folder="folder"
                  @delete="deleteFolder($event)"
                  @selected="selectFolder($event)"
                  @unselected="unselectFolder($event)"
                  @rename="renameFolder($event)"
                ></vx-file-manager-folder>

                <div
                  v-show="folders.length + files.length == 0"
                  class="flex-grow-1 align-items-center no-result mb-3"
                >
                  <i data-feather="alert-circle" class="mr-50"></i>
                  No Results
                </div>
              </div>
              <!-- /Folders Container Ends -->

              <!-- Files Container Starts -->
              <div class="view-container" :class="mode == 'list' ? 'list-view' : ''">
                <h6 class="files-section-title mt-2 mb-75">Files</h6>

                <vx-file-manager-file
                  v-for="f in files"
                  :key="f.path"
                  :file="f"
                  @delete="deleteFile($event)"
                  @rename="renameFile($event)"
                  @duplicate="duplicateFile($event)"
                  @selected="selectedFile.push($event)"
                  @unselected="selectedFile = selectedFile.filter((s) => s != $event)"
                  @input="inputFile($event)"
                ></vx-file-manager-file>
              </div>
              <!-- /Files Container Ends -->
            </div>
          </div>
          <!-- file manager app content ends -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vx-file-manager-content {
  height: calc(
    var(--vh, 1vh) * 100 - calc(calc(2rem * 2) + 4.45rem + 3.35rem + 1.3rem + 0rem)
  );
}
</style>

<script>
import "../assets/css/plugins/extensions/ext-component-tree.css";
import "../assets/css/pages/app-file-manager.css";
import PerfectScrollbar from "perfect-scrollbar";
import VxFileManagerFile from "./vx-file-manager-file.vue";
import VxFileManagerFolder from "./vx-file-manager-folder.vue";
import feather from "feather-icons";

export default {
  name: "vx-file-manager",
  components: {
    "vx-file-manager-file": VxFileManagerFile,
    "vx-file-manager-folder": VxFileManagerFolder,
  },
  props: {
    defaultAction: {
      default: "preview",
      type: String,
    },
    fileType: String,
    accept: String,
  },
  data() {
    return {
      selectedPath: "",
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
    };
  },
  created() {
    this.reloadContent();
    this.action = this.$vx.endpoint + "/FileManager/uploadFile";
    this.uploadHeaders = {
      Authorization: "Bearer " + this.$vx.access_token,
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
  methods: {
    //file clicked
    inputFile(path) {
      this.$emit("input", path);
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
      if (command == "file") {
        this.file_uploader = true;
      }
      if (command == "folder") {
        this.$prompt("Please input new folder name").then(async ({ value }) => {
          let data = (
            await this.$vx.post("FileManager/createFolder", {
              path: this.selectedPath + "/" + value,
            })
          ).data;
          this.$refs.tree.append(data, this.selectedNode);
          await this.reloadContent();
        });
      }
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        let resp = (await this.$vx.get("FileManager/listDirectory")).data;
        return resolve(resp);
      }

      let resp = (
        await this.$vx.get("FileManager/listDirectory", {
          params: {
            path: node.data.path,
          },
        })
      ).data;

      return resolve(resp);
    },
    handleNodeClick(data) {
      this.type = null;
      this.selectedPath = data.path;
      this.selectedNode = data;
      this.selectedFolder = [];
    },
    async reloadContent() {
      if (this.type) {
        if (this.type == "recent") {
          let data = (
            await this.$vx.get("FileManager/listRecentFiles", {
              params: {
                file_type: this.fileType,
              },
            })
          ).data;
          this.files = data;
          this.folders = [];

          return;
        }

        {
          let data = (
            await this.$vx.get("FileManager/listFiles", {
              params: {
                type: this.type,
              },
            })
          ).data;
          this.files = data;
          this.folders = [];
        }

        return;
      }
      this.files = [];
      this.folders = [];

      let data = (
        await this.$vx.get("FileManager/listContents", {
          params: {
            path: this.selectedPath,
            file_type: this.fileType,
          },
        })
      ).data;

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
      await this.$vx.post("FileManager/renameFile", data);
      this.reloadContent();
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
      let newNode = (await this.$vx.post("FileManager/renameFolder", data)).data;
      this.reloadContent();
      this.$refs.tree.remove(data.path);
      this.$refs.tree.append(newNode, this.selectedNode);
    },
  },
};
</script>
