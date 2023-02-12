/**
 * Clone template and add a new node to container
 * @param {Object} config FormCollection.config
 * @returns {HTMLElement}
 */
export default function createNodeFromTemplate(config, btn)
{
    
    let 
        tplNode=  btn.template.content.firstElementChild.cloneNode(true),
        tplNavbar=  config.navbar
        ;
        
        if(!tplNavbar){//navbar in form template?
            if(!btn.template.content.querySelector('.js-nav')){
                throw Error(`Could\'n find navbar for ${config.prefix}.`)
            }
        }else{
            tplNavbar= config.navbar.content.firstElementChild.cloneNode(true)
            tplNode.insertBefore(tplNavbar, tplNode.firstChild);//add control bar to node
        }
        

        return tplNode;    
}