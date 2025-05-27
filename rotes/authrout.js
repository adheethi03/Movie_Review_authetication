const express=require("express")
const {signup,signin,adminlogout,userlogout}=require("../cntlr/authenticationcntrl")


const router=express.Router()
const upload=require("../middleware/upload")
router.post('/signup',upload.single("profilepic"),signup)
router.post("/login",signin)
router.post("/admin/logout",adminlogout)
router.post("/user/logout",userlogout)


module.exports = router;