'use client'

import { Product } from "@/models/product";
import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation";
import { ProductView } from "./ProductView";

export default function ListProducts() {
    let url = "http://localhost:9000/products";
    const [products, setProducts] = useState<Product[]>([]);
    const [isMessageVisible, setMessageVisible] = useState(true);
    const router = useRouter();
    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts() {
        try {
            const res = await axios.get<Product[]>(url);
            setProducts(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    const deleteProduct = useCallback(async (product: Product) => {
        try {
            const res = await axios.delete(url + "/" + product.id);
            if (res.status == 200) {
                const copyOfProducts = [...products];
                const index = copyOfProducts.findIndex(item => item.id === product.id)
                copyOfProducts.splice(index, 1)
                setProducts(copyOfProducts);
            }
        } catch (e) {
            console.log(e)
        }
    }, [products])

    const editProduct = useCallback((product: Product) => {
        router.push("/products/" + product.id);
    }, [products])

    const totalPrice=useMemo( ()=> {
        let total = 0;
        console.log("calculateTotalPrice invoked...");
        products.forEach(product => total += product.price || 0);
        return total;
    },[products])

    return (
        <div>
            <h4>List Products</h4>
            <div>Total price: {totalPrice}</div>
            {isMessageVisible ? <div> This is a page to demonstrate data fetching</div> : null}
            <br />
            <button className="btn btn-success" onClick={() => setMessageVisible(!isMessageVisible)}>
                {isMessageVisible ? "Hide" : "Show"}
            </button>
            <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center" }}>
                {products.map((product: Product) => {
                    return (
                        <ProductView
                            key={product.id}
                            product={product}
                            onDelete={deleteProduct}
                            onEdit={editProduct} />
                    )
                })}
            </div>
        </div>
    )
}