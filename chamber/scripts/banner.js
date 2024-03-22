// ************* banner on mon, tue *************

var banner = document.getElementById("banner");

function closeBanner() {
    banner.style.display = "none";
}

function showBannerOnDays() {
    var today = new Date();
    var dayOfWeek = today.getDay();
    
    if (dayOfWeek >= 1 && dayOfWeek <= 3) {
        banner.style.display = "block";
    } else {
        banner.style.display = "none";
    }
}


showBannerOnDays();