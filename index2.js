'use strict';
/* global $ */
//get info from DOM
//change store
//render

// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
//
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.
const STORE = {
  items: [
    { id : 24, name: 'apples', checked: false },
    { id : 23, name: 'oranges', checked: false },
    {id : 22,  name: 'milk', checked: true },
    {id : 21,  name: 'bread', checked: false }
  ],
  displayStatus: true,
  searchText: 'null',
};

//+++++++++++++++++++++++++++++++
function generateItemElement(item, itemIndex, template) {
  return `
	<li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}
//+++++++++++++++++++++++++++++++
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}
//+++++++++++++++++++++++++++++++
function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  console.log('`renderShoppingList` ran');
  let storeName = STORE.items;
  if (STORE.displayStatus === false) {
    storeName = storeName.filter(item => item.checked);
  }
  if (STORE.searchTerm === 'string') {
    storeName = storeName.filter(item => item.name);
  }

  const shoppingListItemsString = generateShoppingItemsString(storeName);
  $('.js-shopping-list').html(shoppingListItemsString);
}
//+++++++++++++++++++++++++++++++
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({ name: itemName, checked: false });
}
//+++++++++++++++++++++++++++++++
function handleNewItemSubmit() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val(' ');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
//+++++++++++++++++++++++++++++++
function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}
//+++++++++++++++++++++++++++++++

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

//+++++++++++++++++++++++++++++++
function handleItemCheckClicked() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
//+++++++++++++++++++++++++++++++

// name says it all. responsible for deleting a list item.
function deleteListItem(itemIndex) {
  console.log(`Deleting item at index  ${itemIndex} from shopping list`);
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in STORE
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
}
//+++++++++++++++++++++++++++++++

function useInputShowHide() {
  console.log('I\'m inside function useInputShowHide');
  //get info from DOM    //listen for select
  $('#js-show-hide-pulldown').on('change', e => {

    const showHideValue = $(e.target).val();
    //console.log(showHideValue );
    //change store
    if (showHideValue === 'true') {
      STORE.displayStatus = true;
    } else {
      STORE.displayStatus = false;
    }

    renderShoppingList();
  });
}
//+++++++++++++++++++++++++++++++
function showSearchItems(searchTerm) {
  //console.log(`'inside showSearchItems' ${searchTerm}`);
  STORE.items = STORE.items.filter(function (item) {
    console.log(`new searched for item ${item.name}`);
    console.log(`this is the search term ${searchTerm}`);
    return item.name.startsWith(searchTerm);
  });
}
function handleSearchButton() {
  $('#js-search-form').on('submit', function (event) {
    event.preventDefault();
    //console.log('I\'m inside handleSearchButton');
    const searchTerm = $('.js-search-entry').val().toLowerCase();
    //console.log(searchTerm);
    $('.js-search-entry').val('');
    showSearchItems(searchTerm);

    renderShoppingList();
  });
}
//+++++++++++++++++++++++++++++++
/*
function editItems() {
  //get info from DOM    //listen for select
  console.log(`checking property for attribute contenteditable ${itemIndex} `);
  STORE.items[itemIndex].contenteditable = !STORE.items[itemIndex].contenteditable;
}
function handleEditItems() {
//get
  $('.js-shopping-list').on('submit', '.js-shopping-item' event => {
    event.preventDefault();
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.js-shopping-item' ).val();
    store.find
    .closest('.js-shopping-item')
      .attr('contenteditable', true);
  })
  //set
  $('.js-shopping-list').on('mouseout', function () {
    $(item.name)
      .closest('.js-shopping-item')
      .attr('contenteditable', false);

  renderShoppingList();
});
}
*/
//+++++++++++++++++++++++++++++++
// this function will be responsible for rendering the shopping list in
// the DOM
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  useInputShowHide();

  handleSearchButton();
  //handleEditItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);


/*
function editItems(index, name) {
  //get info from DOM    //listen for select
  console.log('checking property for attribute contenteditable ');
  const item = STORE.items.find(item => item.id === id) ;
  item.name = name;
  console.log(item);
}
console.log(editItems('apple'));

function handleEditItems() {
  $('.js-shopping-list').on('submit', function (event) {
    event.preventDefault;
    const itemId = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemId) ;

  renderShoppingList();
});
}
*/