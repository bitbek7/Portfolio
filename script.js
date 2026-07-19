const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");


menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

// Contact form submission handling
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.innerHTML = "Sending...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Message sent successfully!";
                    result.style.color = "green";
                    form.reset();
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    result.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                result.style.color = "red";
            })
            .then(function () {
                setTimeout(() => {
                    result.innerHTML = "";
                }, 3000);
            });
    });
}

// Typing Effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const words = ["Backend Developer", "Frontend Developer", "Fullstack Engineer"];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let isDeleting = true;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed = 50;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 2000);
}