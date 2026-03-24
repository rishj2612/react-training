export type Product1 = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export class Product {

    constructor(public id?: number,
        public name?: string,
        public price?: number,
        public description?: string,
        public imageUrl?: string) {
            
    }
}