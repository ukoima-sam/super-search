let h1= document.querySelector('.h1')
let ts = Date.now()* Math.random()
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




document.querySelector('.search').addEventListener('click',()=>{
        let input = document.querySelector('.input')
        let value = input.value
        let url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&name=${value}&ts=${ts}&apikey=354c0d854e3e713a97e75617a0b4731d&hash=${hash}`
        fetch(url)
          .then(response => {
            //handle response            
            return response.json();
          })
          .then(res => {
            //handle data
            let dataOne = res.data
            console.log(dataOne);
          })
          .catch(error => {
            //handle error
          });
        
        
        url = `https://superhero-search.p.rapidapi.com/api/?hero=${value}`
        
        fetch(url, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        
        
        document.querySelector(".data1").innerHTML = `<img src="${dataOne.result[0].description}"></img>`
        
})