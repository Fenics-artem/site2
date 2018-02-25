document.body.onload = function(){
       var preloader = document.getElementById("page-preloader");
        if( !preloader.classList.contains("done")){
            preloader.classList.add("done");
        }
};



var clicks=0
var pointX
var pointY
var drag_x
var drag_y
var w2 = parseInt($(".bg").css("width"))
var h2 = parseInt($(".bg").css("height"))
var radius = h2/4

$(window).resize(function(){
    w2 = parseInt($(".bg").css("width"))
    h2 = parseInt($(".bg").css("height"))
    radius = h2/4
})

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    width:box.width,
    height:box.height
  }
}

$("*").mousemove(function(e){
    setTimeout(function(){
        
        var x = e.pageX
        var y = e.pageY
        var x_1 = e.clientX
        var y_1 = e.clientY
        var prX = x_1/w2*100
        var prY = y_1/h2*100

        var gradient = "radial-gradient(250px 240px at " +prX+"% "+prY+ "%, rgba(255,255,0,.05) 50%, black)";
        $(".bg").css("background", gradient);
        
        $(".drag").css("top",y+drag_y).css("left",x+drag_x)

        $(".zzz").each(function(){
            var coords = getCoords(this)
            w= coords.width //ширина
            h= coords.height //высота
            l=coords.left  //отступ слева
            t=coords.top  //отступ сверху
            midX = l+w/2  //середина элемента
            midY = t+h/2  //середина элемента
            otklX = x-midX  //отступ от центра
            otklY =y-midY   //отступ от центра

            if(Math.abs(otklX)<radius && Math.abs(otklY)<radius){
                xx=-otklX/2
                yy =-otklY/2
                blur = Math.max(Math.abs(otklX),Math.abs(otklY))/0.5
                ten=(xx/2)+"px "+(yy/2)+"px "+Math.abs(blur/4)+"px"
                $(this).css("box-shadow",ten)
            }
            
        })
        $(".ttt").each(function(){
            var coords = getCoords(this)
            w= coords.width
            h= coords.height
            l=coords.left
            t=coords.top
            midX = l+w/2
            midY = t+h/2
            otklX = x-midX
            otklY =y-midY
            
            if(Math.abs(otklX)<radius && Math.abs(otklY)<radius){
                xx=-otklX/2
                yy =-otklY/2
                blur = Math.max(Math.abs(otklX),Math.abs(otklY))/0.8
                ten="1px 1px 1px rgba(0,0,0,.5),"+(xx/4)+"px "+(yy/4)+"px "+Math.abs(blur/10)+"px black"
                $(this).css("text-shadow",ten)
            }
        })
    },150)
})


$(".bg").click(function(e){
        pointX=e.pageX
        pointY=e.pageY
        $(this).css("z-index","-100")
        var ob = document.elementFromPoint(e.clientX,e.clientY)
        $(this).css("z-index","100")
        if(ob!="bg"){
            var o = document.createEvent('MouseEvents');
            o.initEvent('click', true, true);
            ob.dispatchEvent(o);
           // ob.dispatchEvent(new Event("click"))
        }

})
$(".zzz").click(function(e){

        drag_x=parseInt($(this).css("left"))-pointX
        drag_y=parseInt($(this).css("top"))-pointY

        if(clicks==0){
            $(this).css("z-index",50)
        }else{
            $(this).css("z-index","")
        }
        clicks = !clicks;

        $(this).toggleClass("drag")

})
$(".cards").click(function(e){
    
    var cl2 = $(this).attr("data-cl")
    
    if(cl2==0 || cl2===undefined){
        $(this).css("transform","scale(1.2)").css("z-index",50).toggleClass("zzz").attr("data-cl",1)
    }else{
        $(this).css("transform","scale(1)").css("z-index","").css("box-shadow","").toggleClass("zzz").attr("data-cl",0)
    }
    
})


