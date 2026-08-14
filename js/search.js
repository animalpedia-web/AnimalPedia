import animals from '../data/animals.js';

console.log('🔥🔥🔥 SEARCH.JS ĐANG CHẠY 🔥🔥🔥');
console.log('Supabase client:', window.supabaseClient);


// =====================================================
// KHỞI TẠO
// =====================================================

const initSearch = () => {

    console.log('🔥 BẮT ĐẦU initSearch()');


    const searchToggle =
        document.getElementById('searchToggle');

    const searchInput =
        document.getElementById('searchInput');

    const searchResults =
        document.getElementById('searchResults');


    // =================================================
    // KIỂM TRA HTML
    // =================================================

    console.log(
        'searchToggle =',
        searchToggle
    );

    console.log(
        'searchInput =',
        searchInput
    );

    console.log(
        'searchResults =',
        searchResults
    );


    if (!searchToggle) {

        console.error(
            '❌ KHÔNG TÌM THẤY #searchToggle'
        );

        return;
    }


    if (!searchInput) {

        console.error(
            '❌ KHÔNG TÌM THẤY #searchInput'
        );

        return;
    }


    if (!searchResults) {

        console.error(
            '❌ KHÔNG TÌM THẤY #searchResults'
        );

        return;
    }


    console.log(
        '✅ ĐÃ TÌM THẤY ĐẦY ĐỦ 3 PHẦN SEARCH'
    );


    // =================================================
    // CLEAR SEARCH
    // =================================================

    const clearSearch = () => {

        console.log(
            '🧹 CLEAR SEARCH'
        );


        searchInput.value = '';

        searchResults.innerHTML = '';

        searchResults.classList.remove('show');

    };


    // =================================================
    // SEARCH TOGGLE
    // =================================================

    searchToggle.addEventListener(
        'click',
        () => {

            console.log(
                '🔍 ĐÃ BẤM NÚT SEARCH'
            );


            const isActive =
                searchInput.classList.toggle(
                    'active'
                );


            console.log(
                'Search active =',
                isActive
            );


            if (isActive) {

                searchInput.focus();

                console.log(
                    '⌨️ ĐÃ FOCUS SEARCH INPUT'
                );

            } else {

                clearSearch();

            }

        }
    );


    // =================================================
    // HÀM TÌM KIẾM
    // =================================================

    const filterAnimals = () => {

        console.log(
            '🔥🔥🔥 filterAnimals() ĐƯỢC GỌI'
        );


        console.log(
            'Giá trị input:',
            searchInput.value
        );


        const value =
        searchInput.value
                .trim()
                .toLowerCase();


        console.log(
            '🔎 VALUE SAU KHI XỬ LÝ:',
            value
        );


        // =============================================
        // LỌC ANIMALS
        // =============================================

        const matches =
            animals.filter(
                animal => {

                    const name =
                        (animal.name || '')
                            .toLowerCase();


                    return name.startsWith(
                        value
                    );

                }
            );


        console.log(
            '🐾 SỐ KẾT QUẢ:',
            matches.length
        );


        console.log(
            '🐾 KẾT QUẢ:',
            matches
        );


        // =============================================
        // XÓA KẾT QUẢ CŨ
        // =============================================

        searchResults.innerHTML = '';

        searchResults.classList.remove(
            'show'
        );


        // =============================================
        // KHÔNG CÓ TỪ KHÓA
        // =============================================

        if (!value) {

            console.log(
                '⚪ Không có từ khóa'
            );

            return;

        }


        // =============================================
        // CÓ KẾT QUẢ
        // =============================================

        if (matches.length > 0) {

            console.log(
                '✅ ĐANG TẠO DANH SÁCH'
            );


            const list =
                document.createElement(
                    'ul'
                );


            matches.forEach(
                animal => {

                    console.log(
                        '➕ Thêm:',
                        animal.name
                    );


                    const item =
                        document.createElement(
                            'li'
                        );


                    item.innerHTML = `
                        <a
                            href="animal.html?slug=${animal.slug}"
                            class="animal-search-link"
                        >
                            <strong>
                                ${animal.name}
                            </strong>
                            — ${animal.type}
                        </a>
                    `;


                    list.appendChild(
                        item
                    );

                }
            );


            searchResults.appendChild(
                list
            );


            searchResults.classList.add(
                'show'
            );


            console.log(
                '✅ ĐÃ HIỂN THỊ KẾT QUẢ'
            );

        }

        // =============================================// KHÔNG CÓ KẾT QUẢ
        // =============================================

        else {

            console.log(
                '❌ KHÔNG TÌM THẤY'
            );


            searchResults.innerHTML =
                '<p>Không tìm thấy loài nào phù hợp.</p>';


            searchResults.classList.add(
                'show'
            );

        }

    };


    // =================================================
    // EVENT INPUT
    // =================================================

    console.log(
        '🎯 ĐANG GẮN EVENT INPUT'
    );


    searchInput.addEventListener(
        'input',
        () => {

            console.log(
                '⌨️⌨️⌨️ INPUT EVENT:',
                searchInput.value
            );


            filterAnimals();

        }
    );


    // =================================================
    // ENTER
    // =================================================

    searchInput.addEventListener(
        'keydown',
        event => {

            console.log(
                '⌨️ KEY:',
                event.key
            );


            if (event.key === 'Enter') {

                console.log(
                    '↩️ ENTER'
                );


                filterAnimals();

            }

        }
    );


    // =================================================
    // CLICK KẾT QUẢ
    // =================================================

    searchResults.addEventListener(
        'click',
        async event => {

            console.log(
                '🖱️ CLICK TRONG SEARCH RESULTS'
            );


            const link =
                event.target.closest(
                    'a'
                );


            if (!link) {

                console.log(
                    '⚪ Click không phải link'
                );

                return;

            }


            console.log(
                '🔥🔥🔥 ĐÃ BẤM KẾT QUẢ 🔥🔥🔥'
            );


            console.log(
                'Link:',
                link.href
            );


            // =========================================
            // LẤY SLUG
            // =========================================

            const url =
                new URL(
                    link.href,
                    window.location.href
                );


            const slug =
                url.searchParams.get(
                    'slug'
                );


            console.log(
                '🐾 SLUG:',
                slug
            );


            if (!slug) {

                console.error(
                    '❌ KHÔNG CÓ SLUG'
                );

                return;

            }


            // =========================================
            // CHẶN CHUYỂN TRANG
            // =========================================

            event.preventDefault();


            console.log('⛔ ĐÃ CHẶN CHUYỂN TRANG'
            );


            // =========================================
            // KIỂM TRA SUPABASE
            // =========================================

            console.log(
                'Supabase hiện tại:',
                window.supabaseClient
            );


            if (!window.supabaseClient) {

                console.error(
                    '❌ SUPABASE CLIENT KHÔNG TỒN TẠI'
                );


                window.location.href =
                    link.href;


                return;

            }


            console.log(
                '✅ SUPABASE CLIENT OK'
            );


            // =========================================
            // GỌI RPC
            // =========================================

            try {

                console.log(
                    '🚀 ĐANG GỌI RPC...'
                );


                const {
                    data,
                    error
                } =
                    await window.supabaseClient.rpc(
                        'increment_animal_search',
                        {
                            p_slug: slug
                        }
                    );


                console.log(
                    'RPC DATA:',
                    );


                console.log(
                    'RPC ERROR:',
                    error
                );


                if (error) {

                    console.error(
                        '❌ RPC LỖI:',
                        error
                    );

                } else {

                    console.log(
                        '🎉🎉🎉 GHI THÀNH CÔNG:',
                        slug
                    );

                }


            } catch (error) {

                console.error(
                    '💥 EXCEPTION SUPABASE:',
                    error
                );

            }


            // =========================================
            // CHUYỂN TRANG
            // =========================================

            console.log(
                '➡️ ĐANG CHUYỂN:',
                link.href
            );


            window.location.href =
                link.href;

        }
    );


    console.log(
        '🎉🎉🎉 SEARCH ĐÃ KHỞI TẠO XONG'
    );

};


// =====================================================
// DOM READY
// =====================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        console.log(
            '🌐 DOM CONTENT LOADED'
        );


        initSearch();

    }
);