import Products from "./database/models/Products";

(async () => {

  const books = await Products.findAll({ raw: true });
  console.table(books);
  process.exit(0);

})();