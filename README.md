# PARKING-COST-CALCULATOR
Javascript tests build for parking cost calculator using puppeteer and mocha with chai

## Enviorenment setup to run the test
``` 
git clone https://github.com/dinukacgx/PARKING-COST-CALCULATOR.git
``` 
Then to go inside ```PARKING-COST-CALCULATOR``` folder execute following command
``` 
cd PARKING-COST-CALCULATOR
``` 
Install npm dependancies with follwoing command
``` 
npm install
``` 
Now run the test
``` 
npm test
```
By default all the test will be executed. If wants to run specific test go to ```package.json```
and replace the ```**``` with the test file.
``` 
"scripts": {
    "test": "..... specs/**.js --timeout 20000"
  }
```
