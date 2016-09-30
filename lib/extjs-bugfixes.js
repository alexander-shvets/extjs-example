// fix for 4.2.1
// replaced <tpl if="checked !== null"> to <tpl if="checked != null">
// becouse undefined !== null && false != null
Ext.override(Ext.tree.Column, {
    cellTpl: [
        '<tpl for="lines">',
            '<img src="{parent.blankUrl}" class="{parent.childCls} {parent.elbowCls}-img ',
            '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>"/>',
        '</tpl>',
        '<img src="{blankUrl}" class="{childCls} {elbowCls}-img {elbowCls}',
            '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>"/>',
        '<tpl if="checked != null">',
            '<input type="button" role="checkbox" <tpl if="checked">aria-checked="true" </tpl>',
                'class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"/>',
        '</tpl>',
        '<img src="{blankUrl}" class="{childCls} {baseIconCls} ',
            '{baseIconCls}-<tpl if="leaf">leaf<tpl else>parent</tpl> {iconCls}"',
            '<tpl if="icon">style="background-image:url({icon})"</tpl>/>',
        '<tpl if="href">',
            '<a href="{href}" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
        '<tpl else>',
            '<span class="{textCls} {childCls}">{value}</span>',
        '</tpl>'
    ],
})
