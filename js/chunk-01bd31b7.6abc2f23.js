(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01bd31b7"],{4996:function(e,t,a){},"6cad":function(e,t,a){"use strict";a("4996")},bb51:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"home"},[t("el-table",{attrs:{data:e.tableData,height:"100%"}},[t("el-table-column",{attrs:{prop:"address",label:"地址"}}),t("el-table-column",{attrs:{prop:"name",label:"姓名"}}),t("el-table-column",{attrs:{prop:"date",label:"时间"}}),t("el-table-column",{attrs:{prop:"name",label:"姓名"}}),t("el-table-column",{attrs:{prop:"date",label:"时间"}}),t("el-table-column",{attrs:{prop:"view",label:"查看按钮权限",width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:a}){return[t("el-switch",{attrs:{"active-color":"#13ce66","active-value":1,"inactive-value":0,"inactive-color":"#ff4949"},on:{change:function(t){return e.chgSwitch(a,0)}},model:{value:a.view,callback:function(t){e.$set(a,"view",t)},expression:"row.view"}})]}}])}),t("el-table-column",{attrs:{prop:"edit",label:"编辑按钮权限",width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:a}){return[t("el-switch",{attrs:{"active-color":"#13ce66","active-value":1,"inactive-value":0,"inactive-color":"#ff4949"},on:{change:function(t){return e.chgSwitch(a,1)}},model:{value:a.edit,callback:function(t){e.$set(a,"edit",t)},expression:"row.edit"}})]}}])}),t("el-table-column",{attrs:{prop:"del",label:"删除按钮权限",width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:a}){return[t("el-switch",{attrs:{"active-color":"#13ce66","active-value":1,"inactive-value":0,"inactive-color":"#ff4949"},on:{change:function(t){return e.chgSwitch(a,2)}},model:{value:a.del,callback:function(t){e.$set(a,"del",t)},expression:"row.del"}})]}}])}),t("el-table-column",{attrs:{label:"操作",width:e.formatBtnWidth},scopedSlots:e._u([{key:"default",fn:function({row:a}){return[t("div",{staticClass:"btnList"},[a.view?t("el-button",{attrs:{type:"success",size:"small",icon:"el-icon-edit-outline"}},[e._v("查 看")]):e._e(),a.edit?t("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit-outline"}},[e._v("编 辑")]):e._e(),t("el-popconfirm",{attrs:{title:"确认删除?",icon:"el-icon-warning","cancel-button-type":""}},[a.del?t("el-button",{attrs:{slot:"reference",type:"danger",size:"small",icon:"el-icon-close"},slot:"reference"},[e._v("删 除")]):e._e()],1)],1)]}}])})],1)],1)},i=[],n={name:"Home",data(){return{tableData:[{view:0,edit:0,del:0,date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{view:0,edit:0,del:0,date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{view:0,edit:0,del:0,date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{view:0,edit:0,del:0,date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"},{view:0,edit:0,del:0,date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{view:0,edit:0,del:0,date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{view:0,edit:0,del:0,date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{view:0,edit:0,del:0,date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}],formatBtnWidth:120,view:"1",edit:"1",del:"1"}},methods:{chgSwitch(e,t){this.$nextTick(()=>{this.formatBtnWidth=this.$formatBtnWidth()})}},mounted(){}},o=n,c=(a("6cad"),a("2877")),d=Object(c["a"])(o,l,i,!1,null,"c49bbee0",null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-01bd31b7.6abc2f23.js.map