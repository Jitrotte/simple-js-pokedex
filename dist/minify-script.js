let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/?limit=35";function n(e){t.push(e)}function o(){let t=$("input").val().toUpperCase();$("li").each(function(){let e=$(this);e.text().startsWith(t)?e.show():e.hide()})}function i(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height;let n=[];e.types.forEach(t=>n.push(t.type.name)),t.types=n}).catch(function(t){console.error(t)})}function a(t){i(t).then(function(){!function(t){let e=$(".modal-body"),n=$(".modal-title");n.empty(),e.empty();let o=document.createElement("h3");o.innerText=t.name;let i=document.createElement("p");i.innerText="Height: "+t.height;let a=document.createElement("p");a.innerText="Types: "+t.types;let l=document.createElement("img");l.classList.add("modal-img"),l.src=t.imageUrl,n.append(o),e.append(i),e.append(a),e.append(l)}(t)})}return $("input").on("input",o),addEvent=((t,e)=>t.addEventListener("click",function(){a(e)})),{add:n,getAll:function(){return t},addListItem:function(t){let e=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("group-pokemon-list");let o=document.createElement("button");o.innerText=t.name,o.classList.add("button-class"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokemonModal"),n.appendChild(o),e.appendChild(n),addEvent(o,t)},showDetails:a,addEvent:addEvent,loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:t.name.toUpperCase(),detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:i,filterList:o}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});