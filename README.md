# Theory of Computation
Codes that perform various tasks I learnt in theory of computation course

## Grammar class
This class can be used to create a grammar object.
### Constructor
```js
constructor(variables, rules, startVariable) {
    this.variables = variables;
    this.rules = rules;
    this.startVariable = startVariable;
  }
```
- `variables` -> Array of characters that are variables
- `rules` -> Object of the form `{variable: "variables_and_terminals"}`
- `startVariable` -> The variable that is to be used to generate strings

### Methods
#### checkForVariables
```js
checkForVariables(str)
```
- `str` -> The string to check variables in
- Returns `true` if the string contains a variable else returns `false`

#### getVariables
```js
getVariables(str)
```
- `str` -> The string to get variables from
- Returns a list of all variables the string contains

#### canDecrease
```js
canDecrease(arr)
```
- `arr` -> An array containing variables 
- Returns `true` if any of the variables can be reduced to an empty string else returns `false`

---
## Language class
This class is used to generate a language object
### Constructor
```js
constructor(grammar) {
    this.grammar = grammar;
  }
```
- `grammar` -> A grammar object

### Methods
#### generateStringbyLength
```js
generateStringbyLength(n, currString = null)
```
- `n` -> The length of the string
- Prints out the strings that satisfy the conditions

## Jdoodle link
https://jdoodle.com/ia/v7d
