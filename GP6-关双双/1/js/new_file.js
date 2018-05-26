//反向代理跨域请求封装
function ajaxGet(url,data){
    //设置data的默认值
    data = data ? "?" + data : "";
    url = url + data;
    //返回promise对象
    return new Promise(function(resolve,rejected){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send(null);
        xhr.onload = function(){
            if(xhr.status == 200){
                resolve(xhr.responseText);
            }
        }
        //请求超时
        setTimeout(function(){
            rejected("地址不正确！");
        },3000)
    })
}
