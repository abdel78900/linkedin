import { Avatar} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import TimeAgo from "timeago-react";
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';

const Comment = ({post, com}) => {
  timeago.register('fr', fr);

    return (
        <div>
            <>
          <div className="flex flex-col space-x-5 items-center">
            <div className="flex w-full">
              <Avatar
          src={com.commenterImg}
          className="!h-10 !w-10 cursor-pointer ml-3 mt-3"/>
          <div className="relative flex flex-col rounded-lg w-5/6 bg-gray-100 dark:bg-transparent dark:border dark:border-gray-500 p-2 m-2">
           <p className='font-semibold' >{com.commenterPseudo}</p>
           <p className='font-light text-sm text-gray-500'>{com.commenterId}</p>
            <p className="mt-2">{com.inputComment}</p>
          
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7 absolute top-1 right-3" />
            <TimeAgo
            datetime={com.createdAt}
            locale='fr'
            className="text-xs dark:text-white/75 opacity-80 absolute top-2 right-14"
          />
          </div>
            </div>
          
          </div>
            <div className="flex space-x-2  divide-x-2 text-xs text-gray-400 font-semibold dark:text-white">
            <p className="divide-x-2 ml-16 cursor-pointer">Jaime</p>
            <p className="divide-x-2 pl-3 cursor-pointer">Répondre</p>  
            </div>
          </>
        </div>
    )
}

export default Comment
