### 视频切片使用HLS播放

### 项目运行
```shell
npm install

npm run dev

npm run serve
```

### 切片方法
```ts
const videoHLS = () => {
    try {
        ffmpeg(path.join(__dirname, "./assets/test.mp4"))
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
```
