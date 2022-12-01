const wrapper = document.getElementById("wrapper");
const wWidth = parseFloat(window.getComputedStyle(wrapper).width, 10)
const wHeight = parseFloat(window.getComputedStyle(wrapper).height, 10);
var globalZ = -10;

const colors = [
    "rgb(102, 7, 8)",
    "rgb(164, 22, 26)",
    "rgb(186, 24, 27)",
    "rgb(229, 56, 59)",
    "rgb(177, 167, 166)",
    "rgb(211, 211, 211)",
    "rgb(245, 243, 244)",
];


// add listeners to all initial shapes
function setClick(){
    var shapes = document.getElementsByClassName("shape");
    for(let i = 0; i < shapes.length; i++){
        shapes[i].addEventListener("click", handleClick);
    }
}

function setColors(){
    var shapes = document.getElementsByClassName("shape");
    for(let i = 0; i < shapes.length; i++){
        Object.assign(shapes[i].style, {backgroundColor: randColor()});
    }
}

const nextTick = new Promise(res => queueMicrotask(() => setTimeout(res,0)));


async function handleClick(e){
    const shape = e.target;
    
    // make sure div is interactable
    if(shape.getAttribute("data-interactable") != 'true') { return; }

    // get style data for clicked shape
    const style = window.getComputedStyle(shape);
    const width = parseFloat(style.width, 10);
    const height = parseFloat(style.height, 10);
    const x = parseFloat(style.left, 10);
    const y = parseFloat(style.top, 10);

    // prevent one to be clicked while animation happening
    shape.setAttribute("data-interactable", "false");
    
    // if wider than tall
    if(width > height){
        shape.style.width = width/2 + "px";
        
        newShapeDiv(
            x + "px", y + "px", width + "px", height + "px",
            x + (width / 2) + "px",
            y + "px",
            width / 2 + "px",
            height + "px",
            style.backgroundColor
        );

    // if taller than wide
    }else{
        shape.style.height = (height * 50 / wHeight)+ "%";

        newShapeDiv(
            x + "px", y + "px", width + "px", height + "px",
            x + "px",
            y + (height / 2) + "px",
            width + "px",
            height / 2 + "px",
            style.backgroundColor
        );
    }
    await new Promise(r => setTimeout(r, 750));
    shape.setAttribute("data-interactable", "true");
}

function randColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

async function newShapeDiv(px, py, pw, ph, x, y, w, h, col){
    const div = document.createElement("div");
    div.classList.add("shape");
    div.setAttribute("data-transition", "spawn");
    let newCol = col;

    // generate new color
    while(newCol == col){
        newCol = randColor();
        //console.log(`${newCol} ${col} ${newCol == col}`);
    }

    Object.assign(div.style, {
        backgroundColor: newCol,
        left: px,
        top: py,
        width: pw,
        height :ph,
        transition: "left, top, height, width, border-radius, transform",
        transitionTimingFunction: "ease",
        transitionDuration: "750ms",
        zIndex: -1200
    });
    
    wrapper.append(div);

    // wait a tick so animation happens
    await new Promise(r => setTimeout(r, 0));
    div.setAttribute("data-transition", "static");
    Object.assign(div.style, {
        left: x,
        top: y,
        width: w,
        height: h,

    });
    
    // add clickevent to new shape
    await new Promise(r => setTimeout(r, 750));
    Object.assign(div.style, {zIndex: 1200});
    div.setAttribute("data-interactable", "true");
    div.addEventListener("click", handleClick);
}

setClick();
setColors();

