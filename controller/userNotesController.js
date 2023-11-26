const userNotes=require('../model/notesModel')
module.exports={
    createNotes:async(req,resp)=>{
        try {
            const data=new userNotes({
                userID:req.body._id,
                topicname:req.body.topicname,
                discripation:req.body.discripation,
            })
            const saveData=data.save()
            if (saveData) {
                resp.send({
                    status: "success",
                    statusCode: "200",
                    message: "successfully save notes",
                    data:saveData
                  });
            } else {
                resp.send({
                    status: "failure",
                    statusCode: "201",
                    message: "Notes not Save",
                    error:error.message
                  });
            }
        } catch (error) {
            resp.send({
                status: "failure",
                statusCode: "404",
                message: "server error",
                error:error.message
              });
        }
    },
    editNotes:async(req,resp)=>{
        try {
            const data=new userNotes({
                userID:req.body._id,
                topicname:req.body.topicname,
                discripation:req.body.discripation,
            })
            const saveData=await data.save()
            if (saveData) {
                resp.send({
                    status: "success",
                    statusCode: "200",
                    message: "successfully edit notes",
                    data:saveData
                  });
            } else {
                resp.send({
                    status: "failure",
                    statusCode: "201",
                    message: "Notes not Save",
                    error:error.message
                  });
            }
        } catch (error) {
            resp.send({
                status: "failure",
                statusCode: "404",
                message: "server error",
                error:error.message
              });
        }
    },
    allNotes:async(req,resp)=>{
        try {
            const notes=await userNotes.find()
            if (notes) {
                resp.send({
                    status: "success",
                    statusCode: "200",
                    message: "successfully save notes",
                    data:notes
                  });
            } else {
                resp.send({
                    status: "failure",
                    statusCode: "201",
                    message: "Notes not find",
                    error:error.message
                  });
            }
        } catch (error) {
            resp.send({
                status: "failure",
                statusCode: "404",
                message: "server error",
                error:error.message
              });
        }
    },
    deleteNotes:async(req,resp)=>{
        try {
            const deleteNotes=await userNotes.deleteOne({_id:req.parmas._id})
            if (deleteNotes) {
                resp.send({
                    status: "success",
                    statusCode: "200",
                    message: "successfully delete notes",
                  });
            } else {
                resp.send({
                    status: "failure",
                    statusCode: "201",
                    message: "Notes not find",
                    error:error.message
                  });
            }
        } catch (error) {
            resp.send({
                status: "failure",
                statusCode: "404",
                message: "server error",
                error:error.message
              });
        }
    },
}  