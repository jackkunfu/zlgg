function fill(v, key){
    return v.length > 1 ? v : ( key ? key + '' +v : '0' + v );
}
export default function(Vue){
    Vue.filter('els', function(v, len){    // 截取省略
        if(!v) return '';
        return len && len > 0 ? v.substring(0, len)+'..' : v.substring(0, 15)+'..'
    })

    Vue.filter('time', function(v, fillKey, isAll){    // 截取省略
        if(!v) return '';
        var t = new Date(v);
        var part1 = fill(t.getFullYear(), fillKey) + fill(t.getMonth()+1, fillKey) + fill(t.getDate(), fillKey)
        var part2 = fill(t.getHours(), fillKey) + fill(t.getMinutes, fillKey) + fill(t.getSeconds(), fillKey)
        return isAll ? (part1 + ' ' + part2) : part1
    })

    Vue.filter('size', function(v){    // 文件大小处理处理展示
        if(!v) return '';
        if(v > 1024*1000) return v/(1024*1024) + 'M';
        else if(v > 1000) return v/(1024) + 'KB';
        else return v + 'B';
    })
}