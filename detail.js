document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the selected entry index from the query parameters
    var urlParams = new URLSearchParams(window.location.search);
    var selectedEntryIndex = urlParams.get('entry');
 
    // Retrieve the entry from the entries array using the index
    var selectedEntry = entries[selectedEntryIndex];
 
    // Populate the detail page with the entry's details
    document.getElementById('detail-image').src = selectedEntry.image;
    document.getElementById('detail-image').alt = selectedEntry.title;
    document.getElementById('detail-title').textContent = selectedEntry.title;
    document.getElementById('detail-type').textContent = selectedEntry.type;
    document.getElementById('detail-quantity').textContent = selectedEntry.quantity;
    document.getElementById('detail-address').textContent = selectedEntry.address;


});
