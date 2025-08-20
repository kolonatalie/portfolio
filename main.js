// navbar
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function() {
    links.classList.toggle("show-links");
});

// Reviews carousel
const reviews = [
    {
        id: 1,
        name: "michelthysen",
        country: "United Kingdom",
        text: "Natalia translated my briefing to the perfect end result. Look no further! I would recommend her any time!",
    },
    {
        id: 2,
        name: "traft",
        country: "Canada",
        text: "Natalia is a true professional. This is the second time we've worked with her and she's exceeded our expectations each time. Very creative while also sticking with our request. Would recommend!",
    },
    {
        id: 3,
        name: "sarahhughes",
        country: "United States",
        text: "Natalia always does an incredible job with attention to detail & quick turnaround time. She also takes our feedback & notes and translates them into the filter incredibly. Thank you again, Natalia!",
    },
    {
        id: 4,
        name: "bemarais",
        country: "Canada",
        text: "Natalia was absolutely amazing to work with! She listened, asked questions and kept coming back with improvements/tweaks until I was 100% happy! I'm over the moon with the results and will definitely use her again. I highly, highly recommend her work!",
    },
    {
        id: 5,
        name: "gabestarky",
        country: "United States",
        text: "She was responsive and great to work with. She was dedicated to making sure that my project came out the best way possible. I definitely will be working with her in the future.",
    },
    {
        id: 6,
        name: "casaolea",
        country: "Spain",
        text: "Natalia is a great professional who understood exactly what we were looking for. She was also happy to adjust some minor modifications we had. I am so glad we decided to work with her and absolutely recommend her job.",
    },
];

const author = document.getElementById('author');
const country = document.getElementById('country');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentItem = 0;

// initial item
window.addEventListener( 'DOMContentLoaded', function() {
    const item = reviews[currentItem];
    author.textContent = item.name;
    country.textContent = item.country;
    info.textContent = item.text;
});

function showPerson(person) {
    const item = reviews[person];
    author.textContent = item.name;
    country.textContent = item.country;
    info.textContent = item.text;
}

nextBtn.addEventListener('click', function() {
    currentItem++;
    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showPerson(currentItem);
});

prevBtn.addEventListener('click', function() {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
});