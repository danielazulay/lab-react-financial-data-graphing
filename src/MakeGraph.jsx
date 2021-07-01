import { Component } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class MakeGraph extends Component {
  state = {
    stockPrices: [],
dates:[],
    from: "",
    to: "",

  };

  componentDidMount = async () => {
    try {
      const bit = await axios.get(
        `http://api.coindesk.com/v1/bpi/historical/close.json`
      );

      this.setState({ stockPrices: { ...bit.data.bpi } });
      this.graphiv();
 
    } catch (err) {
      console.log(err);
    }
  };

  graphiv = () => {
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: Object.keys(this.state.stockPrices),
        datasets: [
          {
            label: "Preço de fechamento $MSFT",
            backgroundColor: "rgba(235, 99, 132, 0.3)",
            borderColor: "rgb(255, 99, 132)",

            data: Object.values(this.state.stockPrices),
            fill: true,
          },
        ],
      },
    });

  };

  componentDidUpdate = (prevProps, prevState)=> {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.handleChange();
    }
  };

 handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    let from = new Date(this.state.from);
    let to = new Date(this.state.to);

    let novo2 = [];
    if (from < to) {
  
      novo2 = this.state.stockPrices.filter((a) => {
        let b = new Date(a);
        if (b >= from && b <= to) {
          return b;
        }
        return null;
      });

      this.setState({ dates: [...novo2] });
     console.log(this.state.dates)
      this.graphiv()
    }


  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="col-2">
            <p>From:</p>
            <select
              className="form-select form-select-sm "
              aria-label=".form-select-sm example"
            >
              {Object.keys(this.state.stockPrices).map((a) => {
                return (
                  <option name="from" value={a} onChange={this.handleChange}>
                    {a}
                  </option>
                );
              })}
            </select>
            <p>To:</p>
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              {Object.keys(this.state.stockPrices).map((a) => {
                return (
                  <option name="to" value={a} onChange={this.handleChange}>
                    {a}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default MakeGraph;
