'use client'
import { Supplier } from "@/models/Suppliers"
import { ChangeEvent, useEffect, useState } from "react"


type SearchSuppliersProps = {
    data: Supplier[]
}

export default function SearchSuppliers({ data }: SearchSuppliersProps) {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [originalSuppliers, setOriginalSuppliers] = useState<Supplier[]>([]);
    const [searctText, setSearchText] = useState<string>('');
    useEffect(() => {
        setSuppliers(data);
        setOriginalSuppliers(data);
    }, data)
    function filterData() {
        if (searctText.trim() == '') {
            setSuppliers(originalSuppliers);
        }
        let filteredSupplier = [...originalSuppliers];
        filteredSupplier = filteredSupplier.filter((item) => item.name.toLowerCase().includes(searctText.toLocaleLowerCase()) ||
            item.contactPerson.toLowerCase().includes(searctText.toLocaleLowerCase()) ||
            item.email.toLowerCase().includes(searctText.toLocaleLowerCase()) ||
            item.location.toLowerCase().includes(searctText.toLocaleLowerCase())
        )
        setSuppliers(filteredSupplier);
    }
    return (
        <div>
            <div>
                <input type="text" onChange={(e) => setSearchText(e.target.value)} value={searctText} />&nbsp;&nbsp;
                <button className="btn btn-warning" onClick={filterData}>Filter</button>
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
                    {suppliers.map(item => (
                        <tr key={item.id}>
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