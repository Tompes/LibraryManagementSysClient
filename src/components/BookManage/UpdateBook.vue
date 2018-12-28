<template>
    <div class="updataBook">
        <v-layout row justify-center>
            <v-dialog v-model.trim="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">修改图书信息</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model.trim="valid" lazy-validation>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <div class="headerPic">
                                            <input type="file" @change="convertToBase64" class="imagePicker" ref="file">
                                            <img class="imageDisplay" :src="updateData.bkCover" width="180" height="210"
                                                 alt="">
                                        </div>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                    <v-flex xs12 sm6 md6>
                                        <v-layout wrap>
                                            <v-flex>
                                                <v-text-field
                                                        label="图书ID"
                                                        :value="updateData.bkID"
                                                        :disabled="true"
                                                        :rules="rules.selectRules"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex>
                                                <v-text-field
                                                        label="图书编码"
                                                        v-model.trim="updateData.bkCode"
                                                        :rules="rules.selectRules"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex>
                                                <v-text-field
                                                        label="图书名"
                                                        v-model.trim="updateData.bkName"
                                                        :rules="rules.selectRules"
                                                        required
                                                ></v-text-field>
                                            </v-flex>

                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                label="图书作者"
                                                v-model.trim="updateData.bkAuthor"
                                                :rules="rules.selectRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                label="出版社"
                                                v-model.trim="updateData.bkPress"
                                                :rules="rules.selectRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-menu
                                                ref="menu"
                                                :close-on-content-click="false"
                                                v-model.trim="menu"
                                                :nudge-right="40"
                                                :return-value.sync="updateData.bkDatePress"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                min-width="290px"
                                                required
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    v-model.trim="updateData.bkDatePress"
                                                    label="出版日期"
                                                    readonly
                                                    :rules="rules.selectRules"
                                                    required
                                            ></v-text-field>
                                            <v-date-picker v-model.trim="updateData.bkDatePress" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="menu = false">取消</v-btn>
                                                <v-btn flat color="primary"
                                                       @click="$refs.menu.save(updateData.bkDatePress)">确定
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                label="ISBN"
                                                v-model.trim="updateData.bkISBN"
                                                :rules="rules.selectRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                label="图书分类"
                                                v-model.trim="updateData.bkCatalog"
                                                :rules="rules.selectRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select
                                                :items="bookLanguageTable"
                                                item-text="languageKey"
                                                item-value="languageValue"
                                                v-model.trim="updateData.bkLanguage"
                                                :rules="rules.selectRules"
                                                label="图书语言"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                label="图书页数"
                                                type="number"
                                                v-model.trim="updateData.bkPages"
                                                :rules="rules.selectRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                                label="图书价格"
                                                type="number"
                                                v-model.trim="updateData.bkPrice"
                                                :rules="rules.selectRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select
                                                :items="bookStatusTable"
                                                item-text="statusKey"
                                                item-value="statusValue"
                                                v-model.trim="updateData.bkStatus"
                                                :rules="rules.selectRules"
                                                label="图书状态"
                                                required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 style="margin-top: 5px;">
                                        <v-textarea
                                                counter
                                                name="bkBrief"
                                                label="书籍介绍"
                                                hint="输入书籍简介"
                                                persistent-hint
                                                auto-grow
                                                outline
                                                v-model.trim="updateData.bkBrief"
                                                :rules="rules.selectRules"
                                                required
                                        ></v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">关闭</v-btn>
                        <v-btn color="blue darken-1" flat @click="submit">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

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
                                        <v-list-tile-title>修改书籍</v-list-tile-title>
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
    export default {
        name: "update-book",
        computed: {
            bookLanguageTable() {
                return this.$store.state.bookLanguageTable
            },
            bookStatusTable(){
                return this.$store.state.bookStatusTable
            },
            rules() {
                return this.$store.state.rules
            },
        },
        data() {
            return ({
                valid: true,
                dialog: false,
                menu: false,
                tableHeight: null,
                searchData: {
                    bkID: null,
                    bkISBN: '',
                    bkName: '',
                    bkCode: '',
                    bkAuthor: '',
                    bkCatalog:''
                },
                updateData: {
                    bkCode: null,
                    bkName: null,
                    bkAuthor: null,
                    bkPress: null,
                    bkDatePress: new Date().toISOString().substr(0, 10),
                    bkISBN: null,
                    bkCatalog: null,
                    bkLanguage: null,
                    bkPages: null,
                    bkPrice: null,
                    bkDateIn: null,
                    bkBrief: null,
                    bkCover: null,
                    bkStatus: 1
                },
                tempItem: {},
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
                    {text: '操作', value: 'handle', align: 'center'}
                ],
                filterList: [

                ],

            })
        },
        methods: {
            modifyBtn(item) {
                this.dialog = true;
                console.log(item);
                this.updateData = item;
                for (let i in item) {
                    this.tempItem[i] = item[i]
                }
            },
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
            close() {
                this.updateData = this.tempItem;
                for (let i in this.filterList) { //恢复数据
                    if (this.filterList[i].bkID === this.tempItem.bkID) {
                        for (let a in this.filterList[i]) {
                            this.filterList[i][a] = this.tempItem[a]
                        }
                    }
                }
                this.dialog = false
            },
            submit(e) {
                if (this.$refs.form.validate()) {
                    let bkID = this.updateData.bkID;
                    let bkDateIn = this.updateData.bkDateIn;
                    const alterData = this.updateData;
                    delete alterData.bkID;
                    delete alterData.bkDateIn;
                    const options = {
                        method: 'put',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/book/'+bkID,
                        data: alterData
                    };
                    this.$store.dispatch('setLoaderStatus',true);
                    this.axios(options).then((res) => {
                        if (res.data.error === 0) {
                            this.$store.dispatch('setLoaderStatus',false);
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'更新成功',
                                context:'更新书籍 '+bkID+':《'+this.updateData.bkName+'》 信息成功！'
                            });
                            this.$store.dispatch('setAlertDialog',true);
                            this.updateData.bkID = bkID;
                            this.updateData.bkDateIn = bkDateIn;
                            this.dialog = false //关闭窗口
                        }else {
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'更新失败',
                                context:'更新书籍 '+bkID+':《'+this.updateData.bkName+'》 信息失败！'+'错误：'+(res.data.msg||JSON.stringify(res.data.message))
                            });
                            this.$store.dispatch('setAlertDialog',true);
                            this.updateData.bkID = bkID;
                            this.updateData.bkDateIn = bkDateIn;
                        }
                        this.$store.dispatch('setLoaderStatus',false);
                    })
                }
            },
            convertToBase64(e) {
                const _self = this;
                const file = _self.$refs.file.files;
                // const file = e.target.files;
                let image = new Image();
                image.src = window.URL.createObjectURL(file[0]);

                image.onload = function () {
                    _self.updateData.bkCover = _self.getBase64Image(image)
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