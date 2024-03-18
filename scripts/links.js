const baseURL = "https://LeonardoSalvatierra.github.io/wdd230/";
const linksURL = "https://LeonardoSalvatierra.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.lessons);
}
  
getLinks();

function displayLinks(weeks) {
    const cards = document.querySelector('#cards1');
    
    weeks.forEach((week) => {
        const section = document.createElement('section');
        const h3 = document.createElement('h3');
        h3.textContent = `lesson ${week.lesson}`;
        section.appendChild(h3);

        const ul = document.createElement('ul');
        week.links.forEach((link) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = baseURL + link.url;
            a.textContent = link.title;
            li.appendChild(a);
            ul.appendChild(li);
        });

        section.appendChild(ul);
        cards.appendChild(section);
    });
}
