<template>
    <div class="resist" v-if="visible">
        <v-progress-linear
                           class="myLiner"
                           height="7"
                           color="red lighten-1"
                           background-color="amber darken-3"
                           :indeterminate="true">

        </v-progress-linear>
    </div>
</template>

<script>
    export default {
        name: "resist-wrap",
        props:['visible'],
    }
</script>
<style scoped>
    .resist{
        height: 100%;
        width: 100%;
        background: rgba(255,255,255,0.5);
        position: fixed;
        top: 0;
        z-index: 100000000000000;
    }
    .myLiner{
        position: fixed;
        top: -15px;
    }
</style>