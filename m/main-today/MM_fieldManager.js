//쇼핑 , 검색리스트 , 랭킹 영역과 특정 페이지에 있는 필드를 해당 상황에 맞게 정의하도록 관리하는 기능을 정의하고 있음.

(function($){ // type1. 쇼핑박스
    var __originalData,
        __dataMap = {},
        __rollMap = {},
        __checkMap = [],
        __H , __W , __limit = __tabId = __currentId = 0,
        __isListShow = false,
        __DUMMY = "https://m1.nateimg.co.kr/n3main/thumb_shopping.png";

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        $container.addEvent('recieveData' , _reset).addEvent('shopJump' , _listMove);
        __originalData = $data.shopping;
        _setShopDataReset(__originalData);
    }

    function _reset($target , $container , $data ){
        if($container.index === MM_PAGING.ADH || $container.index === MM_PAGING.TRAVEL || $container.index === MM_PAGING.BEAUTY || $container.index === MM_PAGING.LIVING ) return;//		if($container.index !== 0 && __isListShow)__isListShow = false , _addRoll(false);
        if($container.index !== MM_PAGING.NEWS_A && $container.index !== MM_PAGING.RANK_B && $container.index !== MM_PAGING.SHOP_B && __isListShow) __isListShow = false, _addRoll(false);
        if(__checkMap.indexOf($container.index) > -1) return;
        if($container.index !== MM_PAGING.NEWS_A && $container.index !== MM_PAGING.RANK_B && $container.index !== MM_PAGING.SHOP_B) __checkMap.push($container.index);
        if(!__rollMap.clientTab && ($container.index === MM_PAGING.NEWS_A || $container.index === MM_PAGING.RANK_B || $container.index === MM_PAGING.SHOP_B)) _setClientTab(__originalData);
        if($.$find($container,'.shopping').length === 0){
            return;
        }
        var container = $.$sprite.ADD($.$find($container,'.shopping')).attr('innerHTML' , ' ');
        //$container.index === 0 ? _setRollingData(container) :  _setSingleData(container);

        $container.index === MM_PAGING.NEWS_A || $container.index === MM_PAGING.RANK_B || $container.index === MM_PAGING.SHOP_B ? _setRollingData(container) :  _setSingleData(container);
        // shopping box foot Adv
        /*var script = document.createElement('script'),
            target = $.$find($container,'[name=ad_shbox]')[0];

        script.type = 'text/javascript';
        script.charset = 'euc-kr';
        script.src = '//cyad1.nate.com/js.kti/mnate/main@shopbox_Bottom2'
        target.appendChild(script)*/
    }

    function _setRollingData($container){
        if(!__rollMap.rollingCover)__rollMap.rollingCover = $.$sprite.ADD('div').style({position:'relative' , overflow:'hidden'});

        __rollMap.clientTab.append($container);
        __rollMap.rollingCover.append($container);
        __rollMap.clickable.append($container);

        __isListShow = true;
        _addRoll(true);
    }

    function _setSingleData($container){
        for(var i = 0 , si , nums = [] , data = []; i < 9 ; ++i){
            si = ran(nums);
            nums.push(si);
            data.push(__dataMap.random.getData(si));
        }


        function ran($list){
            var r = Math.floor(Math.random()*__dataMap.random.getCombineLength());
            if($list.indexOf(r) > -1){
                return arguments.callee($list);
            }
            return r;
        }
        $container.attr('innerHTML','<div class="thd"><a href="//m.shopping.nate.com" onclick="return MM_GLOBAL.ndrclick(\'MHT11\');"><h2><strong>쇼핑트렌드</strong><span>더보기</span></h2></a></div><div><div><ul class="mpt1">'+_getRanItemForm(data)+'</ul></div></div>');
        data.length = nums.length = 0;
        data = nums = null;
    }

    function _addRoll($add){
        if($add){
            if(!__rollMap.list){
                __rollMap.list =  $.$rolllist.FACTORY($.$rolllist.ARG.target(__rollMap.rollingCover).size(_getW())
                    .item(function($index){
                        return $.$sprite.ADD('div').style({position:'absolute'}).width(_getW());
                    })
                    .onChange(_setState)
                    .onMouseMove(function(){
//							  stage.trigger('BLOCK_ON');
                    })
                    .onMouseUp(function(){
//							   stage.trigger('BLOCK_OFF');
                    })
                    .onComplete(function(){
//							  stage.trigger('BLOCK_OFF');
                    })
                    .turm(function($index){
                        return _getW();
                    })
                    .dataReset(function($item , $data){
                        $item.attr('innerHTML' , '<ul class="mpt1">'+_getRollItemForm($data)+'</ul>')
                    }));
                __rollMap.list.data(__dataMap.original);
                _setState(__rollMap.list.getCurrentItem().index);
                __rollMap.flickable = $.$flick.FACTORY($.$flick.ARG.target(__rollMap.list).speed(.5).once().block(true));
                _setState(__currentId);
            }
            stage.enterframe(_sizeReset);
        }else{
            stage.enterframeR(_sizeReset);
        }
    }

    function _sizeReset(){
        if(__H !== __rollMap.list.getCurrentItem().height() || __W !== stage.width) {
            __W = stage.width;
            __H = __rollMap.list.getCurrentItem().height();
            __rollMap.rollingCover.height(__H);
            __rollMap.list.setSize(_getW());
        }
    }

    function _setState($index){
        __currentId = $index;
        __tabId = __dataMap.original.getParentPoint($index);

        $.$each(__rollMap.clientItem.getChild() , function($child , $id){
            $child.className =  __dataMap.original.getParentPoint($index) === $id ? 'on' : ' ';
        });
        __rollMap.marker.attr('innerHTML' , '<strong>'+($index+1)+'</strong> / '+__dataMap.original.getCombineLength());
    }

    function _listMove($target , $value){
        __rollMap.flickable.setJumpMove($value);
    }

    function _listClick($e){
        var breaker = false;
        $.$each(__rollMap.clientItem.getChild(),function($item , $id){
            if($e.target.parentNode === $item && __tabId !== $id){
                _listJump($id === 0 ? 0 : __dataMap.original.getLengthMap($id-1));
                __tabId = $id;
                breaker = true;
            }
        });

        if(!breaker)location.href = __originalData[__tabId].tlink;
    }

    function _listJump($index){
        __currentId = __rollMap.list.getCurrentItem().index;
        __rollMap.list.setLocation((__currentId-$index)*_getW());
    }

    function _getRollItemForm($data){
        var str="" , img;
        $.$each($data.img,function($null,$index){
            img = __limit >= 2 ? 'src="'+$data.img[$index]+'"' : 'src="'+__DUMMY+'" data-img="'+$data.img[$index]+'"';
            str+='<li class="pt1_5"><a href="'+$data.link[$index]+'" onclick='+MM_NDR($data.ndr[$index])+'>'+
                '<span class="iBox"><img '+img+'alt="" width="100%" /></span>'+
                '<span>'+$data.title[$index]+'</span></a></li>';
        });
        if(__limit<=2) ++__limit; // for setting data-img value point -> 2
        return str;
    }


    function _getRanItemForm($data){
        var str="";
        $.$each($data,function($data,$index){
            str+='<li class="pt1_5"><a href="'+$data.link+'" onclick='+MM_NDR('MHT01')+'>'+
                '<span class="iBox"><img src="'+__DUMMY+'" data-img="'+$data.img+'" alt="" width="100%" /></span>'+
                '<span>'+$data.title+'</span></a></li>';
        });

        return str;
    }

    function _setClientTab($data){
        __rollMap.clientTab = $.$sprite.ADD($.$find('.sp'));
        __rollMap.clientItem = $.$sprite.ADD($.$find('.sptab')).mouseClick(_listClick);
        __rollMap.clickable = $.$sprite.ADD($.$find('.flickNav'));
        __rollMap.marker = $.$sprite.ADD($.$find(__rollMap.clickable , '.cnt'));

        function getItems(){
            var str ="";
            $.$each($data,function($data){
                str += '<li><span>'+$data.ad+'</span></li>'
            });
            return str;
        }
    }



    function _setShopDataReset($data){
        var totalData = [];
        __dataMap.random = [];
        $.$each($data,function($dataA){
            totalData.push($dataA.dataList);
            $.$each($dataA.dataList,function($dataA){
                $.$each($dataA.link,function($dataB,$id){
                    __dataMap.random.push({img : $dataA.img[$id] , link : $dataA.link[$id], ndr : $dataA.ndr2[$id], title : $dataA.title[$id] });
                });
            });
        });



        function setClone(){
            for(var i = 0 , len = __dataMap.random.length , clone = []; i < len; ++i){
                clone.push(__dataMap.random.splice(Math.floor(Math.random()*__dataMap.random.length),1)[0]);
            }

            //민경욱 매니저님 추가
            var dataLen = totalData[0].length,
                index = Math.floor((Math.random()*dataLen));
            __dataMap.original = $.$provider.FACTORY($.$provider.ARG.map(totalData).loop().startIndex(index));
            __dataMap.random = $.$provider.FACTORY($.$provider.ARG.map(clone));
        }

        setClone();
    }

    function _getW(){
        return __rollMap.clientTab.width();
    }

    stage.addEvent('contentReady',_init);
})(plast);

