<template>
    <v-form class="indentFromHere" ref="form" :height="fromHeight" style="overflow-y: auto;" v-model.trim="valid"
            lazy-validation>
        <v-layout wrap style="padding: 10px">
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">

                <v-text-field
                        label="图书名称"
                        prepend-icon="fas fa-file-signature"
                        v-model.trim="createData.bkName"
                        :rules="rules.bookNameRules"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        label="图书编号"
                        prepend-icon="fas fa-list-ol"
                        v-model.trim="createData.bkCode"
                        :rules="rules.selectRules"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        label="图书作者"
                        prepend-icon="fas fa-user"
                        v-model.trim="createData.bkAuthor"
                        :rules="rules.selectRules"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        label="图书出版社"
                        prepend-icon="fas fa-newspaper"
                        v-model.trim="createData.bkPress"
                        :rules="rules.selectRules"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        label="图书ISBN"
                        prepend-icon="fas fa-barcode"
                        v-model.trim="createData.bkISBN"
                        :rules="rules.selectRules"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        label="图书分类"
                        prepend-icon="fas fa-align-left"
                        v-model.trim="createData.bkCatalog"
                        :rules="rules.selectRules"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        v-model.trim="menu"
                        :nudge-right="40"
                        :return-value.sync="createData.bkDatePress"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                        required
                >
                    <v-text-field
                            slot="activator"
                            v-model.trim="createData.bkDatePress"
                            label="出版日期"
                            prepend-icon="event"
                            readonly
                            :rules="rules.selectRules"
                            required
                    ></v-text-field>
                    <v-date-picker v-model.trim="createData.bkDatePress" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">取消</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(createData.bkDatePress)">确定</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        label="图书价格"
                        type="number"
                        prepend-icon="fas fa-dollar-sign"
                        v-model.trim="createData.bkPrice"
                        :rules="rules.selectRules"
                        required
                ></v-text-field>

            </v-flex>
            <v-flex xs12 sm6 md4 style="padding-left: 20px;padding-right: 20px">
                <v-text-field
                        label="图书页数"
                        type="number"
                        prepend-icon="fas fa-paperclip"
                        v-model.trim="createData.bkPages"
                        :rules="rules.selectRules"
                        required
                ></v-text-field>

            </v-flex>

            <v-flex xs12 sm6 md6 style="padding-left: 20px;padding-right: 20px">
                <v-select
                        :items="bookLanguageTable"
                        item-text="languageKey"
                        item-value="languageValue"
                        v-model.trim="createData.bkLanguage"
                        :rules="rules.selectRules"
                        label="图书语言"
                        prepend-icon="fas fa-language"
                        required
                ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6
                    style="padding-left: 20px;padding-right: 20px"
            >
                <div class="v-input fileInput v-text-field v-text-field--placeholder v-input--is-label-active theme--light">
                    <div class="v-input__prepend-outer">
                        <div class="v-input__icon v-input__icon--prepend">
                            <i aria-hidden="true"
                               class="v-icon fas fa-image theme--light"
                            ></i>
                        </div>
                    </div>
                    <div class="v-input__control">
                        <div class="v-input__slot">
                            <div class="v-text-field__slot">
                                <label aria-hidden="true"
                                       class="v-label v-label--active theme--light"
                                       style="left: 0px; right: auto; position: absolute;"
                                >书籍封面</label>
                                <input
                                        aria-label="书籍封面"
                                        accept="image/*"
                                        return-object=""
                                        required="required"
                                        type="file"
                                        @input="convertToBase64"
                                        placeholder="test"
                                        ref="file"
                                >
                            </div>
                        </div>
                        <div class="v-text-field__details">
                            <div class="v-messages theme--light">
                                <div class="v-messages__wrapper"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<input type="file" @input="convertToBase64"  ref="file">-->
                <!--<v-text-field-->
                <!--type="file"-->
                <!--ref="file"-->
                <!--label="书籍封面"-->
                <!--placeholder="test"-->
                <!--prepend-icon="fas fa-image"-->
                <!--class="fileInput"-->
                <!--accept="image/*"-->
                <!--v-model.trim="imgURL"-->
                <!--@input="convertToBase64($event)"-->
                <!--return-object-->
                <!--:rules="rules.bookCoverRules"-->
                <!--required-->
                <!--&gt;</v-text-field>-->
            </v-flex>
            <v-flex xs12 style="margin-top: 5px;padding-left: 20px;padding-right: 20px">
                <v-textarea
                        counter
                        name="bkBrief"
                        label="书籍介绍"
                        hint="输入书籍简介"
                        persistent-hint
                        auto-grow
                        outline
                        v-model.trim="createData.bkBrief"
                        :rules="rules.selectRules"
                        required
                ></v-textarea>
            </v-flex>
            <v-flex xs12>
                <v-layout row class="align-center" style="margin: 0 auto;text-align: center">
                    <v-flex xs0 sm3 md3></v-flex>
                    <v-flex xs6 sm6 md3 style="padding-right: 10px" class="align-center">
                        <v-btn block @click="submit" color="amber" :disabled="!valid">
                            书籍入库
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
        name: "create-book",
        computed: {
            bookLanguageTable() {
                return this.$store.state.bookLanguageTable
            },
            rules() {
                return this.$store.state.rules
            },
        },
        data() {
            return ({
                createData: {
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
                    bkBrief: null,
                    bkCover: null,
                    bkStatus: 1
                },
                menu: false,
                valid: true,
                fromHeight: null,
            })
        },
        methods: {
            submit(e) {
                if (this.$refs.form.validate()) {
                    if (this.createData.bkCover === null||this.createData.bkCover===''){
                        this.createData.bkCover = '/static/assets/images/placeholder.jpg'
                    }
                    this.$store.dispatch('setLoaderStatus', true); //loading
                    const options = {
                        method: 'post',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/book',
                        data: this.createData
                    };
                    this.axios(options).then((res)=>{
                        if(res.data.error===0){
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'上架成功',
                                context:'新书《'+this.createData.bkName+'》上架成功！ ！'
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
                            context: error.response.data.msg || JSON.stringify(error.response.data.message)||'上架失败.'
                        });
                        this.$store.dispatch('setAlertDialog', true);
                        this.$store.dispatch('setLoaderStatus', false)
                    })
                }

            },
            clear() {
                this.$refs.form.reset()
            },
            convertToBase64(e) {
                const _self = this;
                const file = _self.$refs.file.files;
                // const file = e.target.files;
                let image = new Image();
                image.src = window.URL.createObjectURL(file[0]);

                image.onload = function () {
                    _self.createData.bkCover = _self.getBase64Image(image)
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
        mounted() {
            this.$store.dispatch('getLoginInfo')//TEST

            const contain = document.querySelector('.VContent');
            const form = document.querySelector('.indentFromHere');
            let fh = contain.offsetHeight - 100;
            form.style.maxHeight = fh + 'px';
            console.log(fh, contain.offsetHeight);
            this.fromHeight = fh + 'px'
        },
    }
</script>

<style>
    .indentFromHere {
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px
    }

    .fileInput .v-text-field__slot input {
        position: relative;
        top: -3px;

        color: #ccc;
    }
</style>