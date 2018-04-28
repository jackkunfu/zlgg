<template lang="pug">
    .login
        el-form(:model="form" label-width="80px")
            el-form-item(label="用户名")
                el-input(v-model="form.userCode")
            el-form-item(label="密码")
                el-input(v-model="form.userPwsd")
            el-form-item
                el-button(type="primary" @click="onSubmit") 登录

        //- el-input(v-model="form.userCode")
        //- el-input(v-model="form.userPwsd")
        //- el-button(type="primary" @click="onSubmit") 登录
        
</template>

<script>
import md5 from 'md5'
import config from '../basic/config'
export default {
    name: 'login',
    data () {
        return {
            form: {
                userCode: '',
                userPwsd: ''
            }
        }
    },
    methods: {
        async onSubmit(){
            var form = this.form
            if(form.userCode.trim() == ''){
                return this.messageTip('用户名不能为空~');
            }
            if(form.userPwsd.trim() == ''){
                return this.messageTip('密码不能为空~');
            }
            var res = await this.ajax('/user/userLogin', JSON.stringify({
                userCode: form.userCode.trim(),
                // userPwsd: md5(form.userPwsd.trim())
                userPwsd: form.userPwsd.trim()
            }))
            
            if(res.code === 0){
                var data = res.data;
                localStorage.zlUserToken = data.token;
                localStorage.zlOpUesrInfo = data.userInfo;
                this.messageTip(res.message || '登录成功', 1)
                this.goUrl('/');
            }else this.messageTip(res.message || '登录失败，请稍后重试~')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.login
    width: 400px;
    margin: 200px auto;

</style>
