import { utils } from "../../../components/utils";
import Calendar from "../../../components/Calendar";
import Bubble from "../../../components/Bubble";
import Progress from "../../../components/Progress";
import TMP_PROGRESS from "./TMP_PROGRESS";

window.bb = new Bubble();
window.cc = new Calendar();
window.pp = new Progress('.pp');

/**
 * 달력 렌더러, 이전/오늘/다음 이벤트 발생시 렌더러 업데이트 됨
 */
cc.render(function() {
  let { service_dtm, min_dtm, server_dtm, update_dtm } = this.data.time;

  service_dtm = service_dtm.split(' ')[0];
  min_dtm = min_dtm.split(' ')[0];
  server_dtm = server_dtm.split(' ')[0];

  // 초기화
  $('.calendar button').removeAttr('style');
  $('.update-dtm').remove();

  // 조건 확인, 버튼 노출 유/무
  if (service_dtm >= server_dtm) {
    document.querySelector('.calendar .next').style.display = 'none';
    // 최신 키워드 기준 가이드문구
    $('.calendar').append(`<div class="update-dtm">${moment(update_dtm).format('YYYY.MM.DD h:mm:ss')}기준</div>`);
  } else if(service_dtm <= min_dtm) {
    document.querySelector('.calendar .prev').style.display = 'none';
  }
  // 그리기
  document.querySelector('.calendar .today').innerHTML = moment(service_dtm).format('YYYY.MM.DD'); // 2020.08.08 형식으로 변환
  // 버블 인스턴스
  bb.render();
  // 프로그래스 인스턴스
  pp.render(); 
});


// keyword update callback binding
bb.render(function() {
  $('#test .keyword').empty();
  for(let [key, value] of Object.entries(this.data.keywordList)) {
    let { keyword_service } = value;
    $('#test .keyword').append(`<div  data-eq="sq${key}">${keyword_service}</div>`)
  }
});

/**
 * 프로그래스 렌더링 및 이벤트 바인딩
 */
pp.render(function() {
  document.querySelector(this.target).innerHTML = TMP_PROGRESS;

  let { percent, limit_max, limit_min } = this.timestamp,
      { service_dtm, server_dtm } = this.data.time,
      onThrowUpdate, onDrag, onDragEnd; // 드래그이벤트


  gsap.set(`${this.target} .pathFront`, { clearProps: 'all' });
  this.timeline = gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });
  this.timeline
      // 프로그래스 선택영역 x값
      .from(`${this.target} .pathFront`, {drawSVG: '0%'})
      .to(`${this.target} .timeGroup`, {
        scale: 1,
        motionPath: { path: `${this.target} .pathFront` }
      }, 0)
      .progress(percent);

  // 툴팁타임 업데이트
  this._updateTooltipTime();
  d3.select('.pathBack').attr('d',`M0 24 l ${moment(server_dtm).format('YYYY-MM-DD')  === moment(service_dtm).format('YYYY-MM-DD') ? this.width*limit_max : this.width} 0`);

  // 드래그 이벤트 바인딩
  if(this.drag !== null) {
    console.log('drag kill')
    this.drag[0].kill();
  }

  // 드래그이벤트 정의
  onThrowUpdate = onDrag = () => {
    let c = Math.abs(this.drag[0].x / this.width); // c === this.timestamp.percent;
    this.current = c > 1 ? 1 : c;
    this.timeline.progress(c);
    // 툴팁타임 업데이트
    this._updateTooltipTime();
    // AM PM check
    if(moment(this.covert).format('HH:mm') !== '00:00') {
      this.AMPM = moment(this.covert).format('A')
    }
  };
  onDragEnd = () => {
    // 버블 업데이트...
    let { service_dtm, server_dtm } = this.data.time,
        t, d = moment(service_dtm).format('YYYY-MM-DD');
    /**
     * data > 프로그래스 업데이트
     * 프로그래스 범위가  00:00 ~ 다음날 00:00 까지 지정할 수 있으므로 
     * 다음날  00:00 드래그 후 달력 > 다음 날짜 로 업데이트시 하루 더 지난 상태로 업데이트 된다
     * 따라서 업데이트 날짜가 서버시간을 초과를 막는다.
     */  
    t = moment(this.covert).format('YYYY-MM-DD HH:mm:ss').split(' ').pop();
    if(t === '00:00:00' && this.AMPM === 'PM') {
      d = moment(server_dtm).format('YYYY-MM-DD')
    }
    this.data.time.progress_dtm = `${d} ${t}`;
    // 키워드 업데이트
    bb.update(this.data.time.progress_dtm);
  }

  this.drag = Draggable.create('.timeGroup', {
    bounds: {
      minX: limit_min ? this.width * (limit_min + .0001) : 0, // * .0001 단위 필수
      maxX: limit_max ? this.width * (limit_max + .0001) : 1, // * .0001 단위 필수
      minY: 24,
      maxY: 24,
    },
    type: 'x',
    lockAxis:true,
    throwProps: false,
    liveSnap: true,
    snap: {
      x: (x) => {
        let cc = (this.width / (24 - .0001))/6;
        return Math.floor(x / (cc)) * cc; // * .0001 단위 필수
      }
    },
    onThrowUpdate,
    onDrag,
    onDragEnd,
    onDragStart() {
      if(typeof ndrclick === 'function') {
        ndrclick('TOT00');
      }
    }
  })
});