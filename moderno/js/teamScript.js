

var projectName = "";
var longDescription = "";
var shortDescription = "";
var foundationDate = "";
var audience = "";
var teamSize = -1;
var averageExperience = -1;
var currentFunding = -1;
var experience;
var funding;

function getInput(){
   projectName = document.getElementById("name").value;
   longDescription = document.getElementById("decrLong").value;
   shortDescription = document.getElementById("exSummary").value;
   foundationDate = document.getElementById("dateStart").value;
    //timeSinceStart - number of years since founding
   //audience = document.getElementById("audience").value;
    audience = 1;
    timeSinceStart = 2;
   experience =  document.getElementById("experience").value;
   funding = document.getElementById("funding").value;
    employees = document.getElementById("employees").value;
    var neuralArguments = [ parseInt(experience), parseInt(funding), parseInt(timeSinceStart), parseInt(audience), 
                            parseInt(funding), parseInt(employees)];
    document.getElementById("result").innerHTML = "The predicted value of your company is:  "+parseInt(linearRegression(neuralArguments))+" Pounds";
}
var e = 2.7182;
function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}
transpose = function(a) {

  // Calculate the width and height of the Array
  var w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
};
function nonlin(x)
{
		return 1/(1+Math.pow(2.7182,-x));
}

function linearRegression(x)
{
    var syn0 = [ [1.262413, 3.687629, -2.170797,-2.189347,-1.020274],
              [-4.617801,-1.396284,1.395270,0.601403,0.044056 ],
              [-0.716607,-7.350907,-2.331377,0.331827,-0.575265],
              [3.629483,1.179338,-0.314919,-2.860051,-0.386419],
              [-7.084517,-1.530187,-2.814371,-0.483508,0.436363],
              [0.793167,-0.503950,0.245186,-1.884210,0.859504]];
    var syn1 = [-6.96261809543,6.23395884106,-4.8964163296,-2.36308282318,0.731166116656];
    var pow10 = [1,6,1,1,6,2];
    //var x = [4,60000,1,0,98000,4];
    for(i=0;i<x.length;i++)
      x[i] = parseFloat(x[i]/Math.pow(10,pow10[i]));
    var l0,l1,l2;
    l0 = x;
    console.log(l0,syn0);
    l1 = math.multiply(l0,syn0);
    for(i=0;i<l1.length;i++)
      l1[i]=nonlin(l1[i]);
    console.log(l1,math.transpose(syn1));
    l2 = math.dot(l1,syn1);
    l2 = nonlin(l2)*1000000;
    //document.write(nonlin(l2)*1000);
    return l2;
}

function getROI(initial,invested,years){
    rate = (Math.random()*5 + 3)/100+1;
    return (initial+invested)*Math.pow(rate,years);
}

function updateEvaluation(){
    var years = document.getElementById("timeInv").value;
    var investment = document.getElementById("moneyInv").value;
    
    document.getElementById("currentValue").innerHTML = investment;
    document.getElementById("currentYears").innerHTML = years;
    document.getElementById("ROIresult").innerHTML = "Predicted capital of the company: "+Math.round(parseInt(getROI(10000, document.getElementById("currentValue").innerHTML, years))/1000)*1000+" Pounds";
    
}
