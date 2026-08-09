document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENT
    // =========================

    const grid = document.getElementById("animalGrid");

    const searchInput =
        document.getElementById("searchInput");

    const totalAnimals =
        document.getElementById("totalAnimals");

    const crCount =
        document.getElementById("crCount");

    const enCount =
        document.getElementById("enCount");

    const vuCount =
        document.getElementById("vuCount");

    const buttons =
        document.querySelectorAll(".filter-btn");

    const menuToggle =
        document.getElementById("menuToggle");

    const sideMenu =
        document.getElementById("sideMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");

    const exploreButton =
        document.getElementById("exploreButton");


    // =========================
    // BIẾN
    // =========================

    let animals = [];

    let currentFilter = "all";


    // =========================
    // STATUS ĐƯỢC PHÉP
    // =========================

    const allowedStatuses = [
        "CR",
        "EN",
        "VU",
        "NT",
        "LC",
        "DD"
    ];


    // =========================
    // MENU
    // =========================

    if (menuToggle && sideMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                sideMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "menu-open",
                isOpen
            );

            if (menuOverlay) {

                menuOverlay.classList.toggle(
                    "show",
                    isOpen
                );

            }

        });

    }


    // =========================
    // ĐÓNG MENU BẰNG OVERLAY
    // =========================

    if (menuOverlay) {

        menuOverlay.addEventListener("click", () => {

            sideMenu.classList.remove("active");

            menuToggle.classList.remove(
                "menu-open"
            );

            menuOverlay.classList.remove("show");

        });

    }


    // =========================
    // NÚT KHÁM PHÁ
    // =========================

    if (exploreButton) {

        exploreButton.addEventListener("click", () => {

            const section =
                document.querySelector(".animals-section");

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }


    // =========================
    // TẢI DATA
    // =========================

    fetch("data/animals.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Không thể tải animals.json"
                );

            }

            return response.json();

        })

        .then(data => {
            console.log(
                "Tổng số dữ liệu:",
                data.length
            );


            // =========================
            // CHỈ LẤY CR EN VU NT LC DD
            // =========================

            animals = data.filter(animal => {

                const status =
                    String(animal.status || "")
                        .trim()
                        .toUpperCase();

                return allowedStatuses.includes(status);

            });


            console.log(
                "Dữ liệu trang Nguy cơ tuyệt chủng:",
                animals
            );


            console.log(
                "Số loài được hiển thị:",
                animals.length
            );


            updateStatistics();

            filterAnimals();

        })

        .catch(error => {

            console.error(
                "Lỗi:",
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

        if (!grid) {
            return;
        }


        grid.innerHTML = "";


        if (list.length === 0) {

            grid.innerHTML = `
                <div class="empty">
                    Không có loài nào phù hợp.
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
                    animal.slug || ""
                )}`;


            // =========================
            // STATUS
            // =========================

            const status =
                String(animal.status || "DD")
                    .trim()
                    .toUpperCase();


            const statusName =
                animal.statusName ||
                "Chưa có dữ liệu";


            // =========================
            // CARD
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

                    <span class="status ${status.toLowerCase()}">
                        ${status} - ${statusName}
                    </span>

                </div>

            `;


            grid.appendChild(card);

        });

    }


    // =========================
    // THỐNG KÊ
    // =========================

    function updateStatistics() {

        if (totalAnimals) {

            totalAnimals.textContent =
                animals.length;

        }


        if (crCount) {

            crCount.textContent =
                countStatus("CR");

        }


        if (enCount) {

            enCount.textContent =
                countStatus("EN");

        }


        if (vuCount) {

            vuCount.textContent =
                countStatus("VU");

        }

    }


    // =========================
    // ĐẾM STATUS
    // =========================

    function countStatus(status) {

        return animals.filter(animal => {

            return String(animal.status || "")
                .trim()
                .toUpperCase() === status;

        }).length;

    }


    // =========================
    // TÌM KIẾM + LỌC
    // =========================

    function filterAnimals() {

        const keyword =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const result =
            animals.filter(animal => {

                // =========================
                // TÌM KIẾM
                // =========================

                const name =
                    String(animal.name || "")
                        .toLowerCase();

                const scientificName =
                    String(animal.scientificName || "")
                        .toLowerCase();

                const type =
                    String(animal.type || "")
                        .toLowerCase();


                const matchSearch =
                    name.includes(keyword) ||
                    scientificName.includes(keyword) ||
                    type.includes(keyword);


                // =========================
                // FILTER STATUS
                // =========================

                const status =
                    String(animal.status || "")
                        .trim()
                        .toUpperCase();


                const matchFilter =
                    currentFilter === "all" ||
                    status === currentFilter;


                return (
                    matchSearch &&
                    matchFilter
                );

            });


        console.log(
            "Filter:",
            currentFilter,
            "=>",
            result.length,
            "loài"
        );


        renderAnimals(result);

    }


    // =========================
    // SEARCH INPUT// =========================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterAnimals
        );

    }


    // =========================
    // CÁC NÚT FILTER
    // =========================

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            // Bỏ active
            buttons.forEach(btn => {

                btn.classList.remove("active");

            });


            // Active nút đang chọn
            button.classList.add("active");


            // Lấy status
            const filterValue =
            String(button.dataset.filter || "all")
                .trim();

            currentFilter =
            filterValue === "all"
                ? "all"
                : filterValue.toUpperCase();
            console.log(
                "Đang lọc:",
                currentFilter
            );


            filterAnimals();

        });

    });

});