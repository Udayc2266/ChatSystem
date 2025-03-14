const Primary = require("../views/backend/primary");
const Secondary = require("../views/backend/secondary");



module.exports.postReview = async(req,res)=>{
    let {id} = req.params;
     let neuChat = await Primary.findById(id);
     
     const {message} = req.body
     let newChat = new Secondary({ message: message });

     newChat.user = req.user;
     
     neuChat.secondary.push(newChat);
 
     await newChat.save();
     await neuChat.save();
     
     res.redirect(`/chats/${id}`)
 }

 module.exports.deleteReview = async(req,res)=>{
    const {id , reviewid} = req.params;
    await Primary.findByIdAndUpdate(id, {$pull : {secondary : reviewid}})
    await Secondary.findByIdAndDelete(reviewid);
    
    res.redirect(`/chats/${req.params.id}`);
   
}
