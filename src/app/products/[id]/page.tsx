'use client'
import { Product } from "@/models/product"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { SubmitEvent, useEffect, useState } from "react"

export default function EditProduct() {
    const params = useParams()
    const router = useRouter()
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetchProductById();
    }, [])

    const [product, setProduct] = useState<Product>({name:'',
        price:0,
        description:'',
        imageUrl:''});

    async function fetchProductById() {
        try {
            const res = await axios.get<Product>("http://localhost:9000/products/" + params.id);
            setProduct(res.data);
            setMessage('');
        } catch (e) {
            console.log(e);
            setMessage("Error while fetching product details");
        }
    }

    async function updateProduct(product: Product) {
        try {
            console.log(product);
            const res = await axios.put("http://localhost:9000/products/" + product?.id, product);
            setMessage('');
            router.push("/products/");
        } catch (e) {
            setMessage("Error while saving product details");
        }
    }
    function cancel() {
        router.push("/products/");
    }
    function handleUpdate(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!product?.name) {
            setMessage('Product name cannot be empty');
        } else if (Number.isNaN(product?.price)) {
            setMessage('Please set a proper price value');
        } else if (!product?.description) {
            setMessage("Description cannot be empty");
        }
        else if (product)
            updateProduct(product);
    }
    return (
        <div>
            <h4>Edit Product: {params.id}</h4>
            {message ? <div className="alert alert-danger">{message}</div> : null}
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input id="name" type="text" value={product.name} autoFocus
                        onChange={(e) => { setProduct({ ...product, name: e.target.value }) }}
                        className="form-control"
                        placeholder="Product Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input id="price" type="number" value={product.price}
                        onChange={(e) => { setProduct({ ...product, price: e.target.valueAsNumber }) }}
                        className="form-control"
                        placeholder="Product Price" />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Product Description</label>
                    <input id="desc" type="text" value={product.description}
                        onChange={(e) => { setProduct({ ...product, description: e.target.value }) }}
                        className="form-control"
                        placeholder="Product Description" />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product Image link</label>
                    <input id="image" type="text" value={product.imageUrl}
                        onChange={(e) => { setProduct({ ...product, imageUrl: e.target.value }) }}
                        className="form-control"
                        placeholder="Product Image Url" />
                </div>
                <br />
                <button type="button" onClick={cancel} className="btn btn-warning">Cancel</button> &nbsp;
                <button className="btn btn-success">Save</button>
            </form>
        </div>
    )
}