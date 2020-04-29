;(function() {
    var config = {
        grid: {
            display: true,
            vertical: {
                display: false
            },
            horizontal: {
                display: true,
                size: 1,
                color: '#F2F5FA',
                style: 'solid'
            }
        },
        candleStick: {
            bar: {
                upColor: '#3CB697',
                downColor: '#F3686A',
                noChangeColor: '#3CB697'
            },
            priceMark: {
                high: {
                    color: '#929DAC'
                },
                low: {
                    color: '#929DAC'
                },
                last: {
                    upColor: '#3CB697',
                    downColor: '#F3686A',
                    noChangeColor: '#3CB697'
                }
            }
        },
        realTime: {
            timeLine: {
                color: '#007AFF',
                size: 1,
                gradientFill: {
                    display: true,
                    topColor: 'rgba(0, 122, 255, .1)',
                    bottomColor: 'rgba(0, 122, 255, .01)'
                }
            },
            averageLine: {
                display: false
            }
        },
        xAxis: {
            display: true,
            axisLine: {
                display: true,
                color: '#F2F5FA'
            },
            tickText: {
                color: '#C1CAD6'
            },
            tickLine: {
                display: false
            }
        },
        yAxis: {
            display: true,
            axisLine: {
                display: true,
                color: '#F2F5FA'
            },
            tickText: {
                color: '#C1CAD6'
            },
            tickLine: {
                display: false
            }
        },
        technicalIndicator: {
            bar: {
                upColor: '#3CB697',
                downColor: '#F3686A',
                noChangeColor: '#3CB697'
            },
            line: {
                colors: ['#17304B', '#F7B631', '#3CB697']
            }
        },
        separator: {
            color: '#F2F5FA'
        },
        floatLayer: {
            prompt: {
                candleStick: {
                    labels: ['时间', '开', '收', '高', '低'],
                    text: {
                        color: '#929DAC',
                        upColor: '#3CB697',
                        downColor: '#F3686A',
                        noChangeColor: '#3CB697'
                    }
                },
                technicalIndicator: {
                    text: {
                        color: '#929DAC'
                    }
                }
            }
        }
    }
    var kline = klinecharts.init(document.querySelector('#chart'));
    var last = {
        timestamp: +new Date(),
        open: 1,
        high: 1,
        low: 1,
        close: 1,
        volume: 1
    };
    kline.setStyleOptions(config);
    kline.applyNewData([last]);
    kline.addTechnicalIndicator('VOL', 100);
    kline.setTechnicalIndicatorParams("VOL", []);

    setInterval(() => {
        let close = Math.random(10) + 1;
        let time = +new Date();
        let isNewBar = (time - last.timestamp) > 60 * 1000;
        last = {
            timestamp: isNewBar ? time : last.timestamp,
            open: isNewBar ? last.close : last.open,
            high: isNewBar ? last.close : last.high > close ? last.high : close,
            low: isNewBar ? last.close: last.low > close ? close : last.low,
            close: close,
            volume: Math.random(10) + 1
        }
        kline.updateData(last)
    }, 1000);

    document.querySelector('#realtime').onclick = function () {
        kline.setCandleStickChartType('real_time');
    }
    document.querySelector('#min1').onclick = function () {
        kline.setCandleStickChartType('candle_stick');
    }
})()