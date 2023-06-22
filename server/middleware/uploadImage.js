const multer=require('multer');
const path = require('path');
const fs = require('fs');


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public')
    },
    filename: function (req, file, cb) {
        cb(null, `profileImage/${Date.now()}${path.extname(file.originalname)}`);
    },
})

const upload = multer({ storage: storage });

function deleteExistingImage(req,res,next){
    const imagePath = 'public/profileImage'; // Path to the directory where images are stored

    // Function to delete all images from the file system
    const deleteAllImages = () => {
      // Read the directory
      fs.readdirSync(imagePath).forEach((file) => {
        const imagePathToDelete = path.join(imagePath, file);
    
        // Delete the file
        fs.unlinkSync(imagePathToDelete);
        console.log(`Deleted image: ${file}`);
      });
    
      console.log('All images deleted.');
    };
    next()
    
    // Example usage:
    deleteAllImages();
}


module.exports = { upload,deleteExistingImage}