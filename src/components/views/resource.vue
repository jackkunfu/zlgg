<template lang="pug">
div
    .main-top
        .tip
            | 广告 >> 媒体管理 >> 
            span 素材管理

        .fr
            .gg-btn(@click="isViewOwns=true;") 上传
            .gg-btn.white(@click="revertUI") 转为UI素材
            .gg-btn.white(@click="approval") 审批
            .gg-btn.white(@click="del") 删除
    
    .main-filter
        .fl
            | 筛选条件： 
            span(:class="showFilter ? 'open' : ''" @click="showFilter=!showFilter;") 展开
                i.el-icon-caret-left

        .fr
            .ft-btn(@click="search")
                i.el-icon-search
                span 查询
            .ft-btn(@click="reset")
                i.el-icon-refresh
                span 重置

    .filter-box(:class="showFilter ? 'open' : ''")
        .gg-input
            span aa
            input(autocomplete="off")

        .gg-input
            span 用户名
            input(autocomplete="off")

    .list
        .gg-resource-box(v-for="(item, i) in tableData")
            el-checkbox.check(v-model="item.checked")
            .status
                img(src="shenpizhong.png" v-if="item.checkStatus == 1")
                img(src="tongguo.png" v-if="item.checkStatus == 2")
                img(src="butongguo.png" v-if="item.checkStatus == 3")
            .img-ctn
                img(:src="item.httpsReourceAddress")
            .info
                .name {{item.adOwnerName}}
                .time {{item.time}}
                .type
                    //- i.el-icon-picture-outline(v-if="item.typeName=='文字素材'")
                    //- span {{item.typeName}}
                    template(v-if="item.typeCode==1")
                        i.el-icon-picture-outline
                        | 视频素材
                    template(v-if="item.typeCode==2")
                        i.el-icon-picture-outline
                        | 图片素材
                    template(v-if="item.typeCode==3")
                        i.el-icon-picture-outline
                        | 文字素材
                    span(v-if="item.size") ({{item.resourceSize | size}})
            .see(@click="viewResource(item.httpsReourceAddress, item.typeCode)") 点击查看

    el-pagination(background layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="changePage")

    .fix-box(v-show="isView")
        .box
            .title
                span 素材查看
                i.fr.el-icon-close(@click="isView=false;curViewResource='';")
            .main(style="text-align:center;")
                video(:src="curViewResource" autoplay="true" v-if="viewType==1")
                img.img-view(:src="curViewResource" v-if="viewType==2")
                div(v-if="viewType==3") {{curViewResource}}
                
    .fix-box(v-show="isViewOwns")
        .box
            .title
                span 广告主列表
                i.fr.el-icon-close(@click="isViewOwns=false;")
            .main(style="text-align:center;")
                self-table(:keys="detailKeys" :tableData="detailTableData" :total="detailTabletTotal"
                    @changePage="changePage('detailTableData')" @current-change="chooseRow")

                //- .gg-btn 确定
                .gg-btn(@click="startUpfile") 上传
                    input.upfile.no-click(type="file" @change="upfile('up1', 'upfileOk')" ref="up1")

    .fix-box(v-show="isApproval")
        .box
            .title
                span 审批素材
                i.fr.el-icon-close(@click="isApproval=false;")
            .main(style="text-align:center;")
                .gg-btn(@click="approvalSubmit(2)") 通过
                .gg-btn.white(@click="approvalSubmit(3)") 不通过

    //- .edit-ctn.fix-cover(v-show="showEditCtn")
        .box
            el-form(:model="editInfo" label-width="80px")
                el-form-item(label="名称")
                    el-input(v-model="editInfo.placeName")
                el-form-item(label="行政区域")
                    el-input(placeholder="请选择地区" v-model="editInfo.address" @focus="isShowDist=true")
                el-form-item(label="性质")
                    el-input(v-model="editInfo.appUrl")
                el-form-item(label="年份")
                    el-date-picker(v-model="editInfo.createyear" align="right" type="year" placeholder="选择年")
                el-form-item(label="详细地址")
                    el-input(v-model="editInfo.address")
                el-form-item(label="联系人")
                    el-input(v-model="editInfo.contacter")
                el-form-item(label="联系电话")
                    el-input(v-model="editInfo.contactPhone")
                el-form-item(label="经纬度")
                    el-input(v-model="editInfo.lon" @focus="isShowMap=true;")
                    el-input(v-model="editInfo.lat" @focus="isShowMap=true;")
                    
                el-form-item
                    el-button(type="primary" @click="addOrUpdate") 保存
                    el-button(type="primary" @click="editCancel") 取消

    //- .tree-ctn.fix-cover(v-show="isShowDist")
        .box
            el-tree(:data="distData" :props="defaultProps" @node-click="treeNodeClick")
            el-button(type="success" @click="chooseDistOk") 确定
            el-button(type="success" @click="cancelChooseDist") 取消

    //- .fix-cover.map(v-show="isShowMap")
        .box.map-ctn.center
            .map-search
                el-input.search-input(v-model="searchStr" @keyup="searchMap" placeholder="输入关键字")
                el-button(@click="searchMap") 搜索
                //- el-input(v-model="clickMapInfo.point.lng" disabled)
                //- el-input(v-model="clickMapInfo.point.lat" disabled)
            #map
            //- el-button(@click="chooseDistOk") 确定

</template>

