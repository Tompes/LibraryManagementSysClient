<template>
    <div class="text-xs-center" style="z-index: 1000000000">
        <v-dialog
                v-model="dialog"
                width="365px"
                lazy
                persistent
        >
            <v-card>
                <v-card-title
                        class="amber darken-1 "
                        style="font-size: 18px;color:#000;text-align: center"
                >

                    {{alertDialogContent.title}}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-size: 16px" v-html="alertDialogContent.context">

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            flat
                            @click="dialog = false"
                    >
                        我知道了
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    const dialog = {
        get() {
            return this.$store.state.alertDialog;
        },
        set(value) {
            this.$store.dispatch('setAlertDialog',value)
        },
    };
    export default {
        name:'alert-dialog',
        computed:{
            alertDialogContent(){
                return this.$store.state.alertDialogContent
            },
            dialog,
        },
        data(){
            return ({

            })
        },

    }
</script>
<style>

</style>