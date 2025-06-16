const fruitBowl = [];
console.log(fruitBowl);
// let apple = "Apple";
// fruitBowl.push(apple);
// fruitBowl.push("Orange");
// fruitBowl.push("Banana");

// fruitBowl.pop();
// fruitBowl.push("Banana");
// fruitBowl.push("Peach");
// fruitBowl.pop();

// let grape = "Grape";
// fruitBowl.unshift(grape);
// fruitBowl.unshift("Melon");
// fruitBowl.shift();

//
//
//
const shoppingItem = document.getElementById("shoppingItem");
const pushButton = document.getElementById("pushButton");

const popButton = document.getElementById("popButton");
const unshiftButton = document.getElementById("unshiftButton");

const shiftButton = document.getElementById("shiftButton");
const displayItems = document.getElementById("displayItems");
const deleteButton = document.getElementById("deleteButton");

console.log(shoppingItem, pushButton, popButton, unshiftButton, shiftButton, displayItems, deleteButton);


/*pushButton.addEventListener("click", function(){
  //Hva skjer i de ulike?
  const shoppingItemValue = shoppingItem.value;
  if(shoppingItemValue){
    fruitBowl.push(shoppingItemValue);
    displayItems.textContent = fruitBowl.join(", ");
    shoppingItem.value = "";
  } else {
      console.log("Fyll inn innhold");
  };

});

popButton.addEventListener("click", function(){
    //Hva skjer i de ulike??
    fruitBowl.pop();
    displayItems.textContent = fruitBowl.join(", ");
});

unshiftButton.addEventListener("click", function(){
    //Hva skjer i de ulike??
    // Sett en if/else statement som bekrefter at shoppingintItemValue har verdi
    const shoppingItemValue = shoppingItem.value;
    fruitBowl.unshift(shoppingItemValue);
    displayItems.textContent = fruitBowl.join(", ");
    shoppingItem.value = "";
});

shiftButton.addEventListener("click", function(){
    //Hva skjer i de ulike??
    fruitBowl.shift();
    displayItems.textContent = fruitBowl.join(",")
});
*/

function shoppingList(event) {
  const shoppingItemValue = shoppingItem.value;
  const buttonId = event.target.id;

  if ( buttonId === "pushButton"){
    // All kode for push button
    if(shoppingItemValue){
        fruitBowl.push(shoppingItemValue);
        displayItems.textContent = fruitBowl.join(", ");
        shoppingItem.value = "";
        // document.getElementById("displayItems").classList.add("resultActive")

      } else {
          console.log("Fyll inn innhold");
      };

  } else if( buttonId === "popButton"){
    // All kode for pop button
    fruitBowl.pop();
    displayItems.textContent = fruitBowl.join(", ");




  } else if ( buttonId === "unshiftButton"){
    // All kode for unshift button
    const shoppingItemValue = shoppingItem.value;
    fruitBowl.unshift(shoppingItemValue);
    displayItems.textContent = fruitBowl.join(", ");
    shoppingItem.value = "";

  } else if (buttonId === "shiftButton"){
    // Alle ode for shiftButton
    fruitBowl.shift();
    displayItems.textContent = fruitBowl.join(",");

  } else if (buttonId === "deleteButton"){
    //
    fruitBowl.length = 0;

    displayItems.innerHTML = "";

  
  } else {
    // All kode for shiftButton
    console.log("Noe er grait ");
  }

}


pushButton.addEventListener("click", shoppingList);
popButton.addEventListener("click", shoppingList);
unshiftButton.addEventListener("click", shoppingList);
shiftButton.addEventListener("click", shoppingList);
deleteButton.addEventListener("click", shoppingList);