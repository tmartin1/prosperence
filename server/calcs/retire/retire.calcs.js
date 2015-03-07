// Calculations for retirement savings projections

'use strict';


module.exports.retirementProjection = function(plan){

  plan.retireProjection = {};

  var result = {};

  result.SandP = [13.80,32.43,15.88,2.07,14.87,27.11,-37.22,5.46,15.74,4.79,10.82,28.72,-22.27,-11.98,-9.11,21.11,28.73,33.67,23.06,38.02,1.19,10.17,7.60,30.95,-3.42,32.00,16.64,5.69,19.06,32.24,5.96,23.13,21.22,-5.33,32.76,18.69, 6.41,-7.78,24.20,38.46,-26.95,-15.03,19.15,14.54, 3.60,-8.63,11.03,24.45,-10.36,12.45,16.59,23.04,-9.20,28.51,-0.74,11.59,43.40,-9.30, 6.38,28.22,55.99,-0.80,18.35,23.10,34.28,15.96, 9.51, 2.56,-12.05,39.35,19.67,23.60,21.74,-9.09,-8.91, 2.98,17.50,-32.11,32.55,54.93,-8.01,56.79,-5.81,-44.20,-22.72,-9.46,47.57,37.10,11.51,25.83,27.10, 5.45,29.07,10.15,-13.95,19.67,18.21,-18.62, 8.12,31.20,-5.39];
  result.married = plan.maritalStatus;  //false;  // get from the plan object
  result.variableReturns = plan.variableReturns;     //false;  // get from plan object, need this added to plan object
  result.switchToLongTerm = false; // we initially deplete the result.nonRetirementAccounts first
  result.run = false;
  result.searchForOptiSave = false;  // turns to true if do not get to the age of theEnd
  result.retireAge = plan.targetRetirementAge;      //plan.targetRetirementAge; // this is the age they wish to retire
  result.currentDate = new Date();
  result.currentAge = result.currentDate.getFullYear() - plan.birthdate.getFullYear();   //45;  // js Date Now - plan.birthdate
  result.monthlyNeeds = plan.targetRetirementIncome; //plan.targetRetirementIncome; // monthly needs
  result.inflation = .03;
  result.nonRetirementAccounts = 0;    //0;  // get from code below
  result.retireAccounts =  0;      //0; // get from code below
  result.maxSaveLongTerm = 24000;  // this is for an indvidual 403b 18500, IRA 5500
  result.curMonthlySavings = 22800; // plan.aggregateMonthlySavings this is in the TODO in plan
  result.needsWithInflation = [];
  result.needsWithInflation[result.currentAge] = result.monthlyNeeds*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));

  for(var i=0; i<plan.variableAssets.length; i++){
    if(!!plan.variableAssets[i].retirementAcct){            //this for loop will result.run with 
      result.nonRetirementAccounts += plan.variableAssets[i].value;    //when hooked up to get result.nonRetirementAccounts
    }                                                     // and result.retireAccounts
    else{
      result.retireAccounts += plan.variableAssets[i].value;
    }
  }
  if(result.married){
      // need to add spouse to
    
    // result.maxSaveLongTerm  * 2
    result.maxSaveLongTerm = result.maxSaveLongTerm * 2;
    // monthly savings  plan.spouseAggregateMonthlySavings + plan.aggregateMonthlySavings
    result.curMonthlySavings += plan.spouseAggregateMonthlySavings;
  }
  result.retireProj = {};
  result.retireProj[result.currentAge] = {};
  result.retireProj[result.currentAge].amountMonthlyNeeds = 0;
  result.retireProj[result.currentAge].interest = 0;
  result.retireProj[result.currentAge].earlyRetireSavings = result.nonRetirementAccounts;
  result.retireProj[result.currentAge].longTermSavings = result.retireAccounts;
  result.retireProj[result.currentAge].totalSavingsAccts = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProj[result.currentAge].interestWorst = 0;
  result.retireProj[result.currentAge].earlyRetireSavingsWorst = result.nonRetirementAccounts;
  result.retireProj[result.currentAge].longTermSavingsWorst = result.retireAccounts;
  result.retireProj[result.currentAge].totalSavingsAcctsWorst = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProj[result.currentAge].interestBest = 0;
  result.retireProj[result.currentAge].earlyRetireSavingsBest = result.nonRetirementAccounts;
  result.retireProj[result.currentAge].longTermSavingsBest = result.retireAccounts;
  result.retireProj[result.currentAge].totalSavingsAcctsBest = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProjTenYear = {};
  result.retireProjTenYear[result.currentAge].interest = 0;
  result.retireProjTenYear[result.currentAge].earlyRetireSavingsTenYear = result.nonRetirementAccounts;
  result.retireProjTenYear[result.currentAge].longTermSavingsTenYear = result.retireAccounts;
  result.retireProjTenYear[result.currentAge].totalSavingsAcctsTenYear = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProjFifteenYear = {};
  result.retireProjFifteenYear[result.currentAge].interest = 0;
  result.retireProjFifteenYear[result.currentAge].earlyRetireSavingsFifteenYear = result.nonRetirementAccounts;
  result.retireProjFifteenYear[result.currentAge].longTermSavingsFifteenYear = result.retireAccounts;
  result.retireProjFifteenYear[result.currentAge].totalSavingsAcctsFifteenYear = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProjTwentyYear = {};
  result.retireProjTwentyYear[result.currentAge].interest = 0;
  result.retireProjTwentyYear[result.currentAge].earlyRetireSavingsTwentyYear = result.nonRetirementAccounts;
  result.retireProjTwentyYear[result.currentAge].longTermSavingsTwentyYear = result.retireAccounts;
  result.retireProjTwentyYear[result.currentAge].totalSavingsAcctsTwentyYear = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProjTwentyFiveYear = {};
  result.retireProjTwentyFiveYear[result.currentAge].interest = 0;
  result.retireProjTwentyFiveYear[result.currentAge].earlyRetireSavingsTwentyFiveYear = result.nonRetirementAccounts;
  result.retireProjTwentyFiveYear[result.currentAge].longTermSavingsTwentyFiveYear = result.retireAccounts;
  result.retireProjTwentyFiveYear[result.currentAge].totalSavingsAcctsTwentyFiveYear = result.nonRetirementAccounts + result.retireAccounts;

  result.retireProjThirtyYear = {};
  result.retireProjThirtyYear[result.currentAge].interest = 0;
  result.retireProjThirtyYear[result.currentAge].earlyRetireSavingsThirtyYear = result.nonRetirementAccounts;
  result.retireProjThirtyYear[result.currentAge].longTermSavingsThirtyYear = result.retireAccounts;
  result.retireProjThirtyYear[result.currentAge].totalSavingsAcctsThirtyYear = result.nonRetirementAccounts + result.retireAccounts;


  //call calculationsHome to get started generating the data
  calculationsHome(result.curMonthlySavings, result.run);
  calcProjectionsForVariedReturns(10, result.curMonthlySavings);
  calcProjectionsForVariedReturns(15, result.curMonthlySavings);
  calcProjectionsForVariedReturns(20, result.curMonthlySavings);
  calcProjectionsForVariedReturns(25, result.curMonthlySavings);
  calcProjectionsForVariedReturns(30, result.curMonthlySavings);
  plan.retireProjection = result;
  return result;
 
  
  function getInterestWorst(i){
    var SandPworst = [-44.2, -37.22, -32.11, -26.95, -22.72, -22.27, -18.62, -15.03, -13.95, -12.05, -11.98, -10.36, -9.46, -9.3, -9.2, -9.11, -9.09, -8.91, -8.63, -8.01, -7.78, -5.81, -5.39, -5.33, -3.42, -0.8, -0.74, 1.19, 2.07, 2.56, 2.98, 3.6, 4.79, 5.45, 5.46, 5.69, 5.96, 6.38, 6.41, 7.6, 8.12, 9.51, 10.15, 10.17, 10.82, 11.03, 11.51, 11.59, 12.45, 13.8, 14.54, 14.87, 15.74, 15.88, 15.96, 16.59, 16.64, 17.5, 18.21, 18.35, 18.69, 19.06, 19.15, 19.67, 19.67, 21.11, 21.22, 21.74, 23.04, 23.06, 23.1, 23.13, 23.6, 24.2, 24.45, 25.83, 27.1, 27.11, 28.22, 28.51, 28.72, 28.73, 29.07, 30.95, 31.2, 32, 32.24, 32.43, 32.55, 32.76, 33.67, 34.28, 37.1, 38.02, 38.46, 39.35, 43.4, 47.57, 54.93, 55.99, 56.79];
    return (SandPworst[i-result.currentAge-1])/100;
  }
  function getInterestBest(i){
    var SandPbest = [56.79, 55.99, 54.93, 47.57, 43.4, 39.35, 38.46, 38.02, 37.1, 34.28, 33.67, 32.76, 32.55, 32.43, 32.24, 32, 31.2, 30.95, 29.07, 28.73, 28.72, 28.51, 28.22, 27.11, 27.1, 25.83, 24.45, 24.2, 23.6, 23.13, 23.1, 23.06, 23.04, 21.74, 21.22, 21.11, 19.67, 19.67, 19.15, 19.06, 18.69, 18.35, 18.21, 17.5, 16.64, 16.59, 15.96, 15.88, 15.74, 14.87, 14.54, 13.8, 12.45, 11.59, 11.51, 11.03, 10.82, 10.17, 10.15, 9.51, 8.12, 7.6, 6.41, 6.38, 5.96, 5.69, 5.46, 5.45, 4.79, 3.6, 2.98, 2.56, 2.07, 1.19, -0.74, -0.8, -3.42, -5.33, -5.39, -5.81, -7.78, -8.01, -8.63, -8.91, -9.09, -9.11, -9.2, -9.3, -9.46, -10.36, -11.98, -12.05, -13.95, -15.03, -18.62, -22.27, -22.72, -26.95, -32.11, -37.22, -44.2];
    return (SandPbest[i-result.currentAge-1])/100;
  }
 
  function calcEarlyRetirementSavings(i, monthlySaveWithInflation, longTermMonthlySave, interest){
      
    var earlySavings = result.retireProj[i-1].earlyRetireSavings * (1+interest);
    if(i<result.retireAge){
      if((monthlySaveWithInflation[i] - longTermMonthlySave[i])<=0){ //chk if have surplus for non-retirement
        return earlySavings;
      }
      else{
        earlySavings += (monthlySaveWithInflation[i] - longTermMonthlySave[i]) * ((1+interest) + (1+(interest * 11/12)) + (1+(interest * 10/12)) + (1+(interest * 9/12)) + (1+(interest * 8/12)) + (1+(interest * 7/12)) + (1+(interest * 6/12)) + (1+(interest * 5/12)) + (1+(interest * 4/12)) + (1+(interest * 3/12)) + (1+(interest * 2/12)) + (1+(interest * 1/12)));
        return earlySavings;
      }
    }
    else{
      if(earlySavings>result.needsWithInflation[i]){
        return earlySavings - result.needsWithInflation[i];
      }
      else if(earlySavings<result.needsWithInflation[i] && earlySavings>0){
        result.needsWithInflation[i] -= earlySavings;
        result.switchToLongTerm = true;
        return 0;
      }
      else{
        return 0;
      }
    }
  }
 
