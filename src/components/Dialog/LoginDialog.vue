<template>
    <div class="text-xs-center loginWrap" v-if="dialog">
        <v-dialog
                v-model="dialog"
                width="500"
                lazy
                persistent
        >

            <v-layout align-center justify-center>
                <v-flex>
                    <v-card class="elevation-12">
                        <v-toolbar light color="amber">
                            <v-toolbar-title>用户登录</v-toolbar-title>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" v-model="valid">
                                <v-text-field
                                        prepend-icon="person"
                                        name="login"
                                        label="用户ID"
                                        type="number"
                                        v-model="loginData.username"
                                        :rules="rules.selectRules"
                                ></v-text-field>
                                <v-text-field
                                        id="password"
                                        prepend-icon="lock"
                                        name="password"
                                        label="用户密码"
                                        type="password"
                                        v-model="loginData.passwd"
                                        :rules="rules.pwdRules"
                                        @keydown.enter="submit"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="amber" @click="submit">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-dialog>
    </div>
</template>

<script>
    const dialog = {
        get() {
            return this.$store.state.loginDialog;
        },
        set(value) {
            this.$store.dispatch('setLoginDialog', value)
        },
    };
    export default {
        name: 'login',
        computed: {
            userStatusTable() {
                return this.$store.state.userStatusTable
            },
            rules() {
                return this.$store.state.rules
            },
            dialog,
        },
        data() {
            return ({
                valid: true,
                loginData: {
                    username: null,
                    passwd: null,
                },

            })
        },
        methods: {
            loginCorrect() {
                this.dialog = false;
                window.location.href = '/#/usercenter/info'
            },
            submit(e) {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('setLoaderStatus', true); //loading
                    const options = {
                        method: 'post',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/login',
                        data: this.loginData
                    };
                    this.axios(options).then((res) => {
                        const _self = this;
                        if (res.data.error === 0) {
                            let data = res.data.userInfo;
                            this.$store.dispatch('setUserInfo', data);
                            console.log(this.$store.state.userInfo);

                            this.$store.dispatch('setLoginDialog', false);
                            this.$store.dispatch('setLoaderStatus', false);
                            window.location.href = '/#/usercenter/info'
                        } else {
                            this.$store.dispatch('setAlertDialogContent', {
                                title: '错误信息',
                                context: res.data.msg || '用户名或密码格式错误'
                            });
                            this.$store.dispatch('setAlertDialog', true)
                        }
                        this.$store.dispatch('setLoaderStatus', false)
                    }).catch((error) => {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '错误信息',
                            context: error.response.data.msg || '用户名或密码格式错误'
                        });
                        this.$store.dispatch('setAlertDialog', true);
                        this.$store.dispatch('setLoaderStatus', false)
                    })
                }
            },
        },

        updated(){
            const html = document.querySelector('body');
            const wrap = document.querySelector('.loginWrap');
            wrap.style.height = html.offsetHeight + 1000 + 'px';
            console.log('hello', html.clientHeight, wrap.style.height)
        }
    }
</script>

<style scoped>
    .loginWrap {
        position: fixed;
        top: 0;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background: #f4f4f4
    }
    .v-overlay .v-overlay--active {
        background: white;
    }
</style>