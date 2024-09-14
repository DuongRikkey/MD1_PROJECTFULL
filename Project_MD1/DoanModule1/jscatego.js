document.addEventListener("DOMContentLoaded", function() {
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');

    priceRange.addEventListener('input', function() {
        const minValue = Number(priceRange.min).toLocaleString();
        const maxValue = Number(priceRange.max).toLocaleString();
        const currentValue = Number(priceRange.value).toLocaleString();
        priceValue.textContent = `${minValue} ₫ - ${currentValue} ₫`;
    });

    const filterSections = document.querySelectorAll('.filter-section h3');
    filterSections.forEach(section => {
        section.addEventListener('click', function() {
            const ul = this.nextElementSibling;
            ul.style.display = ul.style.display === 'none' || !ul.style.display ? 'block' : 'none';
        });
    });

    const filterButton = document.getElementById('filter-button');
    filterButton.addEventListener('click', function() {
        alert('Filtering products...');
        // Add your filtering logic here
    });
});
