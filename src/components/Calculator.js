import React from 'react';

class Calculator extends React.Component {
    constructor(){
      super()
      this.state = {
        currentInput:"",
        operation:""
      }
    }
    // _handleInput = (event) => {
    //   this.setState({
    //       currentInput: event.target.value
    // });
    // }
    _handleClearButton = () => {
      this.setState({
        currentInput:""
      })
    }
    _handleButtons(val){
      this.setState({
        currentInput:this.state.currentInput + val
      })
    }
    _newValue = (event) => {
      console.log(event)
    }
//     _handleEqualButton(){
//       const CalculatorOperations = {
//   '/': (prevValue, nextValue) => prevValue / nextValue,
//   '*': (prevValue, nextValue) => prevValue * nextValue,
//   '+': (prevValue, nextValue) => prevValue + nextValue,
//   '-': (prevValue, nextValue) => prevValue - nextValue,
//   '=': (prevValue, nextValue) => nextValue
// }
//   var finalVal = this.state.currentInput.split(" ")
//   console.log(finalVal)
//   if(finalVal.includes("+"){
//
//   })
//
//     }
calculate(input){

   var f = { add : '+'
           , sub : '-'
           , div : '/'
           , mlt : '*'};

   // Create array for Order of Operation and precedence
   f.ooo = [[ [f.mlt] , [f.div]],
            [ [f.add] , [f.sub] ]];

   input = this.state.currentInput.replace(/[^0-9%^*\/()\-+.]/g,'');           // clean up unnecessary characters
   console.log(input)
   var output;
   for(var i=0, n=f.ooo.length; i<n; i++ ){

      // Regular Expression to look for operators between floating numbers or integers
      var re = new RegExp('(\\d+\\.?\\d*)([\\'+f.ooo[i].join('\\')+'])(\\d+\\.?\\d*)');
      re.lastIndex = 0;                                     // be cautious and reset re start pos

      // Loop while there is still calculation for level of precedence
      while( re.test(input) ){
         //document.write('<div>' + input + '</div>');
         output = calc_internal(RegExp.$1,RegExp.$2,RegExp.$3);
         if (isNaN(output) || !isFinite(output)) return output;   // exit early if not a number
         input  = input.replace(re,output);
      }
   }

   return output;

   function calc_internal(a,op,b){
      a=a*1; b=b*1;
      switch(op){
         case f.add: return a+b; break;
         case f.sub: return a-b; break;
         case f.div: return a/b; break;
         case f.mlt: return a*b; break;
         default: null;
      }
   }
   console.log(output)
   this.setState({
     currentInput:output
   })
}

    render() {
      return (
         <div className="calc">
           <input type="text" name="input" size="16" value={this.state.currentInput} onChange={this._newValue.bind(this)}/>
           <br/>
           <button className="clear" name="one" onClick={() => this._handleClearButton}> C </button>
           <button name="parenthesis-left" onClick={() => this._handleButtons(" ( ")}> ( </button>
           <button name="parenthesis-rigth" onClick={() => this._handleButtons( " ) ")}> ) </button>
           <button name="division" onClick={() => this._handleButtons(" / ")}> / </button>
           <br/>
           <button name="one" onClick={()=> this._handleButtons("1")}> 1 </button>
           <button name="two" onClick={()=> this._handleButtons("2")}> 2 </button>
           <button name="three" onClick={()=> this._handleButtons("3")}> 3 </button>
           <button name="times" onClick={()=> this._handleButtons(" * ")}> * </button>
           <br/>
           <button name="four" onClick={()=> this._handleButtons("4")}> 4 </button>
           <button name="five" onClick={()=> this._handleButtons("5")}> 5 </button>
           <button name="six" onClick={()=> this._handleButtons("6")}> 6 </button>
           <button name="minus" onClick={()=> this._handleButtons(" - ")}> - </button>
           <br/>
           <button name="seven" onClick={()=> this._handleButtons("7")}> 7 </button>
           <button name="eight" onClick={()=> this._handleButtons("8")}> 8 </button>
           <button name="nine" onClick={()=> this._handleButtons("9")}> 9 </button>
           <button name="plus" onClick={()=> this._handleButtons(" + ")}> + </button>
           <br/>
           <button name="dot" onClick={()=> this._handleButtons(".")}> . </button>
           <button name="zero" onClick={()=> this._handleButtons("0")}> 0 </button>
           <button className="equal" name="DoIt" onClick={() => this.calculate()}> = </button>
           <br/>
         </div>
           )
    }
  }

export default Calculator;
