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

//twig example : 
//{% if citation.contributor() %}
//contributor.populate(JSON.parse('{{ citation.contributor | json_encode | raw }}'));//
//{% endif %}

contributor.populate(JSON.parse('[{"role":"editor","type":"person","initials":"J","lastname":"Doe","firstname":"John","screenname":"mitridates"},{"name":"Some Local Library ","role":"editor","type":"org","screenname":"SLL"}]'));

let comment= new FormCollection('.comment-wrapper', {
    prefix: 'comment',
    navbar:'#template-navbar',
    container:'.comments',
    buttons:[
        {
            node: '.js-clonner',
            template: '#template-comment',
            //jsonToCbar: function(json, elm){...}//custom callback for this button
        }
    ],
    /**
     * Fill with a string the current Control bar on 'input' events.
     * Default fallback join all fields with spaces.
     * @param {Object} json Form to json 
     * @param {HTMLElement} elm Current wrapper for this form
     */
    jsonToCbar: function(json, elm){//default callback for all buttons
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

let todolist= new FormCollection('.todolist-wrapper');


function instanceToDiv(instance, list){
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }

    Array.from(instance.config.container.children).forEach((elm)=>{
        
        let 
            divElm= document.createElement('div');
            ;

        elm.querySelectorAll('input, select').forEach(/**@param HTMLElement el*/el => 
        {
            let pElm= document.createElement('p'),
                name= el.name,
                value;
            ;
            value= (el.tagName.toLowerCase()==='select' ? (el.options[el.selectedIndex].value||null) : el.value||null)
            pElm.innerHTML= `${name}= ${value}`;
            divElm.appendChild(pElm);
        });

        list.appendChild(divElm)

    });  
}

let form = document.querySelector('#formCollection');

form.addEventListener('submit', (ev)=>{

    ev.preventDefault();
    //let data = new FormData(form);
    //for (let entry of data) {
        //console.log(entry);
    //}


    instanceToDiv(contributor, document.querySelector('.js-listContributor'));
    instanceToDiv(comment, document.querySelector('.js-listComment'));
    instanceToDiv(todolist, document.querySelector('.js-listTodo'));

});





    