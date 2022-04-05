import { Router } from "express";

const router = Router();

import categoryRouter from "./Category.routes";
import restaurantRouter from "./Restaurant.routes";
import userRouter from "./User.routes";
import toppingRouter from "./Topping.routes";
import menuRouter from "./Menu.routes";

// router.use("/", (req, res) => {
//   res.send("Endpoints: \n/category \n/restaurant \n/user \n/topping");
// });
router.use("/category", categoryRouter);
router.use("/restaurant", restaurantRouter);
router.use("/user", userRouter);
router.use("/topping", toppingRouter);
router.use("/menu", menuRouter);

export default router;
