export default () => {
  var userAgent = window.navigator.userAgent;
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
  var check = null;

  for (window.browser in browserMatch) {
    var match = userAgent.match(browserMatch[browser]);

    if (match !== null) {
      var name = match[0].split(' ')[0];

      switch (true) {
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
        if (browserInfo.name === target) check = exception[target].every(function (exc) {
          return exc !== browserInfo.Version
        });
      }
    }
  }

  return check;
}

