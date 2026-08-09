document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // 1. LẤY ELEMENT
    // ==================================================

    const grid = document.getElementById("animalGrid");

    const searchInput =
        document.getElementById("searchInput");

    const searchToggle =
        document.getElementById("searchToggle");

    const searchResults =
        document.getElementById("searchResults");

    const totalAnimals =
        document.getElementById("totalAnimals");

    const menuToggle =
        document.getElementById("menuToggle");

    const sideMenu =
        document.getElementById("sideMenu");


    // ==================================================
    // 2. BIẾN DỮ LIỆU
    // ==================================================

    let animals = [];

    let extinctAnimals = [];


    // ==================================================
    // 3. MENU
    // ==================================================

    if (menuToggle && sideMenu) {

        menuToggle.addEventListener("click", () => {

            sideMenu.classList.toggle("active");

        });

    }


    // ==================================================
    // 4. TẢI ANIMALS.JSON
    // ==================================================

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

            // Lưu toàn bộ dữ liệu

            animals = data;


            console.log(
                "Tất cả động vật:",
                animals
            );


            // ==================================================
            // 5. LỌC ĐỘNG VẬT ĐÃ TUYỆT CHỦNG
            // ==================================================

            extinctAnimals = animals.filter(animal => {

                return animal.status === "EX";

            });


            console.log(
                "Các loài đã tuyệt chủng:",
                extinctAnimals
            );


            // ==================================================
            // 6. CẬP NHẬT SỐ LƯỢNG
            // ==================================================

            if (totalAnimals) {

                totalAnimals.textContent =
                    extinctAnimals.length;

            }


            // ==================================================
            // 7. HIỂN THỊ
            // ==================================================

            renderAnimals(extinctAnimals);

        })

        .catch(error => {

            console.error(
                "Lỗi tải animals.json:",
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


    // ==================================================
    // 8. HIỂN THỊ CARD
    // ==================================================

    function renderAnimals(list) {

        if (!grid) {

            console.error(
                "Không tìm thấy #animalGrid"
            );

            return;

        }


        // Xóa card cũ

        grid.innerHTML = "";


        // Không có dữ liệu

        if (list.length === 0) {

            grid.innerHTML = `
                <div class="empty">
                    Không tìm thấy loài đã tuyệt chủng.
                </div>
            `;

            return;

        }


        // Tạo card

        list.forEach(animal => {

            const card =
                document.createElement("a");


            // Class

            card.className =
                "animal-card";


            // Link

            card.href =
                `animal.html?slug=${encodeURIComponent(
                    animal.slug
                )}`;


            // ==================================================
            // STATUS
            // ==================================================

            const status =
                animal.status
                    ? animal.status.toLowerCase()
                    : "ex";


            const statusName =
                animal.statusName ||
                "Đã tuyệt chủng";


            // ==================================================
            // HTML CARD
            // ==================================================

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
                        ${animal.status || "EX"}
                        -
                        ${statusName}
                    </span>

                </div>

            `;


            // Thêm card vào grid

            grid.appendChild(card);

        });

    }


    // ==================================================
    // 9. TÌM KIẾM
    // ==================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterAnimals
        );
        }


    function filterAnimals() {

        if (!searchInput) {

            return;

        }


        const keyword =
            searchInput.value
                .trim()
                .toLowerCase();


        // Không nhập gì

        if (!keyword) {

            renderAnimals(extinctAnimals);

            return;

        }


        // ==================================================
        // TÌM KIẾM
        // ==================================================

        const result =
            extinctAnimals.filter(animal => {

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


    // ==================================================
    // 10. NÚT SEARCH
    // ==================================================

    if (
        searchToggle &&
        searchInput
    ) {

        searchToggle.addEventListener(
            "click",
            () => {

                const isActive =
                    searchInput.classList.toggle(
                        "active"
                    );


                if (isActive) {

                    searchInput.focus();

                }

                else {

                    // Đóng tìm kiếm

                    searchInput.value = "";


                    if (searchResults) {

                        searchResults.innerHTML = "";

                        searchResults.classList.remove(
                            "show"
                        );

                    }


                    // Hiển thị lại toàn bộ

                    renderAnimals(
                        extinctAnimals
                    );

                }

            }
        );

    }


    // ==================================================
    // 11. ENTER TRONG Ô TÌM KIẾM
    // ==================================================

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    filterAnimals();

                }

            }
        );

    }

});