//////////////////////////////////////////////////////////////////////////////////////////////////////
(function($){ // type2. INFO FIELD
    var __rollMap={}, __H=38;

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        if($data.info.length>1){
            $container.addEvent('recieveData' , _reset);
            __rollMap.data =  $.$provider.FACTORY($.$provider.ARG.map($data.info).loop());
        }
    }

    function _reset($target , $container , $data ){
        $container.index===0 ? _setInfoset() : _pause();
    }

    function _setInfoset(){
        if(!__rollMap.cover){
            function getForm($data){
                var str= '<a href="'+$data.link+' "onclick='+MM_NDR($data.ndr)+'"><span class="area">'+$data.name+'</span><img src="'+$data.img+'" width="22" height="22" alt="'+$data.alt+'"><span class="tem">'+$data.temp+'°'+'</span><span class="rainfall">'+$data.rain+'mm'+'</span></a>';
                return str;
            }

            __rollMap.cover =  $.$sprite.ADD('div').style({overflow:'hidden',position:'relative'});
            __rollMap.list =  $.$rolllist.FACTORY($.$rolllist.ARG.target(__rollMap.cover).size(__H).vertical()
                .item(function($index){
                    return $.$sprite.ADD('div').style({position:'absolute',width:'100%'}).height(__H);
                })
                .turm(function($index){
                    return __H;
                })
                .dataReset(function($item , $data){
                    $item.attr('innerHTML',getForm($data));
                }));

            __rollMap.list.data(__rollMap.data);
            __rollMap.flickable = $.$flick.FACTORY($.$flick.ARG.target(__rollMap.list).speed(.5).once().block(true));
        }
        __rollMap.cover.timer(3000,1,_start);
    }

    function _start(){
        var container = $.$sprite.ADD($.$find('.wt')).attr('innerHTML',' ');
        __rollMap.cover.append(container);
        __rollMap.cover.enterframe(_roll,3000);
    }

    function _roll(){
        __rollMap.flickable.setJumpMove(-1);
    }

    function _pause(){
        if(__rollMap.cover)__rollMap.cover.enterframeR(_roll).timerR(_start);
    }

    stage.addEvent('contentReady',_init);
})(plast);

