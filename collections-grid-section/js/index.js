const cardInclude = document.getElementById("card");

async function getData() {
  const url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json(); 
    const data = json.data; 

    cardInclude.innerHTML = data
      .map(
        (collection) => `
          <div 
            class="card-bar" 
            style="background-image: url('${collection.image_url}')">
            <article>
              <h4>${collection.name}</h4>
              <p>${collection.description}</p>
            </article>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

getData();
