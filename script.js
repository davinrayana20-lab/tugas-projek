let cart = [];

function addToCart(name, price) {
    const existingIndex = cart.findIndex(item => item.name === name);
    
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const tableBody = document.getElementById('cart-table-body');
    const totalElement = document.getElementById('cart-total');
    const countElement = document.getElementById('cart-count');
    
    let totalItems = 0;
    let totalPrice = 0;
    
    if (cart.length === 0) {
        tableBody.innerHTML = `
            <tr id="empty-cart-msg">
                <td colspan="5" style="text-align: center; color: #888;">Keranjang belanja masih kosong. Silakan pilih produk dari katalog.</td>
            </tr>
        `;
    } else {
        tableBody.innerHTML = '';
        cart.forEach((item, index) => {
            const subtotal = item.price * item.qty;
            totalPrice += subtotal;
            totalItems += item.qty;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td>${item.qty}</td>
                <td>Rp ${item.price.toLocaleString('id-ID')}</td>
                <td>Rp ${subtotal.toLocaleString('id-ID')}</td>
                <td><button type="button" class="btn-remove" onclick="removeFromCart(${index})">Hapus</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    totalElement.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    countElement.innerText = totalItems;
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang kamu masih kosong bray!');
    } else {
        alert('Pesanan berhasil diproses! Terima kasih telah berbelanja di UMKM Mandiri.');
        cart = [];
        updateCartUI();
    }
}
