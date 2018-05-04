export default {
    data(){
        return {
            editInfo: {},    //  编辑的数据对象
            searchInfo: {},    // 搜索数据对象
            tableData: [],    // 列表数据数组
            curPage: 1,    // 当前页,
            row: 10,      // 每页显示条数
            total: 0,    // 总条数
            curChooseRow: null,   // 当前选中列表中的项序号
            showEditCtn: false,    // 展示编辑框
            curOperateType: null,      //  1  新增    2  编辑
            distInfo: null      // 地址树点击选中的项的
        }
    },

    mounted(){
        // 初始化参数
        this.tableManageInit.call(this);
        // 请求列表
        this.tableList.call(this);
    },

    methods: {
        changePage(v, tableStr){    // 翻页
            this.pageChange.call(this, v, tableStr);
        },
        search(){    // 搜索
            this.tableSearch.call(this);
        },
        reset(){   // 重置
            this.tableSearchReset.call(this);
        },
        add(){   // 新增
            alert(1)
            this.curOperateType = 1;
            this.tableAdd.call(this);
        },
        edit(){   // 编辑
            this.curOperateType = 2
            this.tableEdit.call(this, arguments[0]);
        },
        del(){ // 删除
            this.tableDel.call(this, arguments[0]);
        },
        editScope(){   // 编辑(行内)
            this.curOperateType = 2
            this.tableEditScope.call(this, arguments[0]);
        },
        delScope(){ // 删除(行内)
            this.tableDelScope.call(this, arguments[0]);
        },
        addOrUpdate(){   //  新增 编辑确认提交
            this.tableAddOrUpdate.call(this);
        },
        editCancel(){   // 新增 编辑 取消按钮
            this.curOperateType = null
            this.showEditCtn = false;

            // 处理 this.editInfo 各个值双向绑定
            if(this.editKeys && this.editKeys.length > 0){
                this.editKeys.forEach( v => {
                    this.$set(this.editInfo, v, '')
                })
            }
        },
        chooseRow(curItem, oldItem){   //  点击列表某一行
            this.curChooseRow = curItem
        },
        upfile(){   // 上传文件
            this.upfileProto.apply(this, arguments);
        },
        op(funStr){    //  操作包装方法
            var args = Array.prototype.slice.call(arguments, 1);
            if(funStr && typeof this[funStr] == 'function') this[funStr](...args);
        }
    }
}