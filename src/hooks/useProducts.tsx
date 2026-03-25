import { Product } from "@/models/product";
import { AppState } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
export function useProducts(){
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();
    const url = "http://localhost:9000/secure_products";
    const controller = new AbortController();
    const auth = useSelector((state:AppState)=>state.auth);
    async function fetchProducts(){
        if(!auth.isAuthenticated){
            router.push("/login");
            return;
        }else{
        try{
            const headers = {"Authorization":"Bearer "+auth.accessToken};
            const res = await axios.get<Product[]>(url,{signal:controller.signal,headers});
            console.log(res);
            setProducts(res.data);
        }catch(error){
            console.log(error);
        }
    }
    }

    useEffect(()=>{
        fetchProducts();
        return (()=>{
            controller.abort();
        })
    },[])
    return {products,setProducts}
}