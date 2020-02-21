import * as React from 'react'

interface Props {
    count: number;
    onSubmit: () => void;
}

interface State {
    name: string,
    email: string,
    phone: string,
    adultTickets: string,
    consessionTickets: string
}

export default class Summary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            phone: '',
            adultTickets: '0',
            consessionTickets: '0'
        };

        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <>
                <div className="column is-two-thirds">
                    <h1 className='title' style={{marginTop: 30}}>Summary</h1>
                    <p className="subtitle">Selected Seats: {this.props.count}</p>
                </div>
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="e.g Alex Smith"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="e.g. alexsmith@gmail.com"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-two-thirds">
                        <div className="field">
                            <label className="label">Phone Number</label>
                            <div className="control">
                                <input className="input" name="phone" value={this.state.phone} type="phone" onChange={this.handleChange} placeholder="e.g. 12345667"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-one-fifth">
                        <div className="field">
                            <label className="label">Adult Tickets</label>
                            <div className="control">
                                <input className="input" name="adultTickets" value={this.state.adultTickets} onChange={this.handleChange} type="number" placeholder='1'/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-one-fifth">
                        <div className="field">
                            <label className="label">Consessions Tickets</label>
                            <div className="control">
                                <input className="input" name='consessionTickets' value={this.state.consessionTickets} onChange={this.handleChange} type="number" placeholder='1'/>
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

    private handleChange(event: any): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;

        this.setState({[target.name]: target.value});

        console.log(this.state);
    }

    public handleSubmit(): void {
        this.props.onSubmit();
    }
}
