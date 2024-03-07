$(document).ready(function() {


  $('.toggle-listing-status').on('click', function() {
    //grab listing id from html (data-listing-id attribute)
    const listingId = $(this).closest('.listing-entry').data('listing-id');
    $.ajax({
      url: '/listings/' + listingId,
      method: 'delete',
      data: { listingId },
      success: (response) => {
        // console.log(response);
        window.location.href = '/listings/myListings';
      },
      error: (xhr, status, err) => {
        console.log(err);
      },
    });
  });





});
