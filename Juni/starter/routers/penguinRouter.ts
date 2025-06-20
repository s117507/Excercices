import { Router } from "express";
import { getAllPenguins } from "../database";
import { calculatePenguinAge } from "../utils";

export function penguinRouter() {
    const router = Router();
    const SORT_FIELDS = ["id", "nickname", "description", "species_id", "island", "gender", "weight", "height", "year", "image", "assigned_to"];

    router.get("/", async(req, res) => {  
        const sortField = SORT_FIELDS.includes(req.query.sortField as string) ? req.query.sortField as string : "nickname";
        const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
        const q = req.query.q?.toString() || "";

        const penguins = await getAllPenguins(sortField, sortDirection, q);

        res.render("penguins", {
            penguins,
            sortField,
            sortDirection,
            q,
            calculatePenguinAge
        });
    });

    router.post("/:id/assign", async(req, res) => {
        res.redirect("/penguins");
    });


    return router;
}