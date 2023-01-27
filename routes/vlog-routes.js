import express from "express";
import { addVlog, deleteVlog, getAllVlogs, getById, getByUserId, updateVlog } from "../controllers/vlogs.controller";

const vlogRouter = express.Router();

vlogRouter.get("/",getAllVlogs);

vlogRouter.post("/add",addVlog);

vlogRouter.put("/update/:id",updateVlog);

vlogRouter.get("/:id",getById);

vlogRouter.delete("/:id",deleteVlog);

vlogRouter.get("/user/:id",getByUserId);





export default vlogRouter;