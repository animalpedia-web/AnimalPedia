document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("animalGrid");
    const searchInput = document.getElementById("searchInput");

    const totalAnimals = document.getElementById("totalAnimals");
    const crCount = document.getElementById("crCount");
    const enCount = document.getElementById("enCount");
    const vuCount = document.getElementById("vuCount");

    const buttons = document.querySelectorAll(".filter-btn");

    let animals = [];
    let currentFilter = "all";

    fetch("./data/animals.json")
        .then(res => res.json())
        .then(data => {

    console.log("Tất cả dữ liệu:", data);

    animals = data.filter(a => a.redBookVN);

    console.log("Các loài Sách đỏ:", animals);

    updateStatistics();

    renderAnimals(animals);

})
        .catch(err => {

            console.error(err);

            grid.innerHTML =
            "<h2>Không thể tải dữ liệu.</h2>";

        });



    function renderAnimals(list){

        grid.innerHTML = "";

        if(list.length===0){

            grid.innerHTML="<h2>Không có dữ liệu.</h2>";

            return;

        }

        list.forEach(animal=>{

            const card=document.createElement("a");

            card.className="animal-card";

            card.href = `red-book-detail.html?slug=${animal.slug}`;

            card.innerHTML = `
                <img src="${animal.image}" alt="${animal.name}">

                <div class="card-content">

                <h3>${animal.name}</h3>

                <p>${animal.scientificName}</p>

                <p>${animal.type}</p>

                <span class="status ${animal.redBookVN.toLowerCase()}">
            ${animal.redBookName}
                </span>

        </div>
    `;

            grid.appendChild(card);

        });

    }



    function updateStatistics(){

        totalAnimals.textContent=animals.length;

        crCount.textContent=
        animals.filter(a=>a.redBookVN==="CR").length;

        enCount.textContent=
        animals.filter(a=>a.redBookVN==="EN").length;

        vuCount.textContent=
        animals.filter(a=>a.redBookVN==="VU").length;

    }



    searchInput.addEventListener("input",()=>{

        const keyword=
        searchInput.value.toLowerCase();

        const result=animals.filter(animal=>{

            const matchName=
            animal.name.toLowerCase().includes(keyword);

            const matchFilter=
            currentFilter==="all"
            ||
            animal.redBookVN===currentFilter;

            return matchName && matchFilter;

        });

        renderAnimals(result);

    });



    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>btn.classList.remove("active"));

            button.classList.add("active");

            currentFilter=button.dataset.filter;

            const keyword=
            searchInput.value.toLowerCase();

            const result=animals.filter(animal=>{

                const matchName=animal.name.toLowerCase().includes(keyword);

                const matchFilter=
                currentFilter==="all"
                ||
                animal.redBookVN===currentFilter;

                return matchName && matchFilter;

            });

            renderAnimals(result);

        });

    });

});