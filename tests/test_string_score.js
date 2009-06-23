$(document).ready(function(){
  module('String.score');
  
  test('Exact match', function(){
    expect(1);
    equals('Hello World'.score('Hello World'), 1.0);
  });
  
  test('Not matchhing', function(){
    expect(2);
    equals("hello world".score("hellx"), 0, 'non-existint charactor in match should return 0');
    equals("hello world".score("hello_world"),0, 'non-existint charactor in match should return 0');
  });
  
  test('Match must be sequential', function(){
    ok(!'Hello World'.score('WH'));
    ok('Hello World'.score('HW'));
  });
  
  test('Same case should match better then wrong case', function(){
    ok('Hello World'.score('hello')<'Hello World'.score('Hello'));
  });
  
  test('Closer matches should have higher scores', function(){
    ok('Hello World'.score('H')<'Hello World'.score('He'));
    ok('Hello World'.score('H')<'Hello World'.score('He'));
  });
  
  test('should match first matchable letter regardless of case', function(){
    ok("Hillsdale Michigan".score("himi")>0);
  });
  
  module('Advanced Scoreing Methods');
  test('consecutive letter bonus', function(){
    expect(1);
    ok('Hello World'.score('Hel') > 'Hello World'.score('Hld'));
  });
  
  test('Acronym bonus', function(){
    expect(5);
    ok('Hello World'.score('HW') > 'Hello World'.score('Ho'), '"HW" should score higher with "Hello World" then Ho');
    ok('yet another Hello World'.score('yaHW') > 'Hello World'.score('yet another'));
    ok("Hillsdale Michigan".score("HiMi") > "Hillsdale Michigan".score("Hil"), '"HiMi" should match "Hillsdale Michigan" higher then "Hil"');
    ok("Hillsdale Michigan".score("HiMi") > "Hillsdale Michigan".score("illsda"));
    ok("Hillsdale Michigan".score("HiMi") < "Hillsdale Michigan".score("hills")); // but not higher then matching start of word
  });
  
  test('Beginning of string bonus', function(){
    expect(1);
    ok("Hillsdale".score("hi") > "Chippewa".score("hi"));
  });
  
  test('proper string weights', function(){
    ok("Research Resources North".score('res') > "Mary Conces".score('res'), 'res matches "Mary Conces" better then "Research Resources North"');
    
    ok("Research Resources North".score('res') > "Bonnie Strathern - Southwest Michigan Title Search".score('res'));
  });
  
  test('Start of String bonus', function(){
    ok("Mary Large".score('mar') > "Large Mary".score('mar'));
    ok("Silly Mary Large".score('mar') === "Silly Large Mary".score('mar')); // ensure start of string bonus only on start of string
  });
  
  // test('odd results', function(){
  // 
  //   ok("LandAmerica Lawyers Title-Traverce City".score('LandAmerica Lawyers'));
  // });
  
  
  module('Benchmark');
      test('Expand to see time to score', function(){
        var iterations = 4000;
      
        var start1 = new Date().valueOf();
        for(i=iterations;i>0;i--){ "hello world".score("h"); }
        var end1 = new Date().valueOf();
        var t1=end1-start1;
        ok(true, t1 + ' miliseconds to do '+iterations+' iterations of "hello world".score("h")');
        
        var start2 = new Date().valueOf();
        for(i=iterations;i>0;i--){ "hello world".score("hw"); }
        var end2 = new Date().valueOf();
        var t2=end2-start2;
        ok(true, t2 + ' miliseconds to do '+iterations+' iterations of "hello world".score("hw")');
      
        var start3 = new Date().valueOf();
        for(i=iterations;i>0;i--){ "hello world".score("hello world"); }
        var end3 = new Date().valueOf();
        var t3=end3-start3;
        ok(true, t3 + ' miliseconds to do '+iterations+' iterations of "hello world".score("hello world")');
        
        var start4 = new Date().valueOf();
        for(i=iterations;i>0;i--){ "hello any world that will listen".score("hlo wrdthlstn"); }
        var end4 = new Date().valueOf();
        var t4=end4-start4;
        ok(true, t4 + ' miliseconds to do '+iterations+' iterations of "hello any world that will listen".score("hlo wrdthlstn")');
      
        var start5 = new Date().valueOf();
        for(i=iterations;i>0;i--){ "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".score("Lorem i dor coecadipg et, Duis aute irure dole nulla. qui ofa mot am l"); }
        var end5 = new Date().valueOf();
        var t5=end5-start5;
        ok(true, t5 + ' miliseconds to do '+iterations+' iterations of 446 character string scoring a 70 character match');
        
        ok(true, 'score (smaller is faster): '+ (t1+t2+t3+t4+t5)/5);
      });
});