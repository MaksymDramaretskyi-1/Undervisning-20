// Initialisere en matrise for å lagre en handleliste / Initializing an array to store a shopping list
const fruitBowl = [];

// Hente skjemaelementer fra DOM / Retrieving form elements from the DOM
const shoppingItem = document.getElementById("shoppingItem");
const priceItem = document.getElementById("priceItem");

// Henter kontrollknapper fra DOM/Form / Retrieves control buttons from DOM/Form
const pushButton = document.getElementById("pushButton");
const popButton = document.getElementById("popButton");
const unshiftButton = document.getElementById("unshiftButton");
const shiftButton = document.getElementById("shiftButton");
const deleteButton = document.getElementById("deleteButton");

// Lagre gjeldende kurv (fruitBowl) til lokal lagring
function saveCart() {
  // Konverter fruktskål-arrayet til en JSON-streng og lagre det under nøkkelen «fruktskål»
  localStorage.setItem("fruitBowl", JSON.stringify(fruitBowl));
}

// Last inn handlekurven fra lokal lagring ved oppstart
function loadCart() {
  // Hent en streng fra lokal lagring med nøkkelen «fruitBowl»
  const saved = localStorage.getItem("fruitBowl");

  // Sjekk om det er lagret data
  if (saved) {
    try {
      // Konverter JSON-strengen tilbake til en array
      const parsed = JSON.parse(saved);

      // Sjekk at de analyserte dataene faktisk er en matrise
      if (Array.isArray(parsed)) {

        // Legg til alle varene fra den lagrede tabellen i gjeldende handlekurv
        fruitBowl.push(...parsed);
      }
    } catch (e) {
      // Hvis det oppstår en feil under parsing av JSON, sendes en feilmelding til konsollen
      console.error("Feil ved lasting av lagret handleliste:", e);
    }
  }
}

// Kall funksjonen for å laste inn handlekurven når skriptet starter
loadCart(); 


//Filtrering / Filtering

// Jeg får en lenke til filterfeltet etter produktnavn
const filterInput = document.getElementById("filterInput");

// Jeg får en lenke til feltet for maksimalprisinndata
const maxPriceInput = document.getElementById("maxPrice");

// Funksjon for å hente filtrerte produkter
function getFilteredItems() {

  // Hent filterteksten fra inndatafeltet, fjern mellomrom og konverter til små bokstaver.
  // Hvis feltet er tomt, bruk en tom streng.
  const filterValue = filterInput?.value?.trim().toLowerCase() || "";

  // Hent maksimalprisen fra inndatafeltet og konverter den til et tall.
  // Hvis brukeren ikke har skrevet inn noe eller har skrevet inn et tall som ikke er et tall, brukes Infinity (ingen grense).
  const maxPrice = parseFloat(maxPriceInput?.value) || Infinity;


  // Returner filtrerte produkter:
  // - navnet inneholder delstreng filterverdi
  // - produktprisen er mindre enn eller lik makspris
  return fruitBowl.filter(item =>
    item.navn.toLowerCase().includes(filterValue) &&
    item.pris <= maxPrice // filtrer etter pris
  );
}



// Element for visning av handleliste
// Hent DOM-elementet der vi skal vise handlelisten
const displayItems = document.getElementById("displayItems"); 

// Elementer for visning av feilmeldinger
// Feil popup-beholder
const errorPopup = document.getElementById("errorPopup");

// // Element der feilteksten skal settes inn
const errorMessage = document.getElementById("errorMessage");

// Lukk feilvindu-knapp
const closeError = document.getElementById("closeError");



// Funksjon for å vise feil
function showError(message) {
  errorMessage.textContent = message; // Sett feilteksten til det tilsvarende elementet
  errorPopup.classList.add("show"); // Legg til CSS-klassen «show» for å vise feilmeldingspopup
}

// Feil ved lukkbehandler
function hideError() {
  // Fjern CSS-klassen «show» for å skjule feilboksen
  errorPopup.classList.remove("show");
}

// Feil ved lukkbehandler
// Tildel en klikkbehandler til lukkknappen som kaller funksjonen «skjul feil»
closeError.addEventListener("click", hideError);