<script>
export default {
    name: 'resource',
    mixins: [ tableManage ],
    data () {
        return {
            showFilter: false,   // 是否暂时筛选条件
            tableData: [
                // {
                //     image: 'http://img.hb.aicdn.com/2347b45b5fedd832b1378debc07bef8381599a8e72840-yJgXXj_fw658',
                //     name: '明光广告',
                //     status: 0,
                //     time: '2016/01/01',
                //     type: 1,
                //     size: 10.4
                // },
                // {
                //     image: 'http://img.hb.aicdn.com/e3c19f8347f45db607869fa863d011da25e4b5b318e29-ZPuaH1_fw658',
                //     name: '明光广告',
                //     status: 0,
                //     time: '2016/01/01',
                //     type: 2
                // }
            ],
            curViewResource: '',
            viewType: null,
            isView: false,
            isViewOwns: false,     // 上传显示广告主
            isApproval: false,    // 审批确认
            detailKeys: [
                { str: '广告主', key: 'address' },
                { str: '素材类型', key: 'placeName' },
                { str: '素材名称', key: 'address' },
                { str: '总播放次数', key: 'remark' },
                { str: '播放单个数', key: 'remark' },
                { str: '播放开始时间', key: 'remark' },
                { str: '播放结束时间', key: 'remark' },
                { str: '授权电梯', key: 'remark' },
            ],
            searchKeys: ['address'],
            editKeys: ['placeName', 'contactPhone', 'contacter', 'address', 'lon', 'lat', 'createyear', 'remark', 'character'],
            api: {
                list: { url: '/api/resourceinfo/queryResourceInfoPage', type: 'post' },
                del: { url: '/place/delPlace' }
            },
            detailTableData: [],    // 广告主列表数据
            detailTableDataApi: {
                list: { url: '/place/queryPlacePage' }
            },
            detailTabletTotal: 0,
            operates: [
                { str: '新增', fun: 'add'},
                { str: '修改', fun: 'edit'},
                { str: '删除', fun: 'del'}
            ],
            distData: [],
            defaultProps: {
                children: 'children',
                label: 'districtValue'
            },
            curOwn: null     // 当前选择的广告主
        }
    },
    async mounted(){
        this.imgResize();    
    },
    methods: {
        imgResize(){   // 调整图片自适应填充
            $('.img-ctn img').each( function(i, el){
                var img = $(el).get(0);
                img.onload = function(){   // 图片加载完成处理事件
                    var w = $(this).width();
                    var h = $(this).height();
                    if(w/h > 3/2){  //  180/120
                        $(el).css({height:'100%'})
                    }else{
                        $(el).css({width:'100%'})
                    }
                }
            })
        },
        viewResource(src, typeCode){    // 查看素材, 
            this.isView = true;
            this.viewType = typeCode
            this.curViewResource = src;
            if(typeCode == 1){

            }else if(typeCode == 2){
                // this.curViewResource = src;
                $('.img-view').get(0).onload = function(){
                    $(this).removeClass('center-center');
                    if(this.height < $(this).parent().height()) $(this).addClass('center-center');
                }
            }else if(typeCode == 3){
                
            }
        },
        changeSearchValue(info){
            info.operatorUserId = localStorage.zlOpUid || 43;
            return info;
        },
        testInput(){
            return true
        },
        changeEditValue(info){   //  新增编辑之前触发再次处理下参数
            info.operatorUserId = localStorage.zlOpUid || 43;
            delete info.mapInfo;
            console.log(info.distInfo)
            return info;
        },
        handleDelRow(row){    // 删除请求之前处理参数，一般用于传参不统一  有的传id 有guid..
            return { id: row.id }
        },
        async revertUI(){    // 转UI素材
            var ids = this.getChoose();
            if(!ids) return this.messageTip('请先勾选素材~');
            var res = await this.ajax('', { ids });
        },
        approval(){   // 审批
            var ids = this.getChoose();
            if(!ids) return this.messageTip('请先勾选素材~');
            this.isApproval = true;
        },
        async approvalSubmit(type){
            var ids = this.getChoose();
            var res = await this.ajax('/api/resourceinfo/updateCheckStatus', { guids: ids, status: type });
            if(res && res.code == this.successCode){
                this.messageTip('操作成功~', 1);
                this.isApproval = false;
                this.tableList.call(this);
            }
        },
        async del(){   // 删除
            var ids = this.getChoose();
            if(!ids) return this.messageTip('请先勾选素材~');
            var res = await this.ajax('/api/resourceinfo/batchSoftDelete/'+encodeURIComponent(ids), {}, 'DELETE');
            if(res && res.code == this.successCode){
                this.messageTip('操作成功~', 1)
                this.tableList.call(this);
            }
        },
        getChoose(){
            var data = this.tableData.filter( v => v.checked ).map( v => v.guid );
            if(data.length == 0) return ''
            console.log(data);
            return data.join(',');
            // return this.list.filter( v => v.checked );
        },
        startUpfile(){
            // if(!this.curOwn) return this.messageTip('请选择广告主~');
            $(this.$refs.up1).click();
        },
        chooseRow(curItem, old){
            this.curOwn = curItem;
        },
        async upfileOk(file, data){   // 新增上传
            console.log(typeof data);
            if(typeof data == 'string') data = JSON.parse(data);
            delete data.code;
            delete data.message;
            // data.adOwnerGuid = this.curOwn.guid;
            // data.adOwnerName = this.curOwn.adOwnerName;
            data.resourceAddress = data.reourceAddress;
            delete data.reourceAddress;
            data.adOwnerGuid = 0;
            data.adOwnerName = '广告主名称';
            var upRes = this.ajax('/api/resourceinfo/saveAdvResourceinfo', data);
            if(upRes && upRes.code == this.successCode){
                this.isViewOwns = false;
                this.curOwn = null;
                this.tableList.call(this);
            }
        }
    },
    watch: {
        tableData(arr){
            arr.forEach(v => {
                this.$set(v, 'checked', false)
            })
            this.$nextTick(()=>{
                this.imgResize();
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.img-view
    width: 680px;
    margin: 20px auto;
    height: auto;

.see
    cursor: pointer;
</style>
