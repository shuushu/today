window.isException = (function OSVersion() {
  var userAgent = navigator.userAgent;
  var browserInfo = {};
  var browserMatch = {
    IE: /(?:MSIE |Trident\/.*; rv:)(\d+)/,
    IOS: /(?:iPhone|iPad).*(OS (\d+\_*){2,3})/,
    AOS: /(?:Android )(\d+\.?){2,3}/,
  };
  var exception = {
    IE: ['6', '7', '8', '9'],
    IOS: [], // iPhone 5/SE : 10_3_1 on Chrome Devtools
    AOS: [], // Moto G4 : '6.0.1' on Chrome Devtools
  };
  var isException = null;

  for (browser in browserMatch) {
    var match = userAgent.match(browserMatch[browser]);

    if (match !== null) {
      var name = match[0].split(' ')[0];

      switch(true) {
        case (name === 'Trident/7.0;' || name === 'MSIE'):
          browserInfo.name = 'IE';
          browserInfo.Version = match[1];
          break;
        case name === 'Android' :
          browserInfo.name = 'AOS';
          browserInfo.Version = match[0].split(' ')[1];
          break;
        case (name === 'iPhone;' || name === 'iPad;') :
          browserInfo.name = 'IOS';
          browserInfo.Version = match[1].split(' ')[1];
          break;
      }

      for (target in exception) {
        if (browserInfo.name === target) isException = exception[target].every(function(exc) { return exc !== browserInfo.Version });
      }

      if (!isException && isException !== null) OSUpdateInfo();
    }
  }

  return !isException;

  function OSUpdateInfo() {
    var contents = document.getElementById('contents');
    contents.setAttribute('class', 'unsupported-browser');
    contents.innerHTML = '';
  
    var browserInfo = document.createElement('div');
    browserInfo.setAttribute('class', 'browserInfo');
  
    var browserInfoInner = document.createElement('div');
    browserInfoInner.setAttribute('class', 'inner');
  
    var title = document.createElement('h2');
    title.innerText = '지원되지 않는 브라우저입니다.'
  
    var context = document.createElement('p');
    context.innerText = '최신 버전으로 업데이트 해주세요';
  
    browserInfoInner.appendChild(title);
    browserInfoInner.appendChild(context);
    browserInfo.appendChild(browserInfoInner);
  
    contents.appendChild(browserInfo);
    contents.removeAttribute('class');
  }
})();
