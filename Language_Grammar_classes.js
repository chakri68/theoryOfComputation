/**
 * @param  {Set<string>} variables
 * @param  {{rule: Set<string>}} rules
 * @param  {string} startVariable
 */
class Grammar {
  constructor(variables, rules, startVariable) {
    this.variables = variables;
    this.rules = rules;
    this.startVariable = startVariable;
  }
  // contains(variable){
  //     return this.variables.includes(variable)
  // }
  checkForVariables(str) {
    let variables = [...this.variables];
    for (let v of variables) {
      if (str.includes(v)) {
        return true;
      }
    }
    return false;
  }
  getVariables(str) {
    let variables = [...this.variables];
    let toRet = [];
    for (let v of variables) {
      if (str.includes(v)) {
        toRet.push(v);
      }
    }
    return toRet;
  }
  canDecrease(arr) {
    if (arr.length == 0) return false;
    for (let i of arr) {
      if (this.rules[i].includes("")) return true;
      else {
        let a = Array.from(this.rules[i]);
        for (let str of a) {
          if (
            this.canDecrease(this.getVariables(str).filter((val) => val !== i))
          )
            return true;
        }
      }
    }
    return false;
  }
}

class Language {
  /**
   * @param  {Grammar} grammar
   */
  constructor(grammar) {
    this.grammar = grammar;
  }
  /**
   * @param  {Number} n
   */
  generateStringsbyLength(n) {
    let resSet = new Set();
    this._generateStringbyLength(n, null, resSet);
    return Array.from(resSet);
  }

  /**
   * @param  {Number} n The size of the string
   */
  _generateStringbyLength(n, currString = null, retSet = new Set()) {
    let currS;
    if (currString != null) {
      currS = `${currString}`;
    } else currS = null;
    if (currS == null) {
      Array.from(this.grammar.rules[this.grammar.startVariable]).map((str) => {
        this._generateStringbyLength(n, str, retSet);
      });
    } else if (
      currS.length > n + 1 ||
      (currS.length == n + 1 &&
        !this.grammar.canDecrease(this.grammar.getVariables(currS)))
    )
      return;
    else if (currS.length == n && !this.grammar.checkForVariables(currS)) {
      retSet.add(currS);
      return;
    } else {
      for (let i = 0; i < currS.length; i++) {
        if (this.grammar.variables.includes(currS[i])) {
          Array.from(this.grammar.rules[currS[i]]).map((replacement) => {
            // console.log({
            //   replacement,
            //   currS,
            //   replaced: currS.replace(currS[i], replacement),
            // });
            this._generateStringbyLength(
              n,
              currS.replace(currS[i], replacement),
              retSet
            );
          });
        }
      }
    }
  }
}

// The code to demonstrate the class and function
// Variables V = {S, R}
// Corresponds to S -> 0S1 | R
//                R -> e (emptystring)
// The starting variable S is S

let myGrammar = new Grammar(["S", "R"], { S: ["0S1", "R"], R: [""] }, "S");

let myLanguage = new Language(myGrammar);
myLanguage.generateStringbyLength(6);