//////////////////////////////////////////////////////////////////////////////////////////////////////
(function($){ // type3. SEARCH FIELD
    var __rollMap={},__itemMap={}, __H=37 , __openBt , __open = false;

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        $container.addEvent('recieveData' , _reset);
        __rollMap.time = $data.search.time;
        __rollMap.data =  $.$provider.FACTORY($.$provider.ARG.map($data.search.data).loop());
    }

    function _reset($target , $container , $data ){
        $container.index===0 ? _setInfoset() : _pause();
    }

    function _setInfoset(){
        if(!__rollMap.cover){
            function getSearchList(){
                for(var  i = 0 , str = "" ; i < 10 ; ++i){
                    str+=getForm(__rollMap.data.getTotal(i),'li');
                }
                return str;
            }

            function getForm($data , $tag){
                var str= '<'+$tag+' class="rl"><a href="'+$data.url+'" onclick='+MM_NDR($data.ndr)+'><span class="kw"><em class="num">'+$data.Rank+'</em>'+$data.disp+'</span>'+
                    '<span class="count '+$data.hot+'">'+$data.hot+'</span>';
                return str;
            }

            __rollMap.cover =  $.$sprite.ADD('div').style({overflow:'hidden',position:'relative'});
            __rollMap.list =  $.$rolllist.FACTORY($.$rolllist.ARG.target(__rollMap.cover).size(__H).vertical()
                .item(function($index){
                    return $.$sprite.ADD('div').style({position:'absolute',width:'100%'}).height(__H);
                })
                .turm(function($index){
                    return __H;
                })
                .dataReset(function($item , $data){
                    $item.attr('innerHTML',getForm($data,'div'));
                }));

            __rollMap.list.data(__rollMap.data);
            __rollMap.flickable = $.$flick.FACTORY($.$flick.ARG.target(__rollMap.list).speed(.5).once().block(true));
            $.$sprite.ADD($.$find('#closed .rankList')).attr('innerHTML' , getSearchList());

        }

        __rollMap.cover.timer(3000,1,_start);
        _setButton();
        __open = true;
    }

    function _pause(){
        if(__open){
            __rollMap.cover.enterframeR(_roll).timerR(_start);
            _removeButton();
            __open = false;
        }
    }

    function _start(){
        var container = $.$sprite.ADD($.$find('.searchCover')).attr('innerHTML',' ');
        __rollMap.cover.append(container);
        __rollMap.cover.enterframe(_roll,3000);
    }

    function _roll(){
        __rollMap.flickable.setJumpMove(-1);
    }

    function _setButton(){
        __itemMap.foldOpenTab = $.$sprite.ADD($.$find('#opened'));
        __itemMap.foldCloseTab = $.$sprite.ADD($.$find('#closed'));
        __itemMap.foldOpen = $.$sprite.ADD($.$find('#opened .btn_open'));
        __itemMap.foldClose = $.$sprite.ADD($.$find('#closed .btn_fold'));
        __itemMap.xClose = $.$sprite.ADD($.$find('#closeBt'));

        stage.addEvent('tabClose' , _close);
        MM_CLICK(__itemMap.foldOpen , _open);
        MM_CLICK(__itemMap.foldClose , _close);
        MM_CLICK(__itemMap.xClose , _close);
    }

    function _close(){
        __itemMap.foldOpenTab.style('display','block');
        __itemMap.foldCloseTab.style('display','none');
        stage.trigger('stageResize');
    }

    function _open(){
        __itemMap.foldOpenTab.style('display','none');
        __itemMap.foldCloseTab.style('display','block');
        stage.trigger('stageResize');
    }

    function _removeButton(){
        for(var i in __itemMap){
            $.$sprite.RELEASE(__itemMap[i]);
            delete __itemMap[i];
        }
        stage.removeEvent('tabClose' , _close);
    }

    stage.addEvent('contentReady',_init);
})(plast);
//////////////////////////////////////////////////////////////////////////////////////////////////////
(function($){ // 실시간이슈키워드
    var __rollMap={},__itemMap={}, __H=37 , __openBt , __open = false;

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        $container.addEvent('recieveData' , _reset);
        __rollMap.time = $data.search.time;
        __rollMap.data =  $.$provider.FACTORY($.$provider.ARG.map($data.issuek.data).loop());
    }

    function _reset($target , $container , $data ){
        $container.index===0 ? _setInfoset() : _pause();
    }

    function _setInfoset(){
        if(!__rollMap.cover){
            function getSearchList(){
                for(var  i = 0 , str = "" ; i < 10 ; ++i){
                    str+=getForm(__rollMap.data.getTotal(i),'li');
                }
                return str;
            }

            function getForm($data , $tag){
                var str= '<'+$tag+' class="rl"><a href="'+$data.url+'" onclick='+MM_NDR($data.ndr)+'><span class="kw"><em class="num rank'+ $data.Rank +'">'+$data.Rank+'</em>'+$data.name+'</span>';
                /*var icons =  ($data.iconType === 'UP') ? 'up' : 'down';

                if ($data.iconType === 'EQUAL') {
                    str += '<span class="count same"></span>';
                } else if ($data.iconType === 'NEW') {
                    str += '<span class="count new"></span>';
                } else {
                    str += '<span class="count '+ icons +'">' + $data.changeRanking +'</span>';
                }*/
                return str;
            }

            __rollMap.cover =  $.$sprite.ADD('div').style({overflow:'hidden',position:'relative'});
            __rollMap.list =  $.$rolllist.FACTORY($.$rolllist.ARG.target(__rollMap.cover).size(__H).vertical()
                .item(function(){
                    return $.$sprite.ADD('div').style({position:'absolute',width:'100%'}).height(__H);
                })
                .turm(function(){
                    return __H;
                })
                .dataReset(function($item , $data){
                    $item.attr('innerHTML',getForm($data,'div'));
                }));

            __rollMap.list.data(__rollMap.data);
            __rollMap.flickable = $.$flick.FACTORY($.$flick.ARG.target(__rollMap.list).speed(.5).once().block(true));
            $.$sprite.ADD($.$find('#iskwClose .rankList')).attr('innerHTML' , getSearchList());

        }

        __rollMap.cover.timer(3000,1,_start);
        _setButton();
        __open = true;
    }

    function _pause(){
        if(__open){
            __rollMap.cover.enterframeR(_roll).timerR(_start);
            _removeButton();
            __open = false;
        }
    }

    function _start(){
        var container = $.$sprite.ADD($.$find('#iskwOpen .iskwCover')).attr('innerHTML',' ');
        __rollMap.cover.append(container);
        __rollMap.cover.enterframe(_roll,3000);
    }

    function _roll(){
        __rollMap.flickable.setJumpMove(-1);
    }

    function _setButton(){
        __itemMap.foldOpenTab = $.$sprite.ADD($.$find('#iskwOpen'));
        __itemMap.foldCloseTab = $.$sprite.ADD($.$find('#iskwClose'));
        __itemMap.foldOpen = $.$sprite.ADD($.$find('.iskw .btn_open'));
        __itemMap.foldClose = $.$sprite.ADD($.$find('.iskw .rankOpen .btn_fold'));
        __itemMap.xClose = $.$sprite.ADD($.$find('.iskw .btn_fold'));
        __itemMap.xLClose = $.$sprite.ADD($.$find('#iskwCloseBt'));

        stage.addEvent('tabClose' , _close);
        MM_CLICK(__itemMap.foldOpen , _open);
        MM_CLICK(__itemMap.foldClose , _close);
        MM_CLICK(__itemMap.xClose , _close);
        MM_CLICK(__itemMap.xLClose , _close);
    }

    function _close(){
        __itemMap.foldOpenTab.style('display','block');
        __itemMap.foldCloseTab.style('display','none');
        stage.trigger('stageResize');
    }

    function _open(){
        __itemMap.foldOpenTab.style('display','none');
        __itemMap.foldCloseTab.style('display','block');
        stage.trigger('stageResize');
    }

    function _removeButton(){
        for(var i in __itemMap){
            $.$sprite.RELEASE(__itemMap[i]);
            delete __itemMap[i];
        }
        stage.removeEvent('tabClose' , _close);
    }

    stage.addEvent('contentReady',_init);
})(plast);
(function($){ // WEB TOON FIELD (2015/12/21일 종료로 인하여 실행 코드 주석)
    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        $container.addEvent('webtoonReset' , _reset);
    }

    function _reset($target , $index){
        var btns = $.$find('.dls li');
        $target = $.$find('ul.bl');

        $.$each($target , function($item , $id){
            $item.style.display = $id === $index ? "block" : "none";
            btns[$id].className = $id === $index ? 'on' : ' ';
        });
    }
    // stage.addEvent('contentReady',_init);
})(plast);


