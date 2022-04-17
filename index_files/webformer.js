var character_element;
var character_box;
var position = [0,0];
var velocity = [0,0];
var gravitational_force = [0,0.2];
var grounded = false;
var movement_force = [0,0];
var friction = 0.7;

var collision_boxes = [];


function initialize(){
    $("body").append(`
    <div id="webformer_character" style="
    left:${position[0]}px;
    top:${position[1]}px;
    position:absolute;
    "><p style="margin:0px;">[ (: ]</p><p style="margin:0px;"> | | </p></div>`);
    character_element = document.getElementById("webformer_character");
    character_box = character_element.getBoundingClientRect();
    collision_boxes = $(".webformer_platform").each(function(i, obj) {
        collision_boxes.push(obj.getBoundingClientRect());
    });
}


kd.LEFT.down(function(event) {
    velocity[0] += -4;
})
kd.RIGHT.down(function(event) {
    velocity[0] += 4;
})
kd.SPACE.down(function(event) {
    if(grounded){
        velocity[1]+= -80;
        gravitational_force[1]=0.2;
        grounded = false;
    }
})


setInterval(function () {
    kd.tick();    

    let net_velocity = [(velocity[0])/4,(velocity[1]+gravitational_force[1])/2];
    velocity = net_velocity;
    if (!grounded){
        gravitational_force[1]+=0.1;      
    }else{
        gravitational_force[1]=0;
    }
    if (velocity[0] < 1 && velocity[0] > 0){
        velocity[0]=0;
    }
    position[0]+=velocity[0];
    position[1]+=velocity[1];
    character_box = character_element.getBoundingClientRect();
    grounded=false;
    collision_boxes = $(".webformer_platform").each(function(i, obj) {
        let box = obj.getBoundingClientRect();
        collision_boxes.push(box);
        if (character_box.bottom > box.y && character_box.y < box.bottom){
            if (character_box.right > box.x && character_box.x < box.right){
                position[1] = box.top-character_box.height;
                velocity[1] = 0;
            }
        }
        if (!grounded){
         if (character_box.y+0.5 > box.y-character_box.height && character_box.y < box.bottom-character_box.height){
            if (character_box.right > box.x && character_box.x < box.right){
                grounded=true;
            }
        } else{
            grounded = false;
        }
        }
        })  
    character_element.style.top = position[1].toString()+"px";
    character_element.style.left = position[0].toString()+"px";
    character_box = character_element.getBoundingClientRect();
}, 10);


initialize();