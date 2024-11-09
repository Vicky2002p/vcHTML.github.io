document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !mobile || !email || !message) {
      alert('Please fill in all fields.');
      return;
  }

  fetch('submit_form.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, mobile, email, message })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('Success:', data);
      alert(data.message); // Display success message from server
  })
  .catch((error) => {
      console.error('Error:', error);
      alert('Error submitting form.'); // General error alert
  });
});
