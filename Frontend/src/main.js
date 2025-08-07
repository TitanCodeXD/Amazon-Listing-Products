document.getElementById('searchBtn').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(
            `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
        );
        const data = await response.json();

        resultsDiv.innerHTML = data
            .map(
                (product) => `
      <div class="product">
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Rating: ${product.rating || 'N/A'}</p>
        <p>Reviews: ${product.reviews || 'N/A'}</p>
      </div>
    `
            )
            .join('');
    } catch (err) {
        resultsDiv.innerHTML = 'Error fetching results.';
        console.error(err);
    }
});
