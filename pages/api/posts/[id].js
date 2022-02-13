import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";
import { Timestamp } from "mongodb";

export default async function handler(req, res) {
 const email = req.headers.email
 
 const request = req.headers.test
 
  const {
    method,
    body,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  if (request === "DELETEPOST") {
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "The post has been deleted!!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (request === "ADDLIKEPOST") {
    try {
      await db.collection("posts").updateOne({ _id: new ObjectId(id)},
      {$addToSet: {likers:email}},
      
        { new: true}
      
      ), 
        
      res.status(200).json({ message: "the post has been liked by ..." });
    } catch (error) {
      res.status(500).json("c'est une momunentale erreur");
    }
  }
  if (request === "ADDLIKEMESSAGE") {
    try {
      await db.collection("posts").updateOne({ _id: new ObjectId(id)},
      {$addToSet: {likers:email}},
      
        { new: true}
      
      ), 
        
      res.status(200).json({ message: "the post has been liked by ..." });
    } catch (error) {
      res.status(500).json("c'est une momunentale erreur");
    }
  }
 
  if (request === "DELETELIKEPOST") {
    try {
      await db.collection("posts").updateOne({ _id: new ObjectId(id)},
      { $pull: { likers: { $in : [email]}}},
        { new: true }
      ), 
      res.status(200).json({ message: "the post has been liked byqrgq ..." });
    } catch (error) {
      res.status(500).json("c'est une momunentale erreur");
    }
  }

  if (request === "ADDCOMMENT") {
    try {
      await db.collection("posts").updateOne({ _id: new ObjectId(id)},
      {$addToSet: {message:body }},
        { new: true}
      ), 
      res.status(200).json({ message: "the post has been liked byyyy ..." });
    } catch (error) {
      res.status(500).json("c'est une momunentale ");
    }
  }
}
 