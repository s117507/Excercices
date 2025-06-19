import e, { Router } from "express";

export function authRouter() {
    const router = Router();

    router.get("/login", async(req, res) => {
        res.render("login");
    });

    router.post("/login", async(req, res) => {
        res.redirect("/login");
    });

    router.post("/logout", (req, res) => {  
        res.redirect("/login");
    });

    return router;
}