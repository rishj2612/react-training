'use client'

import { Product } from "@/models/product";
import axios from "axios"
import styles from "./products.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function ListProducts() {
    let url = "http://localhost:9000/products";
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();
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
    async function deleteProduct(product: Product) {
        try {
            const res = await axios.delete(url + "/" + product.id);
            if (res.status == 200) {
                const copyOfProducts=[...products];
                const index=copyOfProducts.findIndex(item=>item.id===product.id)
                copyOfProducts.splice(index,1)
                setProducts(copyOfProducts);
                // await fetchProducts();
            }
        } catch (e) {
            console.log(e)
        }
    }

    function editProduct(product:Product){
        router.push("/products/"+product.id);
    }

    return (
        <div>
            <h4>List Products</h4>
            <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center" }}>
                {products.map((product: Product) => {
                    return (
                        <div className={styles.product} key={product.id}>
                            <p>Id: {product.id}</p>
                            <p>Name: {product.name}</p>
                            <p>Price: {product.price}</p>
                            <p>Des: {product.description}</p>
                            <div>
                                <button className="btn btn-warning" onClick={() => { deleteProduct(product) }}>Delete</button>&nbsp;
                                <button className="btn btn-info" onClick={()=>editProduct(product)}>Edit</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}