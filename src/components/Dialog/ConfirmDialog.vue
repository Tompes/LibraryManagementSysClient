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
                        class="red darken-1 "
                        style="font-size: 18px;color:#fff"
                >
                    <v-icon color="white" medium  style="padding-right: 10px">fas fa-exclamation-triangle</v-icon>
                    {{confirmDialogContent.title}}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="font-size: 16px">
                    {{confirmDialogContent.context}}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions justify-center>
                    <v-spacer></v-spacer>
                    <v-btn v-if="confirmDialogContent.rdID!==''"
                            color="error"
                            flat
                            @click="deleteUser(confirmDialogContent.rdID)"
                    >
                        确定删除用户{{confirmDialogContent.rdName}}
                    </v-btn>

                    <v-btn
                            color="primary"
                            flat
                            @click="dialog = false"
                    >
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    const dialog = {
        get() {
            return this.$store.state.confirmDialog;
        },
        set(value) {
            this.$store.dispatch('setConfirmDialog',value)
        },
    };
    export default {
        name: "confirm-dialog",
        computed:{
            confirmDialogContent(){
              return this.$store.state.confirmDialogContent
            },
            dialog,
        },
        methods:{
            ...mapActions({
                setConfirmDialog:'setConfirmDialog',
                setConfirmDialogContent:'setConfirmDialogContent',
            }),
            deleteUser(rdID){
                console.log('DELETE',rdID+100)
            },
        },
    }
</script>

<style scoped>

</style>