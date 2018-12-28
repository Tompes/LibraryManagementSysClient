const mutations = {
    setLoaderStatus(state, payload) {
        state.loading = payload
    },
    setAlertDialog(state, payload) {
        state.alertDialog = payload
    },
    setAlertDialogContent(state, payload) {
        state.alertDialogContent = payload
    },
    setConfirmDialog(state, payload) {
        state.confirmDialog = payload
    },
    setConfirmDialogContent(state, payload) {
        state.confirmDialogContent = payload
    },
    setBindDialog(state, payload) {
        state.bindDialog = payload
    },
    setBindDialogContent(state, payload) {
        state.bindDialogContent = payload
    },
    setLoginDialog(state, payload) {
        state.loginDialog = payload
    },
    setUserInfo(state, payload) {
       state.userInfo = payload
    },
    setUserTypeTable(state,payload){
        state.userTypeTable = payload
    }
    
};

export default mutations