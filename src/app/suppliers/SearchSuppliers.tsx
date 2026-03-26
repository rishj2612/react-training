'use client'
import { Supplier } from "@/models/Suppliers"
import { ChangeEvent, useEffect, useState } from "react"


type SearchSuppliersProps = {
    data: Supplier[]
}

export default function SearchSuppliers({ data }: SearchSuppliersProps) {
    const [suppliers,setSuppliers]=useState<Supplier[]>();
    useEffect(()=>{
        setSuppliers(data);
    },data)
    function filterData(event:ChangeEvent<HTMLInputElement>){
        

    }
    return (
        <div>
            <div>
            <input type="text" onChange={filterData} />
            <button className="btn btn-warning">Filter</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contant Person</th>
                        <th>Email</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item=>(
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.contactPerson}</td>
                            <td>{item.email}</td>
                            <td>{item.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}