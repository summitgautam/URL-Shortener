document.addEventListener("DOMContentLoaded", () => {
    const urlForm = document.querySelector('form'); 
   
    if (urlForm) {
        urlForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
             
            const urlInput = document.querySelector('input[name="url"]').value;
            let random = Math.random().toString(36).slice(2,7);
            console.log(random);
            fetch('/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: urlInput, randomcode:random })
            })
            .then(response => response.json()) 
            .then(result => {
                if (result.success) {
                    localStorage.setItem('processedUrl', result.url);
                    localStorage.setItem('randomcode', result.random_code);
                    window.location.href = '/';
                } else {
                    console.error('No URL returned from backend');
                }
            })
            .catch(error => console.error('Network Error:', error));
        });
         const savedUrl = localStorage.getItem('processedUrl');
    const random_codee = localStorage.getItem('randomcode');
    const resultDiv = document.getElementById('result');

    if (savedUrl && resultDiv) {
        resultDiv.innerText = `Your URL is /${random_codee}`; 
        localStorage.removeItem('processedUrl'); 
    }
}
    })
