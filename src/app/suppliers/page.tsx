import { Supplier } from "@/models/Suppliers";
import SearchSuppliers from "./SearchSuppliers";
import SearchSuppliersActions from "./SearchSuppliersActions";
import Link from "next/link";

export default async function SuppliersPage() {

    // async function fetchSuppliers(query?: string) {
    //     const response = await fetch("http://localhost:3000/api/suppliers?q="+query, { method: "GET" });
    //     const suppliers = await response.json();
    //     return suppliers;
    // }
    // const suppliers:Supplier[] = (await fetchSuppliers()).suppliers;

    async function fetchSuppliersAsync(query?: string) {
        'use server'
        const response = await fetch("http://localhost:3000/api/suppliers?q=" + query, { method: "GET" });
        const suppliers = (await response.json()).suppliers as Supplier[];

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Person</th>
                        <th>Location</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.contactPerson}</td>
                            <td>{supplier.location}</td>
                            <td>{supplier.email}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    //const suppliers:Supplier[] = (await fetchSuppliers()).suppliers;

    return (
        <div>
            <h4>Supplier Listing</h4>
            <Link href="/suppliers/add"> Add new Supplier</Link>
            {/* <SearchSuppliers data={suppliers}/> */}
            <SearchSuppliersActions suppliers={fetchSuppliersAsync} />
        </div>
    )
}