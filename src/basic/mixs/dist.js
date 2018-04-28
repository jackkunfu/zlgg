// 地址选择处理
export default {
    data(){
        return {
            isShowDist: false,
            distInfo: null
        }
    },

    mounted(){},

    methods: {
        chooseDistOk(){   // 根据showEditCtn状态把distInfo绑定到editInfo或者searchInfo上
            var key = this.showEditCtn ? 'editInfo' : 'searchInfo';
            this[key].distInfo = this.distInfo

            this[key].address = this.distInfo.districtValue;   // 默认展示address字段内容,所以这里复制给 address

            // 处理当前选中区域编码
            var arr = ['provinceCode', 'cityCode', 'townCode', 'streetCode']
            info[arr[this.distInfo.levelNum - 2]] = this.distInfo.districtCode

            this.isShowDist = false;
        },
        cancelChooseDist(){
            this.distInfo = null;
            this.isShowDist = false;
        },
        treeNodeClick(data){      //  地区树选择
            this.distInfo = data;
        },
    }
}