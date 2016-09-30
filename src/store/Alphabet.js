Ext.define('store.Alphabet', {
    extend: 'Ext.data.Store',
    model: 'model.Letter',
    proxy: 'memory',

    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    constructor(){
        this.callParent()
        const objects = this.letters.split('')
            .map( letter => ({letter}) )
        this.loadRawData( objects )
    },

    popAll(){
        const allRecords = this.getRange()
        this.removeAll()
        return allRecords
    },

    //TODO: get rid from this override — prevent combo box to load store on first expand
    load(opts){
        if(opts && opts.callback)
            opts.callback.apply(this, arguments)
    },
})
