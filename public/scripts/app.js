// Client facing scripts here
$(document).ready(function() {
  $('#setLocationForm').on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting on submit event
    //store form data for city, province, and country
    const locationInfo = $(this).children('input');
    //set cookies for city, province, and country
    document.cookie = `city=${$(locationInfo[0]).val()}`;
    document.cookie = `province=${$(locationInfo[1]).val()}`;
    document.cookie = `country=${$(locationInfo[2]).val()}`;
    //redirect to /listings
    window.location.href = '/listings';
  });
  $('#userSearchForm').on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting on submit event
    document.cookie = `userSearch=${$(this).find('input').val()}`;
    window.location.href = '/listings';
  });
  $('.next-page').on('click', function() {
    //grab current page value and increment it
    const currentPage = Number($(this).prev().html()) + 1;
    //deposit page as a search parameter in currentPage cookie
    document.cookie = `currentPage=${currentPage}`;
    //redirect to /listings
    window.location.href = '/listings';
  });
  $('.previous-page').on('click', function() {
    //grab current page value and decrement it
    const currentPage = Number($(this).next().html()) - 1;
    //deposit page as a search parameter in currentPage cookie
    document.cookie = `currentPage=${currentPage}`;
    //send new current page number to /listings route via req.query.page object. Used for querying db and updating page number on client browser
    window.location.href = '/listings';
  });
  $('.dropdown-item').on('click', function() {
    const category = $(this).html();
    document.cookie = `category=${category}`;
    window.location.href = '/listings';
  });
});
