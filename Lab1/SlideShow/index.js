var index=0
 slideshow()
 function slideshow(){
 images = $(".slide")
 for(i=0;i<images.length;i++)
 {$(images[i]).css("display", "none")}

 if(index > images.length-1)
    {index=0;}

 {$(images[index]).css("display", "block");
   index++;}
  const myTimeout = setTimeout(slideshow,1500)
  $(".stop").click(function(){
    clearTimeout(myTimeout);
    $(".stop").css("display","none")
    $(".resume").css("display","block")
    } 
  );
}
$(".resume").click(function(){
  slideshow()
  $(".resume").css("display","none")
  $(".stop").css("display","block")
})

