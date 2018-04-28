var userInfo = localStorage.zlOpUesrInfo ? JSON.parse(localStorage.zlOpUesrInfo) : null;
// 地图选择处理
export default {
    data(){
        return {
            map: null,
            isShowMap: false,
            clickMapInfo: { point:{} },    // 点选的地址信息对象
            localSearch: null,       // 检索
            searchStr: ''
        }
    },

    mounted(){

        this.$nextTick(()=>{
            this.map = new BMap.Map("map");
            this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            this.initMap();

            // 单击获取点击的经纬度
            this.map.addEventListener("click", e =>{
                this.clickMapInfo = e;
            });
        })
        
    },

    methods: {
        searchMap(){
            var str = this.searchStr.trim();
            if(str == '') return
            if(!this.localSearch) this.localSearch = new BMap.LocalSearch(this.map, {
                renderOptions: { map: this.map }
            });
            this.localSearch.search(str);
        },
        async initMap(){
            
            var cityName = userInfo && userInfo.cityName ? userInfo.cityName : '杭州'
            this.map.centerAndZoom(cityName, 12);
                // provinceCode=data.provinceCode;
                // postCode=data.post.postCode;

            var cityCode = userInfo && userInfo.cityCode ? userInfo.cityCode : '310000'
            var res = await this.ajax('/dt_ad/kfzxMap/queryAllUnitForMap.do', {
                cityCode,
                authType: 4,
                grantType: 1,
                appCode: 'GGPT'
            });
            if(res.code === 0){
                this.map.clearOverlays()
                res.data.forEach(v => {
                    if(v.lon && v.lat){
                        v.markName = v.unitName;
                        this.addMarker(new BMap.Point(v.lon, v.lat), v);
                    }
                })
            }
              
            this.dropListComplete();
        },
        addMarker(point, item){
            var marker;
            var postCode = userInfo && userInfo.post && userInfo.post.postCode ? userInfo.post.postCode : ''
            if(postCode === 'GGS'){
                var myIcon = new BMap.Icon("../images/dtjk/map-location.png", new BMap.Size(35, 29));
                marker = new BMap.Marker(point,{icon:myIcon});
            }else{
                if(item.status && item.status === 'DTJK_XQZT_YJ'){
                    var myIcon = new BMap.Icon("../images/dtjk/map-location2.png", new BMap.Size(35,29));
                    marker = new BMap.Marker(point,{icon:myIcon});
                }else if(item.status && item.status === 'DTJK_XQZT_YC'){
                    marker = new BMap.Marker(point);
                }
                else{
                    var myIcon = new BMap.Icon("../images/dtjk/map-location.png", new BMap.Size(35,29));
                    marker = new BMap.Marker(point,{icon:myIcon});
                }
            }

            marker.addEventListener("click", e => {
                this.goUrl('/liftList', { guid: item.guid });
            });

            marker.addEventListener("mouseover", e => {
                this.showLabel(marker, item);
            });

            marker.addEventListener("mouseout", e => {
                this.labelNone(marker, item);
            });

            this.map.addOverlay(marker);
        },

        showLabel(marker, item){
            var label = new BMap.Label(
                "<span style='display:none;'>" + item.levelNum + "," + item.markCode + "</span>" + item.markName, 
                { offset: new BMap.Size(20, -10) }
            );
	        marker.setLabel(label);
        },

        labelNone(marker, item){
            var label = marker.getLabel();
            if(label){
                label.setStyle({ display : "none" });
            }
        },

        dropListComplete(){}
    }
}