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
        config= {
            wrapper: document.querySelector(w),
            buttons:[]
        },
        buttons, val
        ;


        if(!config.wrapper) throw new Error(`Wrapper is null in ${w}`);

        ['prefix', 'navbar', 'container','buttons'].forEach((el)=>{
            
            val= (params && params.hasOwnProperty(el))? params[el] : config.wrapper.dataset[el];

            switch(el){
                case 'navbar':
                case 'container':  
                    if(el==='navbar'){
                        config[el]= (val)? document.querySelector(val) : val;
                    }else{
                        config[el]= (val)? config.wrapper.querySelector(val) : val;
                    }                     
                    break;
                case 'prefix':
                    config[el]= val;
                    break;
                case 'buttons':
                    if(val){
                        buttons= (typeof val==="string")? config.wrapper.querySelectorAll(val) : val;
                    }
                    break;
            }
        });

        

        if(!config.prefix) throw new Error(`Prefix is null for ${w}`);
        if(!config.container) throw new Error(`Container is null for ${w}`);
        if(!config.navbar) console.warn(`navbar is null for ${w}`);

        if(buttons && buttons.length){
            buttons.forEach((b)=>{

                let bttn= {
                    node: (b.nodeType)? b : config.wrapper.querySelector(b.node),
                    type: (b.nodeType)? b.dataset.type : b.type,
                    template: document.querySelector((b.nodeType)? b.dataset.template : b.template)
                    //jsonToCbar: (!b.nodeType && b.hasOwnProperty('jsonToCbar'))? b.jsonToCbar : jsonToCbar,
                };
                
                let tpl= (b.nodeType)? b.dataset.template : b.template;

                bttn['template']=  document.querySelector(tpl)

                bttn.jsonToCbar = (()=>{
                    if(!b.nodeType && b.hasOwnProperty('jsonToCbar')) return b['jsonToCbar']
                    if(params && params.hasOwnProperty('jsonToCbar')) return params['jsonToCbar']
                    return jsonToCbar;
                })();

                if(!bttn.type) console.warn(`Button type is null for ${w}`);
                if(!bttn.template) throw new Error(`Some Button template is null for ${w}`);
                config.buttons.push(bttn);
            })
        }

    if(!config.buttons.length) throw new Error(`No buttons for ${w}`);
    return config;    
}