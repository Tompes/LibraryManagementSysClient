<template>
    <div class="bookSearch">
        <div style="text-align: left;padding-left: 15px;padding-top: 10px">
            <h3 style="font-weight: lighter;">搜索书籍:</h3>
        </div>
        <v-layout row fluid class="align-center " style="padding-top: 10px;overflow-y: auto">
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="bkID"
                        v-model="searchData.bkID"
                        placeholder="使用bkID搜索"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="书名"
                        v-model="searchData.bkName"
                        placeholder="书名搜索"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="编号"
                        v-model="searchData.bkCode"
                        placeholder="书籍编号搜索"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="作者"
                        v-model="searchData.bkAuthor"
                        placeholder="作者搜索"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px">
                <v-text-field
                        label="分类"
                        v-model="searchData.bkCatalog"
                        placeholder="分类搜索 如：TP311"
                ></v-text-field>
            </v-flex>
            <v-flex lg2 style="padding-left: 10px;position: relative;top: -8px;">
                <v-btn block color="amber" @click="search">
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

                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "book-search",
        computed:{
            bookStatusTable(){
                return this.$store.state.bookStatusTable;
            }
        },
        data(){
            return({
                tableHeight:null,
                searchData: {
                    bkID: null,
                    bkISBN: '',
                    bkName: '',
                    bkCode: '',
                    bkAuthor: '',
                    bkCatalog:''
                },
                headers: [
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
                ],
                filterList: [

                ],
            })
        },
        methods:{
            search(){
                let searchDatas = '';
                for(let item in this.searchData){
                    if (this.searchData[item]!==''&&this.searchData[item]!==null){
                        searchDatas += item+'='+this.searchData[item]+'&'
                    }
                }
                console.log(searchDatas)
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
                    url: '/booklist/search?'+searchDatas.substring(0,searchDatas.length-1),
                    data: searchDatas
                };
                this.$store.dispatch('setLoaderStatus',true);
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
            },
        },
        mounted() {
            this.$store.dispatch('getLoginInfo')

            const contain = document.querySelector('.VContent');
            const table = document.querySelector('.tableLayout');
            let fh = contain.offsetHeight - 230;
            table.style.height = fh + 'px';
            console.log(fh + 230);
            this.tableHeight = fh + 'px'
        },
    }
</script>

<style scoped>

</style>