// Funksjon for å vise handleliste på siden
function render() {
  displayItems.innerHTML = ""; // Fjern HTML-koden i listebeholderen for å unngå dupliserte produkter

  // Hent filterverdien fra inputfeltet, konverter til små bokstaver
  const filterValue = filterInput?.value?.trim().toLowerCase() || "";

  // Filtrer produktlisten etter navn hvis filtertekst er skrevet inn
  const filteredItems = fruitBowl.filter(item =>
    item.navn.toLowerCase().includes(filterValue)
  );

  // Hvis listen er tom etter filtrering
  if (filteredItems.length === 0) {
    displayItems.textContent = fruitBowl.length === 0
      ? "Listen er tom."  // Hvis fruitBowl er helt tom - sier vi at listen er tom
      : "Ingen varer funnet.";  // Hvis listen finnes, men ingen treff ble funnet, rapporterer vi at ingenting ble funnet
    return;
  }

// ---------------- \\

  // Variabel for lagring av totalkostnaden for alle varer
  let totalPris = 0; 

  //Jeg går gjennom de filtrerte produktene
  filteredItems.forEach((item, filteredIdx) => {
    // Finn den opprinnelige indeksen for produktet i fruitBowl
    const originalIdx = fruitBowl.indexOf(item);

    // Legg til kostnaden for gjeldende vare til totalsummen
    totalPris += item.pris * item.antall;

    // Opprett et HTML <div>-element for å vise produktinformasjon
    const itemDiv = document.createElement("div");

    // Legg til litt polstring nederst
    itemDiv.style.marginBottom = "60px";

    // Sett inn HTML-kode med tittel, pris, antall, totalpris og knapper
    itemDiv.innerHTML = `
      <strong>${item.navn}</strong> — ${item.pris.toFixed(2)} NOK × ${item.antall} = ${(item.pris * item.antall).toFixed(2)} NOK
      <button data-action="minus" data-idx="${originalIdx}" style="margin-left: 10px;">−</button>
      <button data-action="plus" data-idx="${originalIdx}" style="margin-left: 5px;">+</button>
    `;
    // Legge til en blokk med et produkt i DOM-en
    displayItems.appendChild(itemDiv);

    // Behandler for "-"-knappen (reduser antall)
    itemDiv.querySelector("button[data-action='minus']").addEventListener("click", () => {
      fruitBowl[originalIdx].antall--; // Reduser mengden med 1

      if (fruitBowl[originalIdx].antall <= 0) {
        fruitBowl.splice(originalIdx, 1); // Hvis mengden blir 0, fjern produktet fra tabellen
      }
      render(); // Tegner produktlisten på nytt
      saveCart(); // Lagre endringer i lokallagring
    });

    itemDiv.querySelector("button[data-action='plus']").addEventListener("click", () => {
      fruitBowl[originalIdx].antall++; // Øk mengden med 1

      render(); // Tegner produktlisten på nytt
      saveCart();// Lagre endringer i lokallagring
    });
  });

  // Opprett en ny blokk for å vise totalkostnaden
  const totalDiv = document.createElement("div");

  // Styles
  totalDiv.style.marginTop = "10px";
  totalDiv.style.fontWeight = "bold";

  // Tekst med totalbeløp
  totalDiv.textContent = `Total: ${totalPris.toFixed(2)} NOK`;

  // Legg til en blokk med totalbeløpet i DOM-en
  displayItems.appendChild(totalDiv);
}


