<template lang="pug">
#app
    
    //- 左边导航
    .app-main(v-show="!isNeedLogin")
        .app-left
            .logo
                img(:src="logo")
            .user
                img(:src="userImage")
                .name 明达广告

            left

            .left-bottom
                .half(@click="isChangePwd=true;") 修改密码
                .half(@click="exit") 退出

        router-view.main
            
    //- 登录页
    .login(v-show="isNeedLogin")
        .gg-input
            span 用户名
            input(v-model="form.userCode" autocomplete="off")

        .gg-input
            span 密码
            input(v-model="form.password" type="password" autocomplete="off")

        .btn-ctn
            .gg-btn(@click="login") 登录
            
        //- el-form(:model="form" label-width="80px")
            el-form-item(label="用户名")
                el-input(v-model="form.userCode")
            el-form-item(label="密码")
                el-input(v-model="form.password" type="password")
            el-form-item
                el-button(type="primary" ) 登录

    .fix-box(v-show="isChangePwd")
        .box
            .title
                span 修改密码
                i.fr.el-icon-close(@click="isChangePwd=false;")
            .main(style="text-align:center;")
                .gg-input
                    span 旧密码
                    input(v-model="change.oldPwd" autocomplete="off")

                .gg-input
                    span 新密码
                    input(v-model="change.newPwd" type="password" autocomplete="off")

                .btn-ctn
                    .gg-btn(@click="changePwd") 提交修改

</template>

<script>
import './assets/base.sass'
import Left from './components/part/left'
export default {
    name: 'App',
    components: { Left },
    data(){
        return {
            logo: '',
            form: {
                userCode: '',
                password: ''
            },
            change: {
                oldPwd: '',
                newPwd: '',
                createOper: ''
            },
            isResLogin: false,   // 是否请求完毕
            isChangePwd: false,
            userImage: localStorage.zlOpUserInfo ? JSON.parse(localStorage.zlOpUserInfo).image : '',
            isNeedLogin: !localStorage.zlUserToken || localStorage.zlUserToken === 'null' || localStorage.zlUserToken === 'undefined'
        }
    },
    async mounted(){
        if(!this.isNeedLogin){
            // 获取菜单
            var res = await this.ajax('/getUserAuthMenu');
            console.log(res);
        }
    },
    methods: {
        async login(){
            var form = this.form;
            if(form.userCode.trim() == '') return this.messageTip('用户名不能为空')
            if(form.password.trim() == '') return this.messageTip('密码不能为空')

            if(this.isResLogin) return
            this.isResLogin = true;
            var res = await this.ajax('/login', {
                userCode: form.userCode.trim(),
                password: form.password.trim()
            });
            if(res.code === 900200){
                var data = res.data;
                localStorage.zlUserToken = data.token;
                localStorage.zlOpUesrInfo = JSON.stringify(data.userInfo);
                this.messageTip(res.msg || '登录成功', 1);
                this.isNeedLogin = false;
                this.goUrl('/index')
            }
            this.isResLogin = false;
        },
        async changePwd(){
            var res = await this.ajax('/modifyPassword', this.change);
        },
        async exit(){
            var res = await this.ajax('/loginOut');
            
            if(res && res.code == 900200){
                localStorage.zlUserToken = '';
                this.isNeedLogin = true;
                this.goUrl('/');
            }
        }
    }
}
</script>
