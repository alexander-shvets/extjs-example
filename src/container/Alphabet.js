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

    /** @cfg {number} treeSize number of tree items (1 - 26) */
    treeSize: 10,

    layout: 'border',

    initComponent(){
        const availableLetters = new store.Alphabet

        const dragNDropConfig = {
            tree: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    dragGroup: 'ab-tree-items',
                    dropGroup: 'ab-grid-items',
                    dragText: 'Move to the Grid &rBarr;',
                    sortOnDrop: true,
                },
                listeners: {
                    drop(){ grid.removeSelection(false) }
                },
            },
            grid: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'ab-grid-items',
                    dropGroup: 'ab-tree-items',
                    dragText: 'Move to the Tree &lBarr;',
                },
                listeners: {
                    drop(_, data){
                        this.store.sort()
                        //remove from tree store:
                        data.records.map( record => record.remove() )
                    }
                },
            },
        }

        this.items = [
            {xtype: 'ALPHABET-TREE',
                itemId: 'tree',
                region: 'west',
                width: '35%',
                split: true,
                viewConfig: dragNDropConfig.tree,
            },
            {xtype: 'ALPHABET-GRID',
                itemId: 'grid',
                region: 'center',
                availableLettersStore: availableLetters,
                viewConfig: dragNDropConfig.grid,
            },
        ]

        this.callParent()

        const grid = this.queryById('grid')
        const tree = this.queryById('tree')
        const records = availableLetters.popAll()

        tree.setData( records.slice(0, this.treeSize ) )
        grid.setData( records.slice( this.treeSize ) )
    },
})
