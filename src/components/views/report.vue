<template lang="pug">
div
    .main-top
        .tip
            | 广告 >> 统计报表 >> 
            span 播放统计
    
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
            span 素材名称
            input(autocomplete="off")

        .gg-input
            span 广告主
            input(autocomplete="off")

        .gg-input
            span 开始时间
            input(autocomplete="off")

        .gg-input
            span 结束时间
            input(autocomplete="off")


    self-table(:keys="keys" :tableData="tableData" :total="total" :operates="operates"
        @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @del="del" @view="view")

    .fix-box.large(v-show="isView")
        .box
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
                { str: '广告主', key: 'guid' },
                { str: '素材类型', key: 'userCode' },
                { str: '素材名称', key: 'userName' },
                { str: '总播放次数', key: 'mobilephone' },
                { str: '播放单个数', key: 'remark' },
                { str: '播放开始时间', key: 'address' },
                { str: '播放结束时间', key: 'address' },
                { str: '授权电梯', key: 'address' }
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
                { str: '查看', fun: 'view'},
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
