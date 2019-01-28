export function onInitialClientRender() {
  // see https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
  // https://www.html5rocks.com/en/tutorials/speed/script-loading/
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
      var flowchartElements = document.getElementsByClassName('flowchart');
      var flowchartElementsCount = flowchartElements.length;
      for (var i = 0; i < flowchartElementsCount; i++) {
        // https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
        // use childNodes[0].nodeValue instead of text() of jquery
        try {
          var diagram = window.flowchart.parse(
            flowchartElements[i].childNodes[0].nodeValue
          );
          flowchartElements[i].childNodes[0].nodeValue = '';
          diagram.drawSVG(flowchartElements[i]);
        } catch (e) {
          console.error(e, e.stack);
        }
      }
    });
  });
}
