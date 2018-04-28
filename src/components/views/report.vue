<template lang="pug">
div
    .table-ctn
        .page-title 小区管理
        .search-ctn
            el-form(:model="searchInfo" label-width="80px")
                el-form-item(label="地区")
                    el-input(placeholder="请选择地区" v-model="searchInfo.address" @focus="isShowDist=true")
            el-button(type="success" @click="search") 查询
            el-button(type="success" @click="reset") 重置
        self-table(:keys="keys" :tableData="tableData" :total="total" :operates="operates"
            @changePage="changePage" @chooseRow="chooseRow" @add="add" @edit="edit" @del="del")

    .edit-ctn.fix-cover(v-show="showEditCtn")
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

    .tree-ctn.fix-cover(v-show="isShowDist")
        .box
            el-tree(:data="distData" :props="defaultProps" @node-click="treeNodeClick")
            el-button(type="success" @click="chooseDistOk") 确定
            el-button(type="success" @click="cancelChooseDist") 取消

    .fix-cover.map(v-show="isShowMap")
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
import map from '../../basic/mixs/map'
import dist from '../../basic/mixs/dist'
export default {
    name: 'place',
    mixins: [tableManage, map, dist],
    data () {
        return {
            keys: [
                { str: '地址', key: 'address' },
                { str: '小区名称', key: 'placeName' },
                { str: '详细地址', key: 'address' },
                { str: '百度坐标', key: 'remark' }
            ],
            searchKeys: ['address'],
            editKeys: ['placeName', 'contactPhone', 'contacter', 'address', 'lon', 'lat', 'createyear', 'remark', 'character'],
            api: {
                list: { url: '/place/queryPlacePage' },
                add: { url: '/place/addPlace' },
                edit: { url: '/place/updatePlace' },
                del: { url: '/place/delPlace' }
            },
            operates: [
                { str: '新增', fun: 'add'},
                { str: '修改', fun: 'edit'},
                { str: '删除', fun: 'del'}
            ],
            distData: [],
            defaultProps: {
                children: 'children',
                label: 'districtValue'
            }
        }
    },
    async mounted(){
        this.distData = await this.getAllDist();
    },
    methods: {
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
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
