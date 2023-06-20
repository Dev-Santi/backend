//Register error
export const generateUserErrorInfo = ({
  first_name,
  last_name,
  email,
  age,
}) => {
  //return
  return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        * fist_name: type String, recibido: ${first_name}
        * last_name: type String, recibido: ${last_name}
        * email: type String, recibido: ${email}
        * age: type Number, recibido: ${age}
    `;
};

//Login error
export const generateLoginUserErrorInfo = (email) => {
  //return
  return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        * email: type String, recibido: ${email}
    `;
};

//Product not found
export const generateProductNotFoundErrorInfo = (id) => {
  return `Una o más propiedades fueron enviadas incompletas o no son válidas.
  Lista de propiedades requeridas:
      * ID: type String, recibido: ${id}
  `;
};

//Product update failed
export const generateUpdateProductErrorInfo = (id) => {
  return `Una o más propiedades fueron enviadas incompletas o no son válidas.
  Lista de propiedades requeridas:
      * ID: type String, recibido: ${id}
  `;
};
