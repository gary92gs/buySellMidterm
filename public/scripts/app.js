$(document).ready(function() {

  // Event handler for deleting a listing
  $('.delete-button').click(function() {
    //locate the delete button
    const listingId = $(this).closest('tr').data('listing-id');
    
    //Delete request to db
    $.ajax({
      url: '/favourites/delete',
      method: 'DELETE',
      data: { listingId },
      success: function(response) {
        console.log('Listing deleted successfully');
        //find the HTML element with the ID 'item-'
        $('#item-' + listingId).remove();
        //redirect the user's browser to the '/favourites' page
        window.location.href = '/favourites';
      },
      error: function(xhr, status, error) {
        console.error('Error deleting listing:', error);
      }
    });
  });

//Event handler to add to favourites
  $('.add-to-favorites').click(function() {
    //locate the listing ID from the client side
    const listingId = $(this).data('listing-id');
    
    //locate the button
    const $icon = $(this).find('.fa-heart');

    //Post request to db
    $.ajax({
      url: '/favourites/add',
      method: 'POST',
      data: { listingId },
      success: function(response) {
        console.log('Listing added to favorites successfully');
        // change icon to solid
        $icon.toggleClass('fa-regular fa-solid');
      },
      error: function(xhr, status, error) {
        console.error('Error adding listing to favorites:', error);
        // client side alert if they have the item already in their favourites
        alert('Error adding listing to favorites, you may have added this already.');
      }
    });
  });

});