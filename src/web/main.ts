import Hls from "hls.js/dist/hls.min";
window.onload = () => {
    const videoSrc = "http://127.0.0.1:4000/output/test.m3u8";
    const video = document.getElementById("player") as HTMLVideoElement;
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
    }
};
