document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stockForm');
    const stockList = document.getElementById('stockList');
    const dailyCountButton = document.getElementById('dailyCount');
    const dailyResult = document.getElementById('dailyResult');

    function loadStock() {
        const stock = JSON.parse(localStorage.getItem('stock')) || [];
        stockList.innerHTML = '';
        stock.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="item-details">
                    ${item.name} - ${item.quantity}
                </div>
                <div class="item-actions">
                    <button onclick="deleteItem(${index})">Excluir</button>
                </div>
            `;
            stockList.appendChild(li);
        });
    }

    function addItem(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;

        const stock = JSON.parse(localStorage.getItem('stock')) || [];
        stock.push({ name, quantity: parseInt(quantity) });
        localStorage.setItem('stock', JSON.stringify(stock));

        stockForm.reset();
        loadStock();
    }

    window.deleteItem = function(index) {
        const stock = JSON.parse(localStorage.getItem('stock')) || [];
        stock.splice(index, 1);
        localStorage.setItem('stock', JSON.stringify(stock));
        loadStock();
    }

    dailyCountButton.addEventListener('click', () => {
        const stock = JSON.parse(localStorage.getItem('stock')) || [];
        const totalQuantity = stock.reduce((acc, item) => acc + item.quantity, 0);
        dailyResult.innerHTML = `Quantidade total em estoque: ${totalQuantity}`;
    });

    stockForm.addEventListener('submit', addItem);
    loadStock();
});
