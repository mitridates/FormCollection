import showArrows from './arrows.js';
import modInputNames from './modInputNames.js';
/**
 * Add events to icons in control bar
 * @param {HTMLElement} elm 
 * @param {Object} config FormCollection config
 */
export default function addButtonEvents(elm, config)
{
    let 
        remover= function(ev)
        {
            let container= config.container;
            container.removeChild(this.elm);
            if(container.children.length)
            {
                showArrows(container);
                modInputNames(config);
            }        
        },
        toggler= elm.querySelector('.js-nav_toggler'),
        trash= elm.querySelector('.js-nav_trash'),
        up= elm.querySelector('.js-nav_up'),
        down= elm.querySelector('.js-nav_down'),
        txt= elm.querySelector('.js-nav_txt'),
        form= elm.querySelector('.js-form'),
        rotate= 'fa-rotate-180'        
        ;

    trash.addEventListener('click', remover.bind({elm: elm}));

    toggler.addEventListener('click', (ev)=>{
        
        let angle= ev.currentTarget.querySelector('.fa-angle-down');
            
        if(angle.classList.contains(rotate)){
            angle.classList.remove(rotate)
            form.style.display='inline'
        }else{
            angle.classList.add(rotate)
            form.style.display='none'
        }
    });

    txt.addEventListener('click', (ev)=>{
        toggler.click();
    });

    up.addEventListener('click', (ev)=>{
        moveElment(elm, false, config);
    });
    down.addEventListener('click', (ev)=>{
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
