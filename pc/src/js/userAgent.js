(function OSVersion() {
  var userAgent = navigator.userAgent;
  
  var browserInfo = {};
  var browserMatch = {
    IE: /(?:MSIE |Trident\/.*; rv:)(\d+)/,
    IOS: /(?:iPhone|iPad).*(OS (\d+\_*){2,3})/,
    AOS: /(?:Android )(\d+\.?){2,3}/,
  };
  
  var exception = {
    IE: ['6', '7', '8', '9'],
    IOS: [''],
    AOS: [''],
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

      if (!isException && isException !== null) return OSUpdateInfo();
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
    title.innerText = '�������� �ʴ� �������� �����ϼ̽��ϴ�.'

    var context = document.createElement('p');
    context.innerText = 'Internet Explorer 10 �̻����� ������Ʈ ���ֽðų�, �ֽ� ������ Chrome�� Firefox���� ���������� �̿��� �����մϴ�.';
    
    var subContext = document.createElement('span');
    subContext.innerText = 'PCȯ�濡 ���� OS (� ü��)�� ������ ������Ʈ�� �Ұ����� ���, ����� �ܸ����� ���񽺸� �̿��� �ֽñ� �ٶ��ϴ�.'

    var links = document.createElement('div');
    var linkForIE = document.createElement('a');
    linkForIE.setAttribute('href', 'https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads');
    linkForIE.setAttribute('target', '_blank');
    linkForIE.setAttribute('title', '��â ����');
    linkForIE.setAttribute('role', 'noopener');
    linkForIE.innerText = 'Internet Explorer �ٿ�ε� ����';

    var linkForChrome = document.createElement('a');
    linkForChrome.setAttribute('href', 'https://www.google.com/intl/ko/chrome/')
    linkForChrome.setAttribute('target', '_blank');
    linkForChrome.setAttribute('title', '��â ����');
    linkForChrome.setAttribute('role', 'noopener');
    linkForChrome.innerText = 'Chrome �� ������';

    var linkForFF = document.createElement('a')
    linkForFF.setAttribute('href', 'https://www.mozilla.org/ko/firefox/new/')
    linkForFF.setAttribute('target', '_blank');
    linkForFF.setAttribute('title', '��â ����');
    linkForFF.setAttribute('role', 'noopener');
    linkForFF.innerText = 'Firefox �� ������';

    context.appendChild(subContext);

    links.appendChild(linkForIE);
    links.appendChild(linkForChrome);
    links.appendChild(linkForFF);

    browserInfoInner.appendChild(title);
    browserInfoInner.appendChild(context);
    browserInfoInner.appendChild(links);

    browserInfo.appendChild(browserInfoInner);
    
    contents.appendChild(browserInfo);
    contents.removeAttribute('class');
  }
})();