//this function calculates inflation adjusted longTerm savings with 
  function calcLongTermSavings(i, monthlySaveWithInflation, longTermMonthlySave, interest){
      
    var longSavings = result.retireProj[i-1].longTermSavings * (1+interest);
    if(i<result.retireAge){
      if(monthlySaveWithInflation[i]>longTermMonthlySave[i]){
        longSavings += (longTermMonthlySave[i]) * ((1+interest) + (1+(interest * 11/12)) + (1+(interest * 10/12)) + (1+(interest * 9/12)) + (1+(interest * 8/12)) + (1+(interest * 7/12)) + (1+(interest * 6/12)) + (1+(interest * 5/12)) + (1+(interest * 4/12)) + (1+(interest * 3/12)) + (1+(interest * 2/12)) + (1+(interest * 1/12)));
        return longSavings;
      }
      else if(monthlySaveWithInflation[i]>0){
        longSavings += (monthlySaveWithInflation[i]) * ((1+interest) + (1+(interest * 11/12)) + (1+(interest * 10/12)) + (1+(interest * 9/12)) + (1+(interest * 8/12)) + (1+(interest * 7/12)) + (1+(interest * 6/12)) + (1+(interest * 5/12)) + (1+(interest * 4/12)) + (1+(interest * 3/12)) + (1+(interest * 2/12)) + (1+(interest * 1/12)));
        return longSavings;
      }
      else{
      return longSavings;
      }
    }
    else{
      if(result.switchToLongTerm){ //switch to subtracting from long term savings
        longSavings -= result.needsWithInflation[i];
        result.needsWithInflation[i] = (result.needsWithInflation[i-1]/12)*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));
        return longSavings;
      }
      else{
      return longSavings;
      }

    }
  }

  function monteCarloSimulation(returns){
    //here we will generate random returns by bootstraping to preserve kurtosis and skewness of the distribution 
    var index = Math.floor(Math.random()*(returns.length));
    var ret = returns[index];
    returns.splice(index, 1);
    return [ret/100, returns];
  }

  function calcProjectionsForVariedReturns = function(years, currentMonthlySave){
    var rets = [];
    for(var j=0; j<result.SandP.length; j++){
      rets.push(result.SandP[j]);
    }
    var monthlySaveWInflateVaried = [];
    var longTermMonthlySavingsVaried = []; 
    var max = currentMonthlySave>(result.maxSaveLongTerm/12) ? (result.maxSaveLongTerm/12) : currentMonthlySave;
    monthlySaveWInflateVaried[result.currentAge] = [currentMonthlySave];
    longTermMonthlySavingsVaried[result.currentAge] = [max]; 

    var variedInterest = 0;
    for(var i=1; i<=years; i++){
      var retRetsTuple = monteCarloSimulation(rets);
      rets = retRetsTuple[1];
      variedInterest = retRetsTuple[0];
      monthlySaveWInflateVaried[i] = (1+(result.inflation/12))*monthlySaveWInflateVaried[i-1];  // get inflation adjusted monthlySavings
      longTermMonthlySavingsVaried[i] = (1+(result.inflation/12))*longTermMonthlySavingsVaried[i-1];
      if(years === 10){
        result.retireProjTenYear[i].interest = 0;
        result.retireProjTenYear[i].earlyRetireSavingsTenYear = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);;
        result.retireProjTenYear[i].longTermSavingsTenYear = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);
        result.retireProjTenYear[i].totalSavingsAcctsTenYear = result.retireProjTenYear[i].earlyRetireSavings + result.retireProjTenYear[i].longTermSavings;
      }
      else if(years === 15){
        result.retireProjFifteenYear[i].interest = 0;
        result.retireProjFifteenYear[i].earlyRetireSavingsFifteenYear = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);;
        result.retireProjFifteenYear[i].longTermSavingsFifteenYear = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);
        result.retireProjFifteenYear[i].totalSavingsAcctsFifteenYear = result.retireProjFifteenYear[i].earlyRetireSavings + result.retireProjFifteenYear[i].longTermSavings;

      }
      else if(years === 20){
        result.retireProjTwentyYear[i].interest = 0;
        result.retireProjTwentyYear[i].earlyRetireSavingsTwentyYear = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);;
        result.retireProjTwentyYear[i].longTermSavingsTwentyYear = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);
        result.retireProjTwentyYear[i].totalSavingsAcctsTwentyYear = result.retireProjTwentyYear[i].earlyRetireSavings + result.retireProjTwentyYear[i].longTermSavings;

      }
      else if(years === 25){
        result.retireProjTwentyFiveYear[i].interest = 0;
        result.retireProjTwentyFiveYear[i].earlyRetireSavingsTwentyFiveYear = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);;
        result.retireProjTwentyFiveYear[i].longTermSavingsTwentyFiveYear = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);
        result.retireProjTwentyFiveYear[i].totalSavingsAcctsTwentyFiveYear = result.retireProjTwentyFiveYear[i].earlyRetireSavings + result.retireProjTwentyFiveYear[i].longTermSavings;

      }
      else if(years === 30){
        result.retireProjThirtyYear[i].interest = 0;
        result.retireProjThirtyYear[i].earlyRetireSavingsThirtyYear = calcEarlyRetirementSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);;
        result.retireProjThirtyYear[i].longTermSavingsThirtyYear = calcLongTermSavings(i, monthlySaveWInflateVaried, longTermMonthlySavingsVaried, variedInterest);
        result.retireProjThirtyYear[i].totalSavingsAcctsThirtyYear = result.retireProjThirtyYear[i].earlyRetireSavings + result.retireProjThirtyYear[i].longTermSavings;

      }

    }

  }

  //this function is called to find the minimum amount per month in whole dollars the user
  //needs to save to meet their monthly needs in retirement
  //function is only called if the users current monthly savings fails to get them to theEnd with a
  // positive balance
  function calcMonthlySavingsToMeetGoals(monthlySave){

    result.run = true; //now we are past our first result.run, this will take us to a different
                       //set of if else statements in calculationsHome
    var startSaving = 0;
    var callWhile = function(val){ //function calls a while loop that calls calcHome incrementing the
    var curr = val;              //amount saved per month by $1
    var value = -1;
      while(value<0){
        curr+=1;
        value = calculationsHome(curr, result.run); //call calcHome and set to value
   
      }
      return curr;
    };
    startSaving = callWhile(monthlySave);
    return startSaving;    //return the amount to save to meet retirement goals

  }
 
