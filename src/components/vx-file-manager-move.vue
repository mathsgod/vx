<template>
  <q-menu
    transition-show="jump-down"
    transition-hide="jump-up"
    ref="menu"
    @before-show="show"
  >
    <q-card>
      <q-toolbar>
        <q-btn flat dense round @click="clickBack()">
          <q-icon name="arrow_back" />
        </q-btn>
        <q-toolbar-title>
          <template v-if="mode == 'create'">
            <q-input outlined dense v-model="newFolder">
              <template v-slot:append>
                <q-btn round dense flat icon="add" @click="onClickCreate" />
              </template>
            </q-input>
          </template>

          <template v-else>
            {{ title }}
          </template>
        </q-toolbar-title>
      </q-toolbar>

      <template v-if="mode == 'empty folder'">
        <q-card-section> Empty folder</q-card-section>
      </template>

      <template v-if="mode == 'create'">
        <q-card-section> Create folder at "{{ selected }}" </q-card-section>
      </template>

      <template v-if="mode == 'move'">
        <q-list>
          <q-item
            v-for="(b, index) in folders"
            :key="index"
            clickable
            @click="selected = b.path"
            :active="selected === b.path"
          >
            <q-item-section>
              <q-icon name="o_folder"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ b.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                flat
                dense
                @click="
                  folder = b.path;
                  parent = b.parent;
                "
              >
                <q-icon name="o_navigate_next"></q-icon>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </template>

      <q-card-actions>
        <q-btn flat dense @click="mode = 'create'" :disable="mode == 'create'">
          <q-icon name="create_new_folder"></q-icon>
        </q-btn>
        <q-space></q-space>
        <q-btn
          dense
          label="Move to here"
          color="primary"
          v-if="mode == 'empty folder'"
        >
        </q-btn>
        <q-btn
          dense
          label="Move"
          color="primary"
          v-if="selected && mode == 'move'"
          @click="
            $refs.menu.hide();
            $emit('input:folder', selected);
          "
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-menu>
</template>

<script>
import { listContents } from "./file-manager.js";
import { createFolder } from "./file-manager.js";

export default {
  data() {
    return {
      selected: "/",
      folder: null,
      folders: [],
      parent: null,
      mode: "move",
      newFolder: null,
    };
  },
  watch: {
    async folder() {
      let { data } = await listContents(this.folder);
      this.folders = data.folders;

      if (this.folders.length == 0) {
        this.mode = "empty folder";
      }
    },
  },
  computed: {
    title() {
      if (this.folder) {
        return this.folder.split("/").pop();
      }
      return "";
    },
  },

  methods: {
    show() {
      this.folder = "/";
      this.mode = "move";
    },
    async onClickCreate() {
      let folder = this.selected + "/" + this.newFolder;
      await createFolder(folder);
      this.folder = folder;
    },
    clickBack() {
      if (this.mode == "create") {
        this.mode = "move";
        return;
      }

      this.folder = this.parent;

      console.log(this.folder);

      if (this.mode == "empty folder") {
        this.mode = "move";
        return;
      }
    },
  },
};
</script>