var print = console.log.bind(console);

$.fn.serializeJSON = function(){
    var array = $(this).serializeArray();
    var json = {};
    $.each(array,function(i,item){
        json[item.name] = item.value
    })
    return json;
}
