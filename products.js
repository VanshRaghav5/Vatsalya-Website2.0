fetch('products.json')
  .then(response => response.json())
  .then(data => {
    // Group products by category
    const categories = {};
    data.forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    const container = document.getElementById('products');
    container.innerHTML =
      '<h3 class="text-3xl font-semibold text-center mb-10">Our Products</h3>' +
      '<div class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4" id="cat-grid"></div>';

    const grid = document.getElementById('cat-grid');

    const categoryImageMap = {
      "Dry Fruits": "dryfruits",
      "Pulses": "pulses",
      "Cereals": "cereals",
      "Millets": "millets",
      "Spices": "spices",
      "Oils": "oils",
      "Sweets": "sweets",
      "Nuts": "nuts"
    };

    function getCategoryImage(category) {
      const baseName = categoryImageMap[category] || category.toLowerCase().replace(/\s+|&/g, '_');
      const extensions = ['.jpg', '.png'];
      for (let ext of extensions) {
        const path = `images/${baseName}${ext}`;
        const img = new Image();
        img.src = path;
        if (img.complete || img.naturalWidth !== 0) {
          return path;
        }
      }
      return 'images/placeholder-category.png';
    }

    Object.keys(categories).forEach(category => {
      const catBox = document.createElement('div');
      catBox.className =
        'bg-white rounded-2xl shadow-xl p-4 text-center zoom-hover cursor-pointer flex flex-col items-center transition';

      const img = document.createElement('img');
      img.src = getCategoryImage(category);
      img.alt = category;
      img.className = 'mb-3 mx-auto rounded-xl h-20 w-20 object-contain bg-lime-50';
      img.onerror = function () {
        this.src = 'images/placeholder-category.png';
      };

      const label = document.createElement('p');
      label.textContent = category;
      label.className = 'font-semibold text-lg text-green-900';

      catBox.appendChild(img);
      catBox.appendChild(label);

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
          <p class="text-green-800 text-sm font-medium">${productItem.product}</p>`;
        productList.appendChild(prodCard);
      });

      catBox.onclick = () => {
        productList.classList.toggle('hidden');
      };

      const wrapper = document.createElement('div');
      wrapper.appendChild(catBox);
      wrapper.appendChild(productList);

      grid.appendChild(wrapper);
    });
  });
