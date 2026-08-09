document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENT
    // =========================

    const grid = document.getElementById("animalGrid");

    const searchInput =
        document.getElementById("searchInput");

    const totalAnimals =
        document.getElementById("totalAnimals");

    const menuToggle =
        document.getElementById("menuToggle");

    const sideMenu =
        document.getElementById("sideMenu");

    const searchToggle =
        document.getElementById("searchToggle");

    const searchResults =
        document.getElementById("searchResults");


    // =========================
    // BIẾN
    // =========================

    let animals = [];

    let newAnimals = [];


    // =========================
    // MENU
    // =========================

    if (menuToggle && sideMenu) {

        menuToggle.addEventListener("click", () => {

            sideMenu.classList.toggle("active");

        });

    }


    // =========================
    // TẢI ANIMALS.JSON
    // =========================

    fetch("data/animals.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Không thể tải data/animals.json"
                );

            }

            return response.json();

        })

        .then(data => {

            animals = data;

            console.log(
                "Tất cả dữ liệu:",
                animals
            );


            // =========================
            // LỌC LOÀI MỚI
            // =========================

            newAnimals = animals.filter(animal => {

                return (
                    animal.discoveryYear &&
                    Number(animal.discoveryYear) >= 2025
                );

            });


            console.log(
                "Các loài mới:",
                newAnimals
            );


            // =========================
            // THỐNG KÊ
            // =========================

            if (totalAnimals) {

                totalAnimals.textContent =
                    newAnimals.length;

            }


            // =========================
            // HIỂN THỊ
            // =========================

            renderAnimals(newAnimals);

        })

        .catch(error => {

            console.error(
                "Lỗi tải dữ liệu:",
                error
            );


            if (grid) {

                grid.innerHTML = `
                    <div class="empty">
                        Không thể tải dữ liệu động vật.
                    </div>
                `;

            }

        });


    // =========================
    // HIỂN THỊ CARD
    // =========================

    function renderAnimals(list) {

        if (!grid) return;


        grid.innerHTML = "";


        if (list.length === 0) {
        grid.innerHTML = `
                <div class="empty">
                    Chưa có loài mới được thêm.
                </div>
            `;

            return;

        }


        list.forEach(animal => {

            const card =
                document.createElement("a");


            card.className =
                "animal-card";


            card.href =
                `animal.html?slug=${encodeURIComponent(
                    animal.slug
                )}`;


            // =========================
            // THÔNG TIN
            // =========================

            const status =
                animal.status
                    ? animal.status.toLowerCase()
                    : "ne";


            const statusName =
                animal.statusName ||
                "Chưa có dữ liệu";


            const discoveryYear =
                animal.discoveryYear ||
                "Chưa rõ";


            const discoveryStatus =
                animal.discoveryStatus ||
                "Loài mới được ghi nhận";


            // =========================
            // CARD HTML
            // =========================

            card.innerHTML = `

                <img
                    src="${animal.image || ""}"
                    alt="${animal.name || "Động vật"}"
                    onerror="this.style.display='none'"
                >

                <div class="card-content">

                    <h3>
                        ${animal.name || "Chưa có tên"}
                    </h3>

                    <p class="scientific-name">
                        ${animal.scientificName || ""}
                    </p>

                    <p class="animal-type">
                        ${animal.type || ""}
                    </p>

                    <span class="status ${status}">
                        ${animal.status || "NE"}
                        -
                        ${statusName}
                    </span>

                    <p class="discovery-year">
                        🆕 Phát hiện: ${discoveryYear}
                    </p>

                    <p class="discovery-status">
                        ${discoveryStatus}
                    </p>

                </div>

            `;


            grid.appendChild(card);

        });

    }


    // =========================
    // TÌM KIẾM
    // =========================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterAnimals
        );

    }


    function filterAnimals() {

        const keyword =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!keyword) {

            renderAnimals(newAnimals);

            return;

        }


        const result =
            newAnimals.filter(animal => {

                const name =
                    (animal.name || "")
        .toLowerCase();

                const scientificName =
                    (animal.scientificName || "")
                        .toLowerCase();

                const type =
                    (animal.type || "")
                        .toLowerCase();

                return (
                    name.includes(keyword) ||
                    scientificName.includes(keyword) ||
                    type.includes(keyword)
                );

            });


        renderAnimals(result);

    }


    // =========================
    // NÚT SEARCH
    // =========================

    if (
        searchToggle &&
        searchInput
    ) {

        searchToggle.addEventListener(
            "click",
            () => {

                const active =
                    searchInput.classList.toggle(
                        "active"
                    );


                if (active) {

                    searchInput.focus();

                }

                else {

                    searchInput.value = "";

                    if (searchResults) {

                        searchResults.innerHTML = "";

                        searchResults.classList.remove(
                            "show"
                        );

                    }

                    renderAnimals(newAnimals);

                }

            }
        );

    }

});