import FormCollection from "../src/js/modules/FormCollection.mod.1.0.0.js";
let contributor= new FormCollection('.contributors-wrapper', {
    /**
     * Fill with a string the current Control bar on 'input' events.
     * The fallback join all fields with spaces
     * @param {Object} json Form to json 
     * @param {HTMLElement} elm Current wrapper for this form
     */
    jsonToCbar: function(json, elm){
        let 
        fields= {
            person: 'title firstname initials infix lastname suffix screenname'.split(' '),
            org: 'name screenname'.split(' ')
        }, 
        out=[],
        cbar= elm.querySelector('.js-cbar_txt');
        
    fields[json['type']].forEach(el=>{
        if (json[el]) 
        {
            if(['initials', 'screenname'].includes(el)){
                out.push(` (${json[el]}) `);
            }
            else{
                out.push(` ${json[el]} `);
            }            
        }
    });
    
    if(out.length)cbar.title= cbar.innerHTML=out.join('');
    }
});

contributor.populate(JSON.parse('[{"role":"editor","type":"person","initials":"J","lastname":"Doe","firstname":"John","screenname":"mitridates"},{"name":"Federaci\u00f3n de Espeleolog\u00eda de la Región de Murcia","role":"editor","type":"org","screenname":"FERM"}]'));

let comment= new FormCollection('.comment-wrapper', {
    /**
     * Fill with a string the current Control bar on 'input' events.
     * The fallback join all fields with spaces
     * @param {Object} json Form to json 
     * @param {HTMLElement} elm Current wrapper for this form
     */
    jsonToCbar: function(json, elm){
        let 
        fields= ['comment', 'role'], 
        out=[],
        cbar= elm.querySelector('.js-cbar_txt');
        
    fields.forEach(el=>{
        if (json[el]) 
        {
            if(['role'].includes(el)){
                out.push(`[${json[el]}]`);
            }
            else{
                out.push(`${json[el]}`);
            }            
        }
    });
    
    if(out.length)cbar.title= cbar.innerHTML=out.join(' ');
    }   
});

comment.populate(JSON.parse('[{"role":"complaint","comment":"The soup is cold!"},{"role":"complaint","comment":"The salad is hot!"},{"role":"suggest","comment":"This is a suggestion"}]'));

new FormCollection('.list-wrapper');

