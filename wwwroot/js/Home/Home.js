﻿$(document).ready(function () {

    // --- BẮT ĐẦU CODE MỚI CHO PARTIAL VIEW + MODAL ---

    // Bắt sự kiện click vào phần tử có class 'show-court-details'
    $('.container').on('click', '.show-court-details', function () {

        // Lấy ID của sân từ thuộc tính data-court-id
        var courtId = $(this).data('court-id');

        // Lấy đối tượng modal (để hiển thị sau)
        var modal = $('#courtInfoModal');
        // Lấy phần body của modal (để chèn HTML vào)
        var modalBody = modal.find('.modal-body');
        // Lấy tiêu đề modal
        var modalTitle = modal.find('.modal-title');
        // Lấy nút đặt sân trong modal (để cập nhật link sau)
        var modalBookButton = modal.find('#modalBookButton');

        // Hiển thị tạm chữ "Đang tải..." trong modal body
        modalBody.html('<p class="text-center">Đang tải thông tin...</p>');
        modalTitle.text('Đang tải...'); // Cập nhật tiêu đề tạm
        modalBookButton.attr('href', '#'); // Xóa link cũ

        // Hiển thị modal ngay lập tức (với chữ "Đang tải...")
        modal.modal('show');

        // Thực hiện gọi AJAX đến Action trong Controller
        $.ajax({
            url: '/Home/GetCourtDetailsPartial', // ĐƯỜNG DẪN ĐẾN ACTION CỦA BẠN
            type: 'GET', // Phương thức GET
            data: { courtId: courtId }, // Dữ liệu gửi lên server (ID của sân)
            success: function (response) {
                // Khi thành công, 'response' sẽ chứa HTML từ Partial View
                // Chèn HTML này vào phần body của modal
                modalBody.html(response);

                // Cập nhật lại tiêu đề (lấy từ h6 đầu tiên trong partial view nếu có)
                // Hoặc bạn có thể truyền tên sân về riêng qua JSON nếu muốn
                var courtNameInPartial = $(response).find('h6').first().text() || "Thông tin sân"; // Lấy tên từ HTML trả về
                modalTitle.text(courtNameInPartial);

                // Cập nhật link nút Đặt sân (tạo link dựa vào courtId)
                var bookingUrl = '/Booking/Create?courtId=' + courtId; // Tự tạo link
                modalBookButton.attr('href', bookingUrl);

            },
            error: function (xhr, status, error) {
                // Khi có lỗi xảy ra
                modalBody.html('<p class="text-danger text-center">Lỗi khi tải thông tin sân.</p>');
                console.error("AJAX Error:", status, error);
                modalTitle.text('Lỗi');
            }
        });
    });

    // --- KẾT THÚC CODE MỚI ---


    // --- CODE CŨ (Giữ nguyên) ---
    // --- CODE CHO NÚT XÓA TÌM KIẾM ---
    $('.search-bar').on('click', '.clear-search-btn', function () {
        var searchInput = $(this).siblings('.form-control');
        searchInput.val('');
        searchInput.focus();
    });

    // --- CODE CHO ICON SEARCH ---
    $('.search-bar').on('click', '.search-icon-btn', function () {
        var searchInput = $(this).siblings('.form-control');
        searchInput.focus();
    });

    // --- CODE CHO NÚT YÊU THÍCH ---
    $('.container').on('click', '.fav-btn', function (e) {
        e.preventDefault();
        var $button = $(this);
        $button.toggleClass('favorited');
        let courtName = $button.closest('.card').find('h6').first().text();
        if ($button.hasClass('favorited')) {
            $button.find('.fas.fa-heart').show();
            $button.find('.far.fa-heart').hide();
            alert('Đã thêm "' + courtName + '" vào danh sách yêu thích!');
        } else {
            $button.find('.fas.fa-heart').hide();
            $button.find('.far.fa-heart').show();
            alert('Đã xóa "' + courtName + '" khỏi danh sách yêu thích.');
        }
    });

    // --- CODE CHO NÚT DẪN ĐƯỜNG ---
    $('.container').on('click', '.dir-btn', function (e) {
        e.preventDefault();
        let courtName = $(this).closest('.card').find('h6').first().text();
        alert('Bắt đầu dẫn đường đến "' + courtName + '"...');
    });

}); // Đóng $(document).ready()