(function($){ // TALK FIELDS;
    var __container,__data,
        __isLoad, __btn,__list,
        __currentId,__value,_startID = 25,
        __listMap = {},__endNum = 0 , __ADD = 20;

    function _init($target , $container , $data){
//		stage.removeEvent('contentReady');
//		$container.addEvent('recieveData' , _reset).addEvent('addPannList' , _listReset);
    }

    function _reset($target , $container , $data){
        if(__endNum===2) return;
        __container = $container;
        if(__container.index===6||__container.index===7)_setAttr(__container.index === 6?'today':'choice');
    }

    function _setAttr($value){
        if(!__listMap[$value]){
            __listMap[$value]={};
            __listMap[$value].currentId = 0;
        }

        __value = $value;
        __listMap[$value].btn = $.$sprite.ADD($.$find(__container,'.btnBox .more'));
        __listMap[$value].list = $.$sprite.ADD($.$find(__container.index===6?'.mt1':'.rank')[1]);
    }

    function _listReset(){
        if(!__listMap[__value].data){
            _setLoadField(__listMap[__value].btn,true);
            stage.trigger(__container.index === 6 ? 'todayTalkLoad' : 'choiceTalkLoad' , _loadComplete);
        }else{
            _listAdd();
        }
    }

    function _loadComplete($data){
        __listMap[__value].data = $data.talk;
        _setLoadField(__listMap[__value].btn,false);
        _listAdd();
    }

    function _listAdd(){
        __listMap[__value].list.attr('innerHTML',__listMap[__value].list.attr('innerHTML') + _getListItem());
        stage.trigger('stageResize');
    }

    function _getListItem(){
        for(var i = __listMap[__value].currentId , str="" , len = __listMap[__value].currentId + __ADD ; i < len ; ++i){
            str += __listMap[__value].data[i];
            if(__listMap[__value].data.length-1===i){
                __listMap[__value].currentId = i;
                _setLoadField(__listMap[__value].btn);
                __endNum++;
                return str;
            }
        }
        __listMap[__value].currentId = len;
        return str;
    }


    function _setLoadField($container , $loaded){
        var str = $loaded ===undefined? ' ' : $loaded ? '<span><img src="https://m1.nateimg.co.kr/n2main/loading.gif" width="25" height="25" alt="로딩중" /></span>' : '<span data-btn="pannMore">더보기</span>';
        $container.attr('innerHTML',str);
    }
    stage.addEvent('contentReady',_init);
})(plast);

