$(document).on('focus', '.gg-input input', function(){
    $(this).prev().addClass('focus');
})
$(document).on('blur', '.gg-input input', function(){
    if($(this).val().trim() == '') $(this).prev().removeClass('focus');
})
window.onload = function(){
    setTimeout(function(){
        $(document).find('.gg-input input').each(function(i, el){
            $(el).blur()
        })
    }, 10000)
}
