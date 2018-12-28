<template>
    <v-layout row wrap class="tableLayout" :height="tableHeight" style="overflow-y: auto;height: 100%">
        <!--<v-flex lg3 xs3 sm3>-->
        <!--<v-avatar size="120px">-->
        <!--<img src="../assets/avatar/woman.png" height="200px"  alt="avatar">-->
        <!--</v-avatar>-->
        <!--</v-flex>-->
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height: 130px;line-height: 130px">
                <div style="width: 100%" class="align-center">
                    <v-avatar size="120px"
                              style="display: block;padding-top: 5px;line-height: 130px; margin: 0 auto">
                        <img :src="userInfo.rdPhoto" height="120px" alt="avatar">
                    </v-avatar>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户编号：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px">{{userInfo.rdID}}</p>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户姓名：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px">{{userInfo.rdName}}</p>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户性别：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px">{{userInfo.rdSex}}</p>
                </div>
            </div>
        </v-flex>

        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户类型：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px"
                       v-for="item in userTypeTable"
                       v-if="item.typeValue === userInfo.rdType"
                    >{{item.typeKey}}</p>
                </div>
            </div>
        </v-flex>

        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户状态：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px"
                       :class="{greenFont:userInfo.rdStatus==='有效',redFont:userInfo.rdStatus!=='有效'}">
                        {{userInfo.rdStatus}}
                    </p>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户部门：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px">{{userInfo.rdDept}}</p>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户手机：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px">{{userInfo.rdPhone}}</p>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">注册日期：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px">{{userInfo.rdDateReg}}</p>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">未还书数量：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px" class="redFont">{{userInfo.rdBorrowQty}}</p>
                </div>
            </div>
        </v-flex>

        <v-flex class="align-left" xs12>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户权限：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px"
                       v-for="item in userAdminRoleTable"
                       v-if="item.roleValue === userInfo.rdAdminRoles"
                    >{{item.roleKey}}</p>
                </div>
            </div>
        </v-flex>
        <v-flex class="align-left" xs11>
            <div class="text-sm-left tableWrap" style="height:50px;line-height: 50px">
                <div class="tableItemLeft">
                    <h3 style="font-weight: lighter">用户密码：</h3>
                </div>
                <div class="tableItemRight">
                    <p style="padding-left: 10px;padding-left: 10px">******</p>
                </div>
                <div style="">
                    <v-btn icon style="position: relative;top: -5px;" @click="changePwd()">
                        <v-icon size="15px" style="color:grey;">
                            fas fa-pen
                        </v-icon>
                    </v-btn>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "user-info",
        computed:{
            userTypeTable() {
                return this.$store.state.userTypeTable
            },
            userAdminRoleTable() {
                return this.$store.state.userAdminRoleTable
            },
            userStatusTable() {
                return this.$store.state.userStatusTable
            },
            userInfo(){
                return this.$store.state.userInfo
            },
        },
        data() {
            return ({
                tableHeight:null
                // userInfo: {
                //     rdID: 1800001,
                //     rdName: '张三',
                //     rdSex: '男',
                //     rdType: '教师',
                //     rdDept: '计算机科学学院',
                //     rdPhone: '13677277721',
                //     rdEmail: 'ghoulcn@vip.qq.com',
                //     rdDateReg: '2018-12-1 9:00:00',
                //     rdPhoto: '',
                //     rdStatus: '有效',
                //     rdBorrowQty: 1,
                //     rdAdminRole: 8,
                //
                // },
            })
        },
        methods: {
            changePwd() {
                this.$store.dispatch('setBindDialogContent',{
                    title:'修改登录密码',
                    rdInfo:this.userInfo
                })
                this.$store.dispatch('setBindDialog',true)
            }
        },

        mounted() {
            this.$store.dispatch('getLoginInfo')


        },
        updated(){
            const contain = document.querySelector('.VContent');
            const table = document.querySelector('.tableLayout');
            let fh = contain.offsetHeight - 100;
            table.style.height = fh + 'px';
            console.log(fh + 100,111);
            this.tableHeight = fh + 'px'
        }
    }
</script>

<style scoped>
    .tableWrap {
        padding-left: 35px;
        display: flex;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #e1e1e1;
    }

    .tableItemLeft {
        width: 100px;
        height: inherit;
        line-height: inherit
    }

    .tableItemRight {
        font-size: 15px;
        height: inherit;
        line-height: inherit;
        color: #25bdec;
    }

    .greenFont {
        color: #009900;
    }

    .redFont {
        color: red;
    }
</style>