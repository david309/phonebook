(window.webpackJsonpfso2_exercise_project=window.webpackJsonpfso2_exercise_project||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=(t(20),t(14)),i=t(2),l=(t(21),function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"Search for a name"),r.a.createElement("input",{onChange:e.onChange}))}),d=function(e){var n=e.formSubmit,t=e.changeNameInput,a=e.changeNumInput,c=e.newName,u=e.newNum;return r.a.createElement("div",null,r.a.createElement("h3",null,"Add a new contact"),r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t,value:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:a,value:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.person,t=e.deleteUser;return r.a.createElement("li",null,n.name," - ",n.number," ",r.a.createElement("button",{onClick:t},"delete"))},s=function(e){var n=e.message,t=e.style;return null===n?null:r.a.createElement("div",{className:"notification",style:"success"===t?{color:"green",background:"lightgray",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"red",background:"lightgray",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n)},f=t(3),b=t.n(f),p="/api/persons",h=function(){return b.a.get(p).then((function(e){return e.data}))},g=function(e){return b.a.post(p,e).then((function(e){return e.data}))},v=function(e){return b.a.delete("".concat(p,"/").concat(e.id)).then((function(e){return e.data}))},E=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},w=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),f=Object(i.a)(u,2),b=f[0],p=f[1],w=Object(a.useState)(""),y=Object(i.a)(w,2),j=y[0],S=y[1],O=Object(a.useState)(null),C=Object(i.a)(O,2),N=C[0],k=C[1],U=Object(a.useState)("success"),I=Object(i.a)(U,2),L=I[0],_=I[1];Object(a.useEffect)((function(){h().then((function(e){return c(e)}))}),[]);var x=function(e){setTimeout((function(){k(null)}),e)};return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook App"),r.a.createElement(s,{message:N,style:L}),r.a.createElement(l,{onChange:function(e){var n=Object(o.a)(t);n.forEach((function(n){n.name.toLowerCase().includes(e.target.value.toLowerCase())?n.display=!0:n.display=!1})),c(n)}}),r.a.createElement(d,{formSubmit:function(e){e.preventDefault();var n={name:b,number:j,display:!0};if(t.find((function(e){return e.name.toLowerCase()===b.toLowerCase()}))){if(!window.confirm("".concat(b," is already in the database. Update their number to ").concat(j,"?")))return;var a=t.find((function(e){return e.name===b}));E(a.id,n).then((function(e){c(t.map((function(n){return n.id!==a.id?n:e}))),_("success"),k("Updated ".concat(e.name,"!")),x(5e3)}))}else if(t.find((function(e){return e.number===j}))){if(!window.confirm("".concat(j," is already in the database. Update their name to ").concat(b,"?")))return;var r=t.find((function(e){return e.number===j}));E(r.id,n).then((function(e){c(t.map((function(n){return n.id!==r.id?n:e}))),_("success"),k("Updated ".concat(e.number,"!")),x(3500)}))}else g(n).then((function(e){c(t.concat(e)),_("success"),k("Added ".concat(e.name,"!")),x(3500)}));p(""),S("")},changeNameInput:function(e){p(e.target.value)},changeNumInput:function(e){S(e.target.value)},newName:b,newNum:j}),r.a.createElement("h3",null,"Numbers"),r.a.createElement("ul",null,t.filter((function(e){return!0===e.display})).map((function(e){return r.a.createElement(m,{key:e.id,person:e,deleteUser:function(){return n=e,void(window.confirm("Remove ".concat(n.name,"?"))&&v(n).then((function(e){c(t.filter((function(e){return e.id!==n.id}))),_("success"),k("Deleted ".concat(n.name,"!")),x(3500)})).catch((function(e){_("fail"),k("'".concat(n.name,"' has already been removed from the database!")),x(3500),c(t.filter((function(e){return e.id!==n.id})))})));var n}})}))))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.f204dc70.chunk.js.map