import { Supplier } from "@/models/Suppliers";
import SearchSuppliers from "./SearchSuppliers";

export default async function SuppliersPage() {

    async function fetchSuppliers(query?: string) {
        const response = await fetch("http://localhost:3000/api/suppliers?q="+query, { method: "GET" });
        const suppliers = await response.json();
        return suppliers;
    }
    const suppliers:Supplier[] = (await fetchSuppliers()).suppliers;
    return (
        <div>
            <h4>Supplier Listing</h4>
            <SearchSuppliers data={suppliers}/>
        </div>
    )
}