import { Collection, MongoClient, SortDirection } from "mongodb";
import dotenv from "dotenv";
import { Penguin, Researcher, Species } from "./types";
dotenv.config();

export const client = new MongoClient(process.env.CONNECTION_STRING || "mongodb://localhost:27017");

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
    return [];
}

export async function getAllSpecies(): Promise<Species[]> {
    return [];
}

export async function getSpeciesById(id: string): Promise<Species | null> {
    return null;
}

export async function updateResearcher(username: string, newPincode: string): Promise<void> {
    
}

export async function assignPenguinToResearcher(penguinId: number, researcherString: string): Promise<void> {  
    
};

export async function getAllPenguins(sortField: string, sortDirection: SortDirection, q: string): Promise<Penguin[]> {
    return [];
}

export async function getPenguinsBySpecies(id: number): Promise<Penguin[]> {
    return [];
}

export async function login(username: string, pincode: string): Promise<Researcher | null> {
    return null;
}

async function seedResearchers(): Promise<void> {
   
}

async function seedSpecies(): Promise<void> {
   
}

async function seedPenguins(): Promise<void> {
    
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