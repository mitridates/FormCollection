import showArrows from './arrows.js';
import modInputNames from './modInputNames.js';
/**
 * Add events to icons in control bar
 * @param {HTMLElement} elm 
 * @param {Object} config FormCollection config
 */
export default function addButtonEvents(elm, config)
{
    let remover= function(ev)
    {
        let container= config.container;
        container.removeChild(this.elm);
        if(container.children.length)
        {
            showArrows(container);
            modInputNames(config);
        }        
    };

    elm.querySelector('.js-trash').addEventListener('click', remover.bind({elm: elm}));

    elm.querySelector('.js-toggler').addEventListener('click', (ev)=>{
        
        let 
            angle= ev.currentTarget.querySelector('.fa'),
            rotate= 'fa-rotate-180'
            ;
        if(angle.classList.contains(rotate)){
            angle.classList.remove(rotate)
            elm.querySelector('.js-cform').style.display='inline'
        }else{
            angle.classList.add(rotate)
            elm.querySelector('.js-cform').style.display='none'
        }
    });

    elm.querySelector('.js-cbar_txt').addEventListener('click', (ev)=>{
        elm.querySelector('.js-toggler').click();
    });

    elm.querySelector('.js-up').addEventListener('click', (ev)=>{
        moveElment(elm, false, config);
    });
    elm.querySelector('.js-down').addEventListener('click', (ev)=>{
        moveElment(elm, true, config);
    });
}

function moveElment(elm, to, config)
{
    var arr = [].slice.call(elm.parentNode.children);
    var i= arr.indexOf(elm);
    var ii= to ? i+1 : i-1;
    if(ii>i){
        elm.parentNode.insertBefore(arr[ii], elm);
    }else{
        elm.parentNode.insertBefore(elm,arr[ii]);
    }
    showArrows(elm.parentNode)
    modInputNames(config)
}
