document.addEventListener("DOMContentLoaded", () => {
    const urlForm = document.querySelector('form'); 

    if (urlForm) {
        urlForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const urlInput = document.querySelector('input[name="url"]').value;

            fetch('/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: urlInput }) 
            })
            .then(response => response.json()) 
            .then(result => {
                if (result.success) {
                    localStorage.setItem('processedUrl', result.url);
                    window.location.href = '/';
                } else {
                    console.error('No URL returned from backend');
                }
            })
            .catch(error => console.error('Network Error:', error));
        });
    }

    const savedUrl = localStorage.getItem('processedUrl');
    const resultDiv = document.getElementById('result');

    if (savedUrl && resultDiv) {
        resultDiv.innerText = `Your URL is ${savedUrl}`; 
        localStorage.removeItem('processedUrl'); 
    }
});
