$(document).ready(function() {

  // Event handler for deleting a listing from /favourites (browse favourites page)
  $('.delete-button').click(function() {
    //locate the delete button
    const listingId = $(this).closest('tr').data('listing-id');
    //Delete request to db
    $.ajax({
      url: '/favourites/delete',
      method: 'DELETE',
      data: { listingId },
      success: function(response) {
        //redirect the user's browser to the '/favourites' page
        window.location.href = '/favourites';
      },
      error: function(xhr, status, error) {
        console.error('Error deleting listing:', error);
      }
    });
  });

  //Event handler to add to favourites
  $('.toggle-favorites').click(function() {
    //locate the listing ID from the client side
    const listingId = $(this).data('listing-id');
    //locate the button
    const $icon = $(this).find('.fa-heart');

    if ($icon.hasClass('fa-solid')) { //if listing is already favourited
      //remove (delete) from favourites table with ajax request
      $.ajax({
        url: '/favourites/delete',
        method: 'DELETE',
        data: { listingId },
        success: function(response) {
          console.log('Listing removed from favorites successfully');
          // change icon to solid
          $icon.toggleClass('fa-solid fa-regular');
        },
        error: function(xhr, status, error) {
          console.error('Error adding listing to favorites:', error);
        }
      });
    } else if ($icon.hasClass('fa-regular')) { // if listing is not currently favourited
      //add (insert) to favourites table with ajax request
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
        }
      });
    }
  });
});
