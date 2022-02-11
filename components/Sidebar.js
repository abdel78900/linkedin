import { Avatar } from "@mui/material";
import Image from "next/image";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="space-y-2 min-w-max max-w-lg">
      
      <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none">
        <div className="relative w-full h-14">
          <Image src="https://rb.gy/i26zak" layout="fill" priority />
        </div>
        <Avatar
          onClick={signOut}
          src={session?.user?.image}
          className="!h-20 !w-20 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-8 space-x-0.5">
          <h4 className="font-semibold hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
            {session?.user?.name}
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
            {session?.user?.email}
          </p>
        </div>

        <div className="hidden md:inline text-left dark:text-white/75 text-sm">
          <div className="font-medium sidebarButton space-y-0.5 border-t border-gray-200">
            <div className="flex justify-between space-x-2">
              <h4>Personnes ayant vu votre profil</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>vues de vos posts</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>

          <div className="sidebarButton border-t border-gray-200">
            <h4 className="leading-4 text-xs">
              Accédez à des infos et des outils <br/>exclusifs
            </h4>
            <h4 className="flex items-center mt-2 space-x-3 border-gray-900dark:text-white font-medium">
              <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{" "}
              <p>Essayer Premium <br/>gratuitement</p> 
            </h4>
          </div>

          <div className="sidebarButton flex items-center space-x-1.5 border-t border-gray-200">
            <BookmarkOutlinedIcon className="!-ml-1" />
            <h4 className="dark:text-white font-medium ">Mes éléments</h4>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
        <p className="sidebarLink">Groupes</p>
        <div className="flex items-center justify-between">
          <p className="sidebarLink">Événements</p>
          <AddRoundedIcon className="!h-6 mr-2  hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200" />
        </div>
        <p className="sidebarLink">Hashtags suivis</p>
        <div className="sidebarButton text-center border-t border-gray-200">
          <h4 className="dark:text-white font-medium text-sm">En découvrir plus</h4>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
