<template>
    <div id="userCenter" grid-list-md style="height: 100%">
        <v-toolbar height="48px" color="white" flat style="border-bottom: 1px solid #ccc;">
            <v-toolbar-title>
                <v-icon size="20" style="padding-right: 10px">fas fa-home</v-icon>
                <span style="font-weight: lighter">读者中心</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-tabs fixed-tabs row align-with-title slot="extension" centered v-model="mod">
            <v-tab @click="changeUrl('info')">
                个人信息
            </v-tab>
            <v-tab @click="changeUrl('borrowinfo')">
                借阅详情
            </v-tab>
            <v-tab @click="changeUrl('booksearch')">
                书籍搜索
            </v-tab>
            <v-spacer></v-spacer>
        </v-tabs>
        <v-divider></v-divider>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "user-center",
        data() {
            return ({
                mod: this.$router.currentRoute.meta.id,
            })
        },
        methods: {
            changeUrl(path) {
                window.location.href = '/#/usercenter/' + path
            }
        },
        watch: {//当路由发生改变更新this.path
            '$route'(to, from) {
                this.path = this.$router.currentRoute.path;
                this.mod = this.$router.currentRoute.meta.id;
                console.log(this.mod)
            }
        },
    }
</script>

<style scoped>

</style>