import { Router } from "express";
import { getSpeciesById, getPenguinsBySpecies } from "../database";
import { calculatePenguinAge } from "../utils";


export function speciesRouter() {
    const router = Router();

    router.get("/:id", async(req, res) => {
        const id = req.params.id;
        const species = await getSpeciesById(id);

        if (!species) {
            res.status(404).send("Species not found");
            return;
        }

        const penguins = await getPenguinsBySpecies(Number(id));

        res.render("species",{
            species,
            penguins,
            calculatePenguinAge}
        );
    });

    return router;
}