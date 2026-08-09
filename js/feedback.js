document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // MENU
    // =========================

    const menuToggle =
        document.getElementById("menuToggle");

    const sideMenu =
        document.getElementById("sideMenu");


    if (menuToggle && sideMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                sideMenu.classList.toggle("active");

            }
        );

    }


    // =========================
    // FORM
    // =========================

    const form =
        document.getElementById("feedbackForm");

    const message =
        document.getElementById("feedbackMessage");


    if (!form || !message) {
        return;
    }


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("category")
                    .value;


            const content =
                document
                    .getElementById("message")
                    .value
                    .trim();


            // =========================
            // KIỂM TRA
            // =========================

            if (
                !name ||
                !category ||
                !content
            ) {

                message.className =
                    "feedback-message error";

                message.textContent =
                    "Vui lòng điền đầy đủ thông tin bắt buộc.";

                return;

            }


            // =========================
            // TẠO FEEDBACK
            // =========================

            const feedback = {

                name: name,

                email: email,

                category: category,

                message: content,

                date:
                    new Date()
                        .toISOString()

            };


            // =========================
            // LƯU LOCAL STORAGE
            // =========================

            const oldData =
                localStorage.getItem(
                    "animalPediaFeedback"
                );


            const feedbacks =
                oldData
                    ? JSON.parse(oldData)
                    : [];


            feedbacks.push(feedback);


            localStorage.setItem(
                "animalPediaFeedback",
                JSON.stringify(feedbacks)
            );


            // =========================
            // THÔNG BÁO
            // =========================

            message.className ="feedback-message success";

            message.textContent =
                "Cảm ơn bạn! Góp ý của bạn đã được ghi nhận.";


            // =========================
            // XÓA FORM
            // =========================

            form.reset();

        }
    );

});