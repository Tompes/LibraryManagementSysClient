<template>
    <v-flex justify-top class="bookManageContain">
        <v-toolbar height="48px" color="white" flat style="border-bottom: 1px solid #ccc;">
            <v-toolbar-title class=".font-weight-thin">
                <v-icon size="20" style="padding-right: 10px">fas fa-retweet</v-icon>
                <span class=".font-weight-thin">借阅管理</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-tabs fixed-tabs row align-with-title slot="extension" centered v-model="mod">
            <v-tab @click="changeUrl('create')">
                图书借阅
            </v-tab>
            <v-tab @click="changeUrl('update')">
                图书续还
            </v-tab>

            <v-spacer></v-spacer>
        </v-tabs>
        <v-divider></v-divider>
        <router-view class="routeView" style="height: 100%"></router-view>
    </v-flex>
</template>

<script>
    export default {
        name: "borrow-manage",
        computed: {
            userInfo() {
                return this.$store.state.userInfo
            }
        },
        data() {
            return {
                drawer: null,
                mod: this.$router.currentRoute.meta.id,
            }
        },
        methods: {
            changeUrl(path) {
                window.location.href = '/#/borrowmanage/' + path
            }
        },
        created() {
            setTimeout(() => {
                if (this.userInfo.rdAdminRoles !== 8 && this.userInfo.rdAdminRoles !== 4) {
                    window.location.href = '/#/'
                }
            }, 1000);

        },
        watch: {//当路由发生改变更新this.path
            '$route'(to, from) {
                this.path = this.$router.currentRoute.path;
                this.mod = this.$router.currentRoute.meta.id;
                console.log(this.path)
            }
        },

    }
</script>

<style scoped>

</style>