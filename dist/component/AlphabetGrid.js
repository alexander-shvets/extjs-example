/** */
Ext.define('component.AlphabetGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['store.Alphabet'],

    alias: 'widget.ALPHABET-GRID',

    /** @cfg {store.Alphabet} */
    availableLettersStore: null,

    store: {
        model: 'model.Letter',
        sorters: [{ property: 'letter' }],
        proxy: 'memory'
    },
    columns: [{ text: 'English letter', dataIndex: 'letter', flex: 1 }],
    selType: 'checkboxmodel',

    getContextActions: function getContextActions() {
        return [{
            itemId: 'del',
            text: 'Delete',
            handler: this.removeSelection, scope: this
        }];
    },
    initComponent: function initComponent() {
        this.callParent();
        this.initStores();
        this.initToolbar();
    },
    initStores: function initStores() {
        var _this = this;

        if (!this.availableLettersStore) {
            this.availableLettersStore = new store.Alphabet();
            console.warn("availableLettersStore not set at initComponent");
        }
        this.store.on({
            add: function add(_, records) {
                var removeFromAvailableLetters = function removeFromAvailableLetters(record) {
                    var letter = record.get('letter');
                    var found = _this.availableLettersStore.find('letter', letter);
                    if (found >= 0) _this.availableLettersStore.removeAt(found);
                };
                records.forEach(removeFromAvailableLetters);
            },
            remove: function remove(_, record) {
                return _this.availableLettersStore.add(record);
            }
        });
    },
    initToolbar: function initToolbar() {
        var _this2 = this;

        var toolbar = this.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{ xtype: 'combo',
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
                width: 40
            }, {
                itemId: 'add',
                text: 'Add',
                disabled: true,
                handler: function handler() {
                    var input = _this2.queryById('input');
                    var letter = input.getValue();
                    if (input.isValid()) {
                        _this2.store.addSorted(new model.Letter({ letter: letter }));
                        input.select(input.store.first());
                    }
                }
            }].concat(this.getContextActions())
        })[0];

        var menu = new Ext.menu.Menu({
            items: this.getContextActions()
        });
        this.on('itemcontextmenu', function (_, __, ___, ____, event) {
            event.stopEvent();
            menu.showAt(event.xy);
        });

        this.availableLettersStore.on({
            add: updateAddDisability,
            remove: updateAddDisability
        });
        function updateAddDisability() {
            var disable = this.count() == 0;
            toolbar.queryById('input').setDisabled(disable);
            toolbar.queryById('add').setDisabled(disable);
        }

        this.getSelectionModel().on('selectionchange', function (_, selection) {
            return toolbar.queryById('del').setDisabled(selection.length == 0);
        });
        toolbar.queryById('del').disable();
    },


    /** @param {boolean} confirm=true */
    removeSelection: function removeSelection() {
        var _this3 = this;

        var confirm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var selection = this.view.getSelectionModel().getSelection();
        if (selection.length) {
            (function () {
                var remove = function remove() {
                    return _this3.store.remove(selection);
                };
                if (confirm) {
                    Ext.Msg.confirm('Delete letter(s)', 'Do you really want to delete ' + selection.length + ' selected letter(s)?', function (ifPressed) {
                        return ifPressed == 'yes' && remove();
                    });
                } else {
                    _this3.store.suspendEvent('remove');
                    remove();
                    _this3.store.resumeEvent('remove');
                }
            })();
        }
    },


    /** @param {model.Letter[]} records */
    setData: function setData(records) {
        this.store.loadData(records);
    }
});
//# sourceMappingURL=AlphabetGrid.js.map