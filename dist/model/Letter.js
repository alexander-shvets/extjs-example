'use strict';

Ext.define('model.Letter', {
    extend: 'Ext.data.Model',
    // validations: [
    //     {type: 'format', field: 'letter', matcher: /[A-Z]/}
    // ],
    fields: [{ name: 'letter', type: 'string' }, { name: 'leaf', type: 'boolean', defaultValue: true }]
});
//# sourceMappingURL=Letter.js.map