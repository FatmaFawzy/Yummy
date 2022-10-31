// all Input
let value;
// let name=document.getElementById('name');
// let email=document.getElementById('email');
// let phone=document.getElementById('phone');
// let age=document.getElementById('age');
// let password=document.getElementById('password');
// let rePassword=document.getElementById('RePassword');
// let nameAlert=document.getElementById('nameAlert');
// let emailAlert=document.getElementById('emailAlert');
// let phoneAlert=document.getElementById('phoneAlert');
// let ageAlert=document.getElementById('ageAlert');
// let passwordAlert=document.getElementById('passwordAlert');
// let repasswordAlert=document.getElementById('repasswordAlert');
// let nameFocus=false;
// let emailFocus =false;
// let phoneFocus=false;
// let ageFocus=false;
// let passwordFocus=false;
// let repassFocus=false;

// loading
$(document).ready(function(){
    $(".loading .loader").fadeOut(700,function(){
        $(".loading").fadeOut(700,function(){
            $("body").css('overflow','auto');
        })
    })
    })

    function diplaySearch(){
        document.getElementById('searchSection').innerHTML='';
        document.querySelector('#display').innerHTML='';
        let cartoona=`   <div class="col-md-6">
        <input type="text" placeholder="Search By Name" id="searchByName" class="form-control">
    </div>
    <div class="col-md-6">
        <input type="text" placeholder="search By First Letter..." id="searchByFirstLet" class="form-control">
    </div>`
    document.getElementById('searchSection').innerHTML=cartoona;
    $('#searchByName').keyup(function(e){
        value=e.target.value;
        search(value);
    })
    $('#searchByFirstLet').keyup(function(e){
        value=e.target.value;
        searchBrLtter(value);
    })
    }
    
// sarch by name function
async function search(q){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
    let finalResult= await response.json();
    display(finalResult);  
}
// // search function calling
// $('#searchByName').keyup(function(e){
//     value=e.target.value;
//     search(value);
// })
// search by first letter
async function searchBrLtter(letter){
    let meal=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let meals= await meal.json();
    display(meals);
}
// // search by first letter function calling
// $('#searchByFirstLet').keyup(function(e){
//     value=e.target.value;
//     searchBrLtter(value);
// })
// search dispaly
function display(finalResult){
    document.querySelector('#display').innerHTML='';
    let cartoona='';
    for(let i=0;i<finalResult.meals.length;i++){
        cartoona+=`      <div class="col-md-6 col-lg-3 my-3  shadow">
        <div class="meal shadow rounded" onclick="getId(${finalResult.meals[i].idMeal})">
            <div class="meal-img">
                <img src="${finalResult.meals[i].strMealThumb}" alt="" class="w-100">
                <div class="layer">
                    <div class="meal-info">
                        <h2>${finalResult.meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    document.querySelector('#display').innerHTML=cartoona;
}
// meal instruction
async function getId(id){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let mealDetails = await response.json();
    displayInstruction(mealDetails.meals[0]);
    // console.log(mealDetails.meals[0])
}
// diplay instructions
function displayInstruction(mealDetails){
    let cartoona=`            <div class="col-md-4 text-white meals-info">
    <img src="${mealDetails.strMealThumb}" alt="" class="w-100">
    <br/>
    <h2 class="mt-2">${mealDetails.strMeal}</h2>
</div>
<div class="col-md-8 text-white text-start">
    <h2>Instructions</h2>
    <p>${mealDetails.strInstructions}</p>
    <p> <span class="fw-bolder">Area :</span> ${mealDetails.strArea}</p>
    <p><span class="fw-bolder">Category :</sp> ${mealDetails.strCategory}</p>
    <h3>Recipes :</h3>
    <ul class="d-flex flex-wrap " id="ingrdant">
    
    </ul>
    <h3>Tags :</h3>
    <ul class="d-flex flex-wrap" id="tag">
    </ul>
    <a href="${mealDetails.strSource}" class="btn btn-success text-white" target="_blank">Source</a>
    <a href="${mealDetails.strYoutube}" class="btn youtube text-white" target="_blank">Youtube</a>
</div>`;
document.querySelector('#display').innerHTML=cartoona;
let ul =document.getElementById('ingrdant');
let tag=document.getElementById('tag');
for(let i=0;i<20;i++){
    if(mealDetails[`strIngredient${i}`]!=null && mealDetails[`strIngredient${i}`]!=''&& mealDetails[`strIngredient${i}`]!=undefined)
    ul.innerHTML+=`<li class="my-3 mx-1 p-1 ingrd-border rounded">${mealDetails[`strIngredient${i}`]}</li>`;
}
if(mealDetails.strTags!=''){
    let tags=mealDetails.strTags.split(",");
for(let i=0;i<tags.length;i++){
    tag.innerHTML+=`<li class="my-3 mx-1 p-1 type rounded">${tags[i]}</li>`
}
}

}
// List all meal categories
async function mealsCategory(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let mealCategory = await response.json();
    // console.log(mealCategory);
    catgDisplay(mealCategory);
}
// mealsCategory();
// display categores
function catgDisplay(mealCategory){
    let cartoona='';
    document.querySelector('#display').innerHTML='';
    for(let i=0;i<mealCategory.categories.length;i++){
        // let cat=mealCategory.categories[i].strCategory;
        document.querySelector('#display').innerHTML+=`        <div class="col-md-6 col-lg-3 my-3 shadow">
        <div class="categ-contain shadow rounded">
            <div class="meal-img lay"  onclick="filtrByCategory('${mealCategory.categories[i].strCategory}')">
                <img src="${mealCategory.categories[i].strCategoryThumb}" alt="" class="w-100">
                <div class="layer">
                    <div class="catg-info">
                        <h2>${mealCategory.categories[i].strCategory}</h2>
                        <p>${mealCategory.categories[i].strCategoryDescription.split(" ").splice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>`
    }
    // $('.search').css("display","none");
    // document.querySelector('#display').innerHTML=cartoona;
}
// filter by category function
async function filtrByCategory(catg){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catg}`);
    let Category = await response.json();
    display(Category);
}
// diplay meals of area
async function area(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let area = await response.json();
    areaDisplay(area);
    // console.log(area)
}
// area();
function areaDisplay(area){
    let cartoona='';
    for(let i=0;i<area.meals.length;i++){
        cartoona+=`        <div class="col-md-6 col-lg-3 my-3 shadow">
        <div class="categ-contain shadow rounded" onclick="areaMeal('${area.meals[i].strArea}')">
            <div class="city-icon" >
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${area.meals[i].strArea}</h2>
            </div>  
        </div>
    </div>`
    }
    // $('.search').css("display","none");
    document.querySelector('#display').innerHTML=cartoona;
}
// diplay meals of areas
async function areaMeal(q){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${q}`);
    let area = await response.json();
    display(area);
}
// list ingrediants
async function ingredaint(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingre = await response.json();
    console.log(ingre);
    ingreDisplay(ingre);
}
// ingredaint();
// display ingredaint list
function ingreDisplay(ingre){
    let cartoona='';
    for(let i=0;i<20;i++){
        cartoona+=`        <div class="col-md-6 col-lg-3 my-3 shadow">
        <div class="categ-contain shadow rounded"onclick="ingreMeal('${ingre.meals[i].strIngredient}')">
            <div>
            <i class="fa-solid fa-bowl-food fa-3x bwl"></i>
                <h2 class="text-white">${ingre.meals[i].strIngredient}</h2>
                <p class="text-white">${ingre.meals[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
                
            </div>  
        </div>
    </div>`
    }
    // $('.search').css("display","none");
    document.querySelector('#display').innerHTML=cartoona;
}
async function ingreMeal(q){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${q}`);
    let ingdant = await response.json();
    display(ingdant);
}
// defult meals
async function ingreMeal(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let random = await response.json();
    display(random);
}
ingreMeal();
// sideBar
let sidebarWidth=$(".nav").outerWidth();
let anotherWidth=$(".side-bar").outerWidth();
let finalWidth=sidebarWidth-anotherWidth;
console.log(finalWidth)
$('header').css('left',`-${finalWidth}px`);
$('.menu i').click(function(){
    if($('header').css('left')===`0px`){
        $("header").animate({left:`-${finalWidth}`},1000);
        $('#open').removeClass("d-none");
        $("#close").addClass("d-none");
        $("#search").animate({top:'50%',opacity:0},200,function(){
            $("#category").animate({top:'50%',opacity:0},200,function(){
                $("#area").animate({top:'50%',opacity:0},200,function(){
                    $("#ingredaint").animate({top:'50%',opacity:0},200,function(){
                        $("#contact").animate({top:'50%',opacity:0},200)
                    })
                })
            })
        })

    }
    else{
        $("header").animate({left:`0px`},1000,function(){
            $("#search").animate({top:'0',opacity:1},200,function(){
                $("#category").animate({top:'0',opacity:1},200,function(){
                    $("#area").animate({top:'0',opacity:1},200,function(){
                        $("#ingredaint").animate({top:'0',opacity:1},200,function(){
                            $("#contact").animate({top:'0',opacity:1},200)
                        })
                    })
                })
            })
        });
        $('#close').removeClass("d-none");
        $("#open").addClass("d-none");
    
        // $(".item1").animate({
        //     opacity: "1",
        //     paddingTop: "25px",
        // }, 2100), $(".nav .item2").animate({
        //     opacity: "1",
        //     paddingTop: "25px",
        // }, 2300), $(".nav .item3").animate({
        //     opacity: "1",
        //     paddingTop: "25px",
        // }, 2400), $(".nav .item4").animate({
        //     opacity: "1",
        //     paddingTop: "25px",
        // }, 2500), $(".nav .item5").animate({
        //     opacity: "1",
        //     paddingTop: "25px",
        // }, 2600)
    }
})
// form validation
// name check
function nameValidate(name){
    var regex=/^[a-zA-Z ]+$/;
    if(regex.test(name.value)==true){
        return true;
    }
    else{
        return false;
    }
}
// email check
function emailValidate(email){
    var regex=/^[a-zA-z0-9\!\#\$\&\*\{\}\^\\-\_\%\?\=\'\~]{1,30}@(gmail|yahoo)\.(com|org|net|us|info)$/;
    if(regex.test(email.value)==true){
        return true;
    }
    else{
        return false;
    }
}
// phone check
function phoneValidate(phone){
    var regex=/^(002){0,1}01[0125][0-9]{8}$/;
    if(regex.test(phone.value)==true){
        return true;
    }
    else{
        return false;
    }
}
// age check
function ageValidate(age){
    var regex=/^[1-9][0-9]$|100$/;
    if(regex.test(age.value)==true){
        return true;
    }
    else{
        return false;
    }
}
// password check
function passValidate(password){
    var regex=/^[0-9]{8,}[A-Za-z\!\#\$\%\^\&\*\@\?\|]{1,10}$/;
    if(regex.test(password.value)==true){
        return true;
    }
    else{
        return false;
    }
}
// rePassword check
function checkRepass(rePassword){
    if(rePassword.value==password.value){
        return true;
    }
    else{
        return false;
    }
}
// // input focus
// if(name){
//     name.addEventListener("focus", function(){
//         nameFocus = true;
//     })
// }
// if(email){
//     email.addEventListener("focus", function(){
//         emailFocus = true;
//     })
// }
// if(age){
//     age.addEventListener("focus", function(){
//         ageFocus = true;
//     })
// }
// if(phone){
//     phone.addEventListener("focus", function(){
//         phoneFocus = true;
//     })
// }
// if(password){
//     password.addEventListener("focus", function(){
//         passwordFocus = true;
//     })
// }
// if(rePassword){
//     rePassword.addEventListener("focus", function(){
//         repassFocus = true;
//     })
// }
// validation function
function validation(name,email,phone,age,password,rePassword,nameAlert,emailAlert,ageAlert,phoneAlert,passwordAlert,repasswordAlert,nameFocus,emailFocus,phoneFocus,passwordFocus,repassFocus,ageFocus){
    if(nameFocus==true){
        if(nameValidate(name)==true){
            name.classList.add('valid');
            name.classList.remove('invalid');
            nameAlert.classList.replace("d-block", "d-none"); 
        }else{
            nameAlert.classList.replace("d-none", "d-block"); 
            name.classList.replace("valid", "invalid")
        }
    }
    if(emailFocus==true){
        if(emailValidate(email)==true){
            email.classList.add('valid');
            email.classList.remove('invalid');
            emailAlert.classList.replace("d-block", "d-none"); 
        }else{
            emailAlert.classList.replace("d-none", "d-block"); 
            email.classList.replace("valid", "invalid")
        }
    }
    if(ageFocus==true){
        if(ageValidate(age)==true){
            age.classList.add('valid');
            age.classList.remove('invalid');
            ageAlert.classList.replace("d-block", "d-none"); 
        }else{
            ageAlert.classList.replace("d-none", "d-block"); 
            age.classList.replace("valid", "invalid")
        }
    }
    if(phoneFocus==true){
        if(phoneValidate(phone)==true){
            phone.classList.add('valid');
            phone.classList.remove('invalid');
            phoneAlert.classList.replace("d-block", "d-none"); 
        }else{
            phoneAlert.classList.replace("d-none", "d-block"); 
            phone.classList.replace("valid", "invalid")
        }
    }
    if(passwordFocus==true){
        if(passValidate(password)==true){
            password.classList.add('valid');
            password.classList.remove('invalid');
            passwordAlert.classList.replace("d-block", "d-none"); 
        }else{
            passwordAlert.classList.replace("d-none", "d-block"); 
            password.classList.replace("valid", "invalid")
        }
    }
    if(repassFocus==true){
        if(checkRepass(rePassword)==true){
            rePassword.classList.add('valid');
            rePassword.classList.remove('invalid');
            repasswordAlert.classList.replace("d-block", "d-none"); 
        }else{
            repasswordAlert.classList.replace("d-none", "d-block"); 
            rePassword.classList.replace("valid", "invalid")
        }
    }
    if(nameValidate(name)==true && emailValidate(email)==true && phoneValidate(phone)==true && ageValidate(age)==true && passValidate(password)==true && checkRepass(rePassword)==true){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }
}
// display form
function formDisplay(){
    document.getElementById('searchSection').innerHTML='';
    document.querySelector('#display').innerHTML='';
    let cartoona=`    <div class="row mt-3 p-2">
    <h2 class="text-light mb-4">ContacUs...</h2>
    <div class="row">
        <div class="col-md-6">
            <div class="form-sec">
                <input type="text" id="name" class="form-control shadow input-shadow " placeholder="Enter Your Name">
                <div class="alert mt-1 alert-danger d-none" id="nameAlert">Special Characters and Numbers not allowed</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-sec">
                <input type="email" id="email" class="form-control shadow input-shadow " placeholder="Enter Email">
                <div class="alert mt-1 alert-danger d-none"id="emailAlert">Enter valid email. *Ex: xxx@yyy.zzz</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-sec">
                <input type="tel" id="phone" class="form-control shadow input-shadow" placeholder="Enter phone">
                <div class="alert mt-1 alert-danger d-none"id="phoneAlert">Enter valid Phone Number</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-sec">
                <input type="text" id="age" class="form-control shadow input-shadow" placeholder="Enter Age">
                <div class="alert mt-1 alert-danger d-none"id="ageAlert">Enter valid Age</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-sec">
                <input type="password" id="password" class="form-control shadow input-shadow" placeholder="Enter Password">
                <div class="alert mt-1 alert-danger d-none"id="passwordAlert">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-sec">
                <input type="password" id="RePassword" class="form-control shadow input-shadow" placeholder="Enter RePassword">
                <div class="alert mt-1 alert-danger d-none"id="repasswordAlert">Enter valid Repassword</div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="col-md-3 m-auto"><button type="submit" class="btn btn-outline-danger mt-3" id="submitBtn"disabled>Submit</button></div?`
document.getElementById('display').innerHTML=cartoona;
let name=document.getElementById('name');
let email=document.getElementById('email');
let phone=document.getElementById('phone');
let age=document.getElementById('age');
let password=document.getElementById('password');
let rePassword=document.getElementById('RePassword');
let nameAlert=document.getElementById('nameAlert');
let emailAlert=document.getElementById('emailAlert');
let phoneAlert=document.getElementById('phoneAlert');
let ageAlert=document.getElementById('ageAlert');
let passwordAlert=document.getElementById('passwordAlert');
let repasswordAlert=document.getElementById('repasswordAlert');
let nameFocus=false;
let emailFocus =false;
let phoneFocus=false;
let ageFocus=false;
let passwordFocus=false;
let repassFocus=false;
$('.input-shadow').keyup(function(){
    validation(name,email,phone,age,password,rePassword,nameAlert,emailAlert,ageAlert,phoneAlert,passwordAlert,repasswordAlert,nameFocus,emailFocus,phoneFocus,passwordFocus,repassFocus,ageFocus);
})
// input focus
if(name){
    name.addEventListener("focus", function(){
        nameFocus = true;
    })
}
if(email){
    email.addEventListener("focus", function(){
        emailFocus = true;
    })
}
if(age){
    age.addEventListener("focus", function(){
        ageFocus = true;
    })
}
if(phone){
    phone.addEventListener("focus", function(){
        phoneFocus = true;
    })
}
if(password){
    password.addEventListener("focus", function(){
        passwordFocus = true;
    })
}
if(rePassword){
    rePassword.addEventListener("focus", function(){
        repassFocus = true;
    })
}
}

// function for sidebar
$('.property li').click(function(e){
    console.log(e.target.innerHTML)
    if(e.target.innerHTML=='Search'){
        document.getElementById('display').innerHTML='';
        diplaySearch();
        $('header').animate({left:`-${finalWidth}px`},1000);
    }
    if(e.target.innerHTML=='Categories'){
        document.getElementById('searchSection').innerHTML='';
        document.getElementById('display').innerHTML='';
        mealsCategory();
        $('header').animate({left:`-${finalWidth}px`},1000);
        
    }
    if(e.target.innerHTML=='Area'){
        document.getElementById('searchSection').innerHTML='';
        document.getElementById('display').innerHTML='';
        area();
        $('header').animate({left:`-${finalWidth}px`},1000);
    }
    if(e.target.innerHTML=='Ingredients'){
        document.getElementById('searchSection').innerHTML='';
        document.getElementById('display').innerHTML='';
        ingredaint();
        $('header').animate({left:`-${finalWidth}px`},1000);
    }
    if(e.target.innerHTML=='Contact Us'){
        formDisplay();
        $('header').animate({left:`-${finalWidth}px`},1000);
    }
}) 



