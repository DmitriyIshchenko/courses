import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 5,
    };

    // give methods access to component instance
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  /*
  when react call the event handler in JSX,
  it first creates a copy of this function -> the function call is normal function call, that is not bound to any object -> this keyword is lost
  */
  handleDecrement() {
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });
  }

  handleIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }

  render() {
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div className="">
        <button onClick={this.handleDecrement}>-</button>
        <span>{this.state.count}</span>
        <button onClick={this.handleIncrement}>+</button>
        <p>
          {this.state.count} days from now is {date.toDateString()}
        </p>
      </div>
    );
  }
}

export default Counter;
