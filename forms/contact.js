document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[action="formscontact.php"]');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    // Change form action to Web3Forms
    contactForm.action = 'https://api.web3forms.com/submit';
    contactForm.method = 'POST';

    // Add Web3Forms access key (same as book-a-table)
    const accessKeyInput = document.createElement('input');
    accessKeyInput.type = 'hidden';
    accessKeyInput.name = 'access_key';
    accessKeyInput.value = '16518af1-ba2b-4bd1-a141-5b4b58050f51';
    contactForm.prepend(accessKeyInput);

    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const loadingDiv = contactForm.querySelector('.loading');
        const sentMsg = contactForm.querySelector('.sent-message');
        const errorMsg = contactForm.querySelector('.error-message');

        if (!submitBtn) {
            console.error('Submit button not found');
            return;
        }

        // Reset messages
        if (loadingDiv) loadingDiv.style.display = 'block';
        if (sentMsg) sentMsg.style.display = 'none';
        if (errorMsg) {
            errorMsg.style.display = 'none';
            errorMsg.textContent = '';
        }

        // Disable button
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        try {
            // Send to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(contactForm)
            });

            const data = await response.json();

            console.log('Web3Forms Response:', data);

            if (data.success) {
                // Hide loading, show success
                if (loadingDiv) loadingDiv.style.display = 'none';
                if (sentMsg) sentMsg.style.display = 'block';

                // Clear form
                contactForm.reset();

                // Auto-hide success message after 6 seconds
                setTimeout(() => {
                    if (sentMsg) {
                        sentMsg.style.display = 'none';
                    }
                }, 6000);
            } else {
                // Show error
                if (loadingDiv) loadingDiv.style.display = 'none';
                if (errorMsg) {
                    errorMsg.textContent = 'Error: ' + (data.message || 'Failed to send message');
                    errorMsg.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (errorMsg) {
                errorMsg.textContent = 'Error: Network problem. Please try again.';
                errorMsg.style.display = 'block';
            }
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});