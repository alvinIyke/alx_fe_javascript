document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const quoteCategory = document.getElementById('quote-category');
    const displayRandomQuoteBtn = document.getElementById('showRandomQuote');
    const quoteDisplay = document.getElementById('quote-display');
    const createAddQuoteForm = document.getElementById('createAddQuoteForm');
    const addCategoryForm = document.getElementById('add-category-form');

    // Load from local storage
    let quotes = loadQuotes();
    function loadQuotes() {
        const storedQuotes = localStorage.getItem('quotes');
        return storedQuotes ? JSON.parse(storedQuotes) : {
            'Motivation': [
                'The only way to do great work is to love what you do. - Steve Jobs',
                'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill'
            ],
            'Wisdom': [
                'The only true wisdom is in knowing you know nothing. - Socrates',
                'In the end, it\'s not the years in your life that count. It\'s the life in your years. - Abraham Lincoln'
            ]
        };
    document.getElementById('load-local-storage-btn').addEventListener('click', loadFromLocalStorage);
    
    // Load data from session storage
    if (sessionStorage.getItem('categories') && sessionStorage.getItem('quotes')) {
    categories = JSON.parse(sessionStorage.getItem('categories'));
    quotes = JSON.parse(sessionStorage.getItem('quotes'));
    }
    document.getElementById('load-session-storage-btn').addEventListener('click', loadFromSessionStorage);
    
        // save to local storage
    function saveQuotes() {
            localStorage.setItem('quotes', JSON.stringify(quotes));
    }
    function saveCategories() {
        localStorage.setItem('categories', JSON.stringify(categories));
    }  
    document.getElementById('save-local-storage-btn').addEventListener('click', saveToLocalStorage);

    // save to session storage
    function saveToSessionStorage() {
        sessionStorage.setItem('categories', JSON.stringify(categories));
        sessionStorage.setItem('quotes', JSON.stringify(quotes));
    }    
    document.getElementById('save-session-storage-btn').addEventListener('click', saveToSessionStorage);
    
    // Populate categories select
    function populateCategories() {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            document.getElementById('category-select').appendChild(option);
        });
    }
    

    function updateCategorySelects() {
        const categories = Object.keys(quotes);
        categorySelect.innerHTML = '<option value="">Select a category</option>';
        quoteCategory.innerHTML = '<option value="">Select a category</option>';
        categories.forEach(category => {
            categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
            quoteCategory.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }
   
   // function to import JSON data
    function importFromJsonFile() {
          const jsonData = JSON.parse({ categories, quotes});
          const importedData = importFromJson(jsonData);
          quotes.push({ categories, quotes});
          saveQuotes();
          alert('Quotes imported successfully!');
        };

    document.getElementById('import-json-btn').addEventListener('click', importFromJson);

    // function to export JSON data
    function exportToJsonFile() {
          const jsonData = JSON.stringify({ categories, quotes});
          const blob = new  Blob( [jsonData], {type: 'application/json'});
          const url = URL.createObjectURL(Blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'quotes.json';
          a.click();

          URL.revokeObjectURL(url);
     }   
    document.getElementById('export-json-btn').addEventListener('click', exportToJson);
          
      

    function showRandomQuote() {
        const category = categorySelect.value;
        if (category && quotes[category].length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes[category].length);
            quoteDisplay.textContent = quotes[category][randomIndex];
        } else {
            quoteDisplay.textContent = 'Please select a category with quotes.';
        }
    }

    displayRandomQuoteBtn.addEventListener('click', showRandomQuote);
      // Clear previous quote display
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerHTML = ''; // Clear existing content
      
     // Create elements for new quote display
     const quoteText = document.createElement("p");
     const quoteCategory = document.createElement("p");
    

    createAddQuoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = quoteCategory.value;
        const newQuote = document.getElementById('new-quote').value;
        if (category && newQuote) {
            quotes[category].push(newQuote);
            document.getElementById('new-quote').value = '';
            
            // Update the quote display to show the new quote
            quoteDisplay.textContent = `New quote added: "${newQuote}"`;
            
            // If the current category is selected, regenerate the quote to possibly show the new one
        if (categorySelect.value === category) {
                generateQuote();
            }
            
            alert('Quote added successfully!');
        } else {
            alert('Please select a category and enter a quote.');
        }
    });
      
    // Append the new elements to the display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
    
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
}});