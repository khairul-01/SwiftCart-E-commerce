
const removeActive = () => {
    const catButtons = document.querySelectorAll(".cat-active")
    catButtons.forEach(button => {
        button.addEventListener("click", function () {

            // remove active from all
            catButtons.forEach(btn => {
                btn.classList.remove("btn-primary");
            });

            // add active to clicked button
            this.classList.add("btn-primary");

        });
    });
}

const dataLoad = async (url) => {
    const loadedData = await fetch(url)
    const data = await loadedData.json()
    // console.log(data)
    return data
}

const loadCategory = async () => {
    const url = 'https://fakestoreapi.com/products/categories'
    const loadedData = await fetch(url)
    // const datas = await loadedData.json()
    const cat = await dataLoad(url)
    console.log(cat)
    const categoriesContainer = document.getElementById("products-category")
    // console.log(categoriesContainer)
    
    cat.forEach(data => {
        removeActive()
        const btn = document.createElement('div')
        console.log(typeof data)
        btn.innerHTML = `
        <button class="btn cat-active" onclick="loaByCategory(\`${data}\`)">${data}</button>
        `
        categoriesContainer.append(btn);
    })
}


const LoadAllProducts = async () => {
    const fetchProducts = await fetch("https://fakestoreapi.com/products");
    const jsonData = await fetchProducts.json()
    // console.log(jsonData)
    renderProductCards(jsonData);
}

const loaByCategory = async (data) => {
    // console.log(data)
    const fetchProducts = await fetch(`https://fakestoreapi.com/products/category/${data}`)
    const jsonData = await fetchProducts.json()
    // console.log(jsonData)
    
    renderProductCards(jsonData)
}



const renderProductCards = (products) => {
    removeActive()
    // getting container by id
    const productsContainer = document.getElementById('product-container')
    // empty the container
    productsContainer.innerHTML = " ";
    products.forEach((product) => {
        // console.log(product)
        // creating a card
        const productCard = document.createElement('div');
        productCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm max-w-96">
                <figure class=" h-64 overflow-hidden">
                    <img src="${product.image}" class=" h-full w-full object-cover" />
                </figure>
                <div class="card-body">
                    <div class="card-actions justify-between">
                        <div class="badge bg-blue-200 rounded-xl">${product.category}</div>
                        <div class="badge">
                            <div class="rating rating-xs">
                                <input type="radio" name="rating-${product.id}" class="mask mask-star-2 bg-orange-400"
                                    aria-label="1 star" checked="checked" />

                            </div>
                            ${product?.rating?.rate} (${product?.rating?.count})
                        </div>
                    </div>
                    <h2 class="card-title truncate">${product.title}</h2>
                    <p class="font-bold text-xl">$${product.price}</p>
                    <div class="card-actions justify-between mt-2">
                        <button id="details-btn" onclick="productDetails(${product.id})" class="btn rounded-xl"><i class="fa-regular fa-eye"></i> Details</button>
                        <button class="btn btn-primary"><i class="fa-solid fa-cart-shopping rounded-xl"></i>
                            Add</button>
                    </div>
                </div>
            </div>
        
        `
        // appending it into container
        productsContainer.append(productCard);
    })

}

const productDetails = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`
    const product = await dataLoad(url)
    console.log(product)
    const modalContainer = document.getElementById("modal-container")
    modalContainer.className = "card bg-base-100 shadow-sm"
    modalContainer.innerHTML = " ";
    modalContainer.innerHTML = `
            <figure class="max-h-96 overflow-hidden">
                    <img src="${product.image}" class="object-cover" />
                </figure>
                <div class="card-body">
                    <div class="card-actions justify-between">
                        <div class="badge bg-blue-200 font-bold text-xl rounded-xl">$${product.price}</div>
                        <div class="badge">
                            <div class="rating rating-xs">
                                <input type="radio" name="rating-${product.id}" class="mask mask-star-2 bg-orange-400"
                                    aria-label="1 star" checked="checked" />

                            </div>
                            ${product?.rating?.rate} (${product?.rating?.count})
                        </div>
                    </div>
                    <h2 class="card-title">${product.title}</h2>
                    <p class="">$${product.description}</p>
                    <div class="card-actions justify-center mt-2">
                    
                        <button class="btn btn-primary"><i class="fa-solid fa-cart-shopping rounded-xl"></i>
                        Add to Cart</button>
                    </div>
                </div>
    `
    document.getElementById("product_modal_k").showModal()
}

loadCategory()
LoadAllProducts();