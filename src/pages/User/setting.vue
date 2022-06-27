<template>
    <div>
        <q-splitter v-model="splitterModel">
            <template v-slot:before>
                <q-tabs v-model="tab" vertical>
                    <q-route-tab name="general" icon="mail" label="General" to="/User/setting/general" />
                    <q-route-tab name="information" icon="info" label="Information" to="/User/setting/information" />
                    <q-route-tab name="password" icon="password" label="Password" to="/User/setting/password" />
                    <q-route-tab name="style" icon="style" label="Style" to="/User/setting/style" />
                    <q-route-tab name="2fa" icon="movie" label="2FA" to="/User/setting/2fa" />
                    <q-route-tab name="bio" icon="movie" label="Bio" to="/User/setting/bio-auth" />
                </q-tabs>
            </template>

            <template v-slot:after>
                <router-view></router-view>
            </template>
        </q-splitter>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        return {
            tab: ref("mails"),
            splitterModel: ref("140px"),
        };
    },
};
</script>
