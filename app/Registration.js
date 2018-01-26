window.onload = function () {

    $('.form').find('input, textarea').on('keyup blur focus', function (e) {

        var $this = $(this),
            label = $this.prev('label');

        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {

            if ($this.val() === '') {
                label.removeClass('highlight');
            }
            else if ($this.val() !== '') {
                label.addClass('highlight');
            }
        }

    });
    $('#password2').on('keyup', function checkPass() {

        var password1 = document.getElementById('password1');
        var password2 = document.getElementById('password2');

        var badColor = "#ff6666";

        if ($("#password1").val() !== '' && $("#password2").val() !== '') {
            if ($("#password1").val() !== $("#password2").val()) {
                password2.style.backgroundColor = badColor;
                var btn = document.getElementById('agree');
                btn.style.display='none';
            }
            else{
                var btn = document.getElementById('agree');
                btn.style.display='block';
                this.style.backgroundColor = "";
            }
        }

    });


    $(document).ready(function () {
        $('.form').find('input, textarea').trigger('keyup');

    });

    $('.tab a').on('click', function (e) {

        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);

    });

};