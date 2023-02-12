/**
 * Default function to add a text string to the control bar.
 * @param {Object} json Serialized form
 * @param {HTMLElement} elm Current form wrapper
 */
export default function jsonToNavbar(json, elm)
{
    let     
        out=[],
        title=[],
        navTxt= elm.querySelector('.js-nav_txt')
        ;
    
    for(let i in json)
    {
        if(json[i] && i!=='type'){
            title.push(`${i}: ${json[i]}`)
            out.push(json[i]);
        }      
    }

   if(out.length){
    navTxt.title= navTxt.innerHTML=out.join('. ');
   }
   
}