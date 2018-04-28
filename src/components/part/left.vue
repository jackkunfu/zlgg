<template lang="pug">
    el-menu(:default-active="defaultActive" class="el-menu-vertical-demo" unique-opened
        background-color="#fff" text-color="#4B4F58" active-text-color="#3083F2" router)
        //- @open="handleOpen" @close="handleClose"

        template(v-for="(nav, i) in menus")
            
            //- 有子集
            el-submenu(v-if="nav.list && nav.list.length > 0"  :index="i+''")
                template(slot="title") 
                    i.nav-icon(v-if="nav.iconName" :class="nav.iconName")
                    span {{nav.name}}
                el-menu-item(v-for="(item, j) in nav.list" :key="i+'-'+j" :index="item.url+''") 
                    template(slot="title") 
                        i.nav-icon(v-if="item.iconName" :class="item.iconName")
                        span {{item.name}}

            //- 无子集
            //- el-menu-item(v-if="!nav.list || nav.list.length==0" :index="nav.url") {{nav.name}}
            el-menu-item(v-else="" :index="nav.url+''")
                template(slot="title") 
                    i.nav-icon(v-if="nav.iconName" :class="nav.iconName")
                    span {{nav.name}}

</template>

<script>
export default {
    name: 'top',
    data () {
        return {
            menus: [{
                name: '首页',
                url: '/index',
                iconName: 'el-icon-menu'
            },{
                name: '媒体管理',
                iconName: 'el-icon-menu',
                list: [
                    // { name: '素材管理', url: '/resource', iconName: 'el-icon-menu' },
                    { name: '素材管理', url: '/resource' },
                    { name: '播出单管理', url: '/playList' },
                    { name: '播出计划管理', url: '/playPLan' },
                    { name: 'UI素材管理', url: '/uiResource' },
                    { name: '广告主管理', url: '/adOwn' }
                ]
            },{
                name: '统计报表',
                iconName: 'el-icon-menu',
                list: [
                    { name: '统计报表', url: '/report' }
                ]
            }]
        }
    },
    computed: {
        defaultActive(){
            return this.$route.path;
        }
    }
}
</script>
