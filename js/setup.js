function createBtnLink(shopName) {
    const btn = document.createElement("BUTTON");
    const container = document.getElementById('btnContainer');
    btn.innerHTML = shopName;
    btn.onclick = function () {
        window.location.href = "/index.html" + `?shop=${shopName}`
    }
    container.appendChild(btn);
}

function getAllShops() {
    fetch(`${BASE_URL}/shops`)
        .then(response => response.json())
        .then(result => {
            result.shops.forEach(shop => {
                createBtnLink(shop);
            });
        }).catch(err => {
            console.error(err)
        })
};

getAllShops();