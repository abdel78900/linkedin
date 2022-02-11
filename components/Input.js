import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { useState } from "react";
import { handlePostState } from "../atoms/postAtom";

function Input({comment, post, setShowCommentInput}) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [inputComment, setInputComment] = useState("")
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);


  const uploadComment = async () => {
    
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
        test:"ADDCOMMENT",
      },
        body: JSON.stringify({
          inputComment,
          commenterId:session?.user?.email,
          commenterPseudo: session?.user?.name,
          commenterImg: session?.user?.image,
          createdAt: new Date().toString()
        }),
        
      });
      setHandlePost(true);
      setModalOpen(false);
      setInputComment("")
      setShowCommentInput(false)
    
  };
  return (
    <div className={`bg-white dark:bg-[#1D2226] rounded-lg p-3 space-y-3 ${!comment && "border border-gray-300"} dark:border-none`}>
      <div className="flex items-center space-x-2">
        <Avatar
          src={session?.user?.image}
          className="!h-10 !w-10 cursor-pointer"/>
        {
          comment ? <input 
          value={inputComment}
          onChange={(e)=> setInputComment(e.target.value)}
          className='w-full rounded-full pl-4 py-2 border outline-none'
          placeholder='Ajouter un commentaire...'
          type="text" /> : 
          <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left"
          onClick={() => {
            setModalOpen(true);
            setModalType("dropIn");
          }}
        >
         Commencer un post 
        </motion.button>
        }
      {comment && <button
        className="bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        type="submit"
        onClick={uploadComment}
        disabled={!inputComment.trim()}
      >
        Publier
      </button>}
         
        
      </div>
      {!comment &&
      <div className="flex items-center flex-wrap gap-4 justify-center md:gap-x-4">
        <button className="inputButton group">
          <PhotoSizeSelectActualOutlinedIcon className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        <button className="inputButton group">
          <VideoLibraryIcon className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Vidéo</h4>
        </button>
        <button className="inputButton group">
          <EventOutlinedIcon className="text-orange-700/60" />
          <h4 className="opacity-80 group-hover:opacity-100">Evénement</h4>
        </button>
        <button className="inputButton group">
          <ArticleIcon className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
            Rédiger un article
          </h4>
        </button>
      </div>
      }
      
    </div>
  );
}

export default Input;
