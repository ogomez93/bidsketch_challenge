import React from 'react'
import { connect } from 'react-redux'

export class Example extends React.Component {
  render () {
    const { person, documents } = this.props
    return (
      <div className='wrap'>
        <div className='row'>
          <h1>Hello { person.name }</h1>
        </div>
        <div className='row'>
          <h2>Documents: </h2>
          <ul>
            { documents.map(doc => <li key={doc.id}>{ `${doc.name} (${doc.status})` }</li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  person: state.person,
  documents: Object.values(state.documents)
})

const mapDispatch = { }

export default connect(mapState, mapDispatch)(Example)
