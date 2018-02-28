
function ModuleMethods () {
  this.state = {}

  this.setState = function () { 
    console.log('setState'); 
    this.callUpdate()
    return false; 
  }

  this.prefirstrender = function () { console.log('mount'); return false; }
  this.postfirstrender = function () { console.log('mount'); return false; }
  this.preupdaterender = function () { console.log('mount'); return false; }
  this.render = function () { console.log('render'); return false; }
  this.postupdaterender = function () { console.log('mount'); return false; }
  this.unmount = function () { console.log('unmount'); return false; }

  this.callInitial = function () {
    this.getInitialState()
    this.prefirstrender()
    this.render()
    this.postfirstrender()
  }
  this.callUpdate = function () {
    this.preupdaterender()
    this.render()
    this.postupdaterender()
  }
  this.callRemove = function () {
    this.unmount()
  }
} 



console.log(new ModuleMethods())