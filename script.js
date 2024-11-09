const container = document.querySelector('.container');
const sizeBtn = document.querySelector('.sizeBtn');
const clearBtn = document.querySelector('.clearBtn');
const para = document.querySelector('.para');
const theme = document.querySelector('.theme');

sizeBtn.addEventListener('click', ()=>{
    const input = document.querySelector('input');
    container.innerHTML=""
    theme.textContent = `COLOR: RGB(255,0,0)`

    const gridSize = input.value;
    if(gridSize < 0 || gridSize > 100){
        alert('Error. Number must be in range 1-100')
    }
    else{
        createGrid(gridSize);
    }
})


function createGrid(gridSize=16){
    para.textContent = `${gridSize}x${gridSize} Grid`;
    let a = 1
    while(a!==((gridSize**2) + 1)){
        container.style.cssText  = ('style', `height:${container.clientWidth}px`);
        let size = (100/gridSize) + "%";

        const gridDiv = document.createElement('div')
        gridDiv.setAttribute('style',`text-align:center; width:${size}; height:${size}; background-color:white`)
        container.appendChild(gridDiv)
        a++;

        hoverEffect(gridDiv,255,0,0, theme.textContent);
        etchGray(gridDiv);                                    
        etchDistinct(gridDiv);
        etchColored(gridDiv);
    }
}

function etchDistinct(div){
    const colPicker = document.querySelector('#colorPicker')
    colPicker.addEventListener('input', ()=>{

        let colorValue= colPicker.value;
        colorA = parseInt(colorValue.substr(1,2), 16)
        colorB = parseInt(colorValue.substr(3,2), 16)
        colorC = parseInt(colorValue.substr(5,2), 16)

        theme.textContent = `COLOR: RGB(${colorA}, ${colorB}, ${colorC})`;
        console.log(colorValue)
        console.log(colorA, colorB, colorC)
        hoverEffect(div, colorA, colorB, colorC, theme.textContent)
    })
}

function etchGray(div){
    const grayScale = document.querySelector('.grayScale')
    let color=Math.floor(Math.random()*255) + 1;

    grayScale.addEventListener('click', ()=>{
        theme.textContent = `COLOR: GRAY-SCALE`
        hoverEffect(div, color, color, color, theme.textContent);    
    })
}

function etchColored(div){
    const coloredScale = document.querySelector('.coloredScale')
    let colorA = Math.floor(Math.random()*255) + 1;
    let colorB = Math.floor(Math.random()*255) + 1;
    let colorC = Math.floor(Math.random()*255) + 1;
    coloredScale.addEventListener('click', ()=>{
        theme.textContent = `COLOR: COLORED-SCALE`
        hoverEffect(div, colorA, colorB, colorC, theme.textContent);
    })
}


function hoverEffect(div, colR, colG, colB, text){
    let opac = 1; 
    div.addEventListener('mouseover', ()=>{  
        if(opac >= 10){
            theme.textContent = `rgba(${colR}, ${colG}, ${colB}, ${opac/10})`
        }
        else{
            div.style.backgroundColor = `rgba(${colR}, ${colG},${colB}, ${opac/10})`;
            theme.textContent = `rgba(${colR}, ${colG}, ${colB}, ${opac/10})`
            opac ++;
        }               
    }) 
    div.addEventListener('mouseout', ()=>{  
            theme.textContent = text;
    }) 

    clearBtn.addEventListener('click',()=>{
        div.style.backgroundColor = 'white'
        theme.textContent=`${text}`
        opac = 1;
    })  
}

createGrid();    