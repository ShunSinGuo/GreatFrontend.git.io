const productData = document.getElementById("products");
const collections = document.getElementById("collections");
const category = document.getElementById("category");
const colors = document.getElementById("colors");
const rating = document.getElementById("rating");

let colorsSet = new Set();

async function fetchData() {
  const url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }

    const json = await response.json();
    const data = json.data;

    productData.innerHTML = data
      .map((output) => {
        output.colors.forEach((color) => colorsSet.add(color));
        return `
                <div class="cards" id="cards">
                    <img src="${
                      output.images[0].image_url
                    }" alt="Product picture" loading="lazy"/>
                    <article>
                        <p>${
                          output.colors[0].charAt(0).toUpperCase() +
                          output.colors[0].slice(1)
                        }</p>
                        <h3>${output.name}</h3>
                        <p>$${output.priceRange.highest}</p>
                        ${output.colors
                          .map(
                            (value) =>
                              `<div class="product-color" style="background-color: ${value};"></div>`
                          )
                          .join("")}
                    </article>
                </div>
            `;
          
      })
      .join("");
  } catch (error) {
    alert(error.message);
    return error.message;
  }
}

// console.log(colorsSet)

function toggleSection(event) {
  const target = event.target.closest("div");
  const isShrinked = target.classList.contains("shrinked");

  if (!isShrinked) {
    target.classList.add("shrinked");

    const sectionContent = document.createElement("div");

    const items = getSectionItems(target.id);

    if(items !== "color" && items !== "rating"){
      sectionContent.className = `${target.id}-content section-content`;
      // console.log(target.id)
      items.forEach((item) => {
        const sectionItem = document.createElement("div");
        sectionItem.className = "section-item";
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = item.id;
        checkbox.name = target.id;
        checkbox.value = item.id;
  
        const label = document.createElement("label");
        label.htmlFor = item.id;
        label.textContent = item.label;
  
        sectionItem.appendChild(checkbox);
        sectionItem.appendChild(label);
        sectionContent.appendChild(sectionItem);
      });
    } else {
      if(items === "color"){
        colorsSet.forEach((output) => {
          sectionContent.className = `${target.id}-content sectionC-content`;
  
          const label = document.createElement("label");
          const span = document.createElement("span");
          span.style.backgroundColor = output;
          span.style.width = "18px";
          span.style.height = "18px"
  
          const checkbox = document.createElement("input");
          checkbox.type = "radio";
          checkbox.id = output; 
          checkbox.name = "color"; 
          checkbox.value = output;
  
          label.appendChild(checkbox);
          label.appendChild(span);
          sectionContent.appendChild(label);
        })
      } else {
        
      }
    }

    const hr = target.nextElementSibling;
    target.parentNode.insertBefore(sectionContent, hr);
  } else {
    const sectionContent = target.parentNode.querySelector(
      `.${target.id}-content`
    );
    if (sectionContent) {
      sectionContent.remove();
    }
    target.classList.remove("shrinked");
  }
}

function getSectionItems(sectionId) {
  switch (sectionId) {
    case "collections":
      return [
        { id: "latest-arrivals", label: "Latest arrivals" },
        { id: "urban-oasis", label: "Urban Oasis" },
        { id: "cozy-comfort", label: "Cozy Comfort" },
        { id: "fresh-fusion", label: "Fresh Fusion" },
      ];
    case "category":
      return [
        { id: "unisex", label: "Unisex" },
        { id: "women", label: "Women" },
        { id: "man", label: "Man" },
      ];
    case "colors":
      return "color";
    case "rating":
      return "rating";
    default:
      return [];
  }
}

const sections = document.querySelectorAll(
  "#collections, #category, #colors, #rating"
);
sections.forEach((section) => {
  section.addEventListener("click", toggleSection);
});

fetchData();
