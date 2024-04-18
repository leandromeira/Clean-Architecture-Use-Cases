import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product", 123);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 1234,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product Updated",
      price: 1234,
    };

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
