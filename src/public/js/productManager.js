const addProduct = document.getElementById("addProduct");
const deleteProduct = document.getElementById("deleteProduct");
const updateProduct = document.getElementById("updateProduct");

//Agregar un producto
addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(addProduct);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  if (obj.thumbnails === "") obj.thumbnails = [];
  fetch("http://localhost:9091/api/products", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status >= 200 && result.status < 300) {
      alert("The product has been added!");
    } else alert("Invalid credentials");
  });
});

//Eliminar un producto
deleteProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(deleteProduct);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);
  fetch(`http://localhost:9091/api/products/${obj.id}`, {
    method: "DELETE",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    console.log(result.status);
    if (result.status >= 200 && result.status < 300) {
      alert("The product has been deleted!!");
    } else alert("Invalid credentials");
  });
});

//Cambiar un producto
updateProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(updateProduct);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const field = obj.fields;
  const change = obj.change;
  const bodyObj = {
    [field]: change,
  };
  fetch(`http://localhost:9091/api/products/${obj.id}`, {
    method: "PUT",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status >= 200 && result.status < 300) {
      alert("The product has been modified!!");
    } else alert("Invalid credentials");
  });
});
