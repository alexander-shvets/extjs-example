/**
 * Application container.
 * Implements [container component pattern](http://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.9suil41s8).
 */
Ext.define('container.Alphabet', {
    extend: 'Ext.container.Viewport',
    requires: [
        'store.Alphabet',
        'component.AlphabetTree',
        'component.AlphabetGrid',
    ],

    alias: 'widget.ALPHABET',

    /** @cfg number of tree items (1 - 26) */
    treeSize: 10,

    layout: 'border',

    initComponent(){
        const availableLetters = new store.Alphabet
        this.items = [
            {xtype: 'ALPHABET-TREE',
                itemId: 'tree',
                region: 'west',
                width: '35%',
                split: true,
                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop',
                        dragGroup: 'ab-tree-items',
                        dropGroup: 'ab-grid-items',
                        dragText: 'Move to the Grid &rBarr;',
                        sortOnDrop: true,
                    },
                },
            },
            {xtype: 'ALPHABET-GRID',
                itemId: 'grid',
                region: 'center',
                availableLettersStore: availableLetters,
                viewConfig: {
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        dragGroup: 'ab-grid-items',
                        dropGroup: 'ab-tree-items',
                        dragText: 'Move to the Tree &lBarr;',
                    },
                    listeners: {
                        drop(){ this.store.sort() }
                    }
                },
            },
        ]

        this.callParent()

        const records = availableLetters.popAll()
        const grid = this.queryById('grid')
        const tree = this.queryById('tree')

        tree.setData( records.slice(0, this.treeSize ) )
        grid.setData( records.slice( this.treeSize ) )

        // Drag'n'Drop
        grid.view.on('drop', (_, data)=>
            //remove from tree store:
            data.records.map( record => record.remove() )
        )
        tree.view.on('drop', ()=> grid.removeSelection(false) )
    },
})
