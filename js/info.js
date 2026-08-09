document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LẤY ELEMENT
    ====================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const sideMenu =
        document.getElementById("sideMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================
       MENU
    ====================================== */

    if (menuToggle && sideMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    sideMenu.classList.toggle(
                        "active"
                    );


                menuToggle.classList.toggle(
                    "menu-open",
                    isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                if (menuOverlay) {

                    menuOverlay.classList.toggle(
                        "show",
                        isOpen
                    );

                }

            }
        );

    }


    /* =====================================
       ĐÓNG MENU
    ====================================== */

    function closeMenu() {

        if (sideMenu) {

            sideMenu.classList.remove(
                "active"
            );

        }


        if (menuToggle) {

            menuToggle.classList.remove(
                "menu-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (menuOverlay) {

            menuOverlay.classList.remove(
                "show"
            );

        }

    }


    /* =====================================
       CLICK OVERLAY
    ====================================== */

    if (menuOverlay) {

        menuOverlay.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =====================================
       PHÍM ESC
    ====================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================
       NĂM HIỆN TẠI
    ====================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});