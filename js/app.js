let h1= document.querySelector('.h1')
let ts = Date.now() * Math.random()
let priKey = "03e44437534630e4fa6f124017fcc160b5a26a38"
let pubKey = "354c0d854e3e713a97e75617a0b4731d"
let hashed = ts + priKey + pubKey
let hash = md5(hashed)

const options = {
  			method: 'GET',
  			headers: {
  				'X-RapidAPI-Key': '0bdcb93523mshec55743e6949434p1b6563jsn54afa1d4699a',
  				'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
  			}
      }




if(JSON.parse(localStorage.getItem('marvel'))){
  var stored = JSON.parse(localStorage.getItem('marvel'))
}
else{
  var stored = []
  let favCharacters = ['spiderman','thor','batman','hulk','flash','falcon']
  for (const elements of favCharacters) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0bdcb93523mshec55743e6949434p1b6563jsn54afa1d4699a',
        'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
      }
    };
  let url = `https://superhero-search.p.rapidapi.com/api/?hero=${elements}`
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      stored.push(response)
      localStorage.setItem('marvel',JSON.stringify(stored))
    });
    // .catch((err) => console.error(err));
}
}

function fetcher(element)  {
  var div = document.createElement("div")
  div.style.backgroundImage = `url('${element.images.lg}')`
  div.style.backgroundSize = "cover"
  div.style.backgroundRepeat = "no-repeat"
  div.style.backgroundPosition = "right 20%"
  div.classList.add("d-flex", "h-100", "text-white","px-3", "align-items-end", "gap-5","col-12","col-md-4","h-5","justify-content-end","pb-3")
  let template = `<div class="d-flex flex-column justify-content-end p-3 font-3 h-100 bg-black transi">
  <div>${element.name}</div>
  </div>`
  div.innerHTML = template
  document.querySelector('.output').appendChild(div)
  let child = document.querySelector('.output').children
  let children = [...child]
  children.forEach((items)=>{if (children.indexOf(items) > 1) {
    items.classList.add("reveal")
  }})
};

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);


function backer(element){
  document.querySelector('.output').innerHTML = ""
  stored.forEach(fetcher)
  document.querySelector(".backer").classList.toggle('d-none')
  document.querySelector('.cont').classList.add("justify-content-end")
  document.querySelector('.cont').classList.remove("justify-content-between")
}

// input functionality
document.querySelector('.cont').addEventListener("click",(e)=>{
  if(e.target === document.querySelector('.searcher')){
    document.querySelector('.searched').classList.toggle('d-none')
    document.querySelector('.searcher').classList.add("d-none")
    document.querySelector('.gone').classList.add("d-none")
    document.querySelector('.cont').classList.toggle("justify-content-end")
    document.querySelector('.cont').classList.toggle("justify-content-between")
  }
})





var value


document.querySelector('.search').addEventListener('click',()=>{
let input = document.querySelector('.input')
value = input.value
input.value = ""
document.querySelector('.cont').classList.remove("justify-content-end")
document.querySelector('.cont').classList.add("justify-content-between")
document.querySelector(".backer").classList.remove("d-none")
let createe = document.createElement("div")
createe.classList.add("d-flex", "justify-content-center", "description" ,"flex-column" ,"gap-2" ,"align-items-center","w-75","m-auto","reveal")
console.log(createe);
document.querySelector(".output").innerHTML = ""
document.querySelector(".output").appendChild(createe)
document.querySelector(".output").classList.remove("flex-md-row", "flex-md-wrap")
let url = `https://superhero-search.p.rapidapi.com/api/?hero=${value}`

fetch(url, options)
	.then(response => {return response.json()})
	.then(res => {
    console.log(res);
    let temp = `
    <h1 class="d-flex justify-content-center my-3 py-1 bg-black text-white w-50 m-auto">${res.name}</h1>
    <div class="d-flex gap flex-row justify-content-center align-items-center mx-2">
        <div class="w-50">
            <div class="mb-3">${res.biography.fullName}</div>
            <div>${res.appearance.gender}</div>
            <div>${res.appearance.race}</div>
            <div>${res.biography.alignment}</div>
            <div>${res.biography.publisher}</div>
        </div>
        <div>
            <img src="${res.images.md}" width="150"></img>
        </div>
        </div>
        <h3 class="d-flex justify-content-center my-3 bg-black text-white w-50 m-auto">DESCRIPTION</h3>`
    let tempTwo = `
    <h3 class="d-flex justify-content-center my-3 bg-black text-white w-50 m-auto">POWER STATS</h3>
    <div class="d-flex flex-column gap-3 align-items-start m-auto w-75">
        <div class="d-flex justify-content-between w-100">COMBAT: <div>${res.powerstats.combat}</div> </div>
        <div class="d-flex justify-content-between w-100">DURABILITY: <div>${res.powerstats.durability}</div> </div>
        <div class="d-flex justify-content-between w-100">INTELLIGENCE: <div>${res.powerstats.intelligence}</div> </div>
        <div class="d-flex justify-content-between w-100">POWER: <div>${res.powerstats.power}</div> </div>
        <div class="d-flex justify-content-between w-100">SPEED: <div>${res.powerstats.speed}</div> </div>
        <div class="d-flex justify-content-between w-100">STRENGTH: <div>${res.powerstats.strength}</div> </div>
    </div>`
    let created = document.createElement("div")
    let createdTwo = document.createElement("div")
    createdTwo.innerHTML = tempTwo
    created.innerHTML = temp
    created.classList.add("reveal")
    createdTwo.classList.add("reveal")
     document.querySelector(".output").insertBefore(created,document.querySelector(".description"))
     document.querySelector(".output").appendChild(createdTwo)
     
  })
  ;

url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&name=${value}&ts=${ts}&apikey=354c0d854e3e713a97e75617a0b4731d&hash=${hash}`
fetch(url)
  .then(response => {
    //handle response            
    return response.json();
  })
  .then(res => {
    //handle data
    console.log(res);
    if(document.querySelector(".description")){
    if(res.data.count == 0){
      temp = `<div>NOT IN OUR DATABASE</div>`
      document.querySelector(".description").innerHTML = temp 
  }
    else{
      temp = `<div>${res.data.results[0].description}</div>
      <div>${res.copyright}</div>`
      document.querySelector(".description").innerHTML = temp 
    }
  }
  })







//


})
// let val = document.querySelector('.info').innerHTML