(function($){ // type4. 랭킹 up&down
    var _wrapper = null,
        _btn = null,
        selectItem = null;

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        $container.addEvent('recieveData' , _initElement);
    }

    function _initElement($target , $container , $data){
        if($container.index === MM_PAGING.RANK_A){
            if($.$find('.updownWrap').length === 0){
                return;
            }

            _wrapper = $.$sprite.ADD($.$find('.updownWrap'));
            _btn = $.$find('.newsupdown li');

            _reset();
            _initEvent();
        }
    }

    function _reset(){
        selectItem = $.$sprite.ADD(_btn[1]);

        $.$sprite.ADD(_btn[0]).attr('className', '');
        $.$sprite.ADD(_btn[1]).attr('className', 'on');
        $.$sprite.ADD($.$find('#upnews')).style({'display': 'none'});
        $.$sprite.ADD($.$find('#downnews')).style({'display': 'block'});
    }

    function _initEvent(){
        $.$each(_btn, function(key){
            $.$sprite.ADD(key).addEvent('click', _control);
        });
    }

    function _control(e){
        e.preventDefault();

        if(selectItem !== null){
            selectItem.attr('className', '');

            $.$sprite.ADD($.$find('#' + selectItem[0].getAttribute('data-news'))).style({
                'display': 'none'
            });
        }

        this.attr('className', 'on');
        $.$sprite.ADD($.$find('#' + this[0].getAttribute('data-news'))).style({
            'display': 'block'
        });

        selectItem = this;
    }

    stage.addEvent('contentReady',_init);
})(plast);

////////////////////////////////////////////////////////////////////////////////////////////////////
(function($){ // ISSUEUP A FIELD
    var __cols, __dataMap = [], __colLength = 0, __isLoading = false, __isIssueupA = false, __loadingImg;

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        stage.addEvent('contentReady', _setting).addEvent('dataReset', _setting);
        $container.addEvent('recieveData' , _pageCheck);
    }

    function _pageCheck($target , $container , $data){
        __isIssueupA = $container.index === MM_PAGING.ISSUE_A;
        // 페이지 체크가 더 늦게 일어나서 스크롤 이벤트 trigger
        stage.trigger('scroll');
    }

    function _setting($target , $container , $data){
        __cols = $.$find('.issueupCnt');
        if(!__cols.length) return;
        __dataMap = _setData(__cols);

        stage.addEvent('resize', _resizing).addEvent('scroll', _checkScroll);
        stage.trigger('resize');

        if(__loadingImg) return;
        __loadingImg = $.$sprite.ADD('div').append($.$find('.isup')).style({
            background:'url("https://m1.nateimg.co.kr/n3main/loading.gif") no-repeat 50% 50%',
            backgroundSize:'25px 25px', clear:'both',
            width:'100%'
        });
    }

    function _setData($cols){
        var convert = [], output = [];
        $.$each($cols, function($col, $parentPoint){
            var childs = $.$sprite.ADD($col).getChild();
            if(!childs.length) return;
            $.$each(childs, function($item, $childPoint){
                if(typeof convert[$childPoint] !== 'object') convert[$childPoint] = [];
                convert[$childPoint][$parentPoint] = $item;
            });
        });
        $.$each(convert, function($arr){
            output = output.concat($arr);
        });
        return output;
    }

    function _getData(){
        if(__isLoading) return;
        __isLoading = true;
        var url = '//'+MM_URL+'/include4/' + 'issueupData.php';
        $.$dataloader.AJAX($.$dataloader.ARG.url(url).onComplete(function($data){
            $.$each($.$sprite.ADD('div').attr('innerHTML', $data.responseText).getChild(), function($item){
                __dataMap.push($item);
            });
            _update();
            __loadingImg.remove($.$find('.isup'));
        }));
        MM_GLOBAL.ndrclick('MIS08');
    }

    function _update(){
        for(var i=0; i<__dataMap.length; i++){
            var targetCol = __cols[i%__colLength];
            $.$sprite.ADD(__dataMap[i]).append(targetCol);
        }
//        __isLoading = false;
    }

    function _resizing(){
        if(!_checkColLength(window.innerWidth)) return;
        _update();
    }

    function _checkColLength($width){
        var colLength = $width < 640 ? 2 : $width < 768 ? 3 : 4;
        if(__colLength === colLength) return false;
        __colLength = colLength;
        return true;
    }

    function _checkScroll(){
        if(!__isIssueupA) return;
        if(__isLoading) return;
        if(document.body.clientHeight > stage.scrollY() + stage.height + 500 ) return;
        _getData();
    }

    //stage.addEvent('contentReady',_init);
})(plast);

