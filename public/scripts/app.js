// Client facing scripts here

$(document).ready(function() {

  $('.delete-button').click(function() {

    const listingId = $(this).closest('tr').data('listing-id');
    console.log('listing ID:', listingId)
    $.ajax({
        url: 'favourites/delete',
        method: 'DELETE',
        data: { listingId },
        success: function(response) {
            console.log('Listing deleted successfully');
            $('#item-' + listingId).remove();

            window.location.href = '/favourites';
        },
        error: function(xhr, status, error) {
            console.error('Error deleting listing:', error);
        }
    });
});

});
