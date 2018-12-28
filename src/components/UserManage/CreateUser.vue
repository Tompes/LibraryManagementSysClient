<template>
    <v-form class="indentFrom" ref="form" :height="fromHeight" style="overflow-y: auto;" v-model.trim="valid"
            lazy-validation>
        <v-layout wrap style="padding: 10px">

            <v-flex xs12 sm6 md6 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        v-model.trim="registerInfo.rdName"
                        :rules="rules.nameRules"
                        :counter="20"
                        label="姓名"
                        required
                        prepend-icon="fas fa-frown-open"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        v-model.trim="registerInfo.rdDept"
                        :rules="rules.deptRules"
                        label="用户部门"
                        required

                        prepend-icon="fas fa-briefcase"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 style="padding-left: 20px;padding-right: 20px">
                <v-select
                        v-model.trim="registerInfo.rdType"
                        :items="userTypeTable"
                        item-text="typeKey"
                        item-value="typeValue"
                        persistent-hint
                        single-line
                        :rules="rules.selectRules"
                        label="读者类型"
                        required
                        prepend-icon="fas fa-users"
                ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6 style="padding-left: 20px;padding-right: 20px">
                <v-select
                        v-model.trim="registerInfo.rdAdminRoles"
                        :items="userAdminRoleTable"
                        item-text="roleKey"
                        item-value="roleValue"
                        persistent-hint
                        single-line
                        :rules="rules.selectRules"
                        label="读者权限"
                        required
                        prepend-icon="fas fa-users"
                ></v-select>
            </v-flex>
            <v-flex xs12 style="padding-left: 20px;padding-right: 20px">
                <v-radio-group
                        v-model.trim="registerInfo.rdSex"
                        row
                        prepend-icon="fas fa-venus-mars"
                        @change="consolelog(registerInfo.rdSex)"
                >
                    <v-radio
                            label="男"
                            value="男"
                            style="padding-left: 20px"
                    ></v-radio>
                    <v-radio
                            label="女"
                            value="女"
                    ></v-radio>
                </v-radio-group>
            </v-flex>

            <v-flex xs12 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        v-model.trim="registerInfo.rdEmail"
                        :rules="rules.emailRules"
                        label="电子邮箱"
                        required
                        prepend-icon="fas fa-envelope"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        v-model.trim="registerInfo.rdPhone"
                        :rules="rules.phoneRules"
                        label="手机号码"
                        required

                        prepend-icon="fas fa-phone"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        v-model.trim="registerInfo.rdPwd"
                        :rules="rules.pwdRules"
                        label="用户密码"
                        required
                        type="password"
                        prepend-icon="fas fa-lock"
                ></v-text-field>
            </v-flex>

            <v-flex>
                <v-layout row class="align-center" style="margin: 0 auto;text-align: center">
                    <v-flex xs0 sm3 md3></v-flex>
                    <v-flex xs6 sm6 md3 style="padding-right: 10px" class="align-center">
                        <v-btn block @click="submit" color="amber" :disabled="!valid">
                            新建用户
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 sm6 md3 style="padding-left: 10px" class="align-center">
                        <v-btn block @click="clear()">
                            清除
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

        </v-layout>
    </v-form>

</template>

<script>
    export default {
        name: "create-user",
        computed:{
            userTypeTable(){
                return this.$store.state.userTypeTable
            },
            userAdminRoleTable(){
                return this.$store.state.userAdminRoleTable
            },
            userStatusTable(){
                return this.$store.state.userStatusTable
            },
            rules(){
                return this.$store.state.rules
            },
        },
        data() {
            return ({
                dialog: false,
                valid: true,
                fromHeight: null,
                registerInfo: {
                    rdName: null,
                    rdSex: '男',
                    rdEmail: null,
                    rdType: null,
                    rdAdminRoles: null,
                    rdDept: null,
                    rdPhone: null,
                    // rdPhoto: '',
                    rdStatus: 1,
                    rdPwd: null,
                }
            })
        },
        methods: {
            consolelog(e) {
                console.log(e)
            },
            submit(e) {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('setLoaderStatus', true); //loading
                    const options = {
                        method: 'post',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/user',
                        data: this.registerInfo
                    };
                    this.axios(options).then((res)=>{
                        if(res.data.error===0){
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'创建成功！',
                                context:'创建用户’<span style="color: blue">'+this.registerInfo.rdName+'</span>’成功！<br> 请牢记您的读者编码：‘<span style="color: green">'+res.data.rdID+'</span>’ ！'
                            });
                            this.clear();
                            this.$store.dispatch('setAlertDialog',true);
                            this.$store.dispatch('setLoaderStatus', false); //loading
                        }else {
                            this.$store.dispatch('setAlertDialogContent', {
                                title: '错误信息',
                                context: res.data.msg || '创建失败.'
                            });
                            this.$store.dispatch('setAlertDialog', true);
                            this.$store.dispatch('setLoaderStatus', false)
                        }
                    }).catch((error) => {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '错误信息',
                            context: error.response.data.msg || JSON.stringify(error.response.data.message)||'创建失败.'
                        });
                        this.$store.dispatch('setAlertDialog', true);
                        this.$store.dispatch('setLoaderStatus', false)
                    })
                }
            },
            clear() {
                this.$refs.form.reset()
            }
        },
        mounted() {
            this.$store.dispatch('getLoginInfo');
            this.$store.dispatch('setUserTypeTable');

            const contain = document.querySelector('.VContent');
            const form = document.querySelector('.indentFrom');
            let fh = contain.offsetHeight - 100;
            form.style.height = fh + 'px';
            console.log(fh + 100);
            this.fromHeight = fh + 'px'
        },
    }
</script>

<style scoped>
    .indentFrom {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px
    }
</style>