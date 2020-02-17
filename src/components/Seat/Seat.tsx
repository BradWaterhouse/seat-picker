import * as React from 'react'
// @ts-ignore
import ReactTooltip from 'react-tooltip'

interface SeatInterface {
    id: number,
    reserved: boolean,
    available: boolean,
    selected: boolean
}

interface Props {
    seat: SeatInterface;
    row: string;
    handleSelect: (row: string, id: number) => void;
}

interface State {
    selected: boolean
}

export default class Seat extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selected: false
        };

        this.seatColourStatus = this.seatColourStatus.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return (
            <>
                <a href='#'>
                    <ReactTooltip/>
                    <div className="circle"
                         data-tip={"row: " + this.props.row  + " seat number: " + this.props.seat.id}
                         style={{borderRadius: 50, height: 40, width: 40, backgroundColor: this.seatColourStatus()}} onClick={this.handleSelect}/>
                </a>
            </>
        );
    }

    private seatColourStatus(): string {
        let colour = 'white';

        if (this.props.seat.available) {
            if (this.props.seat.reserved) {
                colour = '#669999';
            }
            else if (this.state.selected) {
                colour = '#995854';
            }
            else {
                colour = '#99ff99';
            }
        }

        return colour
    }

    private handleSelect(): void {
        if (this.props.seat.available) {
            if (!this.props.seat.reserved) {
                this.props.handleSelect(this.props.row, this.props.seat.id);
                this.setState({selected: !this.state.selected})
            }
        }
    }
}