// Hovedfunksjon for behandling av knappehandlinger
function shoppingList(event) {
  const shoppingItemValue = shoppingItem.value.trim(); // Hent produktverdien og fjern mellomrom
  const shoppingPriceValue = parseFloat(priceItem.value); // Få prisen på produktet og konverter den til et tall
  const buttonId = event.target.id; // Bestem ID-en til den trykkede knappen

  hideError(); // Skjul den forrige feilmeldingen (hvis det fantes en)

  // === Legg til på slutten av listen (push) === \\
  if (buttonId === "pushButton") {
    if (!shoppingItemValue) {
      showError("Skriv inn produktnavnet."); // Feil: navn ikke spesifisert
      return;
    }
    if (isNaN(shoppingPriceValue) || shoppingPriceValue < 0) {
      showError("Vennligst skriv inn en gyldig pris."); // Feil: prisen er ikke spesifisert eller er negativ
      return;
    }

    // Sjekk om et slikt produkt allerede finnes i listen
    const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === shoppingItemValue.toLowerCase());
    if (existingItem) {
      existingItem.antall++; // Hvis det er det, øker vi mengden
    } else {
      // Hvis ikke, legg til et nytt produkt på slutten av tabellen
      fruitBowl.push({ navn: shoppingItemValue, pris: shoppingPriceValue, antall: 1 });
    }

    shoppingItem.value = ""; // Tøm produktfeltet
    priceItem.value = "";  // Tøm prisfeltet
    shoppingItem.focus(); // Sett fokus tilbake til inputfeltet
    saveCart();  // Lagre handlekurven i localStorage
    render();  // Oppdater grensesnittet


  //Fjern siste element (pop)
  } else if (buttonId === "popButton") {
    if (fruitBowl.length === 0) {
      showError("Listen er allerede tom, det er ingenting å slette."); // Feil: Hvis listen er tom
      return;
    }
    fruitBowl.pop(); // Fjern det siste elementet
    saveCart(); // Lagre
    render(); // Tegn på nytt

  //Legg til i begynnelsen av listen (fjern forskyvning)
  } else if (buttonId === "unshiftButton") {
    if (!shoppingItemValue) {
      // Feil: navn ikke spesifisert
      showError("Skriv inn produktnavnet.");
      return;
    }
    if (isNaN(shoppingPriceValue) || shoppingPriceValue < 0) {
      // Feil: prisen er ikke spesifisert eller er negativ
      showError("Vennligst skriv inn en gyldig pris.");
      return;
    }

    // Sjekk om et slikt produkt allerede finnes
    const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === shoppingItemValue.toLowerCase());
    if (existingItem) {
      existingItem.antall++;  // Hvis det er det, øker vi mengden
    } else {
      // Hvis ikke, legg til et nytt produkt i begynnelsen av tabellen
      fruitBowl.unshift({ navn: shoppingItemValue, pris: shoppingPriceValue, antall: 1 });
    }

    shoppingItem.value = ""; // Tøm produktfeltet
    priceItem.value = "";    // Tøm prisfeltet
    shoppingItem.focus();    // Sett fokuset tilbake på feltet
    saveCart();              // Lagre
    render();                // Tegn på nytt

    //Slett første element (shift)
  } else if (buttonId === "shiftButton") {
    if (fruitBowl.length === 0) {
      showError("Listen er allerede tom, det er ingenting å slette."); // Feil: listen er tom
      return;
    }
    fruitBowl.shift();  // Fjern det første elementet
    saveCart();         // Lagre
    render();           // Tegn på nytt

  // Fullfør sletting av listen
  } else if (buttonId === "deleteButton") {
    if (fruitBowl.length === 0) {
      showError("Listen er allerede tom."); // Feil: listen er allerede tom
      return;
    }
    fruitBowl.length = 0;   // Tøm tabellen
    saveCart();
    render();
  }
}


// Last inn data fra JSON-fil og opprett produktkort
async function loadProducts() {

  // Last inn JSON-filen med produktene på 'data.json'
  const res = await fetch('data.json');

  //Konverter svaret til et JavaScript-objekt (en matrise med produkter)
  const products = await res.json(); 

  // Hent et containerelement der vi setter inn produktkort
  const container = document.getElementById('productGrid');


  // Vi itererer over hvert produkt og lager et kort
  products.forEach(product => {
    const card = document.createElement('div'); // Opprett en ny div for produktkortet
    card.className = 'product-card';            // Tildel en CSS-klasse til den

    // Angi HTML-innholdet til kortet (bilde, tittel, kategori, pris)
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>Category: ${product.category}</p>
        <p class="price">${product.price.toFixed(2)} NOK</p>
      </div>
    `;

    // Tildel en handler: når du klikker på et kort - legg til et produkt i handlelisten
    card.addEventListener("click", () => {

      // Sjekk om det allerede finnes et slikt produkt i handlekurven
      const existingItem = fruitBowl.find(i => i.navn.toLowerCase() === product.name.toLowerCase());
      if (existingItem) {
        existingItem.antall++; // Hvis det er det, øker vi mengden
      } else {
        // Hvis ikke, legg til et nytt objekt med feltene navn, pris, antall = 1
        fruitBowl.push({ navn: product.name, pris: product.price, antall: 1 });
      }
      render(); // Oppdater handlekurvvisningen
    });

    // Sett kortet inn i beholderen på siden
    container.appendChild(card); 
  });
}

// Kall funksjonen for å laste inn produkter ved oppstart
loadProducts();

// Angi handleren: når du skriver inn tekst i filterfeltet - oppdater grensesnittet
filterInput.addEventListener("input", render);

// Angi hendelseshåndterere på legg til/fjern-knappene
// Legg til på slutten
pushButton.addEventListener("click", shoppingList);

// Fjern fra slutten
popButton.addEventListener("click", shoppingList);

// Legg til øverst
unshiftButton.addEventListener("click", shoppingList);

// Slett fra begynnelsen
shiftButton.addEventListener("click", shoppingList);

// Tøm hele listen
deleteButton.addEventListener("click", shoppingList);

// Utfør første gjengivelse av grensesnittet når siden lastes inn
render();

