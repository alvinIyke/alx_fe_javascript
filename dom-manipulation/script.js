document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const quoteCategory = document.getElementById('quote-category');
    const displayRandomQuoteBtn = document.getElementById('showRandomQuote');
    const quoteDisplay = document.getElementById('quote-display');
    const addQuoteForm = document.getElementById('createAddQuoteForm');
    const addCategoryForm = document.getElementById('add-category-form');

    let quotes = {
        'Motivation': [
            'The only way to do great work is to love what you do. - Steve Jobs',
            'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill'
        ],
        'Wisdom': [
            'The only true wisdom is in knowing you know nothing. - Socrates',
            'In the end, it\'s not the years in your life that count. It\'s the life in your years. - Abraham Lincoln'
        ]
    };

    function updateCategorySelects() {
        const categories = Object.keys(quotes);
        categorySelect.innerHTML = '<option value="">Select a category</option>';
        quoteCategory.innerHTML = '<option value="">Select a category</option>';
        categories.forEach(category => {
            categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
            quoteCategory.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }

    function showRandomQuote() {
        const category = categorySelect.value;
        if (category && quotes[category].length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes[category].length);
            quoteDisplay.textContent = quotes[category][randomIndex];
        } else {
            quoteDisplay.textContent = 'Please select a category with quotes.';
        }
    }

    generateQuoteBtn.addEventListener('click', generateQuote);

    createAddQuoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = quoteCategory.value;
        const newQuote = document.getElementById('new-quote').value;
        if (category && newQuote) {
            quotes[category].push(newQuote);
            document.getElementById('new-quote').value = '';
            alert('Quote added successfully!');
        } else {
            alert('Please select a category and enter a quote.');
        }
    });

    addCategoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newCategory = document.getElementById('new-category').value;
        if (newCategory && !quotes[newCategory]) {
            quotes[newCategory] = [];
            updateCategorySelects();
            document.getElementById('new-category').value = '';
            alert('Category added successfully!');
        } else {
            alert('Please enter a new, unique category name.');
        }
    });

    updateCategorySelects();
});