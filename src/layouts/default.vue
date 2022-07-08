<script setup>
import VxMenu from "@/components/vx-menu.vue";
import VxCustomizer from "@/components/vx-customizer.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { $axios } from "@/lib";




const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
};
const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value;
};

</script>

<template>
    <q-layout view="hHh LpR lFr">
        <q-header bordered class="text-white" :class="headerColor">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title> {{ $vx.config.company }} </q-toolbar-title>

                <q-btn flat dense :label="currentLanguage">
                    <q-menu>
                        <q-list>
                            <q-item clickable v-close-popup v-for="language in languages" :key="language.value"
                                @click="onChangeLanguage(language.value)">
                                <q-item-section>
                                    <q-item-label>{{ language.name }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>

                <q-btn flat round dense icon="person">
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <q-item v-close-popup to="/User/profile">
                                <q-item-section>Profile</q-item-section>
                            </q-item>
                            <q-item v-close-popup to="/User/setting">
                                <q-item-section>Setting</q-item-section>
                            </q-item>

                            <q-item clickable v-for="(dd, index) in $vx.navbar.dropdown" :key="index" :to="dd.link">
                                <q-item-section v-text="dd.label"> </q-item-section>
                            </q-item>

                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section @click="logout()">Logout</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :mini="isMini" :mini-to-overlay="style.miniState"
            @mouseout="isMouseOnDrawer = false" @mouseover="isMouseOnDrawer = true" :width="250">
            <!-- drawer content -->
            <q-scroll-area class="fit">
                <q-list padding>
                    <VxMenu v-for="(m, index) in $vx.menus" :value="m" :key="index"></VxMenu>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
            <!-- drawer content -->

            <q-scroll-area class="fit">
                <VxCustomizer v-model:miniState="style.miniState" v-model:headerColor="headerColor"
                    v-model:theme="style.theme"></VxCustomizer>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <q-page padding>
                <q-toolbar>
                    <q-toolbar-title shrink>{{ title }}</q-toolbar-title>
                    <q-breadcrumbs>
                        <q-breadcrumbs-el label="Home" to="/" />
                        <q-breadcrumbs-el v-for="(breadcrumb, index) in breadcrumbs" :key="index"
                            :label="breadcrumb.label" :to="breadcrumb.to"></q-breadcrumbs-el>
                    </q-breadcrumbs>
                    <q-space></q-space>
                    <q-btn icon="refresh" dense flat ripple @click="reloadContent" />
                </q-toolbar>

                <router-view v-slot="{ Component }">
                    <template v-if="Component">
                        <suspense>
                            <component :is="Component"></component>
                            <template #fallback>
                                <div>
                                    Loading...
                                </div>
                            </template>
                        </suspense>
                    </template>
                </router-view>


                <!-- q-page-scroller
          position="bottom-right"
          :scroll-offset="150"
          :offset="[18, 18]"
        >
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller -->
            </q-page>
        </q-page-container>
    </q-layout>
</template>


<script>
export default {
    data() {
        return {
            style: {
                miniState: false,
                theme: "light"
            },
            isMini: false,
            headerColor: "",
            isMouseOnDrawer: false,

            title: "title",
            breadcrumbs: [{
                label: "label",
                to: "to"
            }],
            languages: []
        }
    },
    computed: {
        currentLanguage() {

            return this.$vx.language[this.$vx.locale];


        },
        isMini() {
            if (this.isMouseOnDrawer) {
                return false;
            }
            if (this.style.miniState) {
                return true;
            }
            return false;
        },
    },

    watch: {
        $route: function (to, from) {
            /*   this.title = to.meta.title;
              this.breadcrumbs = to.meta.breadcrumbs; */
            this.$vx.setRoute(to);

        },
        async "style.miniState"(val) {
            await $axios.patch("/User/setting/style", {
                mini: val
            })
        },
        async "style.theme"(val) {
            this.$vx.useDark(val == "dark");

            await this.$axios.patch("/User/setting/style", {
                theme: val
            });
        },
        async headerColor() {
            await $axios.patch("/User/setting/style", {
                color: this.headerColor
            })
        }
    },
    created() {
        this.style.miniState = this.$vx.style.mini;
        this.headerColor = this.$vx.style.color;
        this.style.theme = this.$vx.style.theme;
        this.$vx.useDark(this.$vx.style.theme == "dark");

        for (let lang in this.$vx.language) {
            this.languages.push({
                name: this.$vx.language[lang],
                value: lang
            })
        }
    },

    methods: {
        reloadContent() {
            this.$router.go();
        }, async onChangeLanguage(locale) {
            await this.$vx.patch("/User/setting", {
                language: locale
            });

            window.self.location.reload();

        }
    }
}
</script>