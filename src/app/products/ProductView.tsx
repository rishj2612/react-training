import { Product } from "@/models/product"
import styles from "./products.module.css"
import React from "react"

type ProductViewProps = {
    product: Product,
    onDelete:(product:Product)=>void,
    onEdit: (product:Product)=>void
}

export const ProductView: React.FC<ProductViewProps> = React.memo(function ProductViewFC({ product,onDelete,onEdit }) {
    console.log("Rendering ProductView:" + product.id);
    return (
        <div className={styles.product} key={product.id}>
            <p>Id: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Des: {product.description}</p>
            <p>Img:<img style={{ height: "90px" }} src={product.imageUrl}></img></p>
            <div>
                <button className="btn btn-warning" onClick={() => { onDelete(product) }}>Delete</button>&nbsp;
                <button className="btn btn-info" onClick={() => onEdit(product)}>Edit</button>
            </div>
        </div>
    )
})