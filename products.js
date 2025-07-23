fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const categories = {};
    data.forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    const container = document.getElementById('products');
    container.innerHTML = `
      <h3 class="text-3xl font-semibold text-center mb-10">Our Products</h3>
      <div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4" id="cat-grid"></div>
    `;

    const grid = document.getElementById('cat-grid');

   const categories = [
  "Spices",
  "Pulses",
  "Dry Fruits",
  "Cereals",
  "Millets",
  "Flours Daliya",
  "Oil and Oil Seeds",
  "Sweetners",
  "Nuts",
  "Rice",
  "Natural Salts"
];

const container = document.getElementById("category-container");

// Function to format category name to match image filenames
function formatCategoryName(category) {
  return category.toLowerCase().replace(/ /g, "_");
}

// Dynamically load image with fallback to .jpg then .png then placeholder
function loadCategoryImage(category, imgElement) {
  const baseName = formatCategoryName(category);
  const jpgPath = `images/${baseName}.jpg`;
  const pngPath = `images/${baseName}.png`;
  const placeholder = "images/placeholder-category.png";

  const testImg = new Image();
  testImg.onload = () => imgElement.src = jpgPath;
  testImg.onerror = () => {
    const fallbackImg = new Image();
    fallbackImg.onload = () => imgElement.src = pngPath;
    fallbackImg.onerror = () => imgElement.src = placeholder;
    fallbackImg.src = pngPath;
  };
  testImg.src = jpgPath;
}

// Render category cards
categories.forEach(category => {
  const card = document.createElement("div");
  card.className = "category-card";

  const img = document.createElement("img");
  img.alt = category;
  img.src = "images/placeholder-category.png"; // Default placeholder while loading

  loadCategoryImage(category, img); // Try to load real image

  const title = document.createElement("h3");
  title.textContent = category;

  card.appendChild(img);
  card.appendChild(title);
  container.appendChild(card);
});

    Object.keys(categories).forEach(category => {
      const categoryImg = categoryImageMap[category] || 'placeholder-category.png';

      const catBox = document.createElement('div');
      catBox.className =
        'bg-white rounded-2xl shadow-xl p-4 text-center zoom-hover cursor-pointer flex flex-col items-center transition';

      catBox.innerHTML = `
        <img src="images/${categoryImg}" alt="${category}" 
             class="mb-3 mx-auto rounded-xl h-20 w-20 object-contain bg-lime-50"
             onerror="this.src='images/placeholder-category.png'">
        <p class="font-semibold text-lg text-green-900">${category}</p>
      `;

      const productList = document.createElement('div');
      productList.className = 'hidden mt-4 w-full';

      categories[category].forEach(productItem => {
        const prodCard = document.createElement('div');
        prodCard.className = 'flex flex-col items-center mb-4';

        prodCard.innerHTML = `
          <img src="images/${productItem.image || 'placeholder-product.png'}"
               alt="${productItem.product}"
               class="w-16 h-16 mb-1 rounded bg-gray-50 object-contain"
               onerror="this.src='images/placeholder-product.png'">
          <p class="text-green-800 text-sm font-medium">${productItem.product}</p>
        `;
        productList.appendChild(prodCard);
      });

      catBox.onclick = () => productList.classList.toggle('hidden');

      const wrapper = document.createElement('div');
      wrapper.appendChild(catBox);
      wrapper.appendChild(productList);

      grid.appendChild(wrapper);
    });
  })
  .catch(err => {
    console.error("Error loading products.json:", err);
  });
