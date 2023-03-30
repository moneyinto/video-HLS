import express from "express";
// import ffmpeg from "ffmpeg";
import path from "path";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath.path);

const app = express();

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", ["Content-Type", "form-data"]);
    next();
});

app.use(express.static(path.join(__dirname, "./assets")));

const videoHLS = () => {
    try {
        ffmpeg(path.join(__dirname, "./assets/test2.mp4"))
            .videoCodec("libx264")
            .format("hls") // 输出视频格式
            .outputOptions("-hls_list_size 0") //  -hls_list_size n:设置播放列表保存的最多条目，设置为0会保存有所片信息，默认值为5
            .outputOption("-hls_time 5") // -hls_time n: 设置每片的长度，默认值为2。单位为秒
            .output(path.join(__dirname, "./assets/output/test.m3u8")) // 输出文件
            .on("progress", (progress) => {
                // 监听切片进度
                console.log("Processing: " + progress.percent + "% done");
            })
            .on("end", () => {
                // 监听结束
                console.log("视频切片完成");
            })
            .run();
    } catch (err) {
        console.log("Error: " + err);
    }
};

videoHLS();

app.listen("4000", () => {
    console.log("api listen on 4000");
});
