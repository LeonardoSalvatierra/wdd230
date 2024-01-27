document.addeventlistener('domcontentloaded', function () {
    var currentyear = new date().getfullyear();

    var copyrightyearparagraph = document.queryselector('footer p:first-child');
    copyrightyearparagraph.textcontent = '®' + currentyear;

    function updatelastmodifieddate() {
        var lastmodifieddate = document.lastmodified;

        var lastmodifiedparagraph = document.getelementbyid('lastmodified');
        lastmodifiedparagraph.textcontent = 'last modification: ' + lastmodifieddate;
    }

    updatelastmodifieddate();

    var csslink = document.queryselector('link[rel="stylesheet"]');
    csslink.addeventlistener('load', updatelastmodifieddate);
});
