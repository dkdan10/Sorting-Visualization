!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);class n{constructor(e){this.pushToRenderQueue=e,this.arrayToSort=[]}sort(e){this.arrayToSort=e.slice(),this.mergeSort(this.arrayToSort,0)}mergeSort(e,t){if(e.length<=1)return e;const r=Math.floor(e.length/2),n=e.slice(0,r),s=e.slice(r),i=this.merge(this.mergeSort(n,t),this.mergeSort(s,t+r),t);return this.arrayToSort=this.arrayToSort.slice(0,t).concat(i).concat(this.arrayToSort.slice(t+i.length)),this.pushToRenderQueue(this.arrayToSort),i}merge(e,t,r){let n=[],s=0,i=0;for(;s<e.length&&i<t.length;){const o=this.arrayToSort.slice(0,r).concat(n.concat(e.slice(s)).concat(t.slice(i))).concat(this.arrayToSort.slice(r+t.length+e.length));this.pushToRenderQueue(o,{selectedIdxs:{[r+s]:!0,[r+i+e.length]:!0}}),e[s]<t[i]?(n.push(e[s]),s++):(n.push(t[i]),i++)}return n.concat(e.slice(s)).concat(t.slice(i))}}class s{constructor(e,t){this.$visEl=e,this.$buttonsDiv=t,this.pushToRenderQueue=this.pushToRenderQueue.bind(this),this.renderQueue=[],this.config={arrayLength:10,sortMethod:0},this.mergeSortHelper=new n(this.pushToRenderQueue),this.sortingArray=[],this.resetSortingArray(),this.setupButtons(),this.renderQueueInterval=setInterval(()=>{this.checkRenderQueue()},200)}setupButtons(){const e=$("<input type='button' value='Start Merge Search'/>").click(e=>{e.preventDefault(),this.renderQueue.length||this.mergeSortHelper.sort(this.sortingArray.slice())}),t=$("<input type='text' value='10'/>").change(e=>{const t=parseInt(e.target.value);t&&t<=100&&t>0?(this.config.arrayLength=t,this.resetSortingArray()):t>100?(this.config.arrayLength=100,e.target.value=100,this.resetSortingArray()):t<1&&(this.config.arrayLength=1,e.target.value=1,this.resetSortingArray())}),r=$("<input type='button' value='New Array'/>").click(e=>{e.preventDefault(),this.resetSortingArray()});this.$buttonsDiv.append(e),this.$buttonsDiv.append(t),this.$buttonsDiv.append(r)}checkRenderQueue(){if(this.renderQueue.length){const e=this.renderQueue.shift();this.render(e.arrayState,e.extra.selectedIdxs)}}pushToRenderQueue(e,t={}){this.renderQueue.push({arrayState:e.slice(),extra:t})}render(e,t){this.$visEl.empty();const r=$("<ul>").addClass("visUl");for(let n=0;n<e.length;n++){const s=e[n],i=$("<li>").append(`<span>${s}</span>`).addClass("visLi").height(Math.floor(s/this.config.arrayLength*10)+"%");t&&t[n]&&i.addClass("selected"),r.append(i)}this.$visEl.append(r)}resetSortingArray(){this.sortingArray=[];for(let e=0;e<this.config.arrayLength;e++){const e=Math.floor(Math.random()*this.config.arrayLength*10)+1;this.sortingArray.push(e)}this.render(this.sortingArray)}}$(()=>{const e=$("#sorting-vis"),t=$("#buttons-div");new s(e,t)})}]);