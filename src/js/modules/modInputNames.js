/**
 * Rename all input/select to create an input array with different index for each node in container.
 * @param {Object} config FormCollection.config
 */
export default function modInputNames(config)
{
    Array.from(config.container.children).forEach((child , i)=>{

        child.querySelectorAll('input, select').forEach(elm => {
            elm.name = `${config.inputPrefix}[${i}][${elm.dataset.name}]`;
        })

    })
}