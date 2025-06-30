const multer=require("multer")
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // console.log(file.originalname )
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage })
module.exports=upload