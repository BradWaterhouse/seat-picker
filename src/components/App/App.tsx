import * as React from 'react'
import 'bulma';
import Seat from "../Seat/Seat";
import Selector from "../Selector/Selector";
//@ts-ignore
import seating_plan_friday_night from "../../../seating_plan_friday_night.json";
//@ts-ignore
import seating_plan_saturday_afternoon from "../../../seating_plan_saturday_afternoon.json";
//@ts-ignore
import seating_plan_saturday_night from "../../../seating_plan_saturday_night.json";
//@ts-ignore
import seating_plan_sunday_afternoon from "../../../seating_plan_sunday_afternoon.json";
import Summary from "../Summary/Summary";

interface SeatInterface {
    id: number,
    reserved: boolean,
    available: boolean,
    selected: boolean
}

interface SeatAndRow {
    row: string,
    seat: SeatInterface[]
}

interface State {
    seats: SeatAndRow[];
    count: number;
    fileName: string;
}

const seatingPlan: any = [
    {
        id: 1,
        name: 'Friday Afternoon',
        file: seating_plan_friday_night,
        fileName: 'seating_plan_friday_night.json'

    },
    {
        id: 2,
        name: 'Saturday Afternoon',
        file: seating_plan_saturday_afternoon,
        fileName: 'seating_plan_saturday_afternoon.json'

    },
    {
        id: 3,
        name: 'Saturday Night',
        file: seating_plan_saturday_night,
        fileName: 'seating_plan_saturday_night.json'

    },
    {
        id: 4,
        name: 'Sunday Afternoon',
        file: seating_plan_sunday_afternoon,
        fileName: 'seating_plan_sunday_afternoon.json'

    }
];

export default class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            seats: [],
            count: 0,
            fileName: ''
        };

        this.handleSelected = this.handleSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectedPerformance = this.handleSelectedPerformance.bind(this);
        this.updateSelectedSeatCount = this.updateSelectedSeatCount.bind(this);
    }

    componentDidMount(): void {
        console.log('app rendered');
        this.setState({ seats: seatingPlan[0].file.data, fileName: seatingPlan[0].fileName })
    }

    render() {
        return (
            <div className="container">
                <div className="column">
                    <div className="content has-text-centered">
                        <h1 className='title'>Dronfield Theatre Group Seat Picker</h1>
                    </div>
                </div>
                <div className='seatPicker'>
                    {this.state.seats.map((seatAndRow: SeatAndRow) => {
                        return (
                            <>
                                <div className="columns is-full-mobile">
                                    <p className="subtitle" style={{paddingTop: 20}}> {seatAndRow.row} </p>
                                    {seatAndRow.seat.map((seat: SeatInterface) => {
                                        return (
                                            <div className="column" key={seat.id + seatAndRow.row}>
                                                <Seat key={seat.id} seat={seat} row={seatAndRow.row}
                                                      handleSelect={this.handleSelected}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="columns">
                    <div className="column">
                        <Summary count={this.state.count} onSubmit={this.handleSubmit} />
                </div>
                    <div className="column">
                        <Selector count={this.state.count} days={seatingPlan} handleSelectedPerformance={this.handleSelectedPerformance} />
                    </div>
                </div>
            </div>
        );
    }

    public handleSelected(row: string, id: number): void {
        let newState = this.state.seats;

        let rowIndex = newState.map((el) => el.row).indexOf(row);
        let seatIndex = newState[rowIndex].seat.map((el) => el.id).indexOf(id);

        newState[rowIndex].seat[seatIndex].reserved = !newState[rowIndex].seat[seatIndex].reserved;

        this.updateSelectedSeatCount(newState, rowIndex, seatIndex);
        this.setState({seats: newState});
    }

    private updateSelectedSeatCount(newState: any, rowIndex: number, seatIndex: number) {
        let ticketCount = this.state.count;

        if (newState[rowIndex].seat[seatIndex].reserved) {
            this.setState({count: ticketCount + 1})
        } else {
            this.setState({count: ticketCount - 1})
        }
    }

    public handleSubmit(): void {
        fetch('http://localhost:5000/api/save-json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: this.state.seats,
                filename: this.state.fileName
            })
        });
    }

    private handleSelectedPerformance(performance: any) :void {
        this.setState({ seats: performance.file.data, fileName: performance.fileName });
    }
}
