import path from 'path'
import fs from 'fs/promises'
import { NextResponse } from 'next/server';
import { Supplier } from '@/models/Suppliers';


export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    //connnect to the DB, invoke any endpoint, any server code
    const filepath = path.join(process.cwd(), "data", "suppliers.json");
    const fileContent = await fs.readFile(filepath, 'utf-8');
    let suppliers = JSON.parse(fileContent) as Supplier[];
    if (!query) {
        return   NextResponse.json({ suppliers })
    } else {
        suppliers = suppliers.filter(item =>
            item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
            item.contactPerson.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
            item.location.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
            item.email.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
        return NextResponse.json({ suppliers })
    }
}