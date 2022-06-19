require("dotenv").config()
const express = require("express")
const app = express();
const PORT = 5000
const router = require("./src/routes")
app.use(express.json())


app.use("/api/v1/", router)
app.use("/uploads", express.static("uploads"))
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`))
