function fetchProducts() {
  fetch("http://localhost:5000/all-products")
    .then((res) => res.json())
    .then((data) => showData(data.products));
}

// function showData(response){
//     const responseDiv = document.getElementById("response");
//     responseDiv.innerHTML = `
//     <h1>Status: ${response.status}</h1>
//     <h1>Message: ${response.message}</h1>
//     `
// }

function showData(response) {
  const productInfoContainer = document.getElementById(
    "product-info-container"
  );
  console.log(response);

  response.forEach((singleProduct) => {
    productInfoContainer.innerHTML += `
        <div class="card bg-primary text-primary-content">
  <div class="card-body">
    <h2 class="card-title">${singleProduct.title}</h2>
    <img class="w-12" src=${singleProduct.thumbnail}>
    <div class="card-actions justify-end">
      <button onclick="fetchSingleData('${singleProduct.id}')" class="btn">Buy Now at ${singleProduct.price}$</button>
    </div>
  </div>
</div>
        `;
  });
}
fetchProducts();

function fetchSingleData(id) {
  fetch(`http://localhost:5000/single-product/${id}`)
    .then((res) => res.json())
    .then((data) => showDetails(data));
}
function showDetails(product){
  const detailContainer =document.getElementById("single-product-container");
  detailContainer.innerHTML = `
  <div class="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  `
}
