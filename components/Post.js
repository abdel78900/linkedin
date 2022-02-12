import { Avatar, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { useRecoilState } from "recoil";
import { handlePostState, getPostState } from "../atoms/postAtom";
import { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import TimeAgo from "timeago-react";
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';
import { useSession } from "next-auth/react";
import Input from "./Input";
import Comment from "./Comment";


function Post({ post, modalPost }) {
  timeago.register('fr', fr);
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [showInput, setShowInput] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const liker = post.likers?.includes(session?.user?.email)
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;
console.log(post)
  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json",
      test: "DELETEPOST",
    
    },
    });

    setHandlePost(true);
    setModalOpen(false);
  };

  const handleLike = async () => {
    if (liker){
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
        email: session?.user?.email,
        test: "DELETELIKE",
      },
      });
      setHandlePost(true);
      setModalOpen(false);
    }else{
      const response = await fetch(`/api/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      email: session?.user?.email,
      test: "ADDLIKE",
    },
    });

    setHandlePost(true);
    setModalOpen(false);
    }
    
  };
  const handleCommentInput = ()=>{
    setShowCommentInput(!showCommentInput)
  }

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          <TimeAgo
            datetime={post.createdAt}
            locale='fr'
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className="px-4 break-all md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
            ) : (
              <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}
      <div className="flex items-center justify-between w-full px-4">
        <div className='flex items-center space-x-1'>
          {post?.likers?.length !== 0 && <ThumbUpOffAltRoundedIcon className="-scale-x-100 !h-5 !w-5 p-1 bg-blue-500 rounded-full text-white"/> }
          <p className="flex  text-gray-500 text-xs dark:text-white ">{ post?.likers?.length !== 0 && post?.likers?.length}</p>  
        </div>
         
      <p className="flex  text-gray-500 text-xs dark:text-white">{ post.message && post?.message?.length + " commentaires"}</p>
      </div>
     
      

      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}

      <div className="flex justify-evenly items-center border-t border-gray-500/20 dark:border-t  mx-2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liker && "text-blue-500"}`}
            onClick={handleLike}
          >
            {liker ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>J'aime</h4>
          </button>
        )}
        <button
        onClick={handleCommentInput}
        className="postButton -translate-x-2">
            <CommentOutlinedIcon />
            <h4>Commenter</h4>
          </button>
        {session?.user?.email === post.email ? (
          <button
            className="postButton focus:text-red-400"
            onClick={deletePost}
          >
            <DeleteRoundedIcon />
            <h4 className='whitespace-nowrap'>Supprimer le post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Partager</h4>
          </button>
        )}
      </div>
      {
        showCommentInput && <Input comment post={post} setShowCommentInput={setShowCommentInput}/>
      }
      <div>
        {post.message && post.message.reverse().map(com =>(
          <Comment post={post} com={com}/>
          
        ))}
      </div>
    </div>
  );
}

export default Post;
