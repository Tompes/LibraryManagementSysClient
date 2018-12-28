import axios from 'axios'
axios.defaults.withCredentials=true;

const actions = {
    setLoaderStatus(state,payload){
        state.commit('setLoaderStatus', payload)
    },
    setAlertDialog(state, payload) {
        state.commit('setAlertDialog', payload)
    },
    setAlertDialogContent(state, payload) {
        state.commit('setAlertDialogContent', payload)
    },
    setConfirmDialog(state, payload) {
        state.commit('setConfirmDialog', payload)
    },
    setConfirmDialogContent(state, payload) {
        state.commit('setConfirmDialogContent', payload)
    },
    setBindDialog(state,payload){
        state.commit('setBindDialog',payload)
    },
    setBindDialogContent(state,payload){
        state.commit('setBindDialogContent',payload)
    },
    setLoginDialog(state,payload){
        state.commit ('setLoginDialog',payload)
    },
    setUserInfo(state,payload){
        state.commit('setUserInfo',payload)
    },
    getLoginInfo(state){
        const options = {
            method: 'get',
            headers: {
                'Accept': '*/*',
            },
            url: '/login',
            data: ''
        };
        axios(options).then(function (res) {
            if (res.data.error===0) {
                const data  = res.data.userInfo;
                console.log(data)
                state.commit('setUserInfo',data)
            }else {
                window.location.href = '/#/login'
            }
        })
    },
    setUserTypeTable(state){
        const options = {
            method: 'get',
            headers: {
                'Accept': '*/*',
            },
            url: '/usertype',
            data: ''
        };
        state.dispatch('setLoaderStatus', true);
        axios(options).then(function (res) {
            if (res.data.error===0) {
                const data  = res.data.typeList;
                state.commit('setUserTypeTable',data)
            }else {
                window.location.href = '/#/login'
            }
            state.dispatch('setLoaderStatus', false);
        })
    }

};

export default actions