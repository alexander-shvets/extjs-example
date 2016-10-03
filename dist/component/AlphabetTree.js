Ext.define('component.AlphabetTree', {
    extend: 'Ext.tree.Panel',

    alias: 'widget.ALPHABET-TREE',

    store: {
        model: 'model.Letter',
        sorters: [{ property: 'letter' }],
        root: {
            letter: 'English Alphabet',
            expanded: true,
            leaf: false
        },
        proxy: 'memory'
    },
    displayField: 'letter',

    /** @public */
    setData: function setData(records) {
        this.store.getRootNode().appendChild(records);
    }
});
//# sourceMappingURL=AlphabetTree.js.map