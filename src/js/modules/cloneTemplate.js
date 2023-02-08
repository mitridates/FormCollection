/**
 * Clone template and add a new node to container
 * @param {Object} config FormCollection.config
 * @returns {HTMLElement}
 */
export default function createNodeFromTemplate(config, btn)
{
    
    let 
        tplNode=  btn.template.content.firstElementChild.cloneNode(true),
        tplNavbar=  config.navbarTemplate
        ;
        
        if(!tplNavbar){//navbar in form template?
            if(!btn.template.content.querySelector('.js-cbar')){
                throw Error(`Could\'n find navbar for ${config.inputPrefix}.`)
            }
        }else{
            tplNavbar= config.navbarTemplate.content.firstElementChild.cloneNode(true)
            tplNode.insertBefore(tplNavbar, tplNode.firstChild);//add control bar to node
        }
        

        return tplNode;    
}