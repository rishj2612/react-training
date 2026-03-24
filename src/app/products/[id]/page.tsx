'use client'
import { Product } from "@/models/product"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditProduct() {
    const params = useParams()
    useEffect(() => {
        fetchProductById();
    }, [])

    const [product, setProduct] = useState<Product>();

    async function fetchProductById() {
        try {
            const res = await axios.get<Product>("http://localhost:9000/products/" + params.id);
            setProduct(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    function handleUpdate() {
        console.log("update",product);
    }
    return (
        <div>
            <h4>Edit Product: {params.id}</h4>
            <form>
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input id="name" type="text" value={product?.name} autoFocus
                        onChange={(e)=>{setProduct({...product,name:e.target.value})}}
                            className="form-control"
                            placeholder="Product Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Product Price</label>
                        <input id="price" type="number" value={product?.price}
                         onChange={(e)=>{setProduct({...product,price:e.target.valueAsNumber})}}
                            className="form-control"
                            placeholder="Product Price" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Product Description</label>
                        <input id="desc" type="text" value={product?.description}
                         onChange={(e)=>{setProduct({...product,description:e.target.value})}}
                            className="form-control"
                            placeholder="Product Description" />
                    </div>
                    <br />
                    <button className="btn btn-success">Save</button>
                </form>
            </form>
        </div>
    )
}