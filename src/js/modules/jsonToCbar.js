/**
 * Default function to add a text string to the control bar.
 * @param {Object} json Serialized form
 * @param {HTMLElement} elm Current form wrapper
 */
export default function jsonToCbar(json, elm)
{
    let     
        out=[],
        title=[],
        cbar= elm.querySelector('.js-cbar_txt')
        ;
    
    for(let i in json)
    {
        if(json[i] && i!=='type'){
            title.push(`${i}: ${json[i]}`)
            out.push(json[i]);
        }      
    }

   if(out.length){
        cbar.title= title.join(' ');
        cbar.innerHTML=out.join(' ');
   }
   
}