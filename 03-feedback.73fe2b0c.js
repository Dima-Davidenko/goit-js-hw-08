function e(e){return e&&e.__esModule?e.default:e}var t,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,a=/^0o[0-7]+$/i,u=parseInt,f="object"==typeof n&&n&&n.Object===Object&&n,c="object"==typeof self&&self&&self.Object===Object&&self,l=f||c||Function("return this")(),d=Object.prototype.toString,m=Math.max,s=Math.min,p=function(){return l.Date.now()};function v(e,t,n){var o,r,i,a,u,f,c=0,l=!1,d=!1,v=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function g(t){var n=o,i=r;return o=r=void 0,c=t,a=e.apply(i,n)}function N(e){return c=e,u=setTimeout(y,t),l?g(e):a}function b(e){var n=e-f;return void 0===f||n>=t||n<0||d&&e-c>=i}function y(){var e=p();if(b(e))return M(e);u=setTimeout(y,function(e){var n=t-(e-f);return d?s(n,i-(e-c)):n}(e))}function M(e){return u=void 0,v&&o?g(e):(o=r=void 0,a)}function A(){var e=p(),n=b(e);if(o=arguments,r=this,f=e,n){if(void 0===u)return N(f);if(d)return u=setTimeout(y,t),g(f)}return void 0===u&&(u=setTimeout(y,t)),a}return t=S(t)||0,E(n)&&(l=!!n.leading,i=(d="maxWait"in n)?m(S(n.maxWait)||0,t):i,v="trailing"in n?!!n.trailing:v),A.cancel=function(){void 0!==u&&clearTimeout(u),c=0,o=f=r=u=void 0},A.flush=function(){return void 0===u?a:M(p())},A}function E(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function S(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==d.call(e)}(e))return NaN;if(E(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=E(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=i.test(e);return n||a.test(e)?u(e.slice(2),n?2:8):r.test(e)?NaN:+e}t=function(e,t,n){var o=!0,r=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return E(n)&&(o="leading"in n?!!n.leading:o,r="trailing"in n?!!n.trailing:r),v(e,t,{leading:o,maxWait:t,trailing:r})};const g={KEY_NAME:"feedback-form-state",EMAIL_INPUT_NAME:"email",MESSAGE_INPUT_NAME:"message",formNode:document.querySelector(".feedback-form"),formState:{},run:function(){g.checkStorage(),g.addInputEventListener(),g.addSubmitEventListener()},checkStorage:function(){const e=JSON.parse(localStorage.getItem(g.KEY_NAME));e&&(g.formState=e,g.updateFormFromStorageKey())},updateFormFromStorageKey:function(){const{EMAIL_INPUT_NAME:e,MESSAGE_INPUT_NAME:t,formNode:n,formState:o}=g,{[e]:r,[t]:i}=n.elements;r.value=o[e],i.value=o[t]},addInputEventListener:function(){g.formNode.addEventListener("input",e(t)(g.updateLocalStorage,500))},updateLocalStorage:function(e){const{name:t,value:n}=e.target;g.formState[t]=n,localStorage.setItem(g.KEY_NAME,JSON.stringify(g.formState))},addSubmitEventListener:function(){g.formNode.addEventListener("submit",g.clearLocalStorageAndFormOnSubmit)},clearLocalStorageAndFormOnSubmit:function(e){e.preventDefault(),g.readCurrentFormValues(),g.formNode.reset(),localStorage.removeItem(g.KEY_NAME),g.outputFormValues()},readCurrentFormValues:function(){const{EMAIL_INPUT_NAME:e,MESSAGE_INPUT_NAME:t,formState:n}=g,{[e]:o,[t]:r}=g.formNode.elements;n[e]=o.value,n[t]=r.value},outputFormValues(){console.log(g.formState)}};g.run();
//# sourceMappingURL=03-feedback.73fe2b0c.js.map