/* eslint-disable no-undef */
// Client facing scripts here

//NOTE: Needs to be moved into cookiesManager.js OR something similar
//SETS COOKIES FOR SEARCH PARAMETERS IN RESPONSE TO BUTTON CLICKS
$(document).ready(function() {
  $('#setLocationForm').on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting on submit event
    //clear existing currentPage, city, province, and country cookies
    document.cookie = 'currentPage=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'city=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'province=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'country=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    //store form data for city, province, and country
    const locationInfo = $(this).children('input');
    //set cookies for city, province, and country
    if ($(locationInfo[0]).val()) {
      document.cookie = `city=${$(locationInfo[0]).val()}`;
    }
    if ($(locationInfo[1]).val()) {
      document.cookie = `province=${$(locationInfo[1]).val()}`;
    }
    if ($(locationInfo[2]).val()) {
      document.cookie = `country=${$(locationInfo[2]).val()}`;
    }
    //reload page
    window.location.href = '/listings';
  });
  $('#userSearchForm').on('submit', function(e) {
    e.preventDefault(); //prevents form from submitting on submit event
    //clear existing currentPage and userSearch cookie
    document.cookie = 'currentPage=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'userSearch=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    //set userSearch Cookie
    document.cookie = `userSearch=${$(this).find('input').val()}`;
    //reload page
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
    //clear existing currentPage and category cookies
    document.cookie = 'currentPage=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'category=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    //set category cookie to the value of the category dropdown item that was clicked
    if ($(this).html().toString() !== 'All Categories') {
      document.cookie = `category=${$(this).html().toLowerCase()}`;
    }
    //reload page
    window.location.href = '/listings';
  });
});
