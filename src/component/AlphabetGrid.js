/** */
Ext.define('component.AlphabetGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['store.Alphabet'],

    alias: 'widget.ALPHABET-GRID',

    /** @cfg {store.Alphabet} */
    availableLettersStore: null,

    store: {
        model: 'model.Letter',
        sorters: [{property: 'letter'}],
        proxy: 'memory',
    },
    columns: [
        {text: 'English letter', dataIndex: 'letter', flex: 1},
    ],
    selType: 'checkboxmodel',

    getContextActions(){
        return [
            {
                itemId: 'del',
                text: 'Delete',
                handler: this.removeSelection, scope: this
            },
        ]
    },

    initComponent(){
        this.callParent()
        this.initStores()
        this.initToolbar()
    },

    initStores(){
        if( ! this.availableLettersStore ){
            this.availableLettersStore = new store.Alphabet
            console.warn("availableLettersStore not set at initComponent")
        }
        this.store.on({
            add:(_, records ) => {
                const removeFromAvailableLetters =( record )=> {
                    const letter = record.get('letter')
                    const found  = this.availableLettersStore.find('letter', letter)
                    if( found >= 0 ) this.availableLettersStore.removeAt( found )
                }
                records.forEach( removeFromAvailableLetters )
            },
            remove:(_, record ) => this.availableLettersStore.add( record )
        })
    },

    initToolbar(){
        const toolbar = this.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {xtype: 'combo',
                    itemId: 'input',
                    store: this.availableLettersStore,
                        displayField: 'letter',
                        queryMode: 'local',
                    vtype: 'alpha',
                        allowBlank: false,
                        maxLength: 1,
                        validateOnBlur: false,
                    editable: false,
                    autoSelect: true,
                    disabled: true,
                    width: 40,
                },
                {
                    itemId: 'add',
                    text: 'Add',
                    disabled: true,
                    handler:() => {
                        const input = this.queryById('input')
                        const letter = input.getValue()
                        if( input.isValid() ){
                            this.store.addSorted( new model.Letter({letter}) )
                            input.select( input.store.first() )
                        }
                    }
                },
            ].concat( this.getContextActions() )
        })[0]

        const menu = new Ext.menu.Menu({
            items: this.getContextActions()
        })
        this.on('itemcontextmenu', (_, __, ___, ____, event) => {
             event.stopEvent()
             menu.showAt(event.xy)
        })

        this.availableLettersStore.on({
            add: updateAddDisability,
            remove: updateAddDisability,
        })
        function updateAddDisability(){
            const disable = this.count()==0
            toolbar.queryById('input').setDisabled( disable )
            toolbar.queryById('add').setDisabled( disable )
        }

        this.getSelectionModel().on('selectionchange', (_, selection) =>
            toolbar.queryById('del').setDisabled( selection.length == 0 )
        )
        toolbar.queryById('del').disable()

    },

    /** @param {boolean} confirm=true */
    removeSelection(confirm = true){
        const selection = this.view.getSelectionModel().getSelection()
        if( selection.length ){
            const remove =()=> this.store.remove( selection )
            if( confirm ){
                Ext.Msg.confirm(
                    'Delete letter(s)',
                    'Do you really want to delete ' + selection.length + ' selected letter(s)?',
                    ifPressed => ifPressed=='yes' && remove()
                )
            }else{
                this.store.suspendEvent('remove')
                remove()
                this.store.resumeEvent('remove')
            }
        }
    },

    /** @param {model.Letter[]} records */
    setData( records ){
        this.store.loadData( records )
    },
})
