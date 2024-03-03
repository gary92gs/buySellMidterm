// Client facing scripts here
$(document).ready(function() {
  $('.next-page').on('click', function() {
    //grab current page value and increment it
    const currentPage = Number($(this).prev().html()) + 1;
    //send new current page number to /listings route via req.query.page object. Used for querying db and updating page number on client browser
    window.location.href = `/listings?page=${currentPage}`;
  });
  $('.previous-page').on('click', function() {
    //grab current page value and decrement it
    const currentPage = Number($(this).next().html()) - 1;
    //send new current page number to /listings route via req.query.page object. Used for querying db and updating page number on client browser
    window.location.href = `/listings?page=${currentPage}`;
  });
});
