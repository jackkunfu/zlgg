<template lang="pug">
    el-col(style="padding:20px;")
        //- 操作
        //- el-row.operates(v-if="operates && operates.length>0")
            el-button(v-for="(op, i) in operates" size="small" :key="op.str" type="info"
                @click="operate(op.fun)") {{op.str}}

        //- 表格
        el-table(:data="tableData" @current-change="chooseRow" highlight-current-row)
            //- 暂时序号
            //- el-table-column(type="index" width="50")

            template(v-for="(item, i) in keys")
                //- 图片处理
                el-table-column(:prop="item.key" :label="item.str" v-if="item.type == 'img'")
                    template(slot-scope="scope")
                        img(:src="scope.row[item.key]" alt="" style="max-width:40px;max-height:40px;")

                //- 时间戳处理
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.type == 'time'")
                    template(slot-scope="scope")
                        span {{scope.row[item.key] | time}}

                //- 字符太长，部分省略处理
                el-table-column(:prop="item.key" :label="item.str"  v-else-if="item.type == 'els'")
                    template(slot-scope="scope")
                        span {{scope.row[item.key] | short}}

                //- 无需处理内容展示
                el-table-column(:prop="item.key" :label="item.str" v-else="")

            //- 操作
            el-table-column(label="操作" v-if="scopeOperates && scopeOperates.length>0" ref="operate")
                template(slot-scope="scope")
                    el-button(v-for="(op, i) in scopeOperates" type="success" size="small" :key="op.str"
                        @click="operate(op.fun, scope)") {{op.str}}

        el-pagination(v-if="hide!='hide'" layout="total, prev, pager, next, jumper" :total="total" :page-size="10"
            :current-page="currentPage" @current-change="handleCurrentChange" ref="page")

</template>

<script>
export default {
    name: 'tableComponent',
    props: ['keys', 'operates', 'selfApi', 'tableData', 'total', 'currentPage', 'tabOp', 'canOp', 'scopeOperates', 'hide'],
    data(){
        return{
            isCanOp: this.canOp
        }
    },
    mounted(){
        console.log('this.hide')
        console.log(this.hide)
    },
    methods: {
        operate(fun, scope){    // 操作
            // this.$emit(...arguments)
            this.$emit.apply(this, arguments)
        },
        handleCurrentChange(v){ // 页码更改
            this.$emit('changePage', v)
        },
        chooseRow(curItem, oldItem){
            this.$emit('chooseRow', curItem, oldItem)
        }
    },
    watch: {
        tabOp(v){
        //- console.log(this.$refs.del)
            //- v.forEach((el)=>{
            //-     this.$refs[el].$el.style.display = 'none';
            //- })
        }
    }

}
</script>

<style lang="sass" scoped>
.operates
    text-align: right;

.el-button
    margin-right: 10px;
    margin-bottom: 10px;
</style>