// document.addeventlistener('domcontentloaded', function () {
//     // get the current year
//     var currentyear = new date().getfullyear();

//     // update the copyright year in the first paragraph of the footer
//     var copyrightyearparagraph = document.queryselector('footer p:first-child');
//     copyrightyearparagraph.textcontent = '®' + currentyear;

//     // function to update last modification date
//     function updatelastmodifieddate() {
//         // get the last modified date from the document
//         var lastmodifieddate = document.lastmodified;

//         // update the last modified date in the last paragraph of the footer
//         var lastmodifiedparagraph = document.getelementbyid('lastmodified');
//         lastmodifiedparagraph.textcontent = 'last modification: ' + lastmodifieddate;
//     }

//     // update last modification date for html
//     updatelastmodifieddate();

//     // update last modification date for linked css file
//     var csslink = document.queryselector('link[rel="stylesheet"]');
//     csslink.addeventlistener('load', updatelastmodifieddate);
// });
