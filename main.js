(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){"Escape"===e.key&&r(document.querySelector(".popup_opened"))}function n(e){e.target===e.currentTarget&&r(document.querySelector(".popup_opened"))}function o(e){e.classList.add("popup_opened"),document.addEventListener("keydown",t),e.addEventListener("click",n)}function r(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",t),e.removeEventListener("keydown",n)}e.d({},{S:()=>N,M:()=>I}),document.querySelector(".popup");var c=function(e,t,n){var o=e.querySelector(".element__like");e.querySelector(".element__like-count").textContent=t.length,function(e,t){return Boolean(e.find((function(e){return e._id===t})))}(t,n)?o.classList.add("element__like_active"):o.classList.remove("element__like_active")},a=(document.querySelector(".element__title"),document.querySelector(".element__image"),document.querySelector("#element-image").content),u=document.querySelector(".popup_card-popup"),i=(document.querySelector(".popup__container_card-zoom-container"),document.querySelector(".popup__close_card-close"),document.querySelector(".popup__image_card-image")),l=document.querySelector(".popup__textbox_card-textbox"),s=document.querySelector(".elements"),p=document.querySelector(".popup_add-popup");function d(e,t,n){var r=function(e,t,n,r){var s=a.querySelector(".element").cloneNode(!0),p=s.querySelector(".element__title"),d=s.querySelector(".element__image"),m=s.querySelector(".element__delete"),_=s.querySelector(".element__like");return p.textContent=e.name,d.src=e.link,d.alt=e.name,c(s,e.likes,t),e.owner._id!==t&&m.remove(),_.addEventListener("click",(function(){n(e._id,_.classList.contains("element__like_active"),s)})),m.addEventListener("click",(function(){r(e._id,s)})),d.addEventListener("click",(function(){o(u),l.textContent=e.name,i.src=e.link,i.alt=e.name})),s}(t,n,N,I);e.prepend(r)}function m(e){e.classList.add("popup__submit_invalid"),e.disabled=!0}function _(e){var t=e.buttonElement,n=e.text,o=e.disabled;t.disabled=!!o&&"disabled",t.textContent=n}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}document.querySelector(".popup__container_add-container"),document.querySelector(".popup__container_edit-container");var y=document.querySelector(".profile__edit-button"),v=(document.querySelector(".popup__close_edit-close"),document.querySelector(".popup__name_edit-name")),b=document.querySelector(".popup__submit_edit-submit"),h=document.querySelector(".profile__add-button"),S=(document.querySelector(".popup__close_add-close"),document.querySelector(".popup__name_add-name")),q=document.querySelector(".popup__submit_add-submit"),E=document.querySelectorAll(".popup__close"),k=(document.querySelectorAll(".popup"),document.querySelector(".profile__name")),C=document.querySelector(".profile__prof"),L=document.querySelector(".popup__input_text_ed-name"),x=document.querySelector(".popup__input_text_ed-prof"),g=document.querySelector(".popup_edit-profile"),j=document.querySelector(".popup__input_text_ad-name"),T=document.querySelector(".popup__input_text__ad-link"),A=(document.querySelector(".popup__container_avatar"),document.querySelector(".profile__avatar-button")),P=(document.querySelector(".popup__close_avatar"),document.querySelector(".popup__name_avatar")),O=document.querySelector(".popup__submit_avatar-submit"),w=document.querySelector(".popup__input_text__avatar-link"),z=document.querySelector(".profile__avatar"),B=document.querySelector(".popup_avatar"),D=null;Promise.all([fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me",{headers:{authorization:"b9602b46-c70a-470b-a1e9-9ea7e0422b9a","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("https://nomoreparties.co/v1/plus-cohort-25/cards",{headers:{authorization:"b9602b46-c70a-470b-a1e9-9ea7e0422b9a","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];k.textContent=r.name,C.textContent=r.about,z.src=r.avatar,D=r._id,c.forEach((function(e){d(s,e,D)}))})),y.addEventListener("click",(function(){o(g),L.value=k.textContent,x.value=C.textContent})),v.addEventListener("submit",(function(e){var t;e.preventDefault(),_({buttonElement:b,text:"Сохраняем...",disabled:!0}),(t={name:L.value,about:x.value},fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me",{method:"PATCH",headers:{authorization:"b9602b46-c70a-470b-a1e9-9ea7e0422b9a","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){k.textContent=e.name,C.textContent=e.about,r(g)})).catch((function(e){console.log(e)})).finally((function(){_({buttonElement:b,text:"Сохранить",disabled:!1})}))})),h.addEventListener("click",(function(e){o(p),m(q)})),S.addEventListener("submit",(function(e){var t;e.preventDefault(),_({buttonElement:q,text:"Сохраняем...",disabled:!0}),(t={name:j.value,link:T.value},fetch("https://nomoreparties.co/v1/plus-cohort-25/cards",{method:"POST",headers:{authorization:"b9602b46-c70a-470b-a1e9-9ea7e0422b9a","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){d(s,t,D),r(p),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){_({buttonElement:q,text:"Сохранить",disabled:!1})}))})),A.addEventListener("click",(function(){o(B),m(O)})),P.addEventListener("submit",(function(e){var t;e.preventDefault(),console.log(w.value),_({buttonElement:O,text:"Сохраняем...",disabled:!0}),(t={avatar:w.value},fetch("https://nomoreparties.co/v1/plus-cohort-25/users/me/avatar",{method:"PATCH",headers:{authorization:"b9602b46-c70a-470b-a1e9-9ea7e0422b9a","Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){z.src=t.avatar,r(B),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){_({buttonElement:O,text:"Сохранить",disabled:!1})}))})),E.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){r(t)}))}));var M,N=function(e,t,n){var o,r;(o=e,r=t,fetch("https://nomoreparties.co/v1/plus-cohort-25/cards/likes/".concat(o),{method:r?"DELETE":"PUT",headers:{authorization:"b9602b46-c70a-470b-a1e9-9ea7e0422b9a","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){c(n,e.likes,D)})).catch((function(e){console.log(e)}))},I=function(e,t){var n;(n=e,fetch("https://nomoreparties.co/v1/plus-cohort-25/cards/".concat(n),{method:"DELETE",headers:{authorization:"b9602b46-c70a-470b-a1e9-9ea7e0422b9a","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){!function(e){e.remove(),e=null}(t)})).catch((function(e){console.log(e)}))};M={formSelector:".popup__name",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_invalid",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(M.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}(n,o,t)}))}))}(e,M)}))})();