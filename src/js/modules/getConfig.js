import jsonToCbar from "./jsonToCbar.js";
/**
 * Create the FormCollection.config object
 * @param {HTMLElement} w Wrapper 
 * @param {Object} params Second argument in FormCollection. Used only to fill with text the control bar is exists.
 * @return {Object}
 */
export default function getConfig(w, params)
{
    let 
        wrapper= document.querySelector(w),
        config= {
            wrapper: wrapper,
            inputPrefix:  wrapper.dataset.prefix,
            navbarTemplate: document.querySelector(wrapper.dataset.navbar),
            container: wrapper.querySelector(wrapper.dataset.container),
            buttons: []
        }
        ;
        wrapper.querySelectorAll(wrapper.dataset.buttons).forEach((elm)=>
    {
        let bttn= {
            node: elm,
            type: elm.dataset.type,
            template: document.querySelector(elm.dataset.template),
        }
        if(params && params.hasOwnProperty('jsonToCbar')){
            bttn.jsonToCbar= params['jsonToCbar']
        }else{
            bttn.jsonToCbar= jsonToCbar;
        }
        if(!bttn.type) console.warn(`Button type is null`);
        if(!bttn.template) throw new Error(`Button template is null`);

        config.buttons.push(bttn)
    });

    if(!config.inputPrefix) throw new Error(`Prefix is null`);
    if(!config.navbarTemplate) console.warn(`navbar is null`);
    if(!config.container) throw new Error(`Container is null`);
    if(!config.buttons.length) throw new Error(`Buttons is null`);
    return config;    
}