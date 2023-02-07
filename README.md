# FormCollection

FormCollection is a simple javascript plugin to create forms from templates and send the input data as an input array with a custom prefix.

[Online test](https://mitridates.github.io/FormCollection/test/index.html)

## Installation

Download and include as javascript module and use an index.js to create an instance:
index.html
```javascript
<script type="module" src="index.js"></script>
```
index.js
```javascript
import FormCollection from "../src/js/modules/FormCollection.mod.1.0.0.js";
let contributor= new FormCollection('.contributors-wrapper');
```
Or use inline in index.html

```javascript
    <script type="module">
        import formCollection from "bundles/FormCollection/src/js/modules/FormCollection.mod.1.0.0.js')}}";
        let contributor= new formCollection('.contributors-wrapper');
    </script>
```

## Usage

```javascript
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
//Populate container with json data from any source
contributor.populate(JSON.parse('[{"role":"editor","type":"person","initials":"F","lastname":"L\u00f3pez","firstname":"Fernando","screenname":"mitridates"},{"name":"Federaci\u00f3n de Espeleolog\u00eda de la Región de Murcia","role":"editor","type":"org","screenname":"FERM"}]'));
```
## License

[MIT](https://choosealicense.com/licenses/mit/)
