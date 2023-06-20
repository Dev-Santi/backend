const addToCart = document.getElementsByClassName("addToCart");
const cartIdContainer = document.getElementsByClassName("cartContainer")[0];
const cartId = cartIdContainer.className.split(" ")[1];

for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", async (e) => {
    //Obtengo el Id del producto
    //El id de los productos lo guardo en las clases de las cards para poder acceder a ellos desde js
    const productId = addToCart[i].className.split(" ")[1];
    //Añado el producto al carrito
    const response = fetch(
      `http://localhost:9091/api/carts/${cartId}/product/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((result) => {
      if (result.status >= 200 && result.status < 300) {
        alert("The product has been added!");
      } else alert("Error, the product cant be added");
    });
  });
}
