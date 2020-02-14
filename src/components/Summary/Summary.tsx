import * as React from 'react'
// @ts-ignore
import ReactTooltip from 'react-tooltip'

interface Props {
  count: number;
  onSubmit: Function
}

export default class Summary extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1 className='title' style={{marginTop: 45}}>Summary</h1>
                <p className="subtitle">Selected Seats: {this.props.count}</p>

                <div className="columns">
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="e.g Alex Smith"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" placeholder="e.g. alexsmith@gmail.com"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-half">
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
                                <input className="input" type="number" />
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
                    <button className="button is-primary" onClick={this.props.onSubmit()}>Submit</button>
                </div>
            </>
        );
    }
}
