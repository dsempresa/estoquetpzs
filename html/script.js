document.addEventListener('DOMContentLoaded', (event) => {
    initializeInventory();
    loadInventory();
});

function initializeInventory() {
    const initialItems = [
        "COCA COLA NORMAL 1 LITRO", "COCA COLA ZERO 1 LITRO", "FANTA LARANJA NORMAL 1 LITRO", 
        "FANTA UVA NORMAL 1 LITRO", "SPRITE NORMAL 1 LITRO", "KUAT NORMAL 1 LITRO", 
        "ÁGUA SEM GÁS -  500ML", "ICE TEAM LIMÃO", "SUCO DE LARANJA", "COCA COLA LATA", 
        "COCA COLA ZERO LATA", "FANTA LARANJA LATA", "FANTA UVA LATA", "SÃO GERARDO LATA", 
        "PEPSI DE 1 LITRO", "GUARANÁ ANTARTICA DE 1 LITRO", "TAMPA PARA COPO 400 ML", 
        "MOLHO DE TOMATE", "KETCHUP", "MOLHO BARBECUE", "GORGONZOLA", "CALABRESA", 
        "BACON EM CUBO", "FRANGO", "FILÉ", "CARNE DO SOL", "HONEY MUSTARD", 
        "LOMBINHO CANADENSE 1 KG", "PEPPERONI KG", "CAMARÃO", "ATUM", "QUEIJO MUSSARELA TRITURADO", 
        "PRESUNTO DE PERU", "PARMESÃO RALADO", "ALHO FRITO", "OVOS", "DORITOS", 
        "CHEDDAR FATIADO", "CATUPIRY ORIGINAL", "REQUEIJÃO BETÂNIA", "REQUEIJÃO SIMPLES", 
        "CREAM CHEESE", "QUEIJO COALHO", "PIMENTA BIQUINHO", "CHEDDAR NORMAL", 
        "CHEDDAR ORIGINAL", "TRIGO", "AÇUCAR", "SAL", "OLEO", "ALHO PORÓ", "MARGARINA", 
        "FERMENTO", "CEBOLA BRANCA", "CEBOLA ROXA", "PIMENTÃO VERDE", "TOMATE CEREJA", 
        "TOMATE", "OREGANO", "MILHO", "MANJERICÃO", "PALMITO", "BROCOLIS", "LIMÃO", 
        "HARALD AO LEITE", "HARALD BRANCO", "AVELÃ", "DOCE DE LEITE", "LEITE CONDENSADO", 
        "CREME DE LEITE", "DOCE DE GOIABA", "OURO BRANCO", "GÁS MAÇARICO", "BICO DE MAÇARICO", 
        "GELEIA DE PIMENTA", "LACRE", "DUREX", "BOBINA DE SACO 35 X 50", "BOBINA IMPRESSORA (30 UNID)", 
        "TOUCA DESCARTÁVEL (100 UNID)", "ISQUEIROS", "CANELA", "KNOOR", "LEITE EM PÓ", 
        "CASTANHA EM PÓ", "AMENDOIN", "XAROPE", "ABACATE", "GELO", "PÓ DE GUARANA", 
        "BATATA", "GUARADANAPOS", "LUVAS DESCARTAVEIS PRETAS", "CAIXA K35", "CAIXA K25", 
        "SACOS PLASTICOS", "SACOS DE LIXO", "MANTEIGA DA TERRA", "COLORAU", "SALSINHA", 
        "CEBOLINHA", "LEITE LIQUIDO", "LUVAS DESCARTAVEIS TRANSPARENTES", "SACOLA BRANCA", 
        "COPO 400ML", "CANUDO", "FUBA", "MASCAVO", "PIMENTA DO REINO", "GORDURA VEGETAL", 
        "ALHO", "ISQUEIRO", "SERVIÇO DE ENTREGA"
    ];

    let inventory = JSON.parse(localStorage.getItem('inventory')) || {};

    initialItems.forEach(item => {
        if (!(item in inventory)) {
            inventory[item] = 0;
        }
    });

    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    const inventoryTable = document.getElementById('inventory');
    inventoryTable.innerHTML = '';

    for (const item in inventory) {
        const row = inventoryTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = item;
        cell2.textContent = inventory[item];
    }
}

function addItem() {
    const itemName = document.getElementById('item-name').value.trim();
    const itemQuantity = parseInt(document.getElementById('item-quantity').value.trim());

    if (!itemName || isNaN(itemQuantity) || itemQuantity <= 0) {
        alert('Por favor, insira um nome de item válido e uma quantidade positiva.');
        return;
    }

    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};

    if (inventory[itemName] !== undefined) {
        inventory[itemName] += itemQuantity;
    } else {
        inventory[itemName] = itemQuantity;
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    loadInventory();

    // Limpa os campos de entrada após adicionar o item
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
}

function removeItem() {
    const itemName = document.getElementById('item-name-remove').value.trim();
    const itemQuantity = parseInt(document.getElementById('item-quantity-remove').value.trim());

    if (!itemName || isNaN(itemQuantity) || itemQuantity <= 0) {
        alert('Por favor, insira um nome de item válido e uma quantidade positiva.');
        return;
    }

    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};

    if (inventory[itemName] !== undefined) {
        inventory[itemName] -= itemQuantity;
        if (inventory[itemName] < 0) {
            inventory[itemName] = 0;  // Não permitir quantidade negativa
        }
        localStorage.setItem('inventory', JSON.stringify(inventory));
        loadInventory();
    } else {
        alert('Item não encontrado no estoque.');
    }

    // Limpa os campos de entrada após remover o item
    document.getElementById('item-name-remove').value = '';
    document.getElementById('item-quantity-remove').value = '';
}
