let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };

    document.title = 'About';

    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
    <h1 class="title">About Me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
        <form id="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <span class="error" id="name-error"></span>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <span class="error" id="email-error"></span>

            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <span class="error" id="message-error"></span>

            <!-- Google reCAPTCHA widget -->
            <div class="g-recaptcha" data-sitekey="6LeuaqEqAAAAAMMq8HdvzOhxii3FQ1k5NybHYOKl"></div>
            <span class="error" id="captcha-error"></span>

            <button type="submit">Send</button>
        </form>
        <div id="success-message" style="display: none;">Your message has been sent successfully!</div>

        <!-- Load Google reCAPTCHA API -->
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    `;

    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const captchaResponse = grecaptcha.getResponse();  // Get the reCAPTCHA response

        let isValid = true;

        // Walidacja pola Name
        if (name === "") {
            document.getElementById('name-error').textContent = "Name is required.";
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = "";
        }

        // Walidacja pola Email
        if (!/\S+@\S+\.\S+/.test(email)) {
            document.getElementById('email-error').textContent = "Invalid email address.";
            isValid = false;
        } else {
            document.getElementById('email-error').textContent = "";
        }

        // Walidacja pola Message
        if (message === "") {
            document.getElementById('message-error').textContent = "Message is required.";
            isValid = false;
        } else {
            document.getElementById('message-error').textContent = "";
        }

        // Walidacja CAPTCHA
        if (!captchaResponse) {
            document.getElementById('captcha-error').textContent = "Please verify that you are not a robot.";
            isValid = false;
        } else {
            document.getElementById('captcha-error').textContent = "";
        }

        // Jeśli formularz jest poprawny
        if (isValid) {
            document.getElementById('success-message').style.display = "block";
            document.getElementById('contact-form').reset();

            // Optional: Reset reCAPTCHA widget after form submission (to make it ready for the next submission)
            grecaptcha.reset();
        }
    });
}





function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div class="gallery"></div>
        <div class="modal" id="image-modal">
            <button class="modal-close" id="modal-close">✖</button>
            <img id="modal-image" src="" alt="Full view">
        </div>`;

    const gallery = document.querySelector('.gallery');
    for (let i = 1; i <= 40; i++) {
        const img = document.createElement('img');
        img.className = 'thumbnail';
        img.dataset.src = `https://placehold.co/300?text=Hello_World${i}`;
        img.alt = `Image ${i}`;
        gallery.appendChild(img);
    }

    const lazyImages = document.querySelectorAll('.thumbnail');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                console.log(`Loading image: ${img.dataset.src}`);
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => observer.observe(img));

    // Modal functionality
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('modal-close');

    gallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('thumbnail')) {
            modalImage.src = e.target.src;
            modal.classList.add('active');
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact) { RenderContactPage(); }
    if (loc === pageUrls.about) { RenderAboutPage(); }
    if (loc === pageUrls.gallery) { RenderGalleryPage(); }
}

window.onpopstate = popStateHandler;