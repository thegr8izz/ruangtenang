document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.php-email-form');
  
  if (!form) {
    console.log('Form not found');
    return;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get button and messages
    const submitBtn = form.querySelector('button[type="submit"]');
    const errorMsg = form.querySelector('.error-message');
    const sentMsg = form.querySelector('.sent-message');
    
    if (!submitBtn) {
      console.error('Submit button not found');
      return;
    }

    // Reset messages
    if (errorMsg) errorMsg.style.display = 'none';
    if (sentMsg) sentMsg.style.display = 'none';
    
    // Disable button
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    // Prepare form data
    const formData = new FormData(form);

    // Send to Web3Forms API
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', data);
      
      // Show success message
      if (sentMsg) {
        sentMsg.style.display = 'block';
      }
      
      // Clear form
      form.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      // Auto-hide success after 5 seconds
      setTimeout(() => {
        if (sentMsg) {
          sentMsg.style.display = 'none';
        }
      }, 5000);
    })
    .catch(error => {
      console.error('Error:', error);
      
      // Show error
      if (errorMsg) {
        errorMsg.textContent = 'Error sending request. Please try again.';
        errorMsg.style.display = 'block';
      } else {
        alert('Error: ' + error.message);
      }
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });
});