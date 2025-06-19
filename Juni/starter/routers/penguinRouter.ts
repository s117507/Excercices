import { Router } from "express";

export function penguinRouter() {
    const router = Router();
    const SORT_FIELDS = ["id", "nickname", "description", "species_id", "island", "gender", "weight", "height", "year", "image", "assigned_to"];

    router.get("/", async(req, res) => {  
        res.render("penguins");
    });

    router.post("/:id/assign", async(req, res) => {
        res.redirect("/penguins");
    });


    return router;
}