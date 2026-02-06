document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".auth-toggle-btn");
    const modeInput = document.getElementById("mode");
    const langSelect = document.getElementById("lang-select");

    const titleText = document.getElementById("title-text");
    const subtitleText = document.getElementById("subtitle-text");

    let mode = "login";

    // Language text dictionary
    const translations = {
        en: {
            title: "Welcome to Krishi AI",
            subtitle: "Sign in to see your dashboard and crop insights.",
            login: "Login",
            register: "Register"
        },
        kn: {
            title: "ಕೃಷಿ AI ಗೆ ಸ್ವಾಗತ",
            subtitle: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಮತ್ತು ಬೆಳೆ ಮಾಹಿತಿ ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ.",
            login: "ಲಾಗಿನ್",
            register: "ನೋಂದಣಿ"
        }
    };

    // Toggle login/register
    toggleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            toggleButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            mode = btn.dataset.mode;
            if (modeInput) {
                modeInput.value = mode;
            }
        });
    });

    // Language change
    if (langSelect) {
        langSelect.addEventListener("change", () => {
            const lang = langSelect.value;
            const t = translations[lang];

            titleText.textContent = t.title;
            subtitleText.textContent = t.subtitle;

            toggleButtons[0].textContent = t.login;
            toggleButtons[1].textContent = t.register;
        });
    }
});