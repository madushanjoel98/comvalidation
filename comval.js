document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(
            "https://madushanjoel98.github.io/comvalidation/auram_2026.json"
        );

        const data = await response.json();

        // Application disabled
        if (data.ava === false) {
            alert("Application is disabled.", data.message);
            closeApplication();
            return;
        }

        // License expiry check
        if (data.expied_date && data.expied_date.trim() !== "") {
            const expiryDate = new Date(data.expied_date);
            const today = new Date();

            if (today > expiryDate) {
                alert("License has expired.");
                closeApplication();
                return;
            }
        }

        // Validate token every 24 hours
        if (data.dev === true) {

            const lastValidation =
                localStorage.getItem("token_validation_time");

            const savedToken =
                localStorage.getItem("validated_token");

            const now = Date.now();

            const twentyFourHours =
                24 * 60 * 60 * 1000;

            const needsValidation =
                !lastValidation ||
                !savedToken ||
                (now - parseInt(lastValidation)) > twentyFourHours ||
                savedToken !== data["token-no"];

            if (needsValidation) {

                const userToken = prompt(
                    "Enter application token:"
                );

                if (
                    !userToken ||
                    userToken.trim() !== data["token-no"]
                ) {
                    alert("Invalid token.");
                    closeApplication();
                    return;
                }

                // Save successful validation
                localStorage.setItem(
                    "validated_token",
                    userToken.trim()
                );

                localStorage.setItem(
                    "token_validation_time",
                    now.toString()
                );
            }
        }

        console.log("Application validated successfully.");

    } catch (error) {

        console.error(error);
        alert("Unable to validate application.");

        closeApplication();
    }

    function closeApplication() {

        window.close();

        setTimeout(() => {
            window.location.replace("about:blank");
        }, 100);
    }
});