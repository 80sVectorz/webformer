var downdeep = 0;

function test(){
    downdeep+=50;
    $("body").append(`<p style='position:absolute;left:${downdeep}px;top:${downdeep}px;' class='webformer_platform'>yay!</p>`);
}

