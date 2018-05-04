<template lang="pug">
.index
    .main-top
        el-input(v-model="searchStr" clearable style="width:220px;" autocomplete="off")
            el-button(slot="append" icon="el-icon-search")

    #map
    
</template>

<script>
import Map from '../../basic/mixs/map'
var userInfo = localStorage.zlOpUesrInfo ? JSON.parse(localStorage.zlOpUesrInfo) : null;

export default {
    name: 'index',
    mixins: [ Map ],
    data () {
        return {
            searchStr: ''
        }
    },
    mounted(){
        if(!localStorage.zlUserToken){
            console.log(this.$parent);
        }
    },
    methods: {
        
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.index
    height: 100%;
    position: relative;

#map
    width: 100%;
    height: 100%;
    padding-top: 50px;
</style>
