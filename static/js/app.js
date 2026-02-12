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
            register: "Register",

            // Dashboard
            dashboard_title: "Farmer Dashboard",
            dashboard_subtitle: "Choose a tool to plan your next season.",

            card_crop_title: "Crop Recommendation",
            card_crop_desc: "Find the most profitable crop for your soil, season and climate.",

            card_roi_title: "ROI Calculator",
            card_roi_desc: "Enter cost and area to see expected profit for a crop.",

            card_fertilizer_title: "Fertilizer Comparison",
            card_fertilizer_desc: "Compare organic and chemical fertilizers by toxicity and price.",

            card_sell_title: "Sell Crops (Prototype)",
            card_sell_desc: "List your produce with quantity and price. No bidding or payment.",

            card_profile_title: "Profile",
            card_profile_desc: "View your basic details, recommendations and sale listings.",

            // Crop Recommendation
            rec_title: "Crop Recommendation",
            rec_subtitle: "Enter your soil and climate to see the most profitable crops.",

            soil_type: "Soil type",
            select_soil: "Select soil type",
            soil_loam: "Loam",
            soil_clay: "Clay",
            soil_sandy: "Sandy",
            soil_silty: "Silty",
            soil_black: "Black",

            season: "Season",
            select_season: "Select season",
            season_kharif: "Kharif (Monsoon)",
            season_rabi: "Rabi (Winter)",
            season_summer: "Summer",
            season_winter: "Winter",
            season_monsoon: "Monsoon",

            rainfall: "Rainfall (mm)",
            temperature: "Temperature (°C)",
            get_recommendation: "Get Recommendation",
            demo_note: "Dummy ML logic is used here for demo purposes.",

            best_crop: "Best Crop",
            yield_used: "Yield used:",
            price_used: "Price used:",
            cost_used: "Cost used:",

            other_crops: "Other Crops (ranked by profit)",
            crop: "Crop",
            profit: "Profit",
            yield: "Yield",
            price: "Price",
            cost: "Cost",

            // ROI
            roi_title: "ROI Calculator",
            roi_subtitle: "Estimate profit for a crop based on area and cost.",
            roi_crop_name: "Crop name",
            roi_area: "Area (acres)",
            roi_cost: "Total cost (₹)",
            calculate_profit: "Calculate Profit",
            roi_note: "If cost is left as 0, system will use typical cost from its dataset.",

            profit_summary: "Profit Summary",
            crop_label: "Crop:",
            area_label: "Area:",
            total_cost_used: "Total cost used:",
            expected_profit: "Expected profit:",

            // SELL PAGE
            sell_title: "Sell Crops (Prototype)",
            sell_subtitle: "List your produce with quantity and price. No bidding or payment.",
            sell_crop_name: "Crop name",
            sell_quantity: "Quantity (quintals)",
            sell_price: "Price (₹/quintal)",
            add_listing: "Add Listing",
            sell_note: "Listings are for demo only and stored temporarily on the server.",
            current_listings: "Current Listings",

            // PROFILE PAGE
            profile_title: "Profile",
            profile_subtitle: "View your basic details and history of crop recommendations and listings.",
            profile_farmer_details: "Farmer Details",
            profile_name: "Name:",
            profile_village: "Village:",
            profile_district: "District:",
            profile_state: "State:",
            profile_recommendation_history: "Recommendation History",
            profile_sale_listings: "Sale Listings",

            // FERTILIZER PAGE
            fertilizer_title: "Fertilizer Comparison",
            fertilizer_subtitle: "Compare fertilizers by type, toxicity level and price per kg.",
            fertilizer_name: "Name",
            fertilizer_type: "Type",
            fertilizer_toxicity: "Toxicity",
            fertilizer_price: "Price (₹/kg)"
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
            register: "ನೋಂದಣಿ",

            // Dashboard
            dashboard_title: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            dashboard_subtitle: "ಮುಂದಿನ ಹಂಗಾಮಿಗೆ ಯೋಜನೆ ಮಾಡಲು ಸಾಧನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",

            card_crop_title: "ಬೆಳೆ ಶಿಫಾರಸು",
            card_crop_desc: "ನಿಮ್ಮ ಮಣ್ಣು, ಋತು ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ಲಾಭದಾಯಕ ಬೆಳೆಯನ್ನು ಹುಡುಕಿ.",

            card_roi_title: "ಲಾಭ ಲೆಕ್ಕಾಚಾರ",
            card_roi_desc: "ಬೆಳೆಯ ಲಾಭವನ್ನು ನೋಡಲು ವೆಚ್ಚ ಮತ್ತು ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ.",

            card_fertilizer_title: "ರಸಗೊಬ್ಬರ ಹೋಲಿಕೆ",
            card_fertilizer_desc: "ಜೈವಿಕ ಮತ್ತು ರಾಸಾಯನಿಕ ರಸಗೊಬ್ಬರಗಳನ್ನು ವಿಷಕಾರಿತನ ಮತ್ತು ಬೆಲೆಯ ಆಧಾರದ ಮೇಲೆ ಹೋಲಿಸಿ.",

            card_sell_title: "ಬೆಳೆ ಮಾರಾಟ (ಪ್ರೋಟೋಟೈಪ್)",
            card_sell_desc: "ಪ್ರಮಾಣ ಮತ್ತು ಬೆಲೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪಟ್ಟಿ ಮಾಡಿ. ಹರಾಜು ಅಥವಾ ಪಾವತಿ ಇಲ್ಲ.",

            card_profile_title: "ಪ್ರೊಫೈಲ್",
            card_profile_desc: "ನಿಮ್ಮ ಮೂಲ ವಿವರಗಳು, ಶಿಫಾರಸುಗಳು ಮತ್ತು ಮಾರಾಟ ಪಟ್ಟಿಗಳನ್ನು ನೋಡಿ.",

            // Crop Recommendation
            rec_title: "ಬೆಳೆ ಶಿಫಾರಸು",
            rec_subtitle: "ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನವನ್ನು ನಮೂದಿಸಿ ಉತ್ತಮ ಬೆಳೆಯನ್ನು ನೋಡಿ.",

            soil_type: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
            select_soil: "ಮಣ್ಣಿನ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
            soil_loam: "ಲೋಮ್",
            soil_clay: "ಕ್ಲೇ",
            soil_sandy: "ಮರಳು",
            soil_silty: "ಸಿಲ್ಟಿ",
            soil_black: "ಕಪ್ಪು ಮಣ್ಣು",

            season: "ಋತು",
            select_season: "ಋತು ಆಯ್ಕೆಮಾಡಿ",
            season_kharif: "ಖರೀಫ್ (ಮಳೆಗಾಲ)",
            season_rabi: "ರಬ್ಬಿ (ಚಳಿ)",
            season_summer: "ಬೆಸಿಗೆ",
            season_winter: "ಚಳಿ",
            season_monsoon: "ಮಳೆಗಾಲ",

            rainfall: "ಮಳೆ (ಮಿಮೀ)",
            temperature: "ತಾಪಮಾನ (°C)",
            get_recommendation: "ಶಿಫಾರಸು ಪಡೆಯಿರಿ",
            demo_note: "ಇದು ಡೆಮೊಗಾಗಿ ಡಮ್ಮಿ ಎಂಎಲ್ ಲಾಜಿಕ್ ಬಳಸುತ್ತದೆ.",

            best_crop: "ಅತ್ಯುತ್ತಮ ಬೆಳೆ",
            yield_used: "ಬಳಸಿದ ಉತ್ಪಾದನೆ:",
            price_used: "ಬಳಸಿದ ಬೆಲೆ:",
            cost_used: "ಬಳಸಿದ ವೆಚ್ಚ:",

            other_crops: "ಇತರೆ ಬೆಳೆಗಳು (ಲಾಭ ಕ್ರಮದಲ್ಲಿ)",
            crop: "ಬೆಳೆ",
            profit: "ಲಾಭ",
            yield: "ಉತ್ಪಾದನೆ",
            price: "ಬೆಲೆ",
            cost: "ವೆಚ್ಚ",

            // ROI
            roi_title: "ಲಾಭ ಲೆಕ್ಕಾಚಾರ",
            roi_subtitle: "ಪ್ರದೇಶ ಮತ್ತು ವೆಚ್ಚದ ಆಧಾರದ ಮೇಲೆ ಲಾಭವನ್ನು ಅಂದಾಜಿಸಿ.",
            roi_crop_name: "ಬೆಳೆ ಹೆಸರು",
            roi_area: "ಪ್ರದೇಶ (ಎಕರೆ)",
            roi_cost: "ಒಟ್ಟು ವೆಚ್ಚ (₹)",
            calculate_profit: "ಲಾಭ ಲೆಕ್ಕ ಹಾಕಿ",
            roi_note: "ವೆಚ್ಚವನ್ನು 0 ಎಂದು ಬಿಡಿಸಿದರೆ ವ್ಯವಸ್ಥೆ ಸಾಮಾನ್ಯ ವೆಚ್ಚವನ್ನು ಬಳಸುತ್ತದೆ.",

            profit_summary: "ಲಾಭ ಸಾರಾಂಶ",
            crop_label: "ಬೆಳೆ:",
            area_label: "ಪ್ರದೇಶ:",
            total_cost_used: "ಬಳಸಿದ ಒಟ್ಟು ವೆಚ್ಚ:",
            expected_profit: "ನಿರೀಕ್ಷಿತ ಲಾಭ:",

            // SELL PAGE
            sell_title: "ಬೆಳೆ ಮಾರಾಟ (ಪ್ರೋಟೋಟೈಪ್)",
            sell_subtitle: "ಪ್ರಮಾಣ ಮತ್ತು ಬೆಲೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪಟ್ಟಿ ಮಾಡಿ. ಹರಾಜು ಅಥವಾ ಪಾವತಿ ಇಲ್ಲ.",
            sell_crop_name: "ಬೆಳೆ ಹೆಸರು",
            sell_quantity: "ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್)",
            sell_price: "ಬೆಲೆ (₹/ಕ್ವಿಂಟಾಲ್)",
            add_listing: "ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ",
            sell_note: "ಈ ಪಟ್ಟಿಗಳು ಡೆಮೊಗಾಗಿ ಮಾತ್ರ ಮತ್ತು ತಾತ್ಕಾಲಿಕವಾಗಿ ಸರ್ವರ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗುತ್ತದೆ.",
            current_listings: "ಪ್ರಸ್ತುತ ಪಟ್ಟಿಗಳು",

            // PROFILE PAGE
            profile_title: "ಪ್ರೊಫೈಲ್",
            profile_subtitle: "ನಿಮ್ಮ ಮೂಲ ವಿವರಗಳು ಮತ್ತು ಬೆಳೆ ಶಿಫಾರಸುಗಳು ಹಾಗೂ ಮಾರಾಟ ಪಟ್ಟಿಗಳ ಇತಿಹಾಸವನ್ನು ನೋಡಿ.",
            profile_farmer_details: "ರೈತರ ವಿವರಗಳು",
            profile_name: "ಹೆಸರು:",
            profile_village: "ಗ್ರಾಮ:",
            profile_district: "ಜಿಲ್ಲೆ:",
            profile_state: "ರಾಜ್ಯ:",
            profile_recommendation_history: "ಶಿಫಾರಸು ಇತಿಹಾಸ",
            profile_sale_listings: "ಮಾರಾಟ ಪಟ್ಟಿಗಳು",

            // FERTILIZER PAGE
            fertilizer_title: "ರಸಗೊಬ್ಬರ ಹೋಲಿಕೆ",
            fertilizer_subtitle: "ರಸಗೊಬ್ಬರಗಳನ್ನು ಪ್ರಕಾರ, ವಿಷಕಾರಿತನ ಮತ್ತು ಕಿಲೋಗ್ರಾಂ ಬೆಲೆಯ ಆಧಾರದ ಮೇಲೆ ಹೋಲಿಸಿ.",
            fertilizer_name: "ಹೆಸರು",
            fertilizer_type: "ಪ್ರಕಾರ",
            fertilizer_toxicity: "ವಿಷಕಾರಿತನ",
            fertilizer_price: "ಬೆಲೆ (₹/ಕಿಲೋ)"
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

    const savedLang = localStorage.getItem("lang") || "en";
    if (langSelect) langSelect.value = savedLang;
    applyLanguage(savedLang);

    if (langSelect) {
        langSelect.addEventListener("change", () => {
            const lang = langSelect.value;
            localStorage.setItem("lang", lang);
            applyLanguage(lang);
        });
    }
});
