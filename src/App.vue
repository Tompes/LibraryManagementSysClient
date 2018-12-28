<template>

    <v-app id="app" light>
        <resist-wrap :visible="loading"></resist-wrap>
        <Login></Login>
        <alert-dialog></alert-dialog>
        <confirm-dialog></confirm-dialog>
        <bind-dialog></bind-dialog>
        <v-navigation-drawer
                v-model="drawer"
                clipped
                fixed
                app
        >

            <v-list dense>
                <v-list-tile href="/#/usercenter" ripple>
                    <v-list-tile-action>
                        <v-icon size="16">fas fa-home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>读者中心</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile href="/#/usermanage" ripple v-if="userInfo.rdAdminRoles===8">
                    <v-list-tile-action>
                        <v-icon size="16">fas fa-address-card</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>用户管理</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile href="/#/bookmanage" ripple
                             v-if="userInfo.rdAdminRoles===8||userInfo.rdAdminRoles===2"
                >
                    <v-list-tile-action>
                        <v-icon size="16">fas fa-book-open</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>图书管理</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile href="/#/borrowmanage" ripple
                             v-if="userInfo.rdAdminRoles===8||userInfo.rdAdminRoles===1"
                             style="padding-bottom: 10px"
                >
                    <v-list-tile-action>
                        <v-icon size="16">fas fa-retweet</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>借阅管理</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!--<v-divider ></v-divider>-->
                <!--<v-list-tile @click="quit" ripple >-->
                <!--<v-list-tile-action>-->
                <!--<v-icon size="16">fas fa-sign-out-alt</v-icon>-->
                <!--</v-list-tile-action>-->
                <!--<v-list-tile-content >-->
                <!--<v-list-tile-title >退出登录</v-list-tile-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="VToolBar" app flat clipped-left color="amber">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>图书管理系统</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn @click="quit" flat>
                <v-icon size="15px"> fas fa-sign-out-alt</v-icon>
                <span style="margin-left: 10px">退出登录</span>
            </v-btn>

        </v-toolbar>
        <v-content class="VContent" style="padding-top: 0;overflow: hidden;background-color: white;">
            <v-container fluid style="margin-top: 5px;padding: 0;overflow: hidden;">
                <router-view></router-view>
            </v-container>
        </v-content>

    </v-app>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ResistWrap from '@/components/ResistWrap'
    import AlertDialog from '@/components/Dialog/AlertDialog'
    import BindDialog from '@/components/Dialog/BindDialog'
    import ConfirmDialog from '@/components/Dialog/ConfirmDialog'
    import Login from '@/components/Dialog/LoginDialog'

    export default {
        name: 'App',
        components: {
            ResistWrap,
            AlertDialog,
            BindDialog,
            ConfirmDialog,
            Login,
        },
        computed: {
            loading() {
                return this.$store.state.loading
            },
            userInfo() {
                return this.$store.state.userInfo
            }
        },
        data() {
            return ({
                drawer: null
            })
        },
        methods: {
            changeUrl(path) {

            },
            quit() {
                document.cookie = '';
                this.axios.delete('/login');
                window.location.reload()
            }
        },
        beforeCreate() {

        },
        mounted() {
            this.$store.dispatch('setUserTypeTable')
            const html = document.querySelector('html');
            const header = document.querySelector('.VToolBar')
            const vcontent = document.querySelector('.VContent');
            let Cheight = html.offsetHeight;
            let Hheight = header.offsetHeight;
            vcontent.style.maxHeight = Cheight - Hheight + 'px';
            console.log(Cheight, Hheight, Cheight - Hheight);
        },
    }
</script>

<style>
    html {
        overflow-x: hidden;
        overflow-y: hidden;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
