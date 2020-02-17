import * as React from 'react'
// @ts-ignore
import ReactTooltip from 'react-tooltip'

interface Props {
    count: number;
    onSubmit: () => void;
    days: any[];
    handleSelectedPerformance: (selectedPerformance: SelectedPerformance) => void;
}

interface SelectedPerformance {
    id: number;
    name: string;
    file: any;
    fileName: string;
}

interface State {
    toggled: boolean;
    selectedPerformance: SelectedPerformance;
}

export default class Summary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            toggled: false,
            selectedPerformance: this.props.days[1]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.isToggled = this.isToggled.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return (
            <>
                <div className="columns">
                    <div className="column is-two-thirds">
                        <h1 className='title' style={{marginTop: 45}}>Summary</h1>
                        <p className="subtitle">Selected Seats: {this.props.count}</p>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="e.g Alex Smith"/>
                            </div>
                        </div>
                    </div>
                    <div className="column is-two-thirds" style={{marginLeft: 55}}>
                        <h1 className='title' style={{marginTop: 45}}>Select Performance</h1>
                        <p className='subtitle'>Use the dropdown</p>
                        <div className="field">
                            <label className="label">Name</label>

                            <div className={"dropdown " + this.isToggled()} onClick={this.toggle}>
                                <div className="dropdown-trigger">
                                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span> {this.state.selectedPerformance.name} </span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"/>
                                         </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">

                                        {this.props.days.map(day => {
                                            return (
                                                <>
                                                    <div className="day" onClick={this.handleSelect}>
                                                        <a key={day.id} className="dropdown-item" data-id={day.id}>
                                                            {day.name}
                                                        </a>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-two-thirds">
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" placeholder="e.g. alexsmith@gmail.com"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-one-third">
                        <div className="field">
                            <label className="label">Phone Number</label>
                            <div className="control">
                                <input className="input" type="phone" placeholder="e.g. 12345667"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-one-fifth">
                        <div className="field">
                            <label className="label">Adult Tickets</label>
                            <div className="control">
                                <input className="input" type="number"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-one-fifth">
                        <div className="field">
                            <label className="label">Consessions Tickets</label>
                            <div className="control">
                                <input className="input" type="number"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="control">
                    <button className="button is-primary" onClick={this.props.onSubmit}>Submit</button>
                </div>
            </>
        );
    }

    public handleSubmit(): void {
        this.props.onSubmit()
    }

    public toggle(): void {
        this.setState({toggled: !this.state.toggled});
    }

    public isToggled(): string {
        if (this.state.toggled) {
            return 'is-active'
        }

        return ''
    }

    public handleSelect(event: any): void {
        const selectedId = event.target.dataset.id;

        this.setState({selectedPerformance: this.props.days[parseInt(selectedId) - 1]});
        this.props.handleSelectedPerformance(this.props.days[parseInt(selectedId) - 1]);
    }
}
