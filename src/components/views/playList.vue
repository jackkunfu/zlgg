<template lang="pug">
div
    .table-ctn
        .page-title 用户管理
        //- .search-ctn
            el-button(type="success" @click="search") 查询
            el-button(type="success" @click="reset") 重置
        self-table(:keys="keys" :tableData="tableData" :total="total" :operates="operates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @del="del")

    .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            el-form(:model="editInfo" label-width="80px")
                el-form-item(label="应用编号")
                    el-input(v-model="editInfo.appCode")
                el-form-item(label="应用名称")
                    el-input(v-model="editInfo.appName")
                el-form-item(label="对接URL")
                    el-input(v-model="editInfo.appUrl")
                el-form-item(label="描述")
                    el-input(v-model="editInfo.remark")
                
                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消
    
</template>

<script>
export default {
    name: 'application',
    mixins: [tableManage],
    data () {
        return {
            keys: [
                { str: '用户编号', key: 'guid' },
                { str: '用户名', key: 'userCode' },
                { str: '姓名', key: 'userName' },
                { str: '手机号码', key: 'mobilephone' },
                { str: '所属单位', key: 'remark' },
                { str: '用户地址', key: 'address' }
            ],
            searchKeys: [],
            editKeys: ['userCode', 'userName', 'mobilephone', 'remark', 'address'],
            api: {
                list: { url: '/user/queryUser' },
                add: { url: '/application/addApp' },
                edit: { url: '/application/saveApp' },
                del: { url: '/user/deleteUser' }
            },
            operates: [
                { str: '新增', fun: 'add'},
                { str: '修改', fun: 'edit'},
                { str: '删除', fun: 'del'}
            ]
        }
    },
    mounted(){},
    methods: {
        changeSearchValue(info){
            info.operatorUserId = localStorage.zlOpUid || 43;
            return info;
        },
        testInput(){
            return true
        },
        changeEditValue(info){
            info.operatorUserId = localStorage.zlOpUid || 43;
            return info;
        },
        handleDelRow(item){
            return {
                guid: item.guid,
                operatorUserId: localStorage.zlOpUid || '43'
            }
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
