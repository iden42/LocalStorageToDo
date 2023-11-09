import './App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable';


function App() {

const [item, setItem] = useState('')
const [items, setItems] = useState(
  JSON.parse(localStorage.getItem('items')) || []
)

const newItem = () =>{
if(item.trim() !== ""){
  const newItem ={
    id: v4(),
    item: item,
    color: randomColor({
      luminosity: 'light'
    }),
    defaultPos: {
      x: 500,
      y: 500
    }
  }
  setItems((items) => [...items, newItem])
  setItem('')
}
else
  alert('todo is empty :/')
} 

const deleteTodo = (id) =>{
  setItems(items.filter((item) =>  item.id !== id))
}

const updatePos = (data, index) => {
let newArr = [...items]
newArr[index].defaultPos = {x: data.x ,  y: data.y}
setItems(newArr)
}

useEffect(() => {
localStorage.setItem('items', JSON.stringify(items))
}, [items])

  return (
    <div className="App">
   <div className='wrapper'>
    <input value={item} placeholder='Add some awesome todo...' onChange={(e) => setItem(e.target.value)} type='text'></input>
    <button className='add' onClick={() => newItem()}>ADD</button>
   </div>
   {
    items.map((item, index) => {
      return  (
        <Draggable onStop={(e, data) => {
          updatePos(data, index)
        }} key={item.id} defaultPosition ={item.defaultPos}>
          <div className='todo_item' style={{backgroundColor: item.color}}>
            {`${item.item}`}
            <button onClick={() => deleteTodo(item.id)} className='del'>X</button>
          </div>
          
        </Draggable>
      )
    })
   }
   <div className='columns'>
    <div className='c1'>To do</div>
    <div className='c2'>In progress</div>
    <div className='c3'>Done</div>
   </div>
    </div>
  );
}

export default App;
