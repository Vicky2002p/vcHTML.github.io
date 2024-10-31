document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Basic validation example
  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !mobile || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Here, you can add more sophisticated validation if needed

  // Simulate form submission
  console.log('Submitting form...');
  console.log({ name, mobile, email, message });

  // Optionally, send the data to a server
  fetch('submit_form.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, mobile, email, message })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Form submitted successfully!');
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error submitting form.');
  });
});