//function generates all the data for the results container 
  function calculationsHome(currentMonthlySave, run){
    var theEnd = 113;  //age the user dies
    var interest = 0;
    var interestWorst = 0;
    var intrestBest = 0;
   // var interestVariable = 0;
    var monthlySaveWInflate = [];
    var longTermMonthlySavings = []; 
    //if the amount currently saved/mo < maximum can save legally in (longTerm accts), then save all current Savings in longTerm 
    var max = currentMonthlySave>(result.maxSaveLongTerm/12) ? (result.maxSaveLongTerm/12) : currentMonthlySave;
    monthlySaveWInflate[result.currentAge] = [currentMonthlySave];
    longTermMonthlySavings[result.currentAge] = [max]; 

    for(var i=result.currentAge+1; i<theEnd+1; i++){  //iterate from now till theEnd of time for user
      result.retireProj[i] = {};  // create new object for age
      interest = 0.7;   // call interest to get this year's return
      interestWorst = getInterestWorst(i);
      intrestBest = getInterestBest(i);
     // interestVariable = monteCarloSimulation();

      result.retireProj[i].interest = interest;
      result.retireProj[i].interestWorst = interestWorst;
      result.retireProj[i].interestBest = interestBest;
      //result.retireProj[i].interestVariable = interestVariable;
      result.needsWithInflation[i] = (result.needsWithInflation[i-1]/12)*((1+result.inflation) + (1+(result.inflation * 11/12)) + (1+(result.inflation * 10/12)) + (1+(result.inflation * 9/12)) + (1+(result.inflation * 8/12)) + (1+(result.inflation * 7/12)) + (1+(result.inflation * 6/12)) + (1+(result.inflation * 5/12)) + (1+(result.inflation * 4/12)) + (1+(result.inflation * 3/12)) + (1+(result.inflation * 2/12)) + (1+(result.inflation * 1/12)));

      if(i>=result.retireAge){  // check if user is retired
        result.retireProj[i].amountMonthlyNeeds = (result.needsWithInflation[i]/12);  // get inflation adjusted monthly needs in retirement
      }
      else{
        result.retireProj[i].amountMonthlyNeeds = 0;
        monthlySaveWInflate[i] = (1+(result.inflation/12))*monthlySaveWInflate[i-1];  // get inflation adjusted monthlySavings
        longTermMonthlySavings[i] = (1+(result.inflation/12))*longTermMonthlySavings[i-1]; // get inflastion adjusted longTermMonthlySavings
      }
      //call appropriate functions to calc items in retireProj
      result.retireProj[i].earlyRetireSavings = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interest);
      result.retireProj[i].longTermSavings = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interest);
      result.retireProj[i].totalSavingsAccts = result.retireProj[i].earlyRetireSavings + result.retireProj[i].longTermSavings;

      result.retireProj[i].earlyRetireSavingsWorst = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestWorst);
      result.retireProj[i].longTermSavingsWorst = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestWorst);
      result.retireProj[i].totalSavingsAcctsWorst = result.retireProj[i].earlyRetireSavingsWorst + result.retireProj[i].longTermSavingsWorst;

      result.retireProj[i].earlyRetireSavingsBest = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestBest);
      result.retireProj[i].longTermSavingsBest = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestBest);
      result.retireProj[i].totalSavingsAcctsBest = result.retireProj[i].earlyRetireSavingsBest + result.retireProj[i].longTermSavingsBest;

      // result.retireProj[i].earlyRetireSavingsVariable = calcEarlyRetirementSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestVariable);
      // result.retireProj[i].longTermSavingsVariable = calcLongTermSavings(i, monthlySaveWInflate, longTermMonthlySavings, interestVariable);
      // result.retireProj[i].totalSavingsAcctsVariable = result.retireProj[i].earlyRetireSavingsVariable + result.retireProj[i].longTermSavingsVariable;

      if(!run){ // if this is the first time calculationsHome has been called 
        if(i === theEnd && result.retireProj[i].totalSavingsAccts > 0){
          result.endSavings = [theEnd, result.retireProj[i].totalSavingsAccts, currentMonthlySave]; // [theEndAge, savingsAccountsAmt, monthlySaving ]
        }
        else if(i<theEnd && i>result.retireAge && result.retireProj[i].totalSavingsAccts < result.needsWithInflation[i]){
          result.switchToLongTerm = false;  //stop taking monthlyNeeds from longTermSavings, because monthlySavings are insufficient and we are going to recalculate
          result.searchForOptiSave = true; //flag to call calcMonthlySavingsToMeetGoals
          break;
        }
      }

      else{ //if calculationsHome has been called > 1, this else part is used during the calcMonthlySavingsToMeetGoals calls
        if(i >= theEnd && result.retireProj[i].totalSavingsAccts > 0){
          return result.retireProj[i].totalSavingsAccts;  
        } 
        else if(i<theEnd && i>result.retireAge && result.retireProj[i].totalSavingsAccts < result.needsWithInflation[i]){
          result.switchToLongTerm = false; //stop taking monthlyNeeds from longTermSavings, because monthlySavings are insufficient and we are going to recalculate
          return  -1; //return -1 to keep calcMonthlySavingsToMeetGoals monthlySavings increasing
        }
      }
   
    }

    if(result.searchForOptiSave){
      var suggestMonthlySave = calcMonthlySavingsToMeetGoals(currentMonthlySave);
      result.endSavings = [theEnd, result.retireProj[theEnd].totalSavingsAccts, suggestMonthlySave]; //update results
    }
 
  }
 
 
 
 };
