const productData = document.getElementById("products");
const collections = document.getElementById("collections");
const category = document.getElementById("category");
const colors = document.getElementById("colors");
const rating = document.getElementById("rating");

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

function toggleCollections() {
    const isShrinked = collections.classList.contains('shrinked');

    if (!isShrinked) {
        collections.classList.add('shrinked');

        if (!collections.querySelector('.collections-bar')) {
            const collectionsBar = document.createElement('div');
            collectionsBar.className = 'collections-bar';

            const items = [
                { id: 'latest-arrivals', label: 'Latest arrivals' },
                { id: 'urban-oasis', label: 'Urban Oasis' },
                { id: 'cozy-comfort', label: 'Cozy Comfort' },
                { id: 'fresh-fusion', label: 'Fresh Fusion' },
            ];

            items.forEach(item => {
                const collectionItem = document.createElement('div');
                collectionItem.className = 'collection-item';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.id;
                checkbox.name = 'collections';
                checkbox.value = item.id;

                const label = document.createElement('label');
                label.htmlFor = item.id;
                label.textContent = item.label;

                collectionItem.appendChild(checkbox);
                collectionItem.appendChild(label);
                collectionsBar.appendChild(collectionItem);
            });

            collections.appendChild(collectionsBar);
        }
    } else {
        collections.classList.remove('shrinked');
    }
}



collections.addEventListener('click',toggleCollections);
fetchData();
