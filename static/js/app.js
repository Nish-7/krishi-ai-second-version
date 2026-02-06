// Simple client-side "auth" for demo only
function getCurrentUser() {
    return localStorage.getItem("krishi_user") || "guest";
}

// Register service worker for PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .catch((err) => console.warn("Service worker registration failed", err));
    });
}


// -------- LANGUAGE SYSTEM (GLOBAL) --------
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang-select");

    const translations = {
        en: {
            app_name: "Krishi AI",
            home: "Home",
            dashboard: "Dashboard",
            profile: "Profile",
            back: "Back",
            footer_note: "Farmer-first crop and ROI insights",
            login_title: "Welcome to Krishi AI",
            login_subtitle: "Sign in to see your dashboard and crop insights.",
            login: "Login",
            register: "Register"
        },
        kn: {
            app_name: "ಕೃಷಿ ಎಐ",
            home: "ಮುಖಪುಟ",
            dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            profile: "ಪ್ರೊಫೈಲ್",
            back: "ಹಿಂದೆ",
            footer_note: "ರೈತರಿಗೆ ಮೊದಲ ಆದ್ಯತೆ – ಬೆಳೆ ಮತ್ತು ಲಾಭ ಮಾಹಿತಿ",
            login_title: "ಕೃಷಿ ಎಐ ಗೆ ಸ್ವಾಗತ",
            login_subtitle: "ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಮತ್ತು ಬೆಳೆ ಮಾಹಿತಿಗಾಗಿ ಲಾಗಿನ್ ಮಾಡಿ.",
            login: "ಲಾಗಿನ್",
            register: "ನೋಂದಣಿ"
        }
    };
    

    function applyLanguage(lang) {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }

    if (langSelect) {
        const savedLang = localStorage.getItem("lang") || "en";
        langSelect.value = savedLang;
        applyLanguage(savedLang);

        langSelect.addEventListener("change", () => {
            const lang = langSelect.value;
            localStorage.setItem("lang", lang);
            applyLanguage(lang);
        });
    } else {
        const savedLang = localStorage.getItem("lang") || "en";
        applyLanguage(savedLang);
    }
});