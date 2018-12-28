<template>
    <div id="updateBorrow">
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
                    收费确认
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-size: 16px">
                    该书借书超期，需要收取逾期费用 <span style="color:red;">{{confirmData.ldOverMoney}}</span> 元，请管理员收取费用后还书。
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions justify-center>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="error"
                            flat
                            @click="returnBook(confirmData);confirmDialog=false"
                    >
                        确认还书
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

        <v-dialog v-model.trim="dialog" persistent max-width="1100px">
            <v-card>
                <v-card-title>
                    <span class="headline" style="padding-left: 20px">续还书籍</span>
                </v-card-title>
                <v-card-text>
                    <v-layout>
                        <v-flex>
                            <v-data-table
                                    :headers="headers"
                                    :items="bookFilterList"
                                    class="elevation-1"
                                    hide-actions
                                    no-data-text="未有未还书籍"
                            >
                                <template slot="items" slot-scope="props">
                                    <td class="text-xs-center">{{ props.item.BorrowID }}</td>
                                    <td class="text-xs-center">{{ props.item.bkID }}</td>
                                    <td class="text-xs-center">{{ props.item.bkCode }}</td>
                                    <td class="text-xs-center">{{ props.item.bkName }}</td>
                                    <td class="text-xs-center">{{ props.item.ldDateOut }}</td>
                                    <td class="text-xs-center">{{ props.item.ldDateRetPlan }}</td>
                                    <td class="text-xs-center">{{ props.item.ldOverMoney }}</td>
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
                                            <v-list v-if="props.item.ldOverMoney>0">
                                                <v-list-tile @click="showConfirm(props.item)">
                                                    <v-list-tile-title>还书</v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                            <v-list v-if="props.item.ldOverMoney<=0">
                                                <v-list-tile @click="returnBook(props.item)">
                                                    <v-list-tile-title>还书</v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                            <v-list v-if="props.item.ldOverMoney<=0">
                                                <v-list-tile  @click="continueBook(props.item)">
                                                    <v-list-tile-title>续借</v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat
                           color="primary"
                           @click="dialog=false"
                    >
                        关闭对话
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout wrap class="justify-center"
                  style="position: relative;top: 100px;padding: 20px 10px 10px 10px;height: 100px;margin: auto 0;">
            <v-flex xs12 style="position: relative;top: -50px;">
                <h1 style="font-weight: lighter">续还入口</h1>
            </v-flex>
            <v-flex class="item" xs12 md7 sm7>
                <v-text-field
                        label="ID"
                        placeholder="输入读者ID"
                        type="number"
                        outline
                        v-model.trim="searchBorrowBookID"
                        append-icon="fas fa-search"
                        @keydown.enter="searchBorrowItem"
                ></v-text-field>
            </v-flex>
            <!--<v-flex class="item" xs12 md3 sm3 style="padding: 0 30px">-->
                <!--<v-btn -->
                       <!--style="height: 45px;"-->
                       <!--flat-->
                       <!--@click="searchBorrowItem"-->
                       <!---->
                <!--&gt;-->
                    <!--<v-icon>-->
                        <!---->
                    <!--</v-icon>-->
                <!--</v-btn>-->
            <!--</v-flex>-->

        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "book-return",
        computed: {
            userInfo(){
                return this.$store.state.userInfo
            },
            bookStatusTable() {
                return this.$store.state.bookStatusTable
            },
        },
        data() {
            return ({
                dialog: false,
                confirmDialog:false,
                searchBorrowBookID:null,
                confirmData:{},
                headers: [
                    {
                        text: '借阅ID',
                        align: 'center',
                        sortable: true,
                        value: 'BorrowID',

                    },
                    {
                        text: '图书ID',
                        align: 'center',
                        sortable: true,
                        value: 'bkID',

                    },
                    {text: '图书编号', value: 'bkCode', align: 'center'},
                    {text: '书名', value: 'bkName', align: 'center'},
                    {text: '借出日期', value: 'ldDateOut', align: 'center'},
                    {text: '应还日期', value: 'ldDateRetPlan', align: 'center'},
                    {text: '逾期罚款', value: 'ldOverMoney', align: 'center'},

                    {text: '操作', value: 'handle', align: 'center'}
                ],
                bookFilterList: [
                    // {
                    //     BorrowID:10001,
                    //     bkID: 10001,
                    //     rdID:1800001,
                    //     bkCode: 'bk12345',
                    //     bkName: 'BK_NAME',
                    //     bkAuthor: 'BOOK_AUTHOR',
                    //     ldDateOut: '2018-10-10',
                    //     ldDateRetPlan: '2018-11-10',
                    //     ldOverMoney: '1.1',
                    //     bkStatus: 1,
                    // }
                ]
            })
        },
        methods: {
            searchBorrowItem() {
                if (this.searchBorrowBookID === null || this.searchBorrowBookID === '') {
                    this.$store.dispatch('setAlertDialogContent', {
                        title: '参数错误',
                        context: '请输入正确的读者ID'
                    });
                    this.$store.dispatch('setAlertDialog', true);
                    return false
                }
                //TODO: AJAX
                //FILL_DATA_TO_FILTER_LIST
                const options = {
                    method: 'get',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/user/'+ this.searchBorrowBookID,
                    data: ''
                };
                this.$store.dispatch('setLoaderStatus', true);
                this.axios(options).then((res) => {
                    if (res.data.error === 0) {
                        this.bookFilterList = res.data.userInfo.doNotReturnedBooks;
                        this.dialog = true
                    }else {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '错误信息',
                            context: res.data.msg
                        });
                        this.$store.dispatch('setAlertDialog', true);
                    }
                    this.$store.dispatch('setLoaderStatus', false);
                })
                // this.dialog = true
            },
            showConfirm(item){
                this.confirmData = item;
                this.confirmDialog = true
            },
            closeConfirm(){
                this.confirmDialog = false
            },
            returnBook(item) {
                const options = {
                    method: 'delete',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/borrow/'+ item.BorrowID,
                    data: {
                        OperatorRet:this.userInfo.rdID
                    }
                };
                this.$store.dispatch('setLoaderStatus', true);
                this.axios(options).then((res) => {
                    if (res.data.error===0){
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '还书成功',
                            context: '书籍《'+item.bkName+'》还书成功！'
                        });
                        this.$store.dispatch('setAlertDialog', true);
                        this.searchBorrowItem()
                    }else {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '错误信息',
                            context: res.data.msg
                        });
                        this.$store.dispatch('setAlertDialog', true);
                    }
                    this.$store.dispatch('setLoaderStatus', false);
                })
            },
            continueBook(item) {
                const options = {
                    method: 'put',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/borrow/'+ item.BorrowID,
                    data: ''
                };
                this.$store.dispatch('setLoaderStatus', true);
                this.axios(options).then((res) => {
                    if (res.data.error===0){
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '续借成功',
                            context: '书籍《'+item.bkName+'》续借成功！<br>还书日期延长至:'+res.data.ldDateRetPlan
                                    +'。<br>剩余续借次数： <span style="color: red">'+res.data.remainCanContinueTime+'</span>'
                        });
                        this.$store.dispatch('setAlertDialog', true);
                        this.searchBorrowItem()
                    }else {
                        this.$store.dispatch('setAlertDialogContent', {
                            title: '错误信息',
                            context: res.data.msg
                        });
                        this.$store.dispatch('setAlertDialog', true);
                    }
                    this.$store.dispatch('setLoaderStatus', false);
                })
            },
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

</style>