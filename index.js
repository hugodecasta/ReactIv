let getRandomValues;const rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!getRandomValues))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}const byteToHex=[];for(let i=0;i<256;++i)byteToHex.push((i+256).toString(16).slice(1));var native={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};function v4(options,buf,offset){if(native.randomUUID&&!buf&&!options)return native.randomUUID();const rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(let i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return function(arr,offset=0){return(byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]).toLowerCase()}(rnds)}class Reacter{id=void 0;#value=void 0;#callbacks=[];
/**
     * 
     * @param {any} default_value first reacter value
     */
constructor(default_value){this.id=v4(),this.#value=default_value}
/**
     * Get or set the value as a normal variable
     * @type {any}
     * @return {any}
     */
set value(value){const old_value_str=JSON.stringify(this.#value);old_value_str!=JSON.stringify(value)&&(this.#value=value,this.#trigger(JSON.parse(old_value_str),value))}get value(){return this.#value}
/**
     * Subscribe to the reacter change
     * @param {function} func function called on reacter value change
     */
subscribe(func){this.#callbacks.push(func)}#trigger(old_value,new_value){this.#callbacks.forEach((func=>func(old_value,new_value)))}}class Component{id=void 0;#node=void 0;#classes=[];#elements=[];#style={};#events=[];
/**
     * 
     * @param {string} tag Component DOM element tag
     */
constructor(tag){this.id=v4(),this.#node=document.createElement(tag)}
/**
     * Add classes to your component
     * @param {string} classes Space separated class names
     * @returns current Component
     */
class(classes){return this.#classes.push(...classes.split(" ").filter((e=>e))),this.#classes=this.#classes.filter(((e,i,s)=>s.indexOf(e)==i)),this}
/**
     * Set component style
     * @param {object} style JSON encoded css style
     * @returns current Component
     */style(style){return this.#style={...this.#style,...style},this}
/**
     * Add sub element
     * @param  {...any} elements Elements
     * @returns current Component
     */add(...elements){this.#elements.push(...elements);for(const element of elements)element instanceof Reacter&&element.subscribe((()=>{this.render()}));return this}
/**
     * Hook event to the Component DOM element
     * @param {string} event_name Event type name
     * @param {function} func Callback function
     * @returns current Component
     */on(event_name,func){return this.#events.push([event_name,func]),this}
/**
     * SUGAR: hook click event (this.on("click",...))
     * @param {function} func OnClick event callback
     * @returns current Component
     */
click(func){return this.on("click",func)}async render(){const node=this.#node;node.innerHTML="";for(const element of this.#elements)element instanceof Component?(element.render(),node.append(element.get_element())):element instanceof Reacter?node.append(element.value):"string"==typeof element&&node.append(element);node.setAttribute("style",Object.entries(this.#style).map((([name,value])=>`${name}:${value}`)).join(";"));for(const[event_name,func]of this.#events)node.addEventListener(event_name,func)}get_element(){return this.#node}}const ReactIv={MD2:{App:function(){return new Component("div").class("MD2app")},Button:function(...inner){return new Component("button").class("MD2btn").add(...inner)}},...{Component:Component,Reacter:Reacter,init:function(element_id,component){const root=document.getElementById(element_id);component.render(),root.append(component.get_element())}}};export default ReactIv;
