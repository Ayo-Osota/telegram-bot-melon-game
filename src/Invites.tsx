import { useCallback } from "react";

function Invites() {
  const handleShare = useCallback(() => {
    const shareData = {
      title: "Check out this game!",
      text: "I found this amazing game, and I think you should try it!",
      url: "https://t.me/osotzBot/melon",
    };

    // Check if the Web Share API is available
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url).then(
        () => alert("Link copied to clipboard!"),
        (error) => console.error("Copy to clipboard failed:", error)
      );
    }
  }, []);

  return (
    <main className="relative text-center flex flex-col items-center justify-center h-full">
      <button type="button" className="button py-3" onClick={handleShare}>
        Share
      </button>
    </main>
  );
}

export default Invites;
