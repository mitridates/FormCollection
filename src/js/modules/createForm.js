import addButtonEvents from "./buttonsEvents.js";
import addFieldsEvents from "./fieldEvents.js";
import showArrows from "./arrows.js";
import modInputNames from "./modInputNames.js";
import createNodeFromTemplate from "./cloneTemplate.js";
/**
 * Create a new form from template
 * @param {Object} btn FormCollection.config.buttons[?] Config of the current button
 * @param {Object} config FormCollection config
 */
export default function createForm(btn, config)
{
    let newForm= createNodeFromTemplate(config, btn); 
    config.container.appendChild(newForm)
    addButtonEvents(newForm, config);
    addFieldsEvents(newForm, btn.jsonToNavbar);
    showArrows(config.container);
    modInputNames(config);
    return newForm;
}
