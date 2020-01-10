import * as React from 'react'
import { Button } from '../../styles/Button'

interface Props {
  name: string;
}

export default class App extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        Hello {this.props.name}

        <Button>Hi!</Button>
        <Button primary>Hi!</Button>
      </div>
    );
  }
}
