import { useNavigate } from "react-router-dom";

const Campaign = () => {
  const navigate = useNavigate();

  const userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    //TODO: Go to App store
    window.location.href = "https://www.apple.com/app-store/";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    //TODO: Go to App store
    window.location.href = "https://www.apple.com/app-store/";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    //TODO: Go to Play store
  } else if (/Android/.test(userAgent)) {
    //TODO: Go to Play store
    window.location.href = "https://play.google.com/store/games?hl=en&gl=US";
  } else if (/Linux/.test(platform)) {
    //TODO: Go to Play store
  } else {
    //TODO: Go to Play store
  }

  return <section></section>;
};

export default Campaign;
