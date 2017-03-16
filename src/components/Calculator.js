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
    _handleEqualButton = (e) => {

    }
    render() {
      return (
         <div className="calc">
           <input type="text" name="input" size="16" value={this.state.currentInput} onChange={this._newValue.bind(this)}/>
           <br/>
           <button className="clear" name="one" value="  C  " onClick={this._handleClearButton}> C </button>
           <button name="parenthesis-left" value="  (  " onClick={this._handleButtons.bind(this, "(")}> ( </button>
           <button name="parenthesis-rigth" value="  ) " onClick={this._handleButtons.bind(this, ")")}> ) </button>
           <button name="division" value="  /  " onClick={this._handleButtons.bind(this,"/")}> / </button>
           <br/>
           <button name="one" value="  1  " onClick={this._handleButtons.bind(this, "1")}> 1 </button>
           <button name="two" value="  2  " onClick={this._handleButtons.bind(this, "2")}> 2 </button>
           <button name="three" value="  3  " onClick={this._handleButtons.bind(this, "3")}> 3 </button>
           <button name="times" value="  *  " onClick={this._handleButtons.bind(this, "*")}> * </button>
           <br/>
           <button name="four" value="  4  " onClick={this._handleButtons.bind(this, "4")}> 4 </button>
           <button name="five" value="  5  " onClick={this._handleButtons.bind(this, "5")}> 5 </button>
           <button name="six" value="  6  " onClick={this._handleButtons.bind(this, "6")}> 6 </button>
           <button name="minus" value="  -  " onClick={this._handleButtons.bind(this, "-")}> - </button>
           <br/>
           <button name="seven" value="  7  " onClick={this._handleButtons.bind(this, "7")}> 7 </button>
           <button name="eight" value="  8  " onClick={this._handleButtons.bind(this, "8")}> 8 </button>
           <button name="nine" value="  9  " onClick={this._handleButtons.bind(this, "9")}> 9 </button>
           <button name="plus" value="  +  " onClick={this._handleButtons.bind(this, "+")}> + </button>
           <br/>
           <button name="dot" value="  .  " onClick={this._handleButtons.bind(this, ".")}> . </button>
           <button name="zero" value="  0  " onClick={this._handleButtons.bind(this, "0")}> 0 </button>
           <button className="equal" name="DoIt" value="  =  " onSubmit={this._handleEqualButton}> = </button>
           <br/>
         </div>
           )
    }
  }

export default Calculator;
