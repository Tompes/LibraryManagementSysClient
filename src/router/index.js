import Vue from 'vue'
import Router from 'vue-router'
import placeholder from '@/components/placeholder'
import UserCenter from '@/views/UserCenter'
import UserManage from '@/views/UserManage'
import BookManage from '@/views/BookManage'
import BorrowManage from '@/views/BorrowManage'
import LoginView from '@/views/LoginView'

import UserInfo from '@/components/UserCenter/UserInfo'
import UserBorrowInfo from '@/components/UserCenter/UserBorrowInfo'
import BookSearch from '@/components/UserCenter/BookSearch'
import CrateUser from '@/components/UserManage/CreateUser'
import UpdateUser from '@/components/UserManage/UpdateUser'
import UserTypeManage from '@/components/UserManage/UserTypeManage'
import CrateBook from '@/components/BookManage/CreateBook'
import UpdateBook from '@/components/BookManage/UpdateBook'
import CreateBorrow from '@/components/BorrowManage/CreateBorrow'
import UpdateBorrow from '@/components/BorrowManage/UpdateBorrow'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/', redirect: '/login'
        },
        {
            path:'/login', component: LoginView
        },
        {
            path:'/usercenter', redirect: '/usercenter/info'
        },
        {
            path: '/usermanage', redirect: '/usermanage/create',
        },
        {
            path: '/bookmanage', redirect: '/bookmanage/create',
        },
        {
            path: '/borrowmanage', redirect: '/borrowmanage/create',
        },
        {
            path: '/usercenter/:id', component: UserCenter,
            children: [
                // 当 /user/:id 匹配成功，
                // UserHome 会被渲染在 User 的 <router-view> 中
                {
                    path: '/usercenter/placeholder',
                    component: placeholder
                },
                {
                    path: '/usercenter/info',
                    meta:{
                        id:0
                    },
                    component: UserInfo
                },
                {
                    path: '/usercenter/borrowinfo',
                    meta:{
                        id:1
                    },
                    component: UserBorrowInfo
                },
                {
                    path: '/usercenter/booksearch',
                    meta:{
                        id:2
                    },
                    component: BookSearch
                },
                // ...其他子路由
            ]
        },
        {
            path: '/usermanage/:id', component: UserManage,
            children: [
                // 当 /user/:id 匹配成功，
                // UserHome 会被渲染在 User 的 <router-view> 中
                {
                    path: '/usermanage/placeholder',
                    component: placeholder
                },
                {
                    path: '/usermanage/create',
                    meta:{
                        id:0
                    },
                    component: CrateUser
                },
                {
                    path: '/usermanage/update',
                    meta:{
                        id:1
                    },
                    component: UpdateUser
                },
                {
                    path: '/usermanage/usertype',
                    meta:{
                        id:2
                    },
                    component: UserTypeManage
                },
                // ...其他子路由
            ]
        },
        {
            path: '/bookmanage/:id', component: BookManage,
            children: [
                // 当 /user/:id 匹配成功，
                // UserHome 会被渲染在 User 的 <router-view> 中
                {
                    path: '/bookmanage/placeholder',
                    component: placeholder
                },
                {
                    path: '/bookmanage/create',
                    meta:{
                        id:0
                    },
                    component: CrateBook
                },
                {
                    path: '/bookmanage/update',
                    meta:{
                        id:1
                    },
                    component: UpdateBook
                },
                // ...其他子路由
            ]
        },
        {
            path: '/borrowmanage/:id', component: BorrowManage,
            children: [
                // 当 /user/:id 匹配成功，
                // UserHome 会被渲染在 User 的 <router-view> 中
                {
                    path: '/borrowmanage/placeholder',
                    component: placeholder
                },
                {
                    path: '/borrowmanage/create',
                    meta:{
                        id:0
                    },
                    component: CreateBorrow
                },
                {
                    path: '/borrowmanage/update',
                    meta:{
                        id:1
                    },
                    component: UpdateBorrow
                },
                // ...其他子路由
            ]
        }
    ]
})
