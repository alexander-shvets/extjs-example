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

    /** @public */
    popAll(){
        const allRecords = this.getRange()
        this.removeAll()
        return allRecords
    },
})
