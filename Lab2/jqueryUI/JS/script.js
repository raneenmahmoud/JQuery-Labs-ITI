$('#rabbit').on('mouseenter', function(){
    $("img").effect("shake","slow")
})

//revert:false to state the image after drag
$("img").draggable({revert:false})

// transition: 0.6s;

$("#hole").droppable({
    drop: function(){
        $("#rabbit").fadeOut(600)   
    }
})