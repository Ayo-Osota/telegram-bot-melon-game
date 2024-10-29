import { Icon } from "@iconify/react";
import { useTelegram } from "../context/TelegramContext";
import { useEffect, useState } from "react";
import { useUserGameData } from "../context/UserGameDateContext";

function TopPanel() {
  const { user } = useTelegram();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const { userGameData } = useUserGameData();
  const token = import.meta.env.VITE_TG_BOT_TOKEN;

  const getUserProfilePhotos = async (userId: number, token: string) => {
    const url = `https://api.telegram.org/bot${token}/getUserProfilePhotos?user_id=${userId}&limit=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.ok && data.result.photos.length > 0) {
        // Return the file_id of the first photo
        return data.result.photos[0][0].file_id;
      } else {
        console.error("No profile photos found or error:", data.description);
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile photos:", error);
      return null;
    }
  };

  const getFile = async (fileId: string, token: string) => {
    const url = `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.ok) {
        // Construct the file download URL
        const filePath = data.result.file_path;
        return `https://api.telegram.org/file/bot${token}/${filePath}`;
      } else {
        console.error("Error getting file information:", data.description);
        return null;
      }
    } catch (error) {
      console.error("Error fetching file information:", error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchProfilePhoto() {
      if (!user?.id) return;

      const fileId = await getUserProfilePhotos(user.id, token);
      if (fileId) {
        const photoUrl = await getFile(fileId, token);
        if (photoUrl) {
          setProfilePhotoUrl(photoUrl);
        }
      }
    }

    fetchProfilePhoto();
  }, [user, token]);

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-11.5 h-10 border border-white/5 rounded-full overflow-hidden">
          {profilePhotoUrl ? (
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon
              icon="fa6-solid:user"
              className="text-gray-400 w-full h-full"
            />
          )}
        </div>
        <p className="text-white/60 text-base leading-snug font-bold">
          {user?.username}
        </p>
      </div>
      <div className="flex items-center">
        <Icon icon="ph:ticket" className="rotate-90 text-2xl text-green" />
        <p>{userGameData.tickets}</p>
      </div>
    </header>
  );
}

export default TopPanel;
