import ticketsModel from "../models/tickets.model.js";

export default class TicketsService {
  constructor() {}

  create = async (amount, email) => {
    if (amount === 0) {
      return { status: "Failed, no products to purchase" };
    } else {
      //code
      let code;
      do {
        code = randomCode(12);
      } while (await ticketsModel.findOne({ code: code }));

      //date
      const date = new Date();
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formatter = new Intl.DateTimeFormat("es-AR", options);
      const formattedDate = formatter.format(date);
      //Ticket object
      const newTicket = {
        code: code,
        purchase_datetime: formattedDate,
        amount: amount,
        purchaser: email,
      };
      const ticket = await ticketsModel.create(newTicket);
      return { ticket_id: ticket.id };
    }
  };
}

//Random code
const randomCode = (length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};
