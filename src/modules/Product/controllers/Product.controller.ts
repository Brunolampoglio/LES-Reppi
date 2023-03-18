import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductService } from '../services/CreateProduct.service';
import { DeleteProductService } from '../services/DeleteProduct.service';
import { FindProductService } from '../services/FindProductById.service';
import { GetProductService } from '../services/GetProduct.service';
import { UpdateProductService } from '../services/UpdateProduct.service';

class ProductController {
  async create(req: Request, res: Response) {
    const {
      title,
      author,
      category,
      image_url,
      language,
      bar_code,
      year,
      pages_quantity,
      isbn,
      value,
      publishing_company,
      edition,
      dimensions,
      weight_in_grams,
      synopsis,
      stock_units,
      is_available,
    } = req.body;

    const createProductController = container.resolve(CreateProductService);

    const product = await createProductController.execute({
      title,
      author,
      category,
      image_url,
      language,
      bar_code,
      year,
      pages_quantity,
      isbn,
      value,
      publishing_company,
      edition,
      dimensions,
      weight_in_grams,
      synopsis,
      stock_units,
      is_available,
    });

    return res.json(product);
  }

  async index(req: Request, res: Response) {
    const getProductController = container.resolve(GetProductService);

    const product = await getProductController.execute();

    return res.json(product);
  }

  async findById(req: Request, res: Response) {
    const { product_id } = req.params;
    console.log(product_id);

    const FindProductController = container.resolve(FindProductService);

    const product = await FindProductController.execute(product_id);

    return res.json(product);
  }

  async update(req: Request, res: Response) {
    const {
      title,
      author,
      category,
      image_url,
      language,
      bar_code,
      year,
      pages_quantity,
      isbn,
      value,
      publishing_company,
      edition,
      dimensions,
      weight_in_grams,
      synopsis,
    } = req.body;

    const { product_id } = req.params;

    const updateProductController = container.resolve(UpdateProductService);

    const product = await updateProductController.execute({
      product_id,
      title,
      author,
      category,
      image_url,
      language,
      bar_code,
      year,
      pages_quantity,
      isbn,
      value,
      publishing_company,
      edition,
      dimensions,
      weight_in_grams,
      synopsis,
    });

    return res.json(product);
  }

  async delete(req: Request, res: Response) {
    const { product_id } = req.params;

    const deleteProductController = container.resolve(DeleteProductService);

    await deleteProductController.execute(product_id);

    return res.status(204).send();
  }
}
export { ProductController };
