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
const fruitBowl = [];

const shoppingItem = document.getElementById("shoppingItem");
const priceItem = document.getElementById("priceItem");

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
    itemDiv.style.marginBottom = "60px";

    itemDiv.innerHTML = `
      <strong>${item.navn}</strong> — ${item.pris.toFixed(2)} NOK × ${item.antall} = ${(item.pris * item.antall).toFixed(2)} NOK
      <button data-action="minus" data-idx="${idx}" style="margin-left: 10px;">−</button>
      <button data-action="plus" data-idx="${idx}" style="margin-left: 5px;">+</button>
    `;

    displayItems.appendChild(itemDiv);

    //Knappebehandlere + og −
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
  totalDiv.textContent = `Total: ${totalPris.toFixed(2)} NOK`;
  displayItems.appendChild(totalDiv);
}

function shoppingList(event) {
  const shoppingItemValue = shoppingItem.value.trim();
  const shoppingPriceValue = parseFloat(priceItem.value);
  const buttonId = event.target.id;

  hideError();



  if (buttonId === "pushButton") {
    if (!shoppingItemValue) {
      showError("Skriv inn produktnavnet.");
      return;
    }
    if (isNaN(shoppingPriceValue) || shoppingPriceValue < 0) {
      showError("Vennligst skriv inn en gyldig pris.");
      return;
    }

    const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === shoppingItemValue.toLowerCase());
    if (existingItem) {
      existingItem.antall++;
    } else {
      fruitBowl.push({ navn: shoppingItemValue, pris: shoppingPriceValue, antall: 1 });
    }

    shoppingItem.value = "";
    priceItem.value = "";
    shoppingItem.focus();
    render();

  } else if (buttonId === "popButton") {
    if (fruitBowl.length === 0) {
      showError("Listen er allerede tom, det er ingenting å slette.");
      return;
    }
    fruitBowl.pop();
    render();

  } else if (buttonId === "unshiftButton") {
    if (!shoppingItemValue) {
      showError("Skriv inn produktnavnet.");
      return;
    }
    if (isNaN(shoppingPriceValue) || shoppingPriceValue < 0) {
      showError("Vennligst skriv inn en gyldig pris.");
      return;
    }

    const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === shoppingItemValue.toLowerCase());
    if (existingItem) {
      existingItem.antall++;
    } else {
      fruitBowl.unshift({ navn: shoppingItemValue, pris: shoppingPriceValue, antall: 1 });
    }

    shoppingItem.value = "";
    priceItem.value = "";
    shoppingItem.focus();
    render();

  } else if (buttonId === "shiftButton") {
    if (fruitBowl.length === 0) {
      showError("Listen er allerede tom, det er ingenting å slette.");
      return;
    }
    fruitBowl.shift();
    render();

  } else if (buttonId === "deleteButton") {
    if (fruitBowl.length === 0) {
      showError("Listen er allerede tom.");
      return;
    }
    fruitBowl.length = 0;
    render();
  }
}
async function loadProducts() {
  const res = await fetch('data.json');
  const products = await res.json();
  const container = document.getElementById('productGrid');

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>Category: ${product.category}</p>
        <p class="price">${product.price.toFixed(2)} NOK</p>
      </div>
    `;

    card.addEventListener("click", () => {
      // Sjekk om det allerede finnes et slikt produkt i handlekurven
      const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === product.name.toLowerCase());
      if (existingItem) {
        existingItem.antall++;
      } else {
        fruitBowl.push({ navn: product.name, pris: product.price, antall: 1 });
      }
      render();
    });

    container.appendChild(card);
  });
}


loadProducts();

pushButton.addEventListener("click", shoppingList);
popButton.addEventListener("click", shoppingList);
unshiftButton.addEventListener("click", shoppingList);
shiftButton.addEventListener("click", shoppingList);
deleteButton.addEventListener("click", shoppingList);

render();
