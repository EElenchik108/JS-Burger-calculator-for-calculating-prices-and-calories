'use strict';

  let elements = document.forms.burger.elements;
  let sizeBurger = elements['sizeBurger'];
  let cheese = elements['cheese']; 
  let salad = elements['salad']; 
  let potato = elements['potato']; 
  let mayonez = elements['mayonez']; 
  let spice = elements['spice']; 
  let button = elements['order'];
  let result = document.getElementById('result');
  let price = document.getElementById('price');
  let calories = document.getElementById('calories');

  class Burger {
    constructor(size, stuffing){ 
      this.size = size; 
      this.stuffing = stuffing; 
      this.spec = null; 
    } 
    static get SizePrice(){return {small: 50, large:100};}
    static get SizeKal(){return{small: 20, large:40}}  
    static get StufPrice(){return{cheese:2,salad:4, potato:4};}
    static get StufKal(){return {cheese:20,salad:5, potato:25};}
    static get SpecPrice(){return {mayonez:3,spice:1};}
    static get SpecKal(){return {mayonez:25,spice:0};}

    static createBG(){
      return new Burger('small', ['salad', 'potato' ] ) 
    }
  
    set specVal(spec){this.spec = spec;}
  
    addStuffing(){ 
      let stufPrice = 0;
      let stufKal = 0;
      for(let prop of this.stuffing){
        if (prop=='cheese'){stufPrice += Burger.StufPrice.cheese; stufKal += Burger.StufKal.cheese }
        if (prop=='salad') {stufPrice += Burger.StufPrice.salad; stufKal += Burger.StufKal.salad}
        if (prop=='potato'){stufPrice += Burger.StufPrice.potato; stufKal += Burger.StufKal.potato}
      }
      return {stPr:stufPrice, stKl:stufKal}
    }

    calcPrice(){
      let price = 0;
      price += this.addStuffing().stPr;
      if(this.spec) price += this.addSpec().spPr;
      if(this.size == 'small') price += Burger.SizePrice.small;
      if(this.size == 'large') price += Burger.SizePrice.large;
      return price;
    }
    calcKal(){
      let kal = 0;
      kal += this.addStuffing().stKl
      if(this.spec) kal += this.addSpec().spKl;
      if(this.size == 'small') kal+=  Burger.SizeKal.small;
      else  kal+= Burger.SizeKal.large;
      return kal;
    } 
  
    addSpec(){
      let specPrice = 0;
      let specKal = 0;
      if(this.spec)
      {
        for(let prop of this.spec){
              if (prop=='mayonez'){specPrice += Burger.SpecPrice.mayonez; specKal += Burger.SpecKal.mayonez }
              if (prop=='spice') {specPrice += Burger.SpecPrice.spice; specKal += Burger.SpecKal.spice}
            }
      } 
      return {spPr:specPrice, spKl:specKal}
    }  
  }

  button.addEventListener('click', ()=>{
    let size =  sizeBurger.value;
    let stuffing =  [(cheese.checked)?cheese.value:'',
            (salad.checked)?salad.value:'',
            (potato.checked)?potato.value:''];
    let spec = [(mayonez.checked)?mayonez.value:'',
          (spice.checked)?spice.value:''];
    let burger = new Burger(size,stuffing);
    if(spec.length) burger.specVal = spec;
    price.innerHTML = burger.calcPrice()+' grn';
    calories.innerHTML = burger.calcKal()+' Kal';   
  })

  let stuffing = [cheese, salad, potato];
  button.disabled = true;
  for (let j in stuffing) stuffing[j].addEventListener('change', ()=> {
    if (!cheese.checked&&!salad.checked&&!potato.checked) {
      result.innerHTML = "";
      button.disabled = true;}
      else button.disabled = false;  
  })

