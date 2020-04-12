var player = require('play-sound')(opts = {})
var prompt = require('prompt');
var count = 1

function start() {
    console.log('開始蕃茄時間')
    let work_time = 1
    // let work_time = 1500; //25分鐘
    let time = ""
    var work_interval = setInterval(() => {
        work_time--;
        let min = Math.floor(work_time / 60);
        let sec = (work_time - min * 60);
        time = min + ":" + sec
        console.log(time)

        if (work_time == 0) {
            clearInterval(work_interval)
            console.log(`第${count}次蕃茄鐘完成!`)
            if(count==4){
                console.log('恭喜你達成四次的專注!!');
            }
            var audio = player.play('嘆雲兮.mp3', function (err) {
                if (err && !err.killed) {
                    process.exit(0)
                }
            })
            prompt.start();
            let stop_command = ""
            console.log('請輸入p停止音樂，休息5分鐘:');
            prompt.get(['command'], function (err, result) {
                if (result.command == "p") {
                    audio.kill()
                    rest()
                }
            });


        }
    }, 1000);

}



function rest() {
    let rest_time = 2; 
    // let rest_time = 300; //5分鐘
    console.log("開始休息5分鐘")
    let time = ""
    var rest_interval = setInterval(() => {
        rest_time--;
        let min = Math.floor(rest_time / 60);
        let sec = (rest_time - min * 60);
        time = min + ":" + sec
        console.log(time)

        if (rest_time == 0) {
            clearInterval(rest_interval)
            console.log(`第${count}次小休息結束!`)
            var audio = player.play('路過人間.mp3', function (err) {
                if (err && !err.killed) {
                    process.exit(0)
                }
            })
            prompt.start();
                console.log('請輸入p停止音樂，再開始您的下一次規劃:');
            prompt.get(['command'], function (err, result) {
                if (result.command == "p") {
                    audio.kill()
                    if(count == 4){
                        process.exit(0)
                    }else if(count >=1 && count <=3){
                            start(count++) 
                    }
                }
            });

        }

    }, 1000)


}


start(count)
