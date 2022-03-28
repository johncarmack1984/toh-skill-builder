const fileMenu = {
    label: 'file',
    items: [ 
        { 
            'label': 'save character', 
            'action': () => { 
                console.log(pinia)  
            },
        },  
    ],
}

const resetMenu = {
label: 'reset',
items: [ { 'label': 'button', 'action': () => { console.log('action')}} ]
}        
const menus = [ fileMenu, resetMenu ]    