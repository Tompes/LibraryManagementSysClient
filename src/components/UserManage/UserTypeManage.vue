<template>
    <div class="userTypeManage">
        <v-dialog v-model.trim="createDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">新建用户类型</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="createForm" v-model.trim="createValid" lazy-validation>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 md4 sm6>
                                    <v-text-field
                                            label="类型编号（例:20）"
                                            type="number"
                                            v-model.trim="createData.rdType"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md4 sm6>
                                    <v-text-field
                                            label="类型名称（例:教师）"
                                            v-model.trim="createData.rdTypeName"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md4 sm6>
                                    <v-text-field
                                            label="可借书籍数量"
                                            type="number"
                                            v-model.trim="createData.CanLendQty"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="可借天数"
                                            type="number"
                                            v-model.trim="createData.CanLendDay"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="可续借次数"
                                            type="number"
                                            v-model.trim="createData.CanContinueTimes"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="罚款折扣率(0~1)"
                                            type="number"
                                            v-model.trim="createData.PunishRate"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="证件有效年数(0表示无限制)"
                                            type="number"
                                            v-model.trim="createData.DateValid"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="createDialog=false">关闭</v-btn>
                    <v-btn color="blue darken-1" flat @click="submitCreateDialog">新建类型</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model.trim="updateDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">修改信息</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model.trim="updateValid" lazy-validation>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 md4 sm6>
                                    <v-text-field
                                            label="类型编号"
                                            type="number"
                                            v-model.trim="updateData.rdType"
                                            disabled="disabled"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md4 sm6>
                                    <v-text-field
                                            label="类型名称"
                                            v-model.trim="updateData.rdTypeName"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md4 sm6>
                                    <v-text-field
                                            label="可借书籍数量"
                                            type="number"
                                            v-model.trim="updateData.CanLendQty"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="可借天数"
                                            type="number"
                                            v-model.trim="updateData.CanLendDay"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="可续借次数"
                                            type="number"
                                            v-model.trim="updateData.CanContinueTimes"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="罚款折扣率(0~1)"
                                            type="number"
                                            v-model.trim="updateData.PunishRate"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6 sm6>
                                    <v-text-field
                                            label="证件有效年数(0表示无限制)"
                                            type="number"
                                            v-model.trim="updateData.DateValid"
                                            :rules="rules.selectRules"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeUpdateDialog">关闭</v-btn>
                    <v-btn color="blue darken-1" flat @click="submitUpdateDialog">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout height="500px" style="overflow-y: auto;height: 400px">
            <v-flex>
                <v-data-table
                        :headers="headers"
                        :items="filterList"
                        class="elevation-1"
                        no-data-text="No Data Exist"
                        hide-actions
                        flat
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.rdType }}</td>
                        <td class="text-xs-center">{{ props.item.rdTypeName }}</td>
                        <td class="text-xs-center">{{ props.item.CanLendQty }}</td>
                        <td class="text-xs-center">{{ props.item.CanLendDay }}</td>
                        <td class="text-xs-center">{{ props.item.CanContinueTimes }}</td>
                        <td class="text-xs-center">{{ props.item.PunishRate }}</td>
                        <td class="text-xs-center">{{ props.item.DateValid }}</td>
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
                                    <v-list-tile @click="updateUserType(props.item)">
                                        <v-list-tile-title>修改</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex style="padding: 20px 100px">
                <v-btn block large @click="createDialog = true">
                    <v-icon size="16px" style="padding-right: 10px">fas fa-plus-circle</v-icon>
                    新建用户类型
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    // const userTypeTable = {
    //     get() {
    //         return this.$store.state.userTypeTable;
    //     },
    //     set(value) {
    //         this.$store.dispatch('setUserTypeTable',value)
    //     },
    // };
    export default {
        name: "user-type-manage",
        computed: {
            userTypeTable() {
                this.filterList = this.$store.state.userTypeTable;
                return this.$store.state.userTypeTable;
            },
            rules() {
                return this.$store.state.rules
            }
        },
        data() {
            return ({
                updateValid: true,
                createValid: true,
                updateDialog: false,
                createDialog: false,
                updateData: {},
                createData: {
                    rdType: null,
                    rdTypeName: null,
                    CanLendQty: null,
                    CanLendDay: null,
                    CanContinueTimes: null,
                    PunishRate: 0.05,
                    DateValid: 0
                },
                tempUpdateItem: {},
                tempCreateItem: {},
                headers: [
                    {
                        text: '类型编号',
                        align: 'center',
                        sortable: true,
                        value: 'rdType',

                    },
                    {text: '类型名称', value: 'rdTypeName', align: 'center'},
                    {text: '可借书数量', value: 'CanLendQty', align: 'center'},
                    {text: '可借书天数', value: 'CanLendDay', align: 'center'},
                    {text: '可续借次数', value: 'CanContinueTimes', align: 'center'},
                    {text: '罚款折扣率', value: 'PunishRate', align: 'center'},
                    {text: '证书有效期', value: 'DateValid', align: 'center'},
                    {text: '操作', value: 'handle', align: 'center'}
                ],
                filterList: []
            })
        },
        methods: {
            updateUserType(item) {
                this.updateDialog = true;
                this.updateData = item;
                for (let i in item) {
                    this.tempUpdateItem[i] = item[i]
                }
            },
            closeUpdateDialog(e) {
                // this.updateData = this.tempUpdateItem;
                for (let i in this.filterList) { //恢复数据
                    if (this.filterList[i].rdType === this.tempUpdateItem.rdType) {
                        for (let a in this.filterList[i]) {
                            this.filterList[i][a] = this.tempUpdateItem[a]
                        }
                    }
                }
                this.updateDialog = false
            },
            submitUpdateDialog(e) {
                if (this.$refs.form.validate()) {
                    let rdType = this.updateData.rdType;
                    let putData = this.updateData;
                    delete putData.typeKey;
                    delete putData.typeValue;
                    delete putData.rdType;
                    const options = {
                        method: 'put',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/usertype/' + rdType,
                        data: putData
                    };
                    this.$store.dispatch('setLoaderStatus', true);
                    this.axios(options).then((res) => {
                        if (res.data.error === 0) {
                            this.$store.dispatch('setAlertDialogContent', {
                                title: '修改成功',
                                context: '修改用户类型 “<span style="color: green">' + this.updateData.rdTypeName + '</span>”成功！'
                            });
                            this.$store.dispatch('setAlertDialog', true);
                            this.updateDialog = false;
                            this.$store.dispatch('setUserTypeTable');
                            setTimeout(() => {
                                this.filterList = this.$store.state.userTypeTable
                            }, 1000)

                        } else {
                            this.$store.dispatch('setAlertDialogContent', {
                                title: '修改失败',
                                context: '修改用户类型 “' + this.updateData.rdTypeName + '”失败！<br>请重试！'
                            });
                            this.$store.dispatch('setAlertDialog', true);
                        }
                        this.$store.dispatch('setLoaderStatus', false);
                    }).catch((err) => {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '修改失败',
                            context: '未知错误'
                        });
                        this.$store.dispatch('setAlertDialog', true);
                    })
                }
            },

            submitCreateDialog(e) {
                if (this.$refs.createForm.validate()) {
                    const options = {
                        method: 'post',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/usertype',
                        data: this.createData
                    };
                    this.$store.dispatch('setLoaderStatus', true);
                    this.axios(options).then((res) => {
                        if (res.data.error === 0) {
                            this.$store.dispatch('setAlertDialogContent', {
                                title: '创建成功',
                                context: '创建用户类型 “<span style="color: green">' + this.createData.rdTypeName + '</span>”成功！'
                            });
                            this.$store.dispatch('setAlertDialog', true);
                            this.createDialog = false;
                            this.$store.dispatch('setUserTypeTable');
                            setTimeout(() => {
                                this.filterList = this.$store.state.userTypeTable
                            }, 1000)

                        } else {
                            this.$store.dispatch('setAlertDialogContent', {
                                title: '创建失败',
                                context: '创建用户类型 “' + this.createData.rdTypeName + '”失败！<br>请重试！'
                            });
                            this.$store.dispatch('setAlertDialog', true);
                        }
                        this.$store.dispatch('setLoaderStatus', false);
                    }).catch((err) => {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '创建失败',
                            context: '未知错误'
                        });
                        this.$store.dispatch('setAlertDialog', true);
                        this.$store.dispatch('setLoaderStatus', false);
                    })
                }
            },
        },
        mounted() {
            this.$store.dispatch('getLoginInfo');
            this.$store.dispatch('setUserTypeTable');
            setTimeout(() => {
                this.filterList = this.$store.state.userTypeTable
            }, 1000)
        }
    }
</script>

<style scoped>

</style>