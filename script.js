// Retrieve entries from local storage if available
var storedEntries = localStorage.getItem('entries');
var entries = storedEntries ? JSON.parse(storedEntries) : [];


// Load entries from local storage on page load
function loadEntriesFromLocalStorage() {
  var storedEntries = localStorage.getItem('entries');
  entries = storedEntries ? JSON.parse(storedEntries) : [];
}


function saveEntriesToLocalStorage() {
  localStorage.setItem('entries', JSON.stringify(entries));
}


// Add a new grid entry
function addNewGridEntry(entry, index) {
  var newEntryElement = document.createElement('div');
  newEntryElement.className = 'grid-entry';
  newEntryElement.setAttribute('data-entry-index', index);


  var imageElement = document.createElement('img');
  imageElement.className = 'entry-image';
  imageElement.src = entry.image;
  imageElement.alt = entry.title;


  var titleElement = document.createElement('h2');
  titleElement.textContent = entry.title;


  var typeElement = document.createElement('p');
  typeElement.textContent = 'Type: ' + entry.type;


  var quantityElement = document.createElement('p');
  quantityElement.textContent = 'Quantity: ' + entry.quantity;


  var addressElement = document.createElement('p');
  addressElement.textContent = 'Address: ' + entry.address;


  newEntryElement.appendChild(imageElement);
  newEntryElement.appendChild(titleElement);
  newEntryElement.appendChild(typeElement);
  newEntryElement.appendChild(quantityElement);
  newEntryElement.appendChild(addressElement);


  newEntryElement.addEventListener('click', function() {
    var entryIndex = this.getAttribute('data-entry-index');
    viewEntry(entryIndex);
  });


  var gridContainer = document.getElementById('grid-container');
  gridContainer.appendChild(newEntryElement);


  if (entry.claimed) {
    newEntryElement.classList.add('claimed');
  }
}


function viewEntry(index) {
  window.location.href = `detail.html?entry=${index}`;
}


document.getElementById('entry-form').addEventListener('submit', function(event) {
  event.preventDefault();


  var image = document.getElementById('image').value;
  var title = document.getElementById('title').value;
  var type = document.getElementById('type').value;
  var quantity = document.getElementById('quantity').value;
  var address = document.getElementById('address').value;


  var newEntry = {
    image: image,
    title: title,
    type: type,
    quantity: quantity,
    address: address,
    claimed: false // Add claimed property with initial value false
  };


  entries.push(newEntry);
  saveEntriesToLocalStorage();
  addNewGridEntry(newEntry, entries.length - 1);
  document.getElementById('entry-form').reset();
});


// Filter entries based on the selected type
function filterEntries(type) {
  var filteredEntries = type === 'all' ? entries : entries.filter(function(entry) {
    return entry.type === type;
  });


  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = ''; // Clear existing grid entries


  filteredEntries.forEach(function(entry, index) {
    addNewGridEntry(entry, index);
  });
}


document.getElementById('filter-buttons').addEventListener('click', function(event) {
  if (event.target.matches('.filter-button')) {
    var type = event.target.dataset.type;
    filterEntries(type);
  }
});


// Load entries from local storage on page load
loadEntriesFromLocalStorage();
entries.forEach(function(entry, index) {
  addNewGridEntry(entry, index);
});


// Add event listeners to the filter buttons
var filterButtons = document.getElementsByClassName('filter-button');
for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener('click', function() {
    var type = this.dataset.type;
    filterEntries(type);
  });
}


var claimButton = document.getElementById('claim-button');
  claimButton.addEventListener('click', function() {
    markAsClaimed(entryIndex);
  });


  function markAsClaimed(index) {
    entries[index].claimed = true;
    saveEntriesToLocalStorage();


    // Add the 'claimed' class to the entry element
    var entryElement = document.querySelector('.grid-entry[data-entry-index="' + index + '"]');
    entryElement.classList.add('claimed');


    window.location.href = 'index.html';
  }


      // Clear entries from local storage when the user closes the website
      //window.addEventListener('beforeunload', function() {
      //localStorage.removeItem('entries');
      //});
