import * as React from 'react'

interface Props {
    count: number;
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

export default class Selector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            toggled: false,
            selectedPerformance: this.props.days[0]
        };

        this.toggle = this.toggle.bind(this);
        this.isToggled = this.isToggled.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return (
            <>
                <div className="column">
                    <div className="column is-two-thirds" style={{marginLeft: 55}}>
                        <h1 className='title' style={{marginTop: 30}}>Select Performance</h1>
                        <p className='subtitle'>Use the dropdown</p>
                        <div className="field">
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
                                                    <div key={day.id} className="day" onClick={this.handleSelect}>
                                                        <a className="dropdown-item" data-id={day.id}>
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
            </>
        );
    }

    private toggle(): void {
        this.setState({toggled: !this.state.toggled});
    }

    private isToggled(): string {
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
