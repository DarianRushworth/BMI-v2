function calculateBMI(weight, height) {
    return weight / (height * height);;
  }
  
function calculateBMR(weight, height, age, gender){
  const heightInCm = height * 100;

    let BMR;

    if (gender === "m") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * age + 50;
    } else {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * age - 150;
      }
    
      return BMR;
    
  }
  function calculateIdealWeight(height){
      return Math.round(22.5*(height*height))
  }
  
  function calculateDailyCalories(dailyExercise, BMR){
let dailyCalories;
      if(dailyExercise==="yes"){
          dailyCalories = BMR*1.6;
      } else {dailyCalories=BMR*1.4}
      return dailyCalories
  }
  
  function calculateDietWeeks(weightToLoseKg){
    return Math.abs(weightToLoseKg/0.5)
}
function calculateDietCalories(weightToLoseKg, caloriesUsedDaily){
    return weightToLoseKg > 0? caloriesUsedDaily-500:caloriesUsedDaily+500
}
  
  
function bmiCalculator() {
  const weightInKg = parseInt(process.argv[2]);
  const heightInM = parseFloat(process.argv[3]);
  const age = parseInt(process.argv[4]);
  const dailyExercise = process.argv[5];
  const gender = process.argv[6];

  function validateNumberOfInputs(argv){
    if(argv.length !== 7){
      console.log(`
      You gave ${argv.length - 2} arguments(s) to the program
    
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      wether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m`)
      process.exit()
    }
  }

  function validateWeightHeightAndAge(weight, height, age){
    if(weight<30 || weight>300){
      console.log(`Please provide a number between 30 and 300 for your weight:
      example: 78.`)
      process.exit()
    }
    if(isNaN(weight) || isNaN(height) || isNaN(age)){
      console.log(`Please make sure you enter your weight, height and age
      with numerical characters, consisting from 0-9.`)
      process.exit()
    }
    if(age<20){
      console.log(`This BMI calculator is designed for people older than 20.`)
    process.exit()
  }
  }

  function validateDailyExercise(exerciseDaily){
    if(exerciseDaily !== "yes" && exerciseDaily !== "no"){
      console.log(`Please enter yes if you do exercise daily, or no if you do not.`)
      process.exit()
    }
  }

  function validateGender(genderSpecific){
    if(genderSpecific !== "m" && genderSpecific !=="f"){
      console.log(`Please enter your gender as follows; female: f, male: m`)
      process.exit()
    }
  }

  function formatOutput(userObject){
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM}m
    weight: ${userObject.weightInKg}kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${idealWeight}kg
    With a normal lifestyle you burn ${dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${idealWeight}kg:

    Eat ${dietCalories} calories a day
    For ${dietWeeks} weeks
    `;
}

  
  
  const BMI = calculateBMI(weightInKg, heightInM);
  const BMR = calculateBMR(weightInKg, heightInM, age, gender)
  const idealWeight = calculateIdealWeight(heightInM)
  const dailyCalories = calculateDailyCalories(dailyExercise, BMR)
  const weightToLoseKg = weightInKg - idealWeight;
  const dietWeeks = calculateDietWeeks(weightToLoseKg)
  const dietCalories = calculateDietCalories(weightToLoseKg, dailyCalories)
  validateNumberOfInputs(process.argv)
  validateWeightHeightAndAge(weightInKg, heightInM, age)
  validateDailyExercise(dailyExercise)
  validateGender(gender)

  const user = {
    weightInKg: weightInKg,
    heightInM: heightInM,
    age: age,
    dailyExercise: dailyExercise,
    gender: gender,
    BMI: BMI,
    idealWeightKg: idealWeight,
    dailyCalories: dailyCalories,
    weightToLoseKg: weightToLoseKg,
    dietWeeks: dietWeeks,
    dietCalories: dietCalories,
  }
  const Output = formatOutput(user)
  
  console.log(Output)
}
  bmiCalculator();
  