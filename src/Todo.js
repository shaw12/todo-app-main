import React, { useEffect, useState } from 'react'
import './Todo.css'
import night from './images/bg-desktop-dark.jpg'
import day from './images/bg-desktop-light.jpg'
import moon from './images/icon-moon.svg'
import sun from './images/icon-sun.svg'
import TodoList from './TodoList'

const initialDnDState = {	
    draggedFrom: null,	
    draggedTo: null,	
    isDragging: false,	
    originalOrder: [],	
    updatedOrder: [],	
}

function Todo() {
    const [dark, setDark] = useState('light')
    const [input, setInput] = useState('')
    const [list, setList] = useState([])
    const [state, setState] = useState(0)
    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)	

    const toggleTheme = () => {
        const tm = dark === 'light' ? 'dark' : 'light'
        setDark(tm)
        document.documentElement.setAttribute('data-theme', tm)
      }

    const onDragStart = e => {	
      const initialPosition = Number(e.currentTarget.dataset.position)	
  
      setDragAndDrop({	
        ...dragAndDrop,	
        draggedFrom: initialPosition,	
        isDragging: true,	
        originalOrder: list,	
      })	
  
      e.dataTransfer.setData('text/html', '')	
    }	
  
    const onDragOver = e => {	
      e.preventDefault()	
  
      let newList = dragAndDrop.originalOrder	
      const draggedFrom = dragAndDrop.draggedFrom	
      const draggedTo = Number(e.currentTarget.dataset.position)	
      const itemDragged = newList[draggedFrom]	
      const remainingItems = newList.filter(	
        (item, index) => index !== draggedFrom	
      )	
  
      newList = [	
        ...remainingItems.slice(0, draggedTo),	
        itemDragged,	
        ...remainingItems.slice(draggedTo),	
      ]	
  
      if (draggedTo !== dragAndDrop.draggedTo) {	
        setDragAndDrop({	
          ...dragAndDrop,	
          updatedOrder: newList,	
          draggedTo: draggedTo,	
        })	
      }	
    }	
  
    const onDrop = e => {	
      setList(dragAndDrop.updatedOrder)	
  
      setDragAndDrop({	
        ...dragAndDrop,	
        draggedFrom: null,	
        draggedTo: null,	
        isDragging: false,	
      })	
    }	
  
    
    const AddTask = (event) => {

        event.preventDefault();

        if(input !== ""){
            const details = {
                id: Math.floor(Math.random() * 1000),
                value: input,
                isCompleted: false,
                isCrossShown: false,
            }
            setList([...list, details]);
        }
        console.log(list)
        setInput('')
    }

    const taskCompleted = (e, id) => {
        e.preventDefault();

        const element = list.findIndex((elem) => elem.id == id);

        const newList = [...list];

        newList[element] = {
            ...newList[element],
            isCompleted: true,
        }

        setList(newList)
    }

    const crossHandlerIn = (e, id) => {
        e.preventDefault();

        const element = list.findIndex((elem) => elem.id == id);

        const newList = [...list];

        newList[element] = {
            ...newList[element],
            isCrossShown: true,
        }

        setList(newList)
    }

    const crossHandlerOut = (e, id) => {
        e.preventDefault();

        const element = list.findIndex((elem) => elem.id == id);

        const newList = [...list];

        newList[element] = {
            ...newList[element],
            isCrossShown: false,
        }

        setList(newList)
    }

    const deleteTask = (e,id) => {
        e.preventDefault();

        setList(list.filter((elem) => elem.id != id))
    }

    // const allActive = (e) => {
    //     e.preventDefault()
    //     const newList = [...list];

    //     setList(newList.filter(e => e.isCompleted != true))

    // }
    // const allcompleted = (e) => {
    //     e.preventDefault()
    //     const newList = [...list];

    //     setList(newList.filter(e => e.isCompleted == true))

    // }

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        setList(storedTodos !== null ? JSON.parse(storedTodos) : null)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(list))
    }, [list])

    return (
        <div 
            className="body"
           >
        <div 
            className="main"
            style={{
                backgroundImage: !dark ? `url(${day}` : `url(${night})`
            }} >
        </div>
        <div className={dark ? "dark-mode mainx" : "light-mode mainx"} 
            >

            <div className="todo__head">
                <p>Todo</p>
            
                <div className='theme-toggler' 
                    onClick={toggleTheme}
                    style={{
                        backgroundImage: dark === 'light' ? `url(${moon}` : `url(${sun})`,
                        transition: 2
                    }}
                ></div>
            </div>

            <form 
                className="input"
                >
                <div className="circle"></div>
                
                <input 
                    type="text" 
                    id="text"
                    name="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Create a new todo..." 
                    
                />

                <button 
                    type='submit'
                    onClick={AddTask}
                ></button>
            </form>

            <div className="todo__container">
                <TodoList 
                    state={state}
                    deleteTask={deleteTask}
                    AddTask={AddTask}
                    taskCompleted={taskCompleted}
                    list={list}
                    dark={dark}
                    onDragStart={onDragStart}	 
                    onDragOver={onDragOver}	
                    onDrop={onDrop}
                />
            </div>
                

            <div 
                className="todo__footer"
                
                >
                <div className="left">
                    <span className="left__qty">
                    {
                        list?.filter((item) => !item.isCompleted).length
                    }
                    </span> items left
                </div>

                <div className="mid">
                    <div className="all" onClick={e => setState(0)}>All</div>

                    <div className="active" onClick={e => setState(1)}>Active</div>

                    <div className="completed" onClick={e => setState(2)}>Completed</div>
                </div>

                <div 
                className="right"
                onClick={() => setList(list.filter(item => !item.isCompleted))}
                >
                    Clear Completed
                </div>

            </div>

  
        </div>

        <div class="directed">
            Drag and drop to reorder list
        </div>
        </div>
    )
}

export default Todo 
