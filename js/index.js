function open_sidebar(){
      $('.sidebar').css('padding-left','px').css('width','250px');
      $('.fa-close').toggleClass('d-none');
      $('.open-close-icon').toggleClass('d-none');
      $('.sidebar-content li').eq(0).animate({'top':'0px','left':'0px'},450)
      $('.sidebar-content li').eq(1).animate({'top':'0px','left':'0px'},550)
      $('.sidebar-content li').eq(2).animate({'top':'0px','left':'0px'},650)
      $('.sidebar-content li').eq(3).animate({'top':'0px','left':'0px'},750)
      $('.sidebar-content li').eq(4).animate({'top':'0px','left':'0px'},850)
   
}
function close_sideber(){
   
      $('.sidebar').css('padding-left','0px').css('width','0px');
      $('.fa-close').toggleClass('d-none');
      $('.open-close-icon').toggleClass('d-none');
      $('.sidebar-content li').eq(0).animate({'top':'300px','left':'-50px'},850)
      $('.sidebar-content li').eq(1).animate({'top':'300px','left':'-50px'},750)
      $('.sidebar-content li').eq(2).animate({'top':'300px','left':'-50px'},650)
      $('.sidebar-content li').eq(3).animate({'top':'300px','left':'-50px'},550)
      $('.sidebar-content li').eq(4).animate({'top':'300px','left':'-50px'},450)

   
}
$('.open-close-icon').click(open_sidebar);
$('.fa-close').click(close_sideber);
// select all links and apply the logic for it 
$('.sidebar-content a').eq(0).click(function(){         //search 
      $('.contact').addClass('d-none');
      $('.mainData').addClass('d-none')
      close_sideber();
      $('.search').removeClass('d-none')
})
$('.sidebar-content a').eq(1).click( async function(){  //catagory
      $('.contact').addClass('d-none');
      $('.mainData').removeClass('d-none')
      close_sideber();
    const data=  await GetCatagory();
      DisplayCatagory(data);
      $('.search').addClass('d-none')
      
})
$('.sidebar-content a').eq(2).click( async function(){  //Area
      $('.contact').addClass('d-none');
      $('.mainData').removeClass('d-none')
      close_sideber();
    const data=  await GetCountry();
      DisplayArea(data)
      $('.search').addClass('d-none');
})
$('.sidebar-content a').eq(3).click( async function(){  //ingradient
      $('.mainData').removeClass('d-none')
      close_sideber();
    const data=  await GetIngredient();
      DisplayGradient(data)
      $('.search').addClass('d-none')
})
$('.sidebar-content a').eq(4).click( async function(){  //contact
      close_sideber();
      $('.mainData').addClass('d-none')
      $('.search').addClass('d-none');
      $('.contact').removeClass('d-none');
})
// handel case search by name
document.querySelector('#byName').addEventListener('input',async function(){
  const data=  await  SearchByName(this.value);
  if(data!=null)
  {

      document.querySelector('.mainData').classList.remove('d-none');
        DisplayMales(data,'.mainData');   ///888
  }

  

})
// handel case search by letter
document.querySelector('#byletter').addEventListener('input',async function(){
      if(this.value=='')
            return;
      else
      {
            const data=  await  SearchByLetter(this.value);
            if(data!=null)
                  DisplayMales(data,'.mainData');   ///88
      }
      

})
// all funcationlaties you need in the app
async function GetCatagory(){
      $('.loading').removeClass('d-none');

      const api=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const response=await api.json();
      $('.loading').addClass('d-none');

      return(response.categories);

}
function DisplayCatagory(data)
{
      boxData='';
      for(let i=0;i<data.length;i++)
      {
            boxData+=` <div class="col-3 py-2">
      <div class="inner  position-relative overflow-hidden  text-center">
        <img src="${data[i].strCategoryThumb}" class=" w-100 rounded-2" alt="">
        <div class="layer_catagory bg-white bg-opacity-75 p-1 position-absolute top-0 bottom-0 start-0 end-0" >
        <h3>${data[i].strCategory}</h3>
          <p>${data[i].strCategoryDescription.length<20?data[i].strCategoryDescription: data[i].strCategoryDescription.split(' ').slice(0,21).join(' ')}</p>
        </div>

      </div>
    </div>`
      }
      document.querySelector('.mainData').innerHTML=boxData;
      fromCatagoryToDisplay();
}
async function GetMales(cat){
      $('.loading').removeClass('d-none');
      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
      const response=await api.json();
      $('.loading').addClass('d-none');
      return(response.meals);
}
function DisplayMales(data,selector)
{
      boxData='';
      for(let i=0;i<data.length;i++)
      {
            boxData+=`<div class="col-md-3">
          <div id= "${data[i].idMeal}" class="inner  rounded-3 overflow-hidden position-relative">
            <img src="${data[i].strMealThumb}" class="w-100" alt="">
            <div
              class="layer ps-2 position-absolute top-0 bottom-0 start-0 end-0  d-flex justify-content-start align-items-center">
              <h2>${data[i].strMeal}</h2>
            </div>
          </div>
        </div>`
      }
      document.querySelector(selector).innerHTML=boxData;
      getId();
}
// =======Aears========
async function GetCountry()
{
      
      $('.loading').removeClass('d-none');

      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
      const response=await api.json();
      $('.loading').addClass('d-none');

      return (response.meals);
}
function DisplayArea(data)
{
      boxData='';
      for(let i=0;i<data.length;i++)
      {
            boxData+=`  <div class="col-md-3 text-white">
          <div class="inner text-center curoser">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${data[i].strArea}</h3>

          </div>
        </div>`
      }
      document.querySelector('.mainData').innerHTML=boxData;


      fromAreaToMale();

}
async function GetMalesByCountry(cuntry)
{
      $('.loading').removeClass('d-none');

      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuntry}`);
      const response=await api.json();
      $('.loading').addClass('d-none');
      return(response.meals);

}
// ======ingredient======
async function GetIngredient ()
{
      $('.loading').removeClass('d-none');

      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      const response=await api.json();
      $('.loading').addClass('d-none');

      return (response.meals);
}
function DisplayGradient(data)
{
      boxData='';
      for(let i=0;i<24;i++)
      {
            boxData+=`   <div class="col-md-3">
          <div class="inner text-white curoser text-center">
            <i class="fa fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>${data[i].strDescription.length<20? data[i].strDescription: data[i].strDescription.split(' ').slice(0,21).join(' ')}</p>
          </div>
        </div>`
      }
      document.querySelector('.mainData').innerHTML=boxData;
      fromIngradientToMale();
}
async function GetMalesByIngredient (ingredient )
{
      $('.loading').removeClass('d-none');

      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient }`);
      const response=await api.json();
      $('.loading').addClass('d-none');
      return(response.meals);

}
// ======detailes======
async function GetDetails (id )
{
      $('.loading').removeClass('d-none');
      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id }`);
      const response=await api.json();
      $('.loading').addClass('d-none');
      return(response.meals);

}
// ======search by name======

async function SearchByName(name){
      $('.loading').removeClass('d-none');
      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name }`);
      const response=await api.json();
      $('.loading').addClass('d-none');
      return(response.meals);
}
// ======search by letter======
async function SearchByLetter(letter){
      $('.loading').removeClass('d-none');

      const api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter }`);
      const response=await api.json();
      $('.loading').addClass('d-none');

      return(response.meals);
}
// when click any ingradient dispaly males made by this ingradient
function fromIngradientToMale(){
      let allArea=   document.querySelectorAll('.inner h3');
      let div=   document.querySelectorAll('.inner');
      for(let i=0;i<allArea.length;i++)
      {
         div[i].addEventListener('click',async function(){
            let data=  await GetMalesByIngredient(allArea[i].innerHTML);
   
             DisplayMales(data,'.mainData');
   
   
         })
      }
}
// when click any area dispaly males made by this area
function fromAreaToMale(){
      let allArea=   document.querySelectorAll('.inner h3');
      let div=   document.querySelectorAll('.inner');
      for(let i=0;i<allArea.length;i++)
      {
         div[i].addEventListener('click',async function(){
            let data=  await GetMalesByCountry(allArea[i].innerHTML);
   
             DisplayMales(data,'.mainData');
   
   
         })
      }
}
// when click any Catagory dispaly males made by this Catagory
function fromCatagoryToDisplay(){
      let allLayerCatagory=document.querySelectorAll('.layer_catagory ');
      let allCat=document.querySelectorAll('.layer_catagory h3');
      for (let i = 0; i < allLayerCatagory.length; i++) {
            allLayerCatagory[i].addEventListener('click', async function(){
                  let data=await GetMales(allCat[i].innerHTML);
                  DisplayMales(data,'.mainData');

            })
            
      }

}
// handel case when you open the app for first time
(async function(){
      const mainDataHome= await SearchByName("");
      DisplayMales(mainDataHome,'.mainData');
})()
function getId()
{
      let allMeals= document.querySelectorAll('.inner');
      for(let i=0;i<allMeals.length;i++)
      {
            allMeals[i].addEventListener('click',async function(){
                  
             let data=   await  GetDetails(allMeals[i].id)
             document.querySelector('.search').classList.add('d-none')
            
                  displayDetailes(data);
            })
      }
}
function displayDetailes(data)
{
      let detailesBox='';
      detailesBox=`
       <div class="col-md-4 "> 
         
          <img src="${data[0].strMealThumb}" class="w-100 rounded-3" alt="">
          <h1 class ="text-white">${data[0].strMeal}</h1>
        </div>
        <div class="col-md-8 text-white ">
          <h2>Instructions</h2>
          <p class="strInstruction">${data[0].strInstructions}</p>
          <h3> <span class=""fw-bold>Area: </span>${data[0].strArea}</h3>
          <h3> <span class=""fw-bold>Category: </span>${data[0].strCategory}</h3>
          <h4 class="recipesFormat">recipes : </h4>
          ${Measure(data)}
          <h4 class="mb-2 tagsFormat">Tages: </h4>
          ${tags(data)}
          
          <br/>

          <a href="${data[0].strSource}" class="btn btn-success">Souce</a>
          <a href="${data[0].strYoutube}" class="btn btn-danger">You tube</a>
         
         
        </div>
      `
      document.querySelector('.mainData').innerHTML=detailesBox;
}
// handel case Recipes 
function Measure(response){
      let arr=[];
      for(let i=1;i<21;i++)
      {
            let Measure='strMeasure';
            let strIngredient='strIngredient';
            if(response[0][Measure+i]==""||response[0][Measure+i]==null||response[0][strIngredient+i]==""||response[0][strIngredient+i]==null)
                  break;
            else
          arr.push( `<p class="bg-measure rounded-2  mb-3 me-3 py-1 px-2 d-inline-block">${response[0][Measure+i] + response[0][strIngredient+i]}</p>`);  
      }
      return arr.toString().split(',').join(' ');
}
function tags(response){
      let tags=response[0].strTags;
      let tagsFormate='';
      if(tags!=null){
            tags=  tags.split(',');
            for(let i=0;i<tags.length;i++)
            {
             tagsFormate+=`
             <p class="bg-danger-subtle text-black px-2 text-opacity-75 d-inline-block rounded-2 p-1">${tags[i]}</p>
             `
            }
      }
   return(tagsFormate);   

}

// ====================validation===================
let allInputs=document.querySelectorAll('.contact input');
let Name=document.getElementById('Name');
let Email=document.getElementById('Email');
let Phone=document.getElementById('phone');
let age=document.getElementById('age');
let Password=document.getElementById('Password');
let RePassword=document.getElementById('RePassword');
let button=document.querySelector('.button button');
Name.addEventListener('input',function(){
    if(validation(this,$(this).next()))
      
    bottomAction();
})
Email.addEventListener('input',function(){
    if(validation(this,$(this).next()))
      ;
    bottomAction();
})
Phone.addEventListener('input',function(){
    if(validation(this,$(this).next()))
      ;
    bottomAction();
})
age.addEventListener('input',function(){
    if(validation(this,$(this).next()))
          bottomAction();
})
Password.addEventListener('input',function(){
    if(validation(this,$(this).next()))
      ;
      bottomAction();
})
RePassword.addEventListener('input',function(){
      const pass=Password.value;
      if(pass===RePassword.value)
      {
            RePassword.classList.add('is-valid')
            RePassword.classList.remove('is-invalid')
            $(RePassword).next().addClass('d-none');
             }
      else{
            RePassword.classList.add('is-invalid')
            RePassword.classList.remove('is-valid')
            $(RePassword).next().removeClass('d-none');
      }
      bottomAction();
//     if(validation(this,$(this).next()))
//       ;
})
function validation(curentValid,alert)
{                        
      let allRegx={
            Name:/^[a-zA-Z]{5,}$/g,
            Email:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/g,
            phone:/^(01(?:0|1|2|5))[0-9]{8}$/gi,
            age:/^(?:[5-9]|[1-9][0-9])$/gi,
            Password:/^(?=.*[0-9]{3,})(?=.*[a-zA-Z]{5,}).*$/g,
            RePassword:/^(?=.*[0-9]{3,})(?=.*[a-zA-Z]{5,}).*$/g,
      }
            if(allRegx[curentValid.id].test(curentValid.value))
      {
            curentValid.classList.add('is-valid')
            curentValid.classList.remove('is-invalid')
            alert.addClass('d-none');
            return true
            

      }
      else
      {
            curentValid.classList.add('is-invalid')
            curentValid.classList.remove('is-valid')
            alert.removeClass('d-none');
            return false;

      }
}
function bottomAction(){
   let counter=0;
     for(let i=0;i<allInputs.length;i++)
     {
      if(allInputs[i].classList.contains('is-valid'))
            counter ++;
     }

      if(counter==allInputs.length)
     {
       button.classList.remove('disabled');
       document.querySelector('.model').classList.remove('d-none');
       button.classList.add('d-none')
    }
     else
     {
           button.classList.add('disabled');
           document.querySelector('.model').classList.add('d-none');
           button.classList.remove('d-none')

     }
}
// when button is work
document.querySelector('.close').addEventListener('click',function(){
      location.href='../index.html';
})