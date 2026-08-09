document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const slug = params.get("slug");

    if (!slug) {
        document.getElementById("animalName").textContent =
            "Không tìm thấy loài vật.";

        return;
    }


    fetch("data/animals.json")
        .then(response => response.json())

        .then(animals => {

            const animal = animals.find(
                a => a.slug === slug
            );


            if (!animal) {

                document.getElementById("animalName").textContent =
                    "Không tìm thấy dữ liệu.";

                return;
            }


            // ẢNH

            document.getElementById("animalImage").src =
                animal.image;

            document.getElementById("animalImage").alt =
                animal.name;


            // TÊN

            document.getElementById("animalName").textContent =
                animal.name;


            document.getElementById("animalScientificName").textContent =
                animal.scientificName;


            // SÁCH ĐỎ

            document.getElementById("redBookCode").textContent =
                animal.redBookVN || "Chưa có dữ liệu";


            document.getElementById("redBookName").textContent =
                animal.redBookName || "Chưa có dữ liệu";


            document.getElementById("redStatus").textContent =
                animal.redBookName || "Chưa có dữ liệu";


            // THÔNG TIN

            document.getElementById("animalType").textContent =
                animal.type || "Chưa có dữ liệu";


            document.getElementById("animalWeight").textContent =
                animal.weight || "Chưa có dữ liệu";


            document.getElementById("animalLength").textContent =
                animal.length || "Chưa có dữ liệu";


            document.getElementById("animalLifespan").textContent =
                animal.lifespan || "Chưa có dữ liệu";


            document.getElementById("animalDiet").textContent =
                animal.diet || "Chưa có dữ liệu";


            document.getElementById("animalDistribution").textContent =
                animal.distribution || "Chưa có dữ liệu";


            // NỘI DUNG

            document.getElementById("animalIntro").textContent =
                animal.intro || "";


            document.getElementById("animalHabitat").textContent =
                animal.habitat || "";


            document.getElementById("animalFeeding").textContent =
                animal.feeding || "";


            document.getElementById("animalDistributionDetail").textContent =
                animal.distributionDetail || "";

        })

        .catch(error => {

            console.error("Lỗi tải dữ liệu:", error);

        });



    // MENU

    const menuToggle =document.getElementById("menuToggle");

    const sideMenu =
        document.getElementById("sideMenu");


    if (menuToggle && sideMenu) {

        menuToggle.addEventListener("click", () => {

            sideMenu.classList.toggle("active");

        });

    }

});