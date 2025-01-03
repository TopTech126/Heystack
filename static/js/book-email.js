(function () {
    emailjs.init("AxfWH57xCUpbKEHPO");
})();

document.getElementById('book-email-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const templateParams = {
        to: 'smartcode2414@gmail.com',
        subject: "Book",
        name: document.getElementById('book-name').value,
        email: document.getElementById('book-email').value,
        phone: document.getElementById('book-subject').value,
        message: document.getElementById('book-message').value,
    };

    emailjs.send('service_l3gukc9', 'template_n2dk8vg', templateParams)
        .then(function (response) {
            bookModal.style.display = "none";
            console.log('SUCCESS!', response.status, response.text);
            alert('Email sent successfully!');
        }, function (error) {
            console.log('FAILED...', error);
            alert('Email sending failed. Please try again later.');
        });
});