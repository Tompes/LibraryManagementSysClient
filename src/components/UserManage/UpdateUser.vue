<template>
    <div id="updateUser" style="height: inherit;">
        <v-dialog
                v-model.trim="confirmDialog"
                width="350"
                lazy
                persistent
        >
            <v-card>
                <v-card-title
                        class="red darken-1 "
                        style="font-size: 18px;color:#fff"
                >
                    <v-icon color="white" medium  style="padding-right: 10px">fas fa-exclamation-triangle</v-icon>
                    删除确认
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-size: 16px">
                    该操作不可逆， 确定删除用户 {{deleteData.rdID+' : '+deleteData.rdName}} 吗？
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions justify-center>
                    <v-spacer></v-spacer>
                    <v-btn
                           color="error"
                           flat
                           @click="deleteUser(deleteData.rdID)"
                    >
                        确认删除
                    </v-btn>

                    <v-btn
                            color="primary"
                            flat
                            @click="closeConfirm()"
                    >
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout row justify-center>
            <v-dialog v-model.trim="dialog" persistent max-width="650px">
                <v-card>
                    <v-card-title>
                        <span class="headline">修改用户信息</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model.trim="valid" lazy-validation>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <div class="headerPic">
                                            <input type="file" @change="convertToBase64" class="imagePicker" ref="file">
                                            <img class="imageDisplay" :src="updateData.rdPhoto" width="180" height="210"
                                                 alt="">
                                        </div>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                    <v-flex xs12 sm6 md6>
                                        <v-layout wrap>
                                            <v-flex>
                                                <v-text-field
                                                        label="用户ID"
                                                        :value="updateData.rdID"
                                                        :disabled="true"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex>
                                                <v-text-field
                                                        label="用户姓名"
                                                        hint="输入要修改的姓名"
                                                        v-model.trim="updateData.rdName"
                                                        :rules="rules.nameRules"
                                                        requried
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex>
                                                <v-text-field
                                                        label="用户部门"
                                                        hint="输入要修改的用户部门"
                                                        v-model.trim="updateData.rdDept"
                                                        :rules="rules.deptRules"
                                                        requried
                                                ></v-text-field>
                                            </v-flex>

                                        </v-layout>
                                    </v-flex>
                                    <!--<v-flex xs12 sm6 md4>-->

                                    <!--</v-flex>-->
                                    <!--<v-flex xs12 sm6 md4>-->

                                    <!--</v-flex>-->
                                    <!--<v-flex xs12 sm6 md4>-->

                                    <!--</v-flex>-->
                                    <!--<v-flex xs12 style="">-->
                                    <!--<v-radio-group-->
                                    <!--row-->
                                    <!--prepend-icon="fas fa-venus-mars"-->
                                    <!--@change="consolelog(registerInfo.rdSex)"-->
                                    <!--size="10px"-->

                                    <!--&gt;-->
                                    <!--<v-radio-->
                                    <!--label="男"-->
                                    <!--value="男"-->
                                    <!--style="padding-left: 20px"-->
                                    <!--&gt;</v-radio>-->
                                    <!--<v-radio-->
                                    <!--label="女"-->
                                    <!--value="女"-->
                                    <!--&gt;</v-radio>-->
                                    <!--</v-radio-group>-->
                                    <!--</v-flex>-->
                                    <v-flex xs12 sm6>
                                        <v-select
                                                :items="userTypeTable"
                                                item-text="typeKey"
                                                item-value="typeValue"
                                                v-model.trim="updateData.rdType"
                                                :rules="rules.selectRules"
                                                label="用户类型"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-select
                                                :items="userAdminRoleTable"
                                                item-text="roleKey"
                                                item-value="roleValue"
                                                v-model.trim="updateData.rdAdminRoles"
                                                :rules="rules.selectRules"
                                                label="用户权限"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-select
                                                :items="userStatusTable"
                                                item-text="statusKey"
                                                item-value="statusValue"
                                                v-model.trim="updateData.rdStatus"
                                                :rules="rules.selectRules"
                                                label="用户状态"
                                                required
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm6>
                                        <v-text-field
                                                label="手机号码"
                                                v-model.trim="updateData.rdPhone"
                                                :rules="rules.phoneRules"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-text-field
                                                label="电子邮箱"
                                                v-model.trim="updateData.rdEmail"
                                                :rules="rules.emailRules"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

        <div style="text-align: left;padding-left: 15px;padding-top: 10px">
            <h3 style="font-weight: lighter;">搜索用户:</h3>
        </div>
        <v-layout row fluid class="align-center d-flex" style="padding-top: 10px;overflow-y: auto">
            <v-flex lg1></v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="ID"
                        type="number"
                        v-model.trim="searchData.rdID"
                        placeholder="使用ID搜索"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="姓名"
                        v-model.trim="searchData.rdName"
                        placeholder="用姓名搜索"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="单位"
                        v-model.trim="searchData.rdDept"
                        placeholder="用单位名搜索"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-select
                        v-model.trim="searchData.rdType"
                        :items="userTypeTable"
                        item-text="typeKey"
                        item-value="typeValue"
                        persistent-hint
                        label="读者类别"
                ></v-select>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px;position: relative;top: -8px;">
                <v-btn @click="search" block color="amber">
                    查询
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="tableLayout" :height="tableHeight" style="overflow-y: auto;">
            <v-flex>
                <v-data-table
                        :headers="headers"
                        :items="filterList"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.rdID }}</td>
                        <td class="text-xs-center">{{ props.item.rdName }}</td>
                        <td class="text-xs-center">{{ props.item.rdSex }}</td>
                        <td class="text-xs-center"
                            v-for="types in userTypeTable"
                            v-if="types.typeValue === props.item.rdType">
                            {{ types.typeKey }}
                        </td>
                        <td class="text-xs-center">{{ props.item.rdDept }}</td>
                        <td class="text-xs-center"
                            v-for="status in userStatusTable"
                            v-if="status.statusValue===props.item.rdStatus">
                            {{ status.statusKey }}
                        </td>
                        <td class="text-xs-center">{{ props.item.rdPhone }}</td>
                        <td class="text-xs-center"
                            v-for="roles in userAdminRoleTable"
                            v-if="roles.roleValue===props.item.rdAdminRoles">
                            {{ roles.roleKey }}
                        </td>
                        <td class="text-xs-center">
                            <v-menu
                                    bottom
                                    origin="center center"
                                    transition="scale-transition"
                            >
                                <v-btn
                                        slot="activator"
                                        color="amber"
                                        dark
                                        flat
                                >
                                    <v-icon>more_vert</v-icon>
                                </v-btn>

                                <v-list>
                                    <v-list-tile @click="modifyBtn(props.item)">
                                        <v-list-tile-title>修改信息</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="changePwd(props.item)">
                                        <v-list-tile-title>修改密码</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="reissue(props.item)">
                                        <v-list-tile-title>补办借书证</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="openConfirm(props.item)">
                                        <v-list-tile-title style="color:red">删除用户</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "update-user",
        computed: {
            userTypeTable() {
                return this.$store.state.userTypeTable
            },
            userAdminRoleTable() {
                return this.$store.state.userAdminRoleTable
            },
            userStatusTable() {
                return this.$store.state.userStatusTable
            },
            rules() {
                return this.$store.state.rules
            },
        },
        data() {
            return ({
                dialog: false,
                confirmDialog:false,
                valid: true,
                tableHeight: null,
                tempTable: {},
                tempItem: {},
                searchData: {
                    rdID: null,
                    rdName: null,
                    rdType: null,
                    rdDept: null,
                },
                updateData: { //只是占位符，点击修改按钮后数据将会被覆盖
                    rdID: null,
                    rdName: null,
                    rdType: null,
                    rdDept: null,
                    rdPhone: null,
                    rdEmail: null,
                    rdPhoto: null,
                    rdStatus: null,
                    rdAdminRoles: null,
                },
                deleteData:{
                    rdID: null,
                    rdName: null,
                    rdType: null,
                    rdDept: null,
                    rdPhone: null,
                    rdEmail: null,
                    rdPhoto: null,
                    rdStatus: null,
                    rdAdminRoles: null,
                },
                pwdRules: [
                    v => /^[a-z0-9A-Z!@#%&_*\-\[\]$(){}=^|;:?]/.test(v) || '密码可以为大于6位的数字英文与特殊字符的组合',
                    v => (v.length > 6 || v === '' || v === null) || '密码可以为大于6位的数字英文与特殊字符的组合'
                ],
                headers: [
                    {
                        text: '读者ID',
                        align: 'center',
                        sortable: true,
                        value: 'rdID',

                    },
                    {text: '姓名', value: 'rdName', align: 'center'},
                    {text: '性别', value: 'rdSex', align: 'center'},
                    {text: '读者类别', value: 'rdType', align: 'center'},
                    {text: '读者部门', value: 'rdDept', align: 'center'},
                    {text: '读者状态', value: 'rdStatus', align: 'center'},
                    {text: '读者手机', value: 'rdPhone', align: 'center'},
                    {text: '权限', value: 'rdAdminRoles', align: 'center'},
                    {text: '操作', value: 'handle', align: 'center'}
                ],
                filterList: [


                ]
            })
        },
        methods: {
            ...mapActions({
                setBindDialog: 'setBindDialog',
                setBindDialogContent: 'setBindDialogContent',
                setAlertDialog: 'setAlertDialog',
                setAlertDialogContent: 'setAlertDialogContent',
                setConfirmDialog: 'setConfirmDialog',
                setConfirmDialogContent: 'setConfirmDialogContent'
            }),
            modifyBtn(item) {
                this.dialog = true;
                this.updateData = item;
                this.updateData.rdPwd = '';
                for (let i in item) {
                    this.tempItem[i] = item[i]
                }

            },
            close() {
                this.updateData = this.tempItem;
                for (let i in this.filterList) { //恢复数据
                    if (this.filterList[i].rdID === this.tempItem.rdID) {
                        for (let a in this.filterList[i]) {
                            this.filterList[i][a] = this.tempItem[a]
                        }
                    }
                }
                this.dialog = false
            },
            search(e){
                let searchDatas = '';
                for(let item in this.searchData){
                    if (this.searchData[item]!==''&&this.searchData[item]!==null){
                        searchDatas += item+'='+this.searchData[item]+'&'
                    }
                }
                if (JSON.stringify(searchDatas) === '{}'){
                    this.$store.dispatch('setAlertDialogContent',{
                        title:'提示信息',
                        context:'请输入查询值'
                    });
                    this.$store.dispatch('setAlertDialog',true);
                    return false
                }
                const options = {
                    method: 'get',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/userlist/search?'+searchDatas.substring(0,searchDatas.length-1),
                    data: searchDatas
                };
                this.$store.dispatch('setLoaderStatus',true);
                this.axios(options).then((res) => {
                    if (res.data.error === 0) {
                        this.$store.dispatch('setLoaderStatus', false);
                        let dataList = [];
                        for (let item in res.data.userList) {
                            let tmp = res.data.userList[item];
                            for (let status in this.userStatusTable) {
                                if (tmp.rdStatus === this.userStatusTable[status].statusKey) tmp.rdStatus = this.userStatusTable[status].statusValue
                            }
                            dataList.push(tmp)
                        }
                        this.filterList = dataList
                    } else {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '提示信息',
                            context: res.data.msg
                        });
                        this.$store.dispatch('setAlertDialog', true);
                    }
                    this.$store.dispatch('setLoaderStatus', false);
                })
                // }).catch((err)=>{
                //     this.$store.dispatch('setLoaderStatus',false);
                //     this.$store.dispatch('setAlertDialogContent',{
                //         title:'提示信息',
                //         context:'查询失败'
                //     });
                //     this.$store.dispatch('setAlertDialog',true);
                // })

            },
            submit(e) {
                if (this.$refs.form.validate()) {
                    // this.$store.dispatch('setLoaderStatus',true);
                    if(this.updateData.rdPwd === ''){
                        delete this.updateData.rdPwd
                    }
                    console.log(this.updateData);
                    let rdID = this.updateData.rdID;
                    const alterData = this.updateData;
                    delete alterData.rdID;
                    delete alterData.rdDateReg;
                    delete alterData.rdBorrowQty;
                    const options = {
                        method: 'put',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/user/'+rdID,
                        data: alterData
                    };
                    this.$store.dispatch('setLoaderStatus',true);
                    this.axios(options).then((res) => {
                        if (res.data.error === 0) {
                            this.$store.dispatch('setLoaderStatus',false);
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'修改成功',
                                context:'修改用户 “'+rdID+'” 信息成功！'
                            });
                            this.$store.dispatch('setAlertDialog',true);
                            this.updateData.rdID = rdID;
                            this.dialog = false //关闭窗口
                        }else {
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'修改失败',
                                context:'修改用户 “'+rdID+'” 信息失败！'+'错误：'+(res.data.msg||JSON.stringify(res.data.message))
                            });
                            this.$store.dispatch('setAlertDialog',true);
                            this.updateData.rdID = rdID;
                        }
                        this.$store.dispatch('setLoaderStatus',false);
                    })
                }
            },
            changePwd(item) {
                this.setBindDialogContent({
                    title: '修改用户: ' + item.rdID + ' 密码',
                    rdInfo: item,
                });
                this.setBindDialog(true)

            },
            reissue(item){
                const rdID = item.rdID
                const options= {
                    method: 'post',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/reissue/'+rdID,
                };
                this.$store.dispatch('setLoaderStatus',true);
                this.axios(options).then((res)=>{
                    if (res.data.error===0){
                        this.$store.dispatch('setLoaderStatus',false);
                        this.$store.dispatch('setAlertDialogContent',{
                            title:'补办成功',
                            context:'补办用户 “'+item.rdName+'” 成功！请牢记新的读者ID：'+res.data.newRdID
                        });
                        this.$store.dispatch('setAlertDialog',true);
                        this.search()
                    }else {
                        this.$store.dispatch('setAlertDialogContent',{
                            title:'补办失败',
                            context:'补办用户 “'+item.rdName+'” 失败！'+'错误：'+(res.data.msg||JSON.stringify(res.data.message)||'补办失败！')
                        });
                        this.$store.dispatch('setAlertDialog',true);
                        this.$store.dispatch('setLoaderStatus',false);
                    }
                })
            },
            openConfirm(item){
                this.confirmDialog = true;
                this.deleteData = item;

            },
            closeConfirm(){
                this.confirmDialog = false
            },
            deleteUser(rdID){
                const options= {
                    method: 'delete',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/user/'+rdID,
                };
                this.$store.dispatch('setLoaderStatus',true);
                this.axios(options).then((res)=>{
                    if (res.data.error===0){
                        this.confirmDialog = false;
                        this.$store.dispatch('setLoaderStatus',false);
                        this.$store.dispatch('setAlertDialogContent',{
                            title:'删除成功',
                            context:'删除用户 “'+rdID+'” 信息成功！'
                        });
                        this.$store.dispatch('setAlertDialog',true);
                        this.search()
                    }else {
                        this.$store.dispatch('setAlertDialogContent',{
                            title:'删除失败',
                            context:'删除用户 “'+rdID+'” 失败！'+'错误：'+(res.data.msg||JSON.stringify(res.data.message))
                        });
                        this.$store.dispatch('setAlertDialog',true);
                        this.$store.dispatch('setLoaderStatus',false);
                    }
                })
                console.log(rdID)
            },
            convertToBase64(e) {
                const _self = this;
                const file = _self.$refs.file.files;
                // const file = e.target.files;
                let image = new Image();
                image.src = window.URL.createObjectURL(file[0]);

                image.onload = function () {
                    _self.updateData.rdPhoto = _self.getBase64Image(image)
                }
            },
            getBase64Image(img) {//图片转base64
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
                return canvas.toDataURL("image/" + ext);
            }

        },
        created() {
            this.tempTable = this.userTypeTable

        },
        mounted() {
            this.$store.dispatch('getLoginInfo');
            this.$store.dispatch('setUserTypeTable');

            const contain = document.querySelector('.VContent');
            const table = document.querySelector('.tableLayout');
            let fh = contain.offsetHeight - 230;
            table.style.height = fh + 'px';
            console.log(fh + 230);
            this.tableHeight = fh + 'px'
        }
    }
</script>

<style scoped>
    .imagePicker {
        display: block;
        height: 210px;
        width: 180px;
        opacity: 0;
        position: absolute;
        z-index: 10000;
    }

    .headerPic {
        position: relative;
        height: 210px;
        width: 180px;
        margin: 0 auto;
        border: 1px solid #f0f0f0
    }
</style>