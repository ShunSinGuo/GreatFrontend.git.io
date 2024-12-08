const productData = document.getElementById("products");

async function fetchData() {
    const url = "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products"
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Http error! status: ${response.status}`)
        }

        const json = await response.json();
        const data = json.data;

        productData.innerHTML = data
        .map(
            (output) => `
                <div class="cards" id="cards">
                    <img src="${output.images[0].image_url}" alt="Product picture" loading="lazy"/>
                    <article>
                        <p>${output.colors[0].charAt(0).toUpperCase()+output.colors[0].slice(1)}</p>
                        <h3>${output.name}</h3>
                        <p>$${output.priceRange.highest}</p>
                        ${output.colors.map((value) => `<div class="product-color" style="background-color: ${value};"></div>`).join('')}
                    </article>
                </div>
            `).join('');
    } catch (error) {
        alert(error.message);
        return error.message;
    }
}

fetchData();
