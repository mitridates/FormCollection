/**
 * Serialize This node to json
 * @param {HTMLElement} elm
 * @returns {object}
 */
export default function formToJson(elm)
{
    let json={};

        elm.querySelectorAll('input, select').forEach(/**@param HTMLElement el*/el => 
        {
            if(el.tagName.toLowerCase()==='select')
            {
                json[el.dataset.name]= el.options[el.selectedIndex].value||null;
            }else{
                json[el.dataset.name]= el.value||null;
            }
        });
        return json;
}