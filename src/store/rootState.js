let state = {
    userInfo:{
        rdID:180001,
        rdName:'张三',
        rdSex: '男',
        rdType: 20,
        rdDept: '计算机科学学院',
        rdPhone: '13677277721',
        rdEmail: 'ghoulcn@vip.qq.com',
        rdDateReg: '2018-12-1 9:00:00',
        rdPhoto:'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAtsAAALnCAMAAABvFntMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2NTE1RUJGMEY3MDExMUU4QjIxQzhCODE0MEY0OUIzQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NTE1RUJFRkY3MDExMUU4QjIxQzhCODE0MEY0OUIzQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBJbGx1c3RyYXRvciBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InV1aWQ6NjY0ZGNkMzktMGE4OS00MGFmLTk3MmUtZWIzNDE3NWQ5ZWMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZBOEEwRTkzODZCRUU0MTE5QzNFQ0RCOTQ2Q0M5MDJCIi8+IDwvcmRmOkRlc2NyaXB0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',
        rdStatus: '有效',
        rdBorrowQty: 1,
        rdAdminRoles: 0,
    },
    // imagePlaceholder:',
    userStatusTable:[
        {'statusKey':'有效','statusValue':1},
        {'statusKey':'挂失','statusValue':2},
        {'statusKey':'注销','statusValue':0},
    ],
    userTypeTable: [
        {typeKey: '教师', typeValue: 10},
        {typeKey: '本科生', typeValue: 20},
        {typeKey: '专科生', typeValue: 21},
        {typeKey: '硕士研究生', typeValue: 30},
        {typeKey: '博士研究生', typeValue: 31},
    ],
    userAdminRoleTable:[
        {'roleKey':'读者','roleValue':0},
        // {'roleKey':'借书证管理员','roleValue':1},
        {'roleKey':'图书管理员','roleValue':2},
        {'roleKey':'借阅管理员','roleValue':4},
        {'roleKey':'系统管理员','roleValue':8},
    ],
    bookStatusTable:[
        {'statusKey':'借出','statusValue':0},
        {'statusKey':'在馆','statusValue':1},
        {'statusKey':'遗失','statusValue':2},
        {'statusKey':'变卖','statusValue':3},
        {'statusKey':'销毁','statusValue':4}
    ],
    bookLanguageTable:[
        {'languageKey':'中文','languageValue':0},
        {'languageKey':'英文','languageValue':1},
        {'languageKey':'日文','languageValue':2},
        {'languageKey':'俄文','languageValue':3},
        {'languageKey':'德文','languageValue':4},
        {'languageKey':'法文','languageValue':5}

    ],
    rules: {
        nameRules: [
            v => !!v || '名字不能为空！',
            v => (v && v.length <= 10) || '请输入正确的名字！'
        ],
        emailRules: [
            v => !!v || 'E-mail 不能为空！',
            v => /.+@.+/.test(v) || '请输入正确的邮箱！'
        ],
        selectRules: [
            v => (!!v||v===0) || '必选项不能为空！',
        ],
        deptRules: [
            v => !!v || '用户部门 不能为空！',
        ],
        phoneRules: [
            v => /^\d+$/.test(v) || '请输入正确的手机号！',
            v => (v && v.length === 11) || '请输入正确的手机号'
        ],
        pwdRules: [
            v => /^[a-z0-9A-Z!@#%&_*\-\[\]$(){}=^|;:?]/.test(v) || '密码可以为大于6位的数字英文与特殊字符的组合',
            v => (v && v.length >= 6) || '密码可以为大于6位的数字英文与特殊字符的组合'
        ],
        bookNameRules: [
            v => !!v || '书籍名不能为空！',
        ],

        bookCoverRules:[
            v => !!v || '不能为空！',
        ]
    },
    loading:false,
    loginDialog:false,
    alertDialog: false,
    alertDialogContent: {title: '', context: ''},
    confirmDialog:false,
    confirmDialogContent:{title:'',context:'',check:false,deleteCid:''},
    bindDialog: false,
    bindDialogContent: {title: '', rdInfo:{}},
};

export default state