const giturl = "https://leonardosalvatierra.github.io/wdd230/chamber/data/members.json";

async function getdata() {
    const response = await fetch(giturl);
    const data = await response.json();
    displaymembers(data.companies);
}

function displaymembers(companies) {
    const cards = document.getElementById("company-list");
    
    companies.forEach((company) => {
        let card = document.createElement('section');
        let img = document.createElement('img');
        let companyname = document.createElement('h3');
        let address = document.createElement('p')
        let website =  document.createElement('a');
        let phone = document.createElement('p')
        let aditionalinfor = document.createElement('p')

        companyname.textContent = `Company: ${company.name}`;
        address.textContent = `${company.address}`;
        website.href = company.website;
        website.textContent = company.name;
        website.style.color = "#283618"
        website.style.transition = "color 0.3s ease";
        // website.style.textDecoration = "none";
        website.addEventListener("mouseover", () => {
            website.style.color = "#BC6C25";
        });
        website.addEventListener("mouseout", () => {
            website.style.color = "#283618"
        });
        phone.textContent = `Tel: ${company.phone}`;
        aditionalinfor.textContent = `Additional information: ${company.additional_info}`;
        aditionalinfor.style.textAlign = 'center';
        img.setAttribute('src', company.image);
        img.setAttribute('alt', `This is ${company.name}`);
        img.setAttribute('loading', 'lazy');
        img.setAttribute('width', 'auto');
        img.setAttribute('height', '240');
        img.style.padding = "50px";

        card.appendChild(companyname);
        card.appendChild(img);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(aditionalinfor);

        card.style.display = "grid";
        card.style.justifyItems = "center";
        card.style.alignItemsItems = "center";
        card.style.textAlign = "center";
        card.classList = "cardm";
        cards.appendChild(card);
    });
}

function changeviewlist() {
    const htmlnamee = document.URL.substring(document.URL.lastIndexOf("/") + 1)
    if (htmlnamee == "directory.html"){
    const bttnh = document.querySelector("#hbl");
    const bttnv = document.querySelector("#vbl");
    const main = document.querySelector("#company-list");

    bttnh.addEventListener('click', function () {
        if (window.getComputedStyle(main).getPropertyValue('display') === 'flex') {
            main.style.display = "flex";
            main.style.flexDirection = "column";
            main.style.textAlign = "center";
        }else {
            main.style.display = "flex";
            main.style.flexDirection = "column";
            main.style.textAlign = "center";
        }
    });

    bttnv.addEventListener('click', function () {
        if (window.getComputedStyle(main).getPropertyValue('display') === 'grid') {
            main.style.display = "grid";
            main.style.gridTemplateColumns = "repeat(auto-fit, minmax(320px, 1fr))";
            main.style.gap = "15px";
        }else {
            main.style.display = "grid";
            main.style.gridTemplateColumns = "repeat(auto-fit, minmax(320px, 1fr))";
            main.style.gap = "15px";
        }

    });
}}

getdata();

changeviewlist();

