import { Product } from "@/models/product";
import axios from "axios";
import { useEffect, useState } from "react";

export function useProducts(){
    const [products, setProducts] = useState<Product[]>([]);
    const url = "http://localhost:9000/products";
    async function fetchProducts(){
        try{
            const res = await axios.get<Product[]>(url);
            console.log(res);
            setProducts(res.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProducts();
    })
    return {products,setProducts}
}