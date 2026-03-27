'use server'

import { Supplier } from "@/models/Suppliers";
import path from "path";
import fs from 'fs/promises'
import { redirect } from "next/navigation";

// export async function formSubmit(form: FormData) {
 export async function formSubmit(prevStatus:object,form: FormData) {
    const id = Number(form.get("id")?.toString()) || 0;
    const name = form.get("name")?.toString() || '';
    const contactPerson = form.get("contactPerson")?.toString() || '';
    const email = form.get("email")?.toString() || '';
    const location = form.get("location")?.toString() || '';

    const supplier: Supplier = {
        id, name, location, contactPerson, email
    }

    if(supplier.id < 100){
        return {status : -1, message:"Error"}
    }
    const filepath = path.join(process.cwd(), "data", "suppliers.json");
    const fileContent = await fs.readFile(filepath, 'utf-8');
    let suppliers = JSON.parse(fileContent) as Supplier[];
    suppliers.push(supplier);

    await fs.writeFile(filepath, JSON.stringify(suppliers, null, 2), 'utf-8');
    console.log("Saved supplier to server");
    // redirect("/suppliers");

    return { status: 1, message: "Completed" };
}