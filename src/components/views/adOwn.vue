<template lang="pug">
div
    .main-top
        .tip
            | 广告 >> 媒体管理 >> 
            span 广告主管理

        .fr
            .gg-btn(v-for="item in operates" @click="op(item.fun)") {{item.str}}
    
    .main-filter
        .fl
            | 筛选条件：
            span(:class="showFilter ? 'open' : ''" @click="showFilter=!showFilter;") 展开
                i.el-icon-caret-left

        .fr
            .ft-btn
                i.el-icon-search
                span 查询
            .ft-btn
                i.el-icon-refresh
                span 重置

    .filter-box(:class="showFilter ? 'open' : ''")
        .gg-input
            span 模糊搜索
            input(autocomplete="off")

    self-table(:keys="keys" :tableData="tableData" :total="total" :operates="operates"
        @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @del="del" @view="view")

    //- .fix-box(v-show="isView")
        .box
            .title
                span 11
                i.fr.el-icon-close(@click="isView=false;curViewImage=''")
            .main(style="text-align:center;")
    
</template>

<script>
export default {
    name: 'adOwn',
    mixins: [ tableManage ],
    data () {
        return {
            showFilter: false,
            detailTableData: [],
            keys: [
                { str: '广告商', key: 'guid' },
                { str: '企业名称', key: 'userCode' },
                { str: '企业地址', key: 'userName' },
                { str: '负责人', key: 'mobilephone' },
                { str: '联系电话', key: 'remark' }
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
                { str: '删除', fun: 'del'}
            ],
            scopeOperates: [
                // { str: '查看', fun: 'view'},
            ]
        }
        
    },
    mounted(){},
    methods: {
        async view(scope){     // 查看详情
            var res = this.ajax('', { id: scope.row.id });
            if(res && res.code == 200){
                this.detailTableData = res.data;
            }
        },
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