////////////////////////////////////////////////////////////////////////////////////////////////////
(function($){ // ISSUEUP B FIELD
    var _container, _cols = [], _dataMap = [], _sizeMap, _sizeAll, _colLength;

    function _init($target , $container , $data){
//		stage.removeEvent('contentReady');
//		stage.addEvent('contentReady', _setting).addEvent('dataReset', _setting);
    }

    function _setting($target , $container , $data){
        var issueupB = $.$find('.issueup_b'), items = [];
        if(!issueupB.length) return;
        _container = $.$sprite.ADD(issueupB);
        _cols[0] = $.$sprite.ADD(_container.getChild()[0]);
        _cols[1] = $.$sprite.ADD(_container.getChild()[1]);
        _cols[2] = $.$sprite.ADD(_container.getChild()[2]);
        $.$each(_cols, function($it){
            if(!$it.getChild().length) return;
            $.$each($it.getChild(), function($cell){
                items.push($cell);
            });
        });
        _dataMap = _setClone( items );

        _sizeMap = [];
        _sizeAll = 0;
        _colLength = 0;
        $.$each(_dataMap, function($item,$i){
            if($item.className == 'isBox'){
                _sizeMap[$i] = $item.getElementsByTagName('img').length ? 2 : 1;
            }else if($item.className == 'isLink'){
                _sizeMap[$i] = 1;
            }else{
                _sizeMap[$i] = 5;
            }
            _sizeAll += _sizeMap[$i];
        });

        _container.addEvent('issueupBupdate', _update);
        stage.addEvent('stageResize', _resize);
        _resize();
    }

    function _setClone($arr){
        var output = [];
        $.$each($arr, function($item,$i){
            output[$i] = $item;
        });
        return output;
    }

    function _update(){
        var sum = 0, slotNumber = 0;
//        $.$each(_cols, function($item){
//        	$item.style({width:_colLength==3 ? '33.3%' : _colLength==2 ? '50%' : '100%'});
//        });
        $.$each(_dataMap, function($item,$i){
            sum += _sizeMap[$i];
            if( sum > (slotNumber+1)*(_sizeAll/_colLength) ) slotNumber++;
            $.$sprite.ADD($item).append( _cols[slotNumber] );
        });
    }

    function _resize($target , $container , $data){
        var thisCol = window.innerWidth > 734 ? 3 : window.innerWidth < 414 ? 1 : 2;
        if(_colLength == thisCol) return;
        _colLength = thisCol;
        _container.trigger('issueupBupdate');
    }

    stage.addEvent('contentReady',_init);
})(plast);

// type5. 판 2탭 3depth
(function($){
    var rTimeThd = null,
        sectionElement = [];

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');
        $container.addEvent('recieveData', _reset);
    }

    function _reset($target , $container , $data){
        if($container.index === MM_PAGING.PAN_B){
            _setData();
            _initEventListener($container);
        }
    }

    function _setData(){
        sectionElement.push($.$find('.rTimeThd'));
        sectionElement.push($.$find('.rankNav'));
        sectionElement.push($.$find('.rTimeRank'));
        sectionElement.push($.$find('.rTimeBtnBox'));
    }

    function _initEventListener($container){
        MM_CLICK($container,function($e){
            var btn = $e.target.getAttribute('data-btn');

            if(!btn || btn.slice(0, -1) !== 'pantab'){
                return;
            }

            _panPositionCookie(btn);

            _allHide();
            _targetShow(btn);
        });
    }

    function _panPositionCookie(item){
        var expires = new Date();
        expires.setTime(expires.getTime() + (1000*60*60*24*3650));

        $.$cookie.SET('panpos', item.charAt(item.length -1), expires);
    }

    function _allHide(){
        $.$each(sectionElement, function(value1) {
            $.$each(value1, function(value2){
                $.$sprite.ADD(value2).style({
                    display : 'none'
                });
            });
        });
    }

    function _targetShow(item){
        $.$each($.$find('.' + item), function(value){
            $.$sprite.ADD(value).style({
                display : 'block'
            });
        });
    }

    stage.addEvent('contentReady', _init);
})(plast);

