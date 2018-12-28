<template>
    <v-flex justify-top class="bookManageContain">
        <v-toolbar height="48px" color="white" flat style="border-bottom: 1px solid #ccc;">
            <v-toolbar-title class=".font-weight-thin">
                <v-icon size="20" style="padding-right: 10px">fas fa-book-open</v-icon>
                <span class=".font-weight-thin">图书管理</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-tabs fixed-tabs row align-with-title slot="extension" centered v-model="mod">
            <v-tab @click="changeUrl('create')">
                图书入库
            </v-tab>
            <v-tab @click="changeUrl('update')">
                图书变更
            </v-tab>

            <v-spacer></v-spacer>
        </v-tabs>
        <v-divider></v-divider>
        <router-view class="routeView"></router-view>
    </v-flex>
</template>

<script>
    export default {
        name: "book-manage",
        computed:{
            userInfo(){
                return this.$store.state.userInfo
            }
        },
        data() {
            return {
                drawer: null,
                mod:this.$router.currentRoute.meta.id,
            }
        },
        methods: {
            changeUrl(path){
                window.location.href='/#/bookmanage/'+path
            }
        },
        created(){
            setTimeout(()=>{
                if (this.userInfo.rdAdminRoles!==8&&this.userInfo.rdAdminRoles!==2){
                    window.location.href='/#/'
                }
            },1000)
        },
        watch: {//当路由发生改变更新this.path
            '$route'(to, from) {
                this.path = this.$router.currentRoute.path;
                this.mod  = this.$router.currentRoute.meta.id;
                console.log(this.path)
            }
        },
    }
</script>

<style scoped>

</style>