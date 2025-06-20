import { Collection, MongoClient, SortDirection } from "mongodb";
import dotenv from "dotenv";
import { Penguin, Researcher, Species } from "./types";
import bcrypt from "bcrypt";
dotenv.config();

export const client = new MongoClient(process.env.CONNECTION_STRING || "mongodb://localhost:27017");
export const ResearchersCollection : Collection<Researcher> = client.db("Mock").collection<Researcher>("researchers");
export const speciesCollection : Collection <Species> = client.db("Mock").collection<Species>("speciesCollection");
export const penguinsCollection : Collection <Penguin> = client.db("Mock").collection<Penguin>("penguinsCollection");

export const SALT_ROUNDS = 10;

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function getAllResearchers(): Promise<Researcher[]> {
    return await ResearchersCollection.find({}).toArray();
}

export async function getAllSpecies(): Promise<Species[]> {
    return await speciesCollection.find({}).toArray();
}

export async function getSpeciesById(id: string): Promise<Species | null> {
    return await speciesCollection.findOne({ id: Number(id) });
}

export async function updateResearcher(username: string, newPincode: string): Promise<void> {
    
}

export async function assignPenguinToResearcher(penguinId: number, researcherString: string): Promise<void> {  
    
};

export async function getAllPenguins(sortField: string, sortDirection: SortDirection, q: string): Promise<Penguin[]> {
    const filter = q ? {nickname: { $regex: q, $options: "i"}} : {};
    const sort: Record<string, SortDirection> = {[sortField]: sortDirection,} 
    return await penguinsCollection.find(filter).sort(sort).toArray();
}

export async function getPenguinsBySpecies(id: number): Promise<Penguin[]> {
    return await penguinsCollection.find({ species_id: id }).toArray();
}

export async function login(username: string, pincode: string): Promise<Researcher | null> {
    return null;
}

async function seedResearchers(): Promise<void> {
       const researchers : Researcher[] = await getAllResearchers();
    if (researchers.length == 0) {
        console.log("Database is empty, loading users from API")
        const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/researchers.json");
        const researchers : Researcher[] = await response.json();

    for (const r of researchers) {
        r.pincode = await bcrypt.hash(r.pincode, SALT_ROUNDS);
    }


        await ResearchersCollection.insertMany(researchers);
    } else {
        console.log("Database has researchers")
    }
}

async function seedSpecies(): Promise<void> {
          const species : Species[] = await getAllSpecies();
    if (species.length == 0) {
        console.log("Database is empty, loading species from API")
        const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/species.json");
        const species : Species[] = await response.json();


        await speciesCollection.insertMany(species);
        console.log(`Inserted ${species.length} species`)
    } else {
        console.log("Database has species")
    }
}

async function seedPenguins(): Promise<void> {
        const penguins : Penguin[] = await penguinsCollection.find({}).toArray();
    if (penguins.length == 0) {
        console.log("Database is empty, loading penguins from API")
        const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/penguins.json");
        const penguins : Penguin[] = await response.json();

        const allSpecies = await getAllSpecies();

        for (const penguin of penguins) {
            const species = allSpecies.find(s => s.id === penguin.species_id);
            if (species) {
                penguin.species = species;
            }
        }


        await penguinsCollection.insertMany(penguins);
        console.log(`Inserted ${penguins.length} penguins`)
    } else {
        console.log("Database has penguins")
    }
}

export async function seedDatabase() {
    await seedResearchers();
    await seedSpecies();
    await seedPenguins();
}

export async function connect() {
    await client.connect();
    await seedDatabase();
    console.log("Connected to database");
    process.on("SIGINT", exit);
}