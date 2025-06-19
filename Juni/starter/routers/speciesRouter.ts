import { Router } from "express";

export function speciesRouter() {
    const router = Router();

    router.get("/:id", async(req, res) => {
        res.render("species");
    });

    return router;
}