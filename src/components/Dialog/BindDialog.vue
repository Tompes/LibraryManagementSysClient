<template>
    <div class="text-xs-center" style="z-index: 1000000000">
        <v-dialog
                v-model="dialog"
                width="500"
                lazy
                persistent
        >
            <v-card>
                <v-card-title
                        class="amber "
                        style="font-size: 18px;color:#000;padding: 5px;padding-left: 10px;height: 65px"
                >
                    {{bindDialogContent.title}}
                    <v-spacer></v-spacer>
                    <v-btn
                            color="white"
                            flat
                            @click="clear"
                            style="height: 50px"
                            small
                    >
                        <v-icon >close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            :rules="rules.pwdRules"
                            label="用户密码"
                            required
                            type="password"
                            v-model="updateData.rdPwd"
                            prepend-icon="fas fa-lock"
                            style="width: 94%;padding-left: 3%"
                    ></v-text-field>
                    <v-card-actions style="">

                        <v-btn
                                color="amber"
                                block
                                @click="submit"
                        >
                            点击修改密码
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    const dialog = {
        get() {
            return this.$store.state.bindDialog;
        },
        set(value) {
            this.$store.dispatch('setBindDialog', value)
        },
    };
    export default {
        name: "bind-dialog",
        computed: {
            bindDialogContent() {
                return this.$store.state.bindDialogContent
            },
            rules(){
                return this.$store.state.rules
            },
            dialog
        },
        data() {
            return ({
                valid:true,
                updateData: {
                    rdPwd: ''
                }
            })
        },
        methods: {
            submit(e) {
                if (this.$refs.form.validate()) {
                    const options = {
                        method: 'put',
                        headers: {
                            'Accept': '*/*',
                        },
                        url: '/user/'+this.bindDialogContent.rdInfo.rdID,
                        data: this.updateData
                    };
                    this.$store.dispatch('setLoaderStatus',true);
                    this.axios(options).then((res) => {
                        if (res.data.error === 0) {
                            this.$store.dispatch('setLoaderStatus',false);
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'修改成功',
                                context:'修改用户 “'+this.bindDialogContent.rdInfo.rdID+'” 密码成功！'
                            });
                            this.$store.dispatch('setAlertDialog',true);
                            // this.updateData.rdID = this.bindDialogContent.deleteCid;
                            this.dialog = false //关闭窗口
                        }else {
                            this.$store.dispatch('setAlertDialogContent',{
                                title:'修改失败',
                                context:'修改用户 “'+this.bindDialogContent.rdInfo.rdID+'” 密码成功！'+'错误：'+(res.data.msg||JSON.stringify(res.data.message))
                            });
                            this.$store.dispatch('setAlertDialog',true);
                            // this.updateData.rdID = rdID;
                        }
                        this.$store.dispatch('setLoaderStatus',false);
                    })
                }
            },
            clear() {
                this.$refs.form.reset();
                this.dialog = false
            }
        },
    }
</script>

<style scoped>

</style>