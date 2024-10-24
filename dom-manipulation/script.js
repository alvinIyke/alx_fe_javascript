document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const quoteCategory = document.getElementById('quote-category');
    const displayRandomQuoteBtn = document.getElementById('showRandomQuote');
    const quoteDisplay = document.getElementById('quote-display');
    const createAddQuoteForm = document.getElementById('createAddQuoteForm');
    const addCategoryForm = document.getElementById('add-category-form');

    // Load quotes from local storage
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
    
    // Load quotes from session storage
    if (sessionStorage.getItem('categories') && sessionStorage.getItem('quotes')) {
    categories = JSON.parse(sessionStorage.getItem('categories'));
    quotes = JSON.parse(sessionStorage.getItem('quotes'));
    }
    document.getElementById('load-session-storage-btn').addEventListener('click', loadFromSessionStorage);
    
    // save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }
    function saveCategories() {
        localStorage.setItem('categories', JSON.stringify(categories));
    }  
    document.getElementById('save-local-storage-btn').addEventListener('click', saveToLocalStorage);

    // save quotes to session storage
    function saveToSessionStorage() {
        sessionStorage.setItem('categories', JSON.stringify(categories));
        sessionStorage.setItem('quotes', JSON.stringify(quotes));
    }    
    document.getElementById('save-session-storage-btn').addEventListener('click', saveToSessionStorage);
    
    // Function to update the categories dropdown dynamically based on available quotes
    function populateCategories() {
        const categoryFilter = document.getElementById("categoryFilter");
          
    // Get unique categories from quotes
            const categories = [...new Set(quotes.map(quote => quote.category))];
          
    // Clear current options
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';    
    
    // Populate dropdown with unique categories   
        categories.forEach(category => {   
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            document.getElementById('category-select').appendChild(option);
        });
    }
    
    // Restore last selected category from localStorage
      const lastSelectedCategory = localStorage.getItem("selectedCategory");
      if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
        filterQuotes(); // Apply the filter based on saved selection
      }
    
    // Update the categories dropdown if a new category is added
    function updateCategorySelects() {
        const categories = Object.keys(quotes);
        categorySelect.innerHTML = '<option value="">Select a category</option>';
        quoteCategory.innerHTML = '<option value="">Select a category</option>';
        categories.forEach(category => {
            categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
            quoteCategory.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }
   
    // Function to filter quotes based on the selected category
    function filterQuotes() {
       const selectedCategory = document.getElementById("categoryFilter").value;
       const quoteDisplay = document.getElementById("quoteDisplay");
    
    // Save selected category in localStorage
     localStorage.setItem("selectedCategory", selectedCategory);
  
    // Filter quotes by the selected category
       const filteredQuotes = selectedCategory === "all"
       ? quotes
       : quotes.filter(quote => quote.category === selectedCategory);
   
    // Display the first filtered quote or a message if none match
     if (filteredQuotes.length > 0) {
       const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
       quoteDisplay.innerHTML = `"${randomQuote.text}" - Category: ${randomQuote.category}`;
     } else {
       quoteDisplay.innerHTML = "No quotes available for this category.";
     }
    }
    
   // function to import JSON data
    function importFromJsonFile() {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          const jsonData = JSON.parse({ categories, quotes});
          const importedData = importFromJson(jsonData);
          quotes.push({ categories, quotes});
          saveQuotes();
          alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);

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
    
    // Append the new elements to the display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
    
    // Function to add new quotes
    function addQuote () {
     createAddQuoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = quoteCategory.value;
        const newQuote = document.getElementById('new-quote').value;
    // checking if both fields are filled
        if (category && newQuote) {
            quotes[category].push(newQuote);  // adding new quotes to the array
            document.getElementById('new-quote').value = '';  // clearing input fields
            
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
    // adding new categories  
    addCategoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newCategory = document.getElementById('new-category').value;
        if (newCategory && !quotes[newCategory]) {
            quotes[newCategory] = [];  // adding new categories to the array
            updateCategorySelects();
            document.getElementById('new-category').value = '';  // clearing input fields
            alert('Category added successfully!');
        } else {
            alert('Please enter a new, unique category name.');
        }
    });

    updateCategorySelects();  // Update the categories dropdown if a new category is added
    updateLocalStorage();     // Persist quotes and categories in localStorage
}
}}
});