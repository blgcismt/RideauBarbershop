const recommendedBarberList = {
    "Classic Cut": "Basile Edgar",
    "Student Cut": "Basile Edgar",
    "Buzz Cut": "Jie Yang",
    "Hair Treatment": "Fehim Beste",
    "Face Shave": "Jie Yang",
    "Beard Trim": "Fehim Beste",
    "Beard Treatment": "Brent Cat",
    "Goatee Trim": "Brent Cat"
};


document.querySelectorAll('.btn-dark').forEach(button => {
    button.addEventListener('click', function() {
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        const serviceLogoSrc = serviceCard.querySelector('img').src;

        document.getElementById('serviceName').textContent = serviceName;
        document.getElementById('serviceLogo').src = serviceLogoSrc;

        const recommendedBarber = recommendedBarberList[serviceName];
        document.getElementById('recommendedBarberName').textContent = recommendedBarber;
    });
});

function handleBookingFormSubmission(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);

    const name = form.querySelector('[id^="customerName"]').value;
    const email = form.querySelector('[id^="customerEmail"]').value;
    const service = document.getElementById('serviceName').textContent;
    const date = form.querySelector('[id$="Date"]').value;
    const time = form.querySelector('[id$="Time"]').value;
    const barberSelection = form.querySelector('input[name="barberSelection"]:checked, input[name="barberSelectionRepeat"]:checked');
    const barber = barberSelection ? barberSelection.parentNode.textContent.trim() : '';

    document.getElementById('confirmName').textContent = name;
    document.getElementById('confirmBarber').textContent = barber;
    document.getElementById('confirmService').textContent = service;
    document.getElementById('confirmDate').textContent = date;
    document.getElementById('confirmTime').textContent = time;
    document.getElementById('confirmEmail').textContent = email;

    const bookingDialogEl = document.getElementById('bookingDialog');
    const bookingDialog = bootstrap.Modal.getInstance(bookingDialogEl);

    bookingDialog.hide();

    bookingDialogEl.addEventListener('hidden.bs.modal', function onModalHidden() {
        bookingDialogEl.removeEventListener('hidden.bs.modal', onModalHidden);
        const confirmationDialog = new bootstrap.Modal(document.getElementById('confirmationDialog'));
        confirmationDialog.show();
    }, { once: true });
}

document.getElementById('singleBookingForm').addEventListener('submit', function(event) {
    handleBookingFormSubmission(event, 'singleBookingForm');
});

document.getElementById('repeatingBookingForm').addEventListener('submit', function(event) {
    handleBookingFormSubmission(event, 'repeatingBookingForm');
});

document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
    tab.addEventListener('click', function() {
        document.getElementById('singleBookingForm').reset();
        document.getElementById('repeatingBookingForm').reset();
    });
});
