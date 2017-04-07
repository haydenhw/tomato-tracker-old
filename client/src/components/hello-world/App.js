import React from 'react';
import Button from './Button'

export default function App(props) {
  return (
    <div>
      <h1>Hola Mundo</h1>
      <Button clickAction={() => console.log('clicked!')} text={"Get Test Data"}/>
    </div>
  )
    
}