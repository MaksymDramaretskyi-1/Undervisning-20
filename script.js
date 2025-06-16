// const fruitBowl = [];
// console.log(fruitBowl);
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
// const shoppingItem = document.getElementById("shoppingItem");
// const pushButton = document.getElementById("pushButton");
// const popButton = document.getElementById("popButton");
// const unshiftButton = document.getElementById("unshiftButton");
// const shiftButton = document.getElementById("shiftButton");
// const displayItems = document.getElementById("displayItems");
// const deleteButton = document.getElementById("deleteButton");

// const errorPopup = document.getElementById("errorPopup");
// const errorMessage = document.getElementById("errorMessage");
// const closeError = document.getElementById("closeError");


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


const fruitBowl = [];

const shoppingItem = document.getElementById("shoppingItem");
const shoppingPrice = document.getElementById("shoppingPrice");
const pushButton = document.getElementById("pushButton");
const popButton = document.getElementById("popButton");
const unshiftButton = document.getElementById("unshiftButton");
const shiftButton = document.getElementById("shiftButton");
const deleteButton = document.getElementById("deleteButton");
const displayItems = document.getElementById("displayItems");

const errorPopup = document.getElementById("errorPopup");
const errorMessage = document.getElementById("errorMessage");
const closeError = document.getElementById("closeError");

function showError(message) {
  errorMessage.textContent = message;
  errorPopup.classList.add("show");
}
function hideError() {
  errorPopup.classList.remove("show");
}
closeError.addEventListener("click", hideError);

function render() {
  displayItems.innerHTML = "";
  if (fruitBowl.length === 0) {
    displayItems.textContent = "Listen er tom.";
    return;
  }

  let totalPris = 0;

  fruitBowl.forEach((item, idx) => {
    totalPris += item.pris * item.antall;

    const itemDiv = document.createElement("div");
    itemDiv.style.marginBottom = "8px";

    itemDiv.innerHTML = `
      <strong>${item.navn}</strong> — ${item.pris.toFixed(2)} $ × ${item.antall} = ${(item.pris * item.antall).toFixed(2)} $
      <button data-action="minus" data-idx="${idx}" style="margin-left: 10px;">−</button>
      <button data-action="plus" data-idx="${idx}" style="margin-left: 5px;">+</button>
    `;

    displayItems.appendChild(itemDiv);

    // Кнопки + и −
    itemDiv.querySelector("button[data-action='minus']").addEventListener("click", () => {
      fruitBowl[idx].antall--;
      if (fruitBowl[idx].antall <= 0) {
        fruitBowl.splice(idx, 1);
      }
      render();
    });

    itemDiv.querySelector("button[data-action='plus']").addEventListener("click", () => {
      fruitBowl[idx].antall++;
      render();
    });
  });

  const totalDiv = document.createElement("div");
  totalDiv.style.marginTop = "10px";
  totalDiv.style.fontWeight = "bold";
  totalDiv.textContent = `Итого: ${totalPris.toFixed(2)} ₽`;
  displayItems.appendChild(totalDiv);
}

function shoppingList(event) {
  const shoppingItemValue = shoppingItem.value.trim();
  const shoppingPriceValue = parseFloat(shoppingPrice.value);
  const buttonId = event.target.id;

  hideError();

  if (buttonId === "pushButton") {
    if (!shoppingItemValue) {
      showError("Введите название товара.");
      return;
    }
    if (isNaN(shoppingPriceValue) || shoppingPriceValue < 0) {
      showError("Введите корректную цену.");
      return;
    }

    // Проверяем, есть ли уже такой товар
    const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === shoppingItemValue.toLowerCase());
    if (existingItem) {
      existingItem.antall++;
    } else {
      fruitBowl.push({ navn: shoppingItemValue, pris: shoppingPriceValue, antall: 1 });
    }

    shoppingItem.value = "";
    shoppingPrice.value = "";
    shoppingItem.focus();

    render();

  } else if (buttonId === "popButton") {
    if (fruitBowl.length === 0) {
      showError("Список уже пуст, нечего удалять.");
      return;
    }
    fruitBowl.pop();
    render();

  } else if (buttonId === "unshiftButton") {
    if (!shoppingItemValue) {
      showError("Введите название товара.");
      return;
    }
    if (isNaN(shoppingPriceValue) || shoppingPriceValue < 0) {
      showError("Введите корректную цену.");
      return;
    }

    const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === shoppingItemValue.toLowerCase());
    if (existingItem) {
      existingItem.antall++;
    } else {
      fruitBowl.unshift({ navn: shoppingItemValue, pris: shoppingPriceValue, antall: 1 });
    }

    shoppingItem.value = "";
    shoppingPrice.value = "";
    shoppingItem.focus();

    render();

  } else if (buttonId === "shiftButton") {
    if (fruitBowl.length === 0) {
      showError("Список уже пуст, нечего удалять.");
      return;
    }
    fruitBowl.shift();
    render();

  } else if (buttonId === "deleteButton") {
    if (fruitBowl.length === 0) {
      showError("Список уже пуст.");
      return;
    }
    fruitBowl.length = 0;
    render();
  }
}

pushButton.addEventListener("click", shoppingList);
popButton.addEventListener("click", shoppingList);
unshiftButton.addEventListener("click", shoppingList);
shiftButton.addEventListener("click", shoppingList);
deleteButton.addEventListener("click", shoppingList);

render();
