<template>
    <v-layout row wrap class="tableLayout"  style="overflow-y: auto;">
        <v-flex>
            <v-data-table
                    :headers="headers"
                    :items="bookFilterList"
                    class="elevation-1"
                    no-data-text="No Data Exist"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.BorrowID }}</td>
                    <td class="text-xs-center">{{ props.item.bkID }}</td>
                    <td class="text-xs-center">{{ props.item.rdID }}</td>
                    <td class="text-xs-center">{{ props.item.bkCode }}</td>
                    <td class="text-xs-center">{{ props.item.bkName }}</td>
                    <td class="text-xs-center">{{ props.item.ldDateOut }}</td>
                    <td class="text-xs-center">{{ props.item.ldDateRetPlan }}</td>
                    <td class="text-xs-center">{{ props.item.ldOverMoney }}</td>

                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "user-borrow-info",
        computed:{
            userInfo(){
                return this.$store.state.userInfo
            }
        },
        data(){
            return({
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
                    {
                        text: '读者ID',
                        align: 'center',
                        sortable: true,
                        value: 'rdID',

                    },
                    {text: '图书编号', value: 'bkCode', align: 'center'},
                    {text: '书名', value: 'bkName', align: 'center'},
                    {text: '借出日期', value: 'ldDateOut', align: 'center'},
                    {text: '应还日期', value: 'ldDateRetPlan', align: 'center'},
                    {text: '逾期罚款', value: 'ldOverMoney', align: 'center'},
                ],
                bookFilterList: [
                    {
                        BorrowID:10001,
                        bkID: 10001,
                        rdID:1800001,
                        bkCode: 'bk12345',
                        bkName: 'BK_NAME',
                        bkAuthor: 'BOOK_AUTHOR',
                        ldDateOut: '2018-10-10',
                        ldDateRetPlan: '2018-11-10',
                        ldOverMoney: '1.1',
                        bkStatus: 1,
                    }
                ]
            })
        },
        created(){
            this.$store.dispatch('getLoginInfo')

            const options = {
                method: 'get',
                headers: {
                    'Accept': '*/*',
                },
                url: '/user/'+ this.userInfo.rdID,
                data: ''
            };
            this.$store.dispatch('setLoaderStatus', true);
            this.axios(options).then((res) => {
                if (res.data.error === 0) {
                    this.bookFilterList = res.data.userInfo.doNotReturnedBooks
                    console.log(this.bookFilterList)
                }
                this.$store.dispatch('setLoaderStatus', false);
            })
        },

    }
</script>

<style scoped>

</style>