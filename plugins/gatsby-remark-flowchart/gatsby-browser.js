export function onInitialClientRender() {
  var importScript = (function(oHead) {
    function loadError(oError) {
      throw new URIError(
        'The script ' + oError.target.src + ' is not accessible.'
      );
    }
    return function(sSrc, fOnload) {
      var oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      oScript.onerror = loadError;
      if (fOnload) {
        oScript.onload = fOnload;
      }
      oHead.appendChild(oScript);
      oScript.src = sSrc;
    };
  })(document.head || document.getElementsByTagName('head')[0]);

  importScript('/vendor/raphael/raphael.min.js', function() {
    importScript('/vendor/flowchart/flowchart.min.js', function() {
      var flowchartElements = document.getElementsByClassName('coc-flowchart');
      var flowchartElementsCount = flowchartElements.length;
      var elements = new Array();
      for (var i = 0; i < flowchartElementsCount; i++) {
        elements.push(flowchartElements[i]);
      }
      for (i = 0; i < flowchartElementsCount; i++) {
        // https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
        // use childNodes[0].nodeValue instead of text() of jquery
        var e = elements[i];
        try {
          var diagram = window.flowchart.parse(e.childNodes[0].nodeValue);
          e.childNodes[0].nodeValue = '';
          diagram.drawSVG(e);
        } catch (ex) {
          e.childNodes[0].nodeValue = ex;
        }
      }
    });
  });
}
