function abrirModal() {
  const modal = document.getElementById("janela-modal");
  modal.classList.add("abrir");

  modal.addEventListener("click", (e) => {
    if (e.target.id == "fechar" || e.target.id == "janela-modal") {
      modal.classList.remove("abrir");
    }
  });
}

// Atualizar o valor total do carrinho
function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product");
  totalAmount = 0;

  for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i]
      .getElementsByClassName("cart-product-price")[0]
      .innerText.replace("R$", "")
      .replace(",", ".");
    const productQuantity =
      cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;

    totalAmount += productPrice * productQuantity;
  }

  totalAmount = totalAmount.toFixed(2);
  totalAmount = totalAmount.replace(".", ",");
  document.querySelector(".cart-total-container span").innerText =
    "R$" + totalAmount;
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

var totalAmount = "0,00";

function ready() {
  // Botão remover produto
  const removeCartProductButtons = document.getElementsByClassName(
    "remove-product-button"
  );
  for (var i = 0; i < removeCartProductButtons.length; i++) {
    removeCartProductButtons[i].addEventListener("click", removeProduct);
  }

  // Mudança valor dos inputs
  const quantityInputs = document.getElementsByClassName("product-qtd-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull);
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("adicionar");
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  // Botão comprar
  const purchaseButton = document.getElementsByClassName("purchase-button")[0];
  purchaseButton.addEventListener("click", makePurchase);
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove();
  updateTotal();
}

function checkIfInputIsNull(event) {
  if (event.target.value == "0") {
    event.target.parentElement.parentElement.remove();
  }

  updateTotal();
}

function addProductToCart(event) {
  const button = event.target;
  const productInfos = button.parentElement.parentElement;
  const productImage =
    productInfos.getElementsByClassName("product-image")[0].src;
  const productTitle =
    productInfos.getElementsByClassName("product-title")[0].innerText;
  const productPrice =
    productInfos.getElementsByClassName("preco")[0].innerText;

  const productsCartName =
    document.getElementsByClassName("cart-product-title");
  for (var i = 0; i < productsCartName.length; i++) {
    if (productsCartName[i].innerText == productTitle) {
      productsCartName[i].parentElement.parentElement.getElementsByClassName(
        "product-qtd-input"
      )[0].value++;
      return;
    }
  }

  let newCartProduct = document.createElement("tr");
  newCartProduct.classList.add("cart-product");

  newCartProduct.innerHTML = `
   <td class="product-identification">
   <img
     class="cart-product-image"
     src="${productImage}"
   />
   <strong class="cart-product-title">${productTitle}</strong>
 </td>
 <td>
   <span class="cart-product-price">${productPrice}</span>
 </td>
 <td>
   <input class="product-qtd-input" type="number" min="0" value="1" />
   <button class="remove-product-button" type="button">
     Remover
   </button>
 </td>
  `;

  const tablebody = document.querySelector(".cart-table tbody");
  tablebody.append(newCartProduct);

  updateTotal();

  newCartProduct
    .getElementsByClassName("product-qtd-input")[0]
    .addEventListener("change", checkIfInputIsNull);
  newCartProduct
    .getElementsByClassName("remove-product-button")[0]
    .addEventListener("click", removeProduct);
}

function makePurchase() {
  if (totalAmount === "0,00") {
    alert("Seu carrinho está vazio!");
  } else {
    alert(
      `
        Obrigado pela sua compra!
        Valor do pedido: R$${totalAmount}\n
        Volte sempre :)
      `
    );

    document.querySelector(".cart-table tbody").innerHTML = "";
    updateTotal();
  }
}
