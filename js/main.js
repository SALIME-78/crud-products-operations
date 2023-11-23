let products = JSON.parse(localStorage.getItem("productsList")) || [];

let productCompany = document.getElementById("company");
let productName = document.getElementById("name");
let productDesc = document.getElementById("desc");
let productPrice = document.getElementById("price");

let submitBtn = document.getElementById("submit-btn");
let updateBtn = document.getElementById("update-btn");

submitBtn.addEventListener("click", () => {
  addToStoredProducts();
  displayStoredProducts();
  resetInputs();
});

// storing a product
function addToStoredProducts() {
  let product = {
    company: productCompany.value,
    name: productName.value,
    description: productDesc.value,
    price: productPrice.value,
  };
   
  if(product.company == "" || product.name =="" || product.description=="" || product.price==""){
    return alert('All fields must be completed')
  }

  productStored = products.find((item) => item.name == product.name);

  if (productStored) {
    return alert("Product already stored !");
  }

  products.push(product);
}

// clear inputs before adding a product
function resetInputs() {
  let inputs = document.querySelectorAll(".form-control");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

// display the products list to the DOM ( from localstorge)
function displayStoredProducts() {
  let storedProducts = document.getElementById("stored-poducts");

  storedProducts.innerHTML = "";

  products.forEach((product, index) => {
    storedProducts.innerHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${product.company}</td>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>${product.price}</td>
              <td onclick="editStoredProduct(${index})"><i class="fa-regular fa-pen-to-square" style="color: #cba43a; font-size: 22px;cursor:pointer"></i></td>
              <td onclick="removeStoredProduct(${index})"><i class=" fa-regular fa-trash-can" style="color: #db240f; font-size: 22px;cursor:pointer"></i></td>
            </tr>           
        `;
  });

  localStorage.setItem("productsList", JSON.stringify(products));
}

// editing product after updating it
function editStoredProduct(index) {
  productCompany.value = products[index].company;
  productName.value = products[index].name;
  productDesc.value = products[index].description;
  productPrice.value = products[index].price;

  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  updateBtn.classList.add("d-block");

  var index = parseInt(localStorage.setItem("index", index));
}

function updateStoredProduct() {
  var index = parseInt(localStorage.getItem("index", index));

  products[index].company = productCompany.value;
  products[index].name = productName.value;
  products[index].description = productDesc.value;
  products[index].price = productPrice.value;

  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-block");
  updateBtn.classList.remove("d-block");
  updateBtn.classList.add("d-none");

  resetInputs();

  displayStoredProducts();

  alert(`Product ${index + 1} successfully updated`);
}

// remove product from local storage
function removeStoredProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(products));
  displayStoredProducts();
}

// search products in localstorage
function searchStoredProducts(s){
 
	let trs = "";
	for (let i = 0; i < products.length; i++) {
		
		if (products[i].name.toLowerCase().startsWith(s.toLowerCase())) {
      
			trs +=
            `<tr>
        <td></td>
			  <td>${products[i].company}</td>
			  <td>${products[i].name}</td>
			  <td>${products[i].description}</td>
			  <td>${products[i].price}</td>
        <td onclick="editStoredProduct(${i})"><i class="fa-regular fa-pen-to-square" style="color: #cba43a; font-size: 22px;cursor:pointer"></i></td>
        <td onclick="removeStoredProduct(${i})"><i class=" fa-regular fa-trash-can" style="color: #db240f; font-size: 22px;cursor:pointer"></i></td>
        </tr>
		    `
		 }
	}
 
	document.getElementById("stored-poducts").innerHTML = trs;
  if(document.getElementById('search-product').value ==""){
    trs=""
  }
}

displayStoredProducts();