(function($){ // type6. issue plus
    var elementData = [],
        matchMediaType1 = window.matchMedia('screen and (min-width: 640px)'),
        matchMediaType2 = window.matchMedia('screen and (min-width: 1024px)'),
        dataMap = {
            line1: [],
            line2: [],
            line3: [],
            tempArr: []
        },
        loadChk = true,
        values;

    function _init($target , $container , $data){
        stage.removeEvent('contentReady');

        $container.addEvent('recieveData', _start);
    }

    function _start($target , $container , $data){
        if($container.index === MM_PAGING.ISSUEPIC){
            var url = '//' + MM_URL + '/include4/jsonIPlus.php';

            if(loadChk){
                $.$dataloader.AJAX($.$dataloader.ARG.url(url).onComplete(function($data){
                    elementData = JSON.parse($data.responseText).issuepick;

                    _setDefault();
                    _initEvent();
                    loadChk = false;
                }));
            } else{
                _setDefault();
                _initEvent();
            }
        } else {
            _removeEvent();
        }
    }

    function _setDefault(){
        if(matchMediaType1.matches){
            if(matchMediaType2.matches){
                _screenType3();
            } else{
                _screenType2();
            }
        } else{
            _screenType1();
        }
    }

    function _initEvent(){
        matchMediaType1.addListener(mmType1Callback);

        matchMediaType2.addListener(mmType2Callback);
    }

    function mmType1Callback(){
        if(matchMediaType1.matches){
            _screenType2();
        } else {
            _screenType1();
        }
    }

    function mmType2Callback(){
        if(matchMediaType2.matches){
            _screenType3();
        } else {
            _screenType2();
        }
    }

    function _removeEvent(){
        matchMediaType1.removeListener(mmType1Callback);
        matchMediaType2.removeListener(mmType2Callback);
    }

    function _screenType1(){
        _arrayInit();

        dataMap.line1 = elementData;

        _insertElement();
    }

    function _screenType2(){
        // 640
        var i = 0;
        _arrayInit();

        for(; i < elementData.length; i++){
            if((i+2)%2 === 0){
                dataMap.line1.push(elementData[i]);
            } else {
                dataMap.line2.push(elementData[i]);
            }
        }

        _insertElement();
    }

    function _screenType3(){
        var i = 0,
            j = 0;
        // 1024
        _arrayInit();

        for(; i < elementData.length; i++){
            if(i % 3 === 0){
                dataMap.line1.push(elementData[i]);
            } else {
                dataMap.tempArr.push(elementData[i]);
            }
        }

        for(; j < dataMap.tempArr.length; j++){
            if((j+2)%2 === 0){
                dataMap.line2.push(dataMap.tempArr[j]);
            } else {
                dataMap.line3.push(dataMap.tempArr[j]);
            }
        }

        _insertElement();
    }

    function _arrayInit(){
        dataMap.line1 = [];
        dataMap.line2 = [];
        dataMap.line3 = [];
        dataMap.tempArr = [];
    }

    function _insertElement(){
        var element = $.$find('.ct'),
            ct1 = '',
            ct2 = '',
            ct3 = '';

        $.$each(element, function(item){
            $.$sprite.ADD(item).attr('innerHTML', '');
        });
        $.$each(dataMap.line1, function(item){
            ct1 += item;
        });

        $.$each(dataMap.line2, function(item){
            ct2 += item;
        });

        $.$each(dataMap.line3, function(item){
            ct3 += item;
        });

        if (element.length > 0) {
            element[0].innerHTML = ct1;
            element[1].innerHTML = ct2;
            element[2].innerHTML = ct3;

            _insertAd();
        }
    }

    function scriptQuery(){
        var script = document.getElementsByTagName('script');
        script = script[script.length-1].src
            .replace(/^[^\?]+\?/, '')
            .replace(/#.+$/, '')
            .split('&')
        var queries = {}
            , query;
        while(script.length){
            query = script.shift().split('=');
            queries[query[0]] = query[1];
        }
        return queries;
    }

    values = scriptQuery();

    function _insertAd(){
        setTimeout(function(){
            $.$sprite.ADD($.$find('.ct #ad_big')).attr('innerHTML','<div><iframe src="//'+MM_URL+'/include4/adscript.html?pos=ad_big&andverck='+values.andverck+'&type='+values.type+'&os='+values.os+'&v=0&ran='+String(Math.random()*1000)+'" scrolling="no" frameborder="0" style="width:100%;" title="광고"></div>');
            $.$sprite.ADD($.$find('.ct #ad_small')).attr('innerHTML','<div><iframe src="//'+MM_URL+'/include4/adscript.html?pos=ad_small&andverck='+values.andverck+'&type='+values.type+'&os='+values.os+'&v=0&ran='+String(Math.random()*1000)+'" scrolling="no" frameborder="0" style="width:100%;" title="광고"></div>');
        }, 300);
    }


    stage.addEvent('contentReady', _init);
})(plast);

(function($){
    var __rollList = {},
        __flag = false;

    function _init($target, $container, $data) {
        stage.removeEvent('contentReady');

        if($data.bigThumb.data.length <= 0) {
            return false;
        }

        $container.addEvent('recieveData', _start);

        __rollList.setData = $data.bigThumb;

        window.addEventListener('touchstart', function(){
            window.mainFlicker.setBlock(false);
        })
    }


    function _start($target, $container, $data) {
        $container.removeEvent('recieveData');

        if($container.index === MM_PAGING.NEWS_A || $container.index === MM_PAGING.NEWS_B || $container.index === MM_PAGING.NEWS_C) {
            if(__rollList.setData.pos === 'NEWS_ALL') {
                __flag = true;
            } else if($container.index === MM_PAGING[__rollList.setData.pos]) {
                __flag = true;
            } else {
                __flag = false;
            }

        } else {
            __flag = false;
        }

        if(__flag) {
            var timer;
            _setItem($container);

            stage.resize(function(){
                if(timer) clearTimeout(timer);

                timer = setTimeout(function(){
                    var docWidth = document.body.clientWidth;
                    var ww = docWidth >= 640 ? docWidth/2 : docWidth;

                    __rollList.wrap.width(ww);
                    __rollList.item.setSize(_getW($container) - 26);
                    __rollList.flickable.setJumpMove(0);
                }, 500);
            })
        }

    }

    function _setItem($container) {
        var docWidth = document.body.clientWidth;
        var ww = docWidth >= 640 ? docWidth/2 : docWidth;

        $.$sprite.ADD($.$find($container, '.isFlick')).attr('style', '');

        if($.$option().mobile === undefined) {
            $.$sprite.ADD($.$find($container, '.isFlick')).style({'margin-left': '13px'});
        }


        __rollList.wrap = $.$sprite.ADD($.$find($container, '.isFlick ul')).attr('innerHTML', '').height(140).attr('className', 'mpt1');
        __rollList.item = $.$rolllist.FACTORY($.$rolllist.ARG
            .target(__rollList.wrap)
            .size(ww - 26)
            .item(function(){
                return $.$sprite.ADD('li').style({'position': 'absolute'}).attr('className', 'pt1');
            })
            .turm(function(){
                return 113
            })
            .onMouseDown(function(){
                window.mainFlicker.setBlock(true);
            })
            .onComplete(function(){
                window.mainFlicker.setBlock(false);
            })
            .dataReset(function($item, $data){
                $item.attr('innerHTML', $data);
            })
        );
        __rollList.wrap.width(ww);

        var data = $.$provider.FACTORY($.$provider.ARG
            .map(__rollList.setData.data)
        );


        __rollList.flickable = $.$flick.FACTORY($.$flick.ARG
            .target(__rollList.item).speed(.5)
        );
        __rollList.item.data(data);
    }

    function _getW($container) {
        //return (__rollList.setData.data.length * 113) - 26;
        return $.$sprite.ADD($.$find($container, '.isFlick ul')).width()-26;
    }

    stage.addEvent('contentReady', _init);
})(plast);


// TAB SHOW/HIDE
(function(){
    function ToggleTab(nodeName) {
        this.node = nodeName;
        this.flag = false;
    }
    ToggleTab.prototype.getException = function() {
        for (var i = 0; i < this.node.length; i++) {
            if (!document.querySelector(this.node[i].handler) || !document.querySelector(this.node[i].target)) {
                return false;
            }
        }
        return true;
    };

    ToggleTab.prototype.setFlag = function(v) {
        this.flag = v
    };

    stage.addEvent('contentReady', function($target, $container){
        stage.removeEvent('contentReady');
        var tvRank = new ToggleTab({
            handler: '.tvranktab a',
            target: '.tvrank'
        });
        var todayTV = new ToggleTab({
            handler: '.pgList a',
            target: '.tpg'
        });

        var toggleEvent = function(inst, _this) {
            var _target = document.querySelectorAll(inst.node.target);
            var _handler = document.querySelectorAll(inst.node.handler);
            for(var i = 0; i < _handler.length; i++) {
                _target[i].style.display = 'none';
                _handler[i].parentElement.className = '';
                if (_handler[i] === _this) {
                    _handler[i].parentElement.className = 'on';
                    _target[i].style.display = 'block';
                }
            }
            inst.setFlag(true);
        };

        $container.addEvent('recieveData', function($target , $container){
            // tv탭 > tv랭킹탭
            if(tvRank.getException() && plast.$cookie.GET('MM_sq') === 'TV' && !tvRank.flag) {
                var handler = document.querySelectorAll(tvRank.node.handler);
                for (var i = 0; i < handler.length; i++) {
                    handler[i].addEventListener('click', function(e){
                        e.preventDefault();
                        toggleEvent(tvRank, this)
                    });
                }
            }
            // tv탭 reset
            if(plast.$cookie.GET('MM_sq') !== 'TV') {
                tvRank.setFlag(false);
            }

            // tv탭 > 오늘의tv
            if(todayTV.getException() && plast.$cookie.GET('MM_sq') === 'TV' && !todayTV.flag) {
                var todayTVclick = document.querySelectorAll(todayTV.node.handler);
                for (var v = 0; v < todayTVclick.length; v++) {
                    todayTVclick[v].addEventListener('click', function(e){
                        e.preventDefault();
                        toggleEvent(todayTV, this)
                    });
                    todayTVclick[v].addEventListener('touchmove', function(){ stage.trigger('BLOCK_ON'); }, { capture: false, passive: false });
                }
            }
            // tv탭 reset
            if(plast.$cookie.GET('MM_sq') !== 'TV') {
                todayTV.setFlag(false);
            }
        });
    });
})();

/**
 * * newsEdge Init
 */
(function($) {


    function _init($target, $container, $data) {
        stage.removeEvent('contentReady');        
        $container.addEvent('recieveData', _start);
    }

    function _start($target , $container , $data ){
        var isCheck = $container[0].querySelector('#bubbleGroupWrap') === null;

        if ($container[0].querySelector('.newsEdge')) {
            $container.index===4 && _todayInit(isCheck);
        }       
        if ($container.index < 3 || $container.index > 5 ) {            
            TODAY.b = false;
        }
        if ($container.index !== 4){
            _todayRemove();
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

    stage.addEvent('contentReady', _init);
})(plast);

