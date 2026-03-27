"use client";

import { sayHello } from "@/actions/Hello";
import { JSX, useEffect, useState } from "react";


export default function SearchSuppliersActions({suppliers}:{suppliers:(q:string)=>Promise<JSX.Element>}) {
    const [searchText, setSearchText] = useState("");
    const [messageView,setMessageView] = useState<JSX.Element>(); 
    const [supplierView,setSupplierView] = useState<JSX.Element>();
    async function search() {
        const result = await sayHello("Rishabh - " + searchText);
        setMessageView(result);
        const supplierJSX = await suppliers(searchText);
        setSupplierView(supplierJSX);
    }
    
    useEffect(()=>{
        async function getSuppliers(){
            const result = await suppliers("");
            setSupplierView(result);
        }
        getSuppliers();
    },[])
    return (
        <div>
            <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <br />
            <button className="btn btn-success" onClick={search}>
                Search
            </button>
            {searchText ? (
                <div className="alert alert-info">Searching for {searchText}</div>
            ) : null}
            <div>{messageView}</div>
            <div>{supplierView}</div>
        </div>
    );
}