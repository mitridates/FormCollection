/**
 * Clone template and add a new node to container
 * @param {Object} config FormCollection.config
 * @returns {HTMLElement}
 */
export default function createNodeFromTemplate(config, btn)
{
    
    let 
        ctemplate=  btn.template.content.firstElementChild.cloneNode(true),
        cbar=  config.navbarTemplate.content.firstElementChild.cloneNode(true)
        ;
        ctemplate.insertBefore(cbar, ctemplate.firstChild);//add control bar to node
        return ctemplate;    
}