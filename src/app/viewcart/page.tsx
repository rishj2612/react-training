'use client'
import { CartItem } from "@/models/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { GadgetState, removeCartItem } from '@/redux/gadgetsReducer';
import { AppState } from "@/redux/store";

function ViewCart() {

    const dispath = useDispatch();
    const cart = useSelector((state: AppState) => state.gadgets.cart) || [];
    console.log(cart);

    function remove(item: CartItem) {
        if (item.product.id) {
            const action = removeCartItem(item.product.id);
            dispath(action);
        }
    }
    return (
        <div>
            <h1>View Cart</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {cart.map((item, index) => {


                    return (
                        <div className="col" key={index}>
                            <div className="card bg-light mb-3 border-success">
                                <p className="card-header">{item.product.name}</p>
                                <div className="card-body">
                                    <p className="card-text">{item.product.description}</p>
                                    <p className="card-text">Quantity: {item.quantity}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-success" onClick={() => { remove(item) }}>Remove</button>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    );

}

export default ViewCart;