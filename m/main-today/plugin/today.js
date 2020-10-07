/**
 * * 뉴스 오늘 탭 - 관련 리소스 순차적으로 동적 호출하기 위해 ES6문법 필수. YUI압축 도구가 ES6지원하지 않아 별도 관리
 */
// Today 환경변수
var TODAY = {
    load: false, // plugin dynamic call
    d: null, // data
    sm: null, // siumulator
    f: null,
    t: null, // js리소스 체크 타이머
    b: false // 돔 리드로우 일어날때 이벤트가 해제됨, 바인딩 해주고 2번 바인딩 안되게 체크
};
(function() {
    var getScript = function (source) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            var prior = document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1];
            script.async = 1;
            script.onerror = function(e){
                reject(e);
            };

            script.onload = script.onreadystatechange = (_, isAbort) => {
                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                    script.onload = script.onreadystatechange = null;
                    script = undefined;
                    path.shift();
                    resolve(true)
                }
            };

            script.type = "text/javascript";
            script.src = source;
            prior.parentNode.appendChild(script);
        });
    };
    var path = [
        '/js4/today/gsap.min.js',
        '/js4/today/CustomEase.min.js',
        '/js4/today/Draggable.min.js',
        '/js4/today/DrawSVGPlugin.min.js',
        '/js4/today/MotionPathPlugin.min.js',
        '/js4/today/ScrollToPlugin.min.js',
        '/js4/today/InertiaPlugin.min.js',
        '/js4/today/d3.v5.min.js',
        '/js4/today/moment-with-locale.min.js',
        '/js4/today/moment-timezone-with-data.min.js',
        '/js4/today/utils.js',
        '/js4/today/today-main.js'
    ]


    TODAY.f = ($target , $container ) => {
        if(TODAY.load === false) {
            TODAY.load = 'ing';
            path.reduce(function (prevProm, item) {
                return prevProm.then(function () {
                    return getScript(item);
                })
            }, Promise.resolve())
                .then(() => {
                    // 성공 후 처리
                    TODAY.load = true;
                    return TODAY.f($target , $container);
                })
                .catch((e) => {
                    e.target.outerHTML = '';
                    console.log(path  + ' : path Error')
                })
        } else {
            var isCheck = $container[0].querySelector('#bubbleGroupWrap') === null;
            var loadCheck = document.querySelector('.today-loader');
            if ($container[0].querySelector('#contents') && $container.index === 3) {
                _todayInit(isCheck);
            }

            if(loadCheck && $container.index !== 3) {
                if (TODAY.t) {
                    clearTimeout(TODAY.t)
                }
                TODAY.t = setTimeout(function() {
                    if(loadCheck) {
                        _todayInit(true);
                    }
                }, 400);
            }


            if ($container.index < 2 || $container.index > 4 ) {
                if (TODAY && !document.querySelector('.today-loader')) {
                    TODAY.b = false;
                }
            }
            if ($container.index !== 3){
                _todayRemove();
            }
        }
    }

    function _todayInit(checked) {
        stage.removeEvent('newsTodayStop');
        stage.trigger('newsToday', checked);
    }
    function _todayRemove() {
        stage.removeEvent('newsToday');
        stage.trigger('newsTodayStop');
    }
})();