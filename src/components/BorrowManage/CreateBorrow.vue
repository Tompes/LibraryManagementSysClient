<template>
    <div id="createBorrow">
        <v-layout row justify-center>
            <v-dialog v-model.trim="bookDialog" persistent max-width="1120px">
                <v-card>
                    <v-card-title>
                        <span class="headline" style="padding-left: 20px">借阅书籍</span>
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex>
                                <v-layout>
                                    <v-flex lg2 style="padding: 0 10px">
                                        <v-text-field
                                                label="bkID"
                                                placeholder="书籍ID"
                                                v-model.trim="searchBookData.bkID"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex lg2 style="padding: 0 10px">
                                        <v-text-field
                                                label="书籍名称"
                                                placeholder="书籍名称"
                                                v-model.trim="searchBookData.bkName"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg2 style="padding-left: 10px">
                                        <v-text-field
                                                label="编号"
                                                v-model.trim="searchBookData.bkCode"
                                                placeholder="书籍编号搜索"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg2 style="padding-left: 10px">
                                        <v-text-field
                                                label="作者"
                                                v-model.trim="searchBookData.bkAuthor"
                                                placeholder="作者搜索"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex lg2 style="padding-left: 10px">
                                        <v-text-field
                                                label="分类"
                                                v-model.trim="searchBookData.bkCatalog"
                                                placeholder="分类搜索 如：TP311"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex style="padding: 0 10px;padding-top: 2px">
                                        <v-btn @click="searchBook" block>
                                            查询书籍
                                        </v-btn>
                                    </v-flex>

                                </v-layout>
                            </v-flex>
                            <v-flex>
                                <v-layout row wrap class="tableLayout" style="overflow-y: auto;">
                                    <v-flex>
                                        <v-data-table
                                                :headers="bookHeaders"
                                                :items="bookFilterList"
                                                class="elevation-1"
                                                no-data-text="暂无数据"
                                        >
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-center">{{ props.item.bkID }}</td>
                                                <td class="text-xs-center">{{ props.item.bkCode }}</td>
                                                <td class="text-xs-center">{{ props.item.bkName }}</td>
                                                <td class="text-xs-center">{{ props.item.bkAuthor }}</td>
                                                <td class="text-xs-center">{{ props.item.bkDatePress }}</td>
                                                <td class="text-xs-center">{{ props.item.bkPress }}</td>
                                                <td class="text-xs-center">{{ props.item.bkCatalog }}</td>
                                                <td class="text-xs-center"
                                                    v-for="status in bookStatusTable"
                                                    v-if="status.statusValue===props.item.bkStatus">
                                                    {{ status.statusKey}}
                                                </td>
                                                <td class="text-xs-center">
                                                    <v-btn depressed
                                                           color="amber"
                                                           :disabled="props.item.bkStatus!==1"
                                                           @click="borrow(props.item)"
                                                    >
                                                        借阅
                                                    </v-btn>
                                                </td>

                                            </template>
                                        </v-data-table>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="bookDialog=false">关闭</v-btn>

                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model.trim="userDialog" persistent max-width="950px">
                <v-card>
                    <v-card-title>
                        <span class="headline" style="padding-left: 20px">读者信息</span>
                    </v-card-title>
                    <v-card-text>
                        <v-layout wrap class="cardLayout">
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-text-field
                                        label="用户ID"
                                        :value="userData.rdID"
                                        :disabled="true"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-text-field
                                        label="用户姓名"
                                        hint="输入要修改的姓名"
                                        v-model.trim="userData.rdName"
                                        :disabled="true"
                                        requried
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-text-field
                                        label="用户部门"
                                        hint="输入要修改的用户部门"
                                        v-model.trim="userData.rdDept"
                                        :disabled="true"
                                        requried
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-select
                                        :items="userTypeTable"
                                        item-text="typeKey"
                                        item-value="typeValue"
                                        v-model.trim="userData.rdType"
                                        label="用户类型"
                                        :disabled="true"
                                        required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-text-field
                                        label="可借书数量"
                                        v-model.trim="userData.CanLendQty"
                                        :disabled="true"
                                        requried
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-text-field
                                        label="未还书籍数量"
                                        v-model.trim="userData.rdBorrowQty"
                                        :disabled="true"
                                        class="font-red"
                                        requried
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-text-field
                                        label="手机号码"
                                        :disabled="true"
                                        :value="userData.rdPhone"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm3 md3 class="padding10px">
                                <v-select
                                        :items="userStatusTable"
                                        item-text="statusKey"
                                        item-value="statusValue"
                                        v-model.trim="userData.rdStatus"
                                        :disabled="true"
                                        label="用户状态"
                                        required
                                ></v-select>
                            </v-flex>

                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="userDialog=false">关闭</v-btn>
                        <v-btn color="blue darken-1" :disabled="userData.CanLendQty<=userData.rdBorrowQty" flat
                               @click="borrowDialog">借阅书籍
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-layout wrap class="justify-center"
                  style="position: relative;top: 100px;padding: 20px 10px 10px 10px;height: 100px;margin: auto 0;">
            <v-flex xs12 style="position: relative;top: -50px;">
                <h1 style="font-weight: lighter">借阅入口</h1>
            </v-flex>
            <v-flex class="item" xs12 md7 sm7>
                <v-text-field
                        label="ID"
                        placeholder="输入读者ID"
                        type="number"
                        outline
                        append-icon="fas fa-search"
                        v-model.trim="searchUserID"
                        @keydown.enter="searchUser"
                ></v-text-field>
            </v-flex>
            <!--<v-flex class="item" xs12 md3 sm3 style="padding: 0 30px">-->
                <!--<v-btn block-->
                       <!--style="height: 45px"-->
                       <!--@click="searchUser"-->
                <!--&gt;-->
                    <!--查询读者-->
                <!--</v-btn>-->
            <!--</v-flex>-->

        </v-layout>
    </div>

</template>

<script>
    export default {
        name: "create-borrow",
        computed: {
            userInfo() {
                return this.$store.state.userInfo
            },
            userTypeTable() {
                return this.$store.state.userTypeTable
            },
            userAdminRoleTable() {
                return this.$store.state.userAdminRoleTable
            },
            userStatusTable() {
                return this.$store.state.userStatusTable
            },
            bookLanguageTable() {
                return this.$store.state.bookLanguageTable
            },
            bookStatusTable() {
                return this.$store.state.bookStatusTable
            },
            rules() {
                return this.$store.state.rules
            },
        },
        data() {
            return ({
                userDialog: false,
                bookDialog: false,
                searchUserID: null,
                searchBookData: {
                    bkID: null,
                    bkISBN: '',
                    bkName: '',
                    bkCode: '',
                    bkAuthor: '',
                    bkCatalog: ''
                },
                userData: {},
                bookData: {},
                userHeaders: [
                    {
                        text: '借阅ID',
                        align: 'center',
                        sortable: true,
                        value: 'BorrowID',
                    },
                    {text: '图书ID', align: 'center', sortable: true, value: 'bkID'},
                    {text: '图书编号', value: 'bkCode', align: 'center'},
                    {text: '书名', value: 'bkName', align: 'center'},
                    {text: '作者', value: 'bkAuthor', align: 'center'},
                    {text: '借出时间', value: 'ldDateOut', align: 'center'},
                    {text: '应还时间', value: 'ldDateRetPlan', align: 'center'},
                    {text: '逾期罚款', value: 'ldOverMoney', align: 'center'},
                ],
                bookHeaders: [
                    {
                        text: '图书ID',
                        align: 'center',
                        sortable: true,
                        value: 'bkID',

                    },
                    {text: '图书编号', value: 'bkCode', align: 'center'},
                    {text: '书名', value: 'bkName', align: 'center'},
                    {text: '作者', value: 'bkAuthor', align: 'center'},
                    {text: '出版时间', value: 'bkDatePress', align: 'center'},
                    {text: '出版社', value: 'bkPress', align: 'center'},
                    {text: '图书分类', value: 'bkCatalog', align: 'center'},
                    {text: '图书状态', value: 'bkStatus', align: 'center'},
                    {text: '操作', value: 'handle', align: 'center'}
                ],
                userFilterList: [
                    {
                        BorrowID: 100001,
                        bkID: 100001,
                        bkCode: 'TEST_CODE',
                        bkName: 'BOOK_NAME',
                        bkAuthor: 'BOOK_AUTHOR',
                        ldDateOut: '2018-11-10',
                        ldDateRetPlan: '2018-12-10',
                        ldOverMoney: 0.00
                    },
                ],
                bookFilterList: []
            })
        },
        methods: {
            searchUser() {
                if (this.searchUserID === null || this.searchUserID === '') {
                    this.$store.dispatch('setAlertDialogContent', {
                        title: '参数错误',
                        context: '请输入正确的用户ID'
                    });
                    this.$store.dispatch('setAlertDialog', true)
                } else {
                    const options = {
                        method: 'get',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/user/' + this.searchUserID,
                    };
                    this.$store.dispatch('setLoaderStatus', true);
                    this.axios(options).then((res) => {
                        if (res.data.error === 0) {
                            this.userData = res.data.userInfo;
                            let rdStatus = 0;
                            for (let item in this.userStatusTable) {
                                if (this.userStatusTable[item].statusKey === res.data.userInfo.rdStatus) {
                                    rdStatus = this.userStatusTable[item].statusValue
                                }
                            }
                            this.userData.rdStatus = rdStatus;
                            this.userDialog = true;
                        } else {
                            this.$store.dispatch('setAlertDialogContent', {
                                title: '错误信息',
                                context: '查询失败！ ' + res.data.msg
                            });
                            this.$store.dispatch('setAlertDialog', true)
                        }
                        this.$store.dispatch('setLoaderStatus', false);
                    }).catch((err) => {
                        this.$store.dispatch('setLoaderStatus', false);
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '错误信息',
                            context: '未知错误！'
                        });
                        this.$store.dispatch('setAlertDialog', true)

                    });
                }
            },
            borrowDialog() {
                this.userDialog = false;
                this.bookDialog = true
            },
            searchBook() {
                let searchDatas = '';
                for (let item in this.searchBookData) {
                    if (this.searchBookData[item] !== '' && this.searchBookData[item] !== null) {
                        searchDatas += item + '=' + this.searchBookData[item] + '&'
                    }
                }
                console.log(searchDatas)
                if (JSON.stringify(this.searchBookData) === '{}' || searchDatas === '&') {
                    this.$store.dispatch('setAlertDialogContent', {
                        title: '提示信息',
                        context: '请输入查询值'
                    });
                    this.$store.dispatch('setAlertDialog', true);
                    return false
                }
                const options = {
                    method: 'get',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/booklist/search?' + searchDatas.substring(0, searchDatas.length - 1),
                    data: searchDatas
                };
                this.$store.dispatch('setLoaderStatus', true);
                this.axios(options).then((res) => {
                    if (res.data.error === 0) {
                        this.$store.dispatch('setLoaderStatus', false);
                        let dataList = [];
                        for (let item in res.data.bookList) {
                            let tmp = res.data.bookList[item];
                            for (let status in this.bookStatusTable) {
                                if (tmp.bkStatus === this.bookStatusTable[status].statusKey) tmp.bkStatus = this.bookStatusTable[status].statusValue
                            }
                            dataList.push(tmp)
                        }

                        this.bookFilterList = dataList
                    } else {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '提示信息',
                            context: res.data.msg
                        });
                        this.$store.dispatch('setAlertDialog', true);
                    }
                    this.$store.dispatch('setLoaderStatus', false);
                })
            },
            borrow(item) {
                const postData = {
                    bkID: item.bkID,
                    rdID: Number(this.searchUserID),
                    OperatorLend: this.userInfo.rdID
                };
                const options = {
                    method: 'post',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/borrow',
                    data: postData
                };
                this.$store.dispatch('setLoaderStatus', true);
                this.axios(options).then((res) => {
                    if (res.data.error === 0) {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '提示信息',
                            context: '用户 ' + res.data.rdID + '成功借出书籍：《' + res.data.bkName + '》! 还书日期:' + res.data.ldDateRetPlan
                        });
                        this.$store.dispatch('setAlertDialog', true);
                        this.searchBook();
                        this.bookDialog = false
                    } else {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '提示信息',
                            context: res.data.msg
                        });
                        this.$store.dispatch('setAlertDialog', true);
                    }
                    this.$store.dispatch('setLoaderStatus', false);
                })
            }
        },
        mounted() {
            this.$store.dispatch('getLoginInfo');

            const contain = document.querySelector('.VContent');
            const routerView = document.querySelector('.routeView');
            let fh = contain.offsetHeight - 100;
            routerView.style.height = fh + 'px';
        },
    }
</script>

<style scoped>
    .item {
        height: 100px;
    }

    .padding10px {
        padding: 0 10px;
    }

    .font-red {
        color: red !important;
    }


</style>