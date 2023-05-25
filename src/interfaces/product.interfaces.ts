export interface ProductInterface {
    _id?: string,
    name : string,
    description: string,
    price: number,
    image: string,
    stock: number
}

export interface FullProductInterface extends ProductInterface {
    _id: string,
}

export interface IProductRepository{
    getAll() : Promise<FullProductInterface[]>;
    append(userData : ProductInterface) : Promise<FullProductInterface>;
    getByCondition( fieldName : keyof FullProductInterface, fieldValue : string ) : Promise<ProductInterface | null>;
    deleteByCondition( fieldName : keyof FullProductInterface, fieldValue : string) : Promise<boolean>;
    deleteAll() : Promise<boolean>;
}