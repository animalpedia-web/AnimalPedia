import "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("🔥 FEEDBACK.JS ĐÃ CHẠY");

    // =========================
    // KIỂM TRA SUPABASE
    // =========================

    console.log(
        "Supabase client:",
        window.supabaseClient
    );


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

        console.error(
            "❌ Không tìm thấy feedbackForm hoặc feedbackMessage"
        );

        return;

    }


    // =========================
    // SUBMIT
    // =========================

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            console.log("🔥 ĐANG GỬI FEEDBACK");


            // =========================
            // KIỂM TRA SUPABASE
            // =========================

            if (!window.supabaseClient) {

                console.error(
                    "❌ Supabase client chưa tồn tại"
                );

                message.className =
                    "feedback-message error";

                message.textContent =
                    "Không thể kết nối cơ sở dữ liệu.";

                return;

            }


            // =========================
            // LẤY DỮ LIỆU FORM
            // =========================

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


            console.log(
                "📦 DỮ LIỆU CHUẨN BỊ GỬI:",
                {
                    name,
                    email,
                    category,
                    message: content
                }
            );


            // =========================
            // KIỂM TRA
            // =========================

            if (
                !name ||!category ||
                !content
            ) {

                message.className =
                    "feedback-message error";

                message.textContent =
                    "Vui lòng điền đầy đủ thông tin bắt buộc.";

                return;

            }


            // =========================
            // GỬI SUPABASE
            // =========================

            try {

                const { data, error } =
                    await window.supabaseClient
                        .from("feedback")
                        .insert([
                            {
                                name: name,
                                email: email || null,
                                type: category,
                                message: content
                            }
                        ])


                console.log(
                    "📥 KẾT QUẢ SUPABASE:",
                    {
                        data,
                        error
                    }
                );


                // =========================
                // NẾU LỖI
                // =========================

                if (error) {

                    console.error(
                        "❌ LỖI SUPABASE:",
                        error
                    );

                    message.className =
                        "feedback-message error";

                    message.textContent =
                        "Không thể gửi góp ý. Vui lòng thử lại.";

                    return;

                }


                // =========================
                // THÀNH CÔNG
                // =========================

                console.log(
                    "✅ GỬI FEEDBACK THÀNH CÔNG"
                );


                message.className =
                    "feedback-message success";

                message.textContent =
                    "Cảm ơn bạn! Góp ý của bạn đã được ghi nhận.";


                // =========================
                // XÓA FORM
                // =========================

                form.reset();


            } catch (error) {

                console.error(
                    "❌ LỖI KẾT NỐI SUPABASE:",
                    error
                );


                message.className =
                    "feedback-message error";

                message.textContent =
                    "Không thể gửi góp ý. Vui lòng thử lại.";

            }

        }
    );

});