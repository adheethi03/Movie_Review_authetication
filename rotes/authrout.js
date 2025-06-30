const express=require("express")
const {signup,signin,adminlogout,userlogout}=require("../cntlr/authenticationcntrl")
const upload =require("../middleware/multer")

const router=express.Router()
router.post('/signup',upload.single('image'),signup)
router.post("/login",signin)
router.post("/admin/logout",adminlogout)
router.post("/user/logout",userlogout)


module.exports = router;