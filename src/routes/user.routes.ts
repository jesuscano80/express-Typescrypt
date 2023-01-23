import { NextFunction, Router, Response, Request } from "express";

import * as userCtrl from "../controllers/user.controller"
import User from "../models/user.models"

const router=Router();
router.get("/", userCtrl.home)

router.get("/getallusers", userCtrl.getAllUsers)

router.delete("/deleteuser",)
router.post("/login", userCtrl.login )

router.post("/signin", userCtrl.signin)

router.post("/sendpassword", userCtrl.sendPassword)
router.get("/password/reset/:email/:passwordId", userCtrl.resetPassword)
export default router;