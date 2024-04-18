import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const createUseCase = new CreateProductUseCase(productRepository);
        const updateUseCase = new UpdateProductUseCase(productRepository);

        const product = await createUseCase.execute({
            name: "Product",
            price: 100,
        });

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 200,
        };

        const output = {
            id: product.id,
            name: "Product Updated",
            price: 200,
        };

        const result = await updateUseCase.execute(input);

        expect(result).toEqual(output);
    });
});