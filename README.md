# FormCollection

FormCollection is a simple javascript plugin to create partial forms from templates and send the input data as an input array with a custom prefix.

Examples in [Online test in github pages](https://mitridates.github.io/FormCollection/test/index.html)

## Installation

Download and include as javascript module
```javascript
//index.js
import FormCollection from "../src/js/modules/FormCollection.mod.1.0.0.js";
```

## Usage
With dataset (also as second argument in example):
    
- data-prefix: the prefix for input fields.
- data-navbar: selector for navbar template. if it is not defined, the navbar must exists in the form. 
- data-container: selector for new nodes
- data-buttons: selector for button/s

Inside container define de button/s with the previous class selector and this dataset:

- data-template: Template for this button
- data-type: Only if uses more than one form (with multiple buttons). See test/index.html.
```html
    <!--Wrapper contains Dataset to create FormCollection.config-->
    <!--Wrapper has container and buttons HTMLElements -->
    <div class="py-2 comment-wrapper" 
        data-prefix="comment"
        data-navbar="#template-bar"
        data-container=".comments"
        data-buttons=".js-clonner"
        >
        <!--Container to render new HTMLElement with form-->
        <div class="comments border rounded  border-grey"></div>

        <!--Buttons to add new form/s to container -->
        <div class="p-2">
            <!--data-template is important. .js-clonner is defined in wrapper dataset-->
            <button type="button" 
            data-template="#template-comment"
            class="js-clonner btn btn-light border-dark"><i class="fa fa-comment" ></i>&nbsp;&nbsp;Add comment</button>
        </div>
    </div>
```

The template for navbar.

```html
    <!--Common navbar template to add in all templates. Classes .js-xxx are important for events-->
    <template id="template-bar">
        <div class="js-nav  d-flex flex-row bg-light">
            <div class="p-1"><button type="button" class="btn m-0 p-0 js-nav_trash" style="line-height: 0em;"><i class="fa fa-trash"></i></button></div>
            <div class="py-2 flex-grow-1 js-nav_txt" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis; cursor:pointer"></div>
            <div class="p-1" data-arrow="down"><button type="button" class="btn m-0 p-0 js-nav_down" style="line-height: 0em;"><i class="fa fa-arrow-down" aria-hidden="true"></i></button></div>
            <div class="p-1" data-arrow="up"><button type="button" class="btn m-0 p-0 js-nav_up" style="line-height: 0em;"><i class="fa fa-arrow-up" aria-hidden="true"></i></button></div>
            <div class="p-1"><button type="button" class="btn m-0 p-0 js-toggler" style="line-height: 0em;"><i class="fa fa-angle-down"></i></button></div>
        </div>
    </template>
    <!--end common navbar-->
```

The template for the form:
- All inputs must have a data-name, this will be used in input name as name="prefix[nodeIndex][name]".

```html
    <!--Comment template.  ID is defined in button dataset -->
    <template id="template-comment">
        <div class="border border-grey">
            <!--Form wrapper -->
            <div class="js-form">
                <div  class="row m-2">
                    <div class="col-md-3">
                        Comment
                    </div>
                    <div class="col-md">
                        <input data-name="comment" class="form-control" value="">
                    </div>
                </div>   
                <div  class="row m-2">
                    <div class="col-md-3">
                        Comment type
                    </div>
                    <div class="col-md">
                        <select data-name="role" tabindex="-1" class="form-control">
                            <option value="suggest">Sugggest</option>
                            <option value="complaint">Complaint</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>
            <!--End Form wrapper -->
        </div>
    </template>
    <!--end Comment template-->
```

The javascript part is simple. Create an instance with the wrapper selector as argument.

- Add a jsonToNavbar function to show a custom string in .js-nav>.js-nav_txt.

- Load previous data if required (mysql json field for example).

```javascript

let comment= new FormCollection('.comment-wrapper', {
    /**
     * Fill with a string the current Navbar on 'input' events.
     * The default function join all fields with spaces
     * @param {Object} json Form to json 
     * @param {HTMLElement} elm Current wrapper for this form
     */
    jsonToNavbar: function(json, elm){
        let 
        fields= ['comment', 'role'], 
        out=[],
        navTxt= elm.querySelector('.js-nav_txt');
        
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
    
    if(out.length)navTxt.title= navTxt.innerHTML=out.join(' ');
    }   
});
//Add previous data to the container
comment.populate(JSON.parse('[{"role":"complaint","comment":"The soup is cold"},{"role":"complaint","comment":"The salad is hot"},{"role":"suggest","comment":"This is a suggestion"}]'));
```
## License

[MIT](https://choosealicense.com/licenses/mit/)
