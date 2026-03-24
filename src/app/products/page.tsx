'use client'

import { Product } from "@/models/product";
import axios from "axios"
import styles from "./products.module.css"
import { useEffect, useState } from "react"

export default function ListProducts() {
    let url = "http://localhost:9000/products";
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts() {
        try {
            const res = await axios.get<Product[]>(url);
            console.log(res);
            setProducts(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <h4>List Products</h4>
            <div style={{display:"flex",flexFlow:"row wrap",justifyContent:"center"}}>
                {products.map(product => {
                    return (
                        <div className={styles.product} key={product.id}>
                            <p>Id: {product.id}</p>
                            <p>Name: {product.name}</p>
                            <p>Price: {product.price}</p>
                            <p>Des: {product.description}</p>
                            -------------------------------------------------------------------
                        </div>
                    )
                })}
            </div>
        </div>
    )
}