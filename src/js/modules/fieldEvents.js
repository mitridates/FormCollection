import jsonToNavbar from './jsonToNavbar.js'
import formToJson from './formToJson.js'

/**
 * Add events to THIS elm form fields
 * @param {HTMLElement} elm Current node in container
 * @param {Function|undefined} callback Create a string from input data to use in control bar
 */
export default function addFieldsEvents(elm, callback)
{
    elm.querySelectorAll('input, select').forEach(/**@param {HTMLInputElement|HTMLSelectElement} el*/el => {      
       
        let evType= el.tagName.toLowerCase()==='select' ? 'change': 'input';

        el.addEventListener(evType, (ev)=>{
            if(callback){
                callback(formToJson(elm), elm);
            }else{
                jsonToNavbar(formToJson(elm), elm);
            }
        });

    })
}