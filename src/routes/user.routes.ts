import { NextFunction, Router, Response, Request } from "express";
import * as userCtrl from "../controllers/user.controller"
const router=Router();
router.get("/", userCtrl.home)



export default router;