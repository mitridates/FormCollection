import formToJson from './formToJson.js';
import createForm from "./createForm.js";
import getConfig from "./getConfig.js";

/**
 * 
 * @param {string} w Wrapper selector ID|class
 * @param {Object} args Config arguments. At the moment only to fill the Control bar on 'input' events

 */
export default function FormCollection(w, params) {

    /**
     * Set config from dataset 
     */
    let config = this.config= getConfig(w, params);

    config.buttons.forEach((b)=>{
        b.node.addEventListener('click', (ev) => {
            createForm(b, config)
        });
    });

}

/**
 * Serialize form to json
 * @returns {Object}
 */
FormCollection.prototype.serialize= function (){
    let out= [];
    Array.from(this.config.container.children).forEach((elm , i)=>{
        out.push(formToJson(elm))
    });
    return JSON.stringify(out);
}

/**
 * Populate container with some data
 * @param {Object[]} data
 */
FormCollection.prototype.populate= function (data){

    data.forEach((json , i)=>{

        let button;

        //find button by type or use default
        if(this.config.buttons.length===1){
            button= this.config.buttons[0];
        }else{
            for(let i in this.config.buttons){
                if(this.config.buttons[i].type===json.type){
                    button= this.config.buttons[i];
                    break;
                }
            }
        }
        
    
        if(!button){
            console.error(`No config button for ${json.type}`)
            return;
        }

        let newForm= createForm(button, this.config);//create HTMLElement from template

        newForm.querySelector('.js-nav_toggler').click();//Toggle (close)

        newForm.querySelectorAll('input, select').forEach(/**@param {HTMLElement} el*/el => {//set form values
            let name= el.dataset.name

            if(name in json) el.value= json[name];
        });

        
        button.jsonToNavbar(json, newForm);//Values to string in buttons bar
    })
}

/**
 * Used to copy/paste in edit/new pages
 */
FormCollection.prototype.copyToLocalStorage= function ()
{
    localStorage.setItem(`${this.config.prefix}Storage`, this.serialize());
}

/**
 * Used to copy/paste in edit/new pages
 */
FormCollection.prototype.pasteFromLocalStorage= function ()
{
    this.populate(JSON.parse(localStorage.getItem(`${this.config.prefix}Storage`)||[]));
}