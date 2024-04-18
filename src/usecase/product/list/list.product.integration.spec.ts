import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const createUseCase = new CreateProductUseCase(productRepository);
    const listUseCase = new ListProductUseCase(productRepository);

    const products = [
      {
        name: "Product 1",
        price: 100,
      },
      {
        name: "Product 2",
        price: 200,
      },
    ];

    for (const product of products) {
      await createUseCase.execute(product);
    }

    const result = await listUseCase.execute({});

    expect(result.products).toHaveLength(2);
  });
});
