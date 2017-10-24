
  $(document).ready(function() {
    
    var defaultVal = 0;
    var entry = '';
    var current = 0;
    var answer = '';

    $('button').on("click", function() {
      entry += $(this).attr("value");
      entry = entry.slice(0, 14); // caps digits
      
      if(entry.includes("//") || entry.includes("**") || entry.includes("--") || entry.includes("++") || entry.includes("==") || entry.includes("..") || entry.includes("%%") ) {
        
        opCheck();
      }
      
      showCurrent();
      // console.log("entry: " + entry);   
    });
    
    $('#equals').on("click", function() {      
      equals();
      entry = answer;
    });

    $('#ac').on("click", function() { 
      allClear();
    });

    $('#c').on("click", function() {
      clearButton(); 
    })

    $('#solar').on("click", function() {
      $('.mem').html("solar powered");
    })

    $('#percent').on("click", function() {
      getPercent();  
    })

    function equals() { 
      answer = current;
      // console.log(answer);
      $('.mem').html(answer);
    }

    function showCurrent() {
      current = eval(entry);
      var rounded = Math.round(current * 100) / 100;
    
      $('.results').html(rounded);
      $('.mem').html(entry);
    }

    function allClear() {
      entry = '';    
      $('.results').html(defaultVal);
      $('.mem').html(defaultVal);
    }

    function clearButton() {
      var newEntry = entry.substr(0, entry.length-1);
      //console.log(newEntry);
      entry = newEntry;
      // console.log(entry);
      $('.mem').html(entry);

      if(entry.length == 0) {
        $('.results').html(defaultVal);
        $('.mem').html(defaultVal);
      }
    }

    function opCheck() { 
      var filter = entry.replace(/[^A-Za-z0-9_]/, '');
      //console.log(filter);
       entry = filter;
      // console.log(entry);
       $('.mem').html(entry);  
    }

    function getPercent() {
      var convertToDecimal = entry.substr(-2);
        if(convertToDecimal < 10) {
          convertToDecimal = '0.0' + convertToDecimal;
        }
        else {
          convertToDecimal = '0.' + convertToDecimal;
        }
      
      // console.log(convertToDecimal);

      var edit = entry.substr(0, entry.length-2);
      // console.log("edit: " + edit);

      if(edit.includes('*')) {
        var updateMath = edit + convertToDecimal;
        entry = updateMath;
        // console.log(entry);
      }
      else if(edit.includes('+') || edit.includes('-')) {
        var multFirst = entry.substr(0, entry.length-3);
        updateMath = multFirst * convertToDecimal;
        $('.results').html(updateMath);
        updateMath = edit + updateMath;
        // console.log("update after calc: " + updateMath);
        entry = updateMath;
        // console.log(entry);
      }
      else {
        $('.results').html('error');
      }  
    }

  }) // end of doc