<template>
    <div id="wrap"></div>
</template>

<script>
    export default {
        name: "login-view",
        created(){
            this.$store.dispatch('setLoginDialog',true);
            const options = {
                method: 'get',
                headers: {
                    'Accept': '*/*',
                },
                url: '/login',
                data: ''
            };
            this.axios(options).then((res) => {
                if (res.data.error === 0) {
                    this.$store.dispatch('setLoginDialog', false);
                    window.location.href = '/#/usercenter/info'
                }
            })

        },
        mounted(){
            const html = document.querySelector('body');
            const wrap = document.querySelector('#wrap');
            wrap.style.height = html.offsetHeight + 1000 + 'px'
            console.log('hello', html.clientHeight, wrap.style.height)
        },
        watch: {//当路由发生改变更新this.path
            '$route'(to, from) {
                const options = {
                    method: 'get',
                    headers: {
                        'Accept': '*/*',
                    },
                    url: '/login',
                    data: ''
                };
                this.axios(options).then((res) => {
                    if (res.data.error === 0) {
                        this.$store.dispatch('setLoginDialog', false);
                        window.location.href = '/#/usercenter/info'
                    }
                })
            }
        },
    }
</script>

<style scoped>
    #wrap {
        width: 100%;

    }
</style>