var devices = choices.choices;
var select = null;
var length = Object.keys(devices).length;
var createButton;
var total;
// window beginnings
window.onload = function(){
    // try catch to catch if local storage is work or not
    try{
        localStorage.total = 0;
    }catch(Exception){
        console.log("not work");
        cookie();
    }
    // animation start 
    animation();

    console.log("ini start");
    
    // create 'submit' button
    button = document.getElementById("button");
    createButton = document.createElement("button");
    createButton.textContent = "Submit";
    button.appendChild(createButton);
    createButton.onclick = function(){
        result();
    }
    // craete a 'clear' button
    clearButton = document.getElementById("clear_button");
    create_clearButton = document.createElement("button");
    create_clearButton.textContent = "Reset";
    clearButton.appendChild(create_clearButton);
    create_clearButton.onclick = function(){
        reset();
    }

    //create the first main select 
    divSelect = document.getElementById("mainSelect");
    selectChoices("main");
    
};

var keyIndex = null;    //for set different select id.
// function to select is onchange
function selectChoices(selected){
    
    for(var i = 0;i<length;i++){
        
        if(devices[i].key != selected){
            continue;
        }
        // check depth function
        checkDepth(devices[i].depth);

        keyIndex = i;
        var select = document.createElement("select");
        select.id = "select"+i;
        // append the option 1
        var option1 = document.createElement("option");
        option1.value = devices[i].option_1;
        option1.textContent = devices[i].option_1;
        // append the option 2
        var option2 = document.createElement("option");
        option2.value = devices[i].option_2;
        option2.textContent = devices[i].option_2;
        // append the option 3
        var option3 = document.createElement("option");
        option3.value = devices[i].option_3;
        option3.textContent = devices[i].option_3;
        // set the description to the first selection
        var description = document.createElement("option");
        description.textContent = devices[i].description;
        description.selected = true;
        //create select append child
        select.appendChild(description);
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        // main select append create select
        divSelect.appendChild(select);
        divSelect.appendChild(document.createElement("br"));
        var choiceIndex = i;        //set the choice index for getDevicePrice()
        

        select.onchange = function(){
            selectChoices(select.value);

            var valueIndex;
            for(var i = 0;i<select.length;i++){
                if(select[i].value == select.value){
                    valueIndex = i;
               }
            }
            
            getDevicedPrice(choiceIndex,valueIndex);
            
        }   
    }

}

// will remove all those selection below the changed one
function checkDepth(depth){
    
    var divSelect = document.getElementById("mainSelect");
    var select = divSelect.getElementsByTagName("select");
    var br = divSelect.getElementsByTagName("br");
    var selectLength = select.length;
    if(depth < selectLength){
        for(var i = depth;i<selectLength;i++){
            divSelect.removeChild(select[(depth)]);
            divSelect.removeChild(br[(depth)]);
        }
    }
}
// get the device price to localStorage
function getDevicedPrice(choiceIndex,valueIndex){
    if(getPrice(choiceIndex,valueIndex) != undefined){
        localStorage.devicePrice = getPrice(choiceIndex,valueIndex);
    }
    if(getOtherPrice(choiceIndex,valueIndex) != undefined){
        localStorage.additionPrice = getOtherPrice(choiceIndex,valueIndex);
    }
}
// function that return the getDevicePrice() function's price.
function getPrice(choiceIndex,valueIndex){
    var price = 0;
    if(valueIndex == 1){
        price = devices[choiceIndex+1].price_1;
    }else if(valueIndex == 2){
        price = devices[choiceIndex+1].price_2;
    }else{
        price = devices[choiceIndex+1].price_3;
    }

    return price;
}
// get the other device type(storage:64GB || size:44mn) price to localStorage
function getOtherPrice(choiceIndex,valueIndex){
    var price = undefined;
    if(choiceIndex == 3 || choiceIndex == 4 || choiceIndex == 5){
        if(valueIndex == 1){
            price = devices[6].storage_1_price;
        }else if(valueIndex == 2){
            price = devices[6].storage_2_price;
        }else{
            price = devices[6].storage_3_price;
        }
    }else if(choiceIndex == 9 || choiceIndex == 10 || choiceIndex == 11){
        if(valueIndex == 1){
            price = devices[12].storage_1_price;
        }else if(valueIndex == 2){
            price = devices[12].storage_2_price;
        }else{
            price = devices[12].storage_3_price;
        }
    }else if(choiceIndex == 18 || choiceIndex == 19 || choiceIndex == 20){
        if(valueIndex == 1){
            price = devices[21].size_1_price;
        }else if(valueIndex == 2){
            price = devices[21].size_2_price;
        }else{
            price = devices[21].size_3_price;
        }
    }

    return price;
}
// get the browers select information
function result(){
    var array = new Array();
    
    var select = document.getElementById("mainSelect");
    var childSelect = select.getElementsByTagName("select");
    for(var i=0;i<childSelect.length;i++){
        var selectIndex = childSelect[i].options.selectedIndex;
        var optionValue = childSelect[i].options[selectIndex].value;
        array.push(optionValue);
    }
    // print out the result
    printOutResult(array);
}

// print out browers select information result
function printOutResult(resultArray){
    var recipeArray = ["Device --> ","Generation --> ","Type --> ","Color --> "];
    var recipe = document.getElementById("recipe");
    var amount = document.getElementById("amount");
    var array = resultArray;
    var rp = parseInt(localStorage["devicePrice"]);
    var ap = parseInt(localStorage["additionPrice"]);
    
    for(var i=0;i<array.length;i++){
        var span = document.createElement("span");
        if(i == 1){
            span.textContent = recipeArray[i]+array[i] + "--> $"+localStorage["devicePrice"];
        }else if(i == 2){
            span.textContent = recipeArray[i]+array[i] + "--> $"+localStorage["additionPrice"];
        }else{
            span.textContent = recipeArray[i]+array[i];
        }

        var br = document.createElement("br");
        recipe.appendChild(span);
        recipe.appendChild(br);
    }
    var span = document.createElement("span");
    span.textContent ="-----------------------------------";
    var br = document.createElement("br");
    recipe.appendChild(span);
    recipe.appendChild(br);
    var total = parseInt(localStorage["total"]);
    total += (rp+ap);
    localStorage["total"] = total;
    amount.textContent = "Total:$"+localStorage["total"];
}
// for reset button 
function reset(){
    window.location.reload();
    localStorage.clear();
}
// cookie for init function try catch
function cookie(){
    document.cookie="Warning=Current browser is not support LocalStorage, please use other Browser";
    var x = document.cookie;
    console.log("cookie:"+document.cookie);
    var receipt=document.getElementById("receipt");
    receipt.textContent=document.cookie;
}
// animation
function animation(){
    var top = document.getElementById("top");
    var height = 1;
    var width = 2;
    var timer = setInterval(function(){
        if(width <= 102){
            top.style.backgroundSize = width + "%" +" "+height+"%";
            width+=10;
            height+=10;
        }else{
            clearInterval(timer);
        }
    },50);

}
