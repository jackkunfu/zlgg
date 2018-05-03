<template lang="pug">
div
    .main-top
        .tip
            | 广告 >> 媒体管理 >> 
            span 播出单管理

        .fr
            .gg-btn(@click="add(1)") 新建(新)
            .gg-btn(@click="add(0)") 新建(旧)
            .gg-btn.white(@click="") 下发
            .gg-btn.white(@click="del") 删除
    
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
            span 播出单名称
            input(autocomplete="off")

        .gg-input
            span 广告商
            input(autocomplete="off")

        .gg-input
            span 选择类型
            .select
                ul
                    li 1
                    li 11
                    li 111

    self-table(:keys="keys" :tableData="tableData" :total="total" :operates="operates"
        @changePage="changePage" @add="add" @edit="edit" @del="del")

    .fix-box(v-show="isView")
        .box.large
            .title
                span 授权电梯
                i.fr.el-icon-close(@click="isView=false;")
            .main(style="text-align:center;")
                .filter-box(:class="showFilter ? 'open' : ''")
                    .gg-input
                        span 播出单名称
                        input(autocomplete="off")

                    .gg-input
                        span 广告商
                        input(autocomplete="off")

                    .gg-input
                        span 播放开始时间
                        input(autocomplete="off")

                self-table(:keys="detailKeys" :tableData="detailTableData" :total="total" hidePage)
    
</template>

<script>
export default {
    name: 'playPlan',
    mixins: [ tableManage ],
    data () {
        return {
            showFilter: false,
            isView: true,
            detailTableData: [],
            keys: [
                { str: '播出单名称', key: 'guid' },
                { str: '更新时间', key: 'userCode' },
                { str: '类型', key: 'userName' },
                { str: '播出日期', key: 'mobilephone' },
                { str: '播出时间', key: 'remark' },
                { str: '广告商', key: 'address' },
                { str: '下发进度', key: 'address' },
                { str: '撤销下发', key: 'address' },
                // { str: '授权电梯', key: 'address' }
            ],
            detailKeys: [
                { str: '广告主', key: 'guid' },
                { str: '素材类型', key: 'userCode' },
                { str: '素材名称', key: 'userName' },
                { str: '所属播放单', key: 'mobilephone' },
                { str: '所属小区', key: 'mobilephone' },
                { str: '电梯名称', key: 'mobilephone' },
                { str: '播放次数', key: 'remark' },
                { str: '播放开始时间', key: 'address' },
                { str: '播放结束时间', key: 'address' },
                { str: '截屏图片', key: 'address' },
                { str: '截屏记录', key: 'address' }
            ],
            searchKeys: [],
            api: {
                list: { url: '/user/queryUser' },
                del: { url: '/user/deleteUser' }
            },
            scopeOperates: [
                { str: '预播', fun: 'view'},
                { str: '编辑', fun: 'editScope'}
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
