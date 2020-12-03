import React from 'react'
import './Todo.css'

const TodoList = ({
    state,
    deleteTask,
    AddTask,
    taskCompleted,
    list,
    dark,
    onDragStart,	
    onDragOver,	
    onDrop,
    }) => {
    
        const createList = (todo, i) => {
            return(
                <div
                key={todo.id}
                className="todo__list"
                draggable='true'	            
                onDragStart={onDragStart}	            
                onDragOver={onDragOver}	            
                onDrop={onDrop}	            
                data-position={i}
                >
                    <div 
                        className={todo.isCompleted ? "circle li-circle cross-text" : "circle"} 
                        onClick={(e) => taskCompleted(e, todo.id)}
                        ></div>
                    <p className={todo.isCompleted ? "cross-text" : "list-item"}>{todo.value}</p>
                        
                    <div 
                        className="cross"
                        onClick={(e) => deleteTask(e,todo.id)}
                    >
                    </div>
                </div>
            )
        }

        const toList = list.map((todo, i) => {
            let li = null

            if (state === 0){
                li = createList(todo,i)
            }
            else if(state ===1 && !todo.isCompleted){
                li = createList(todo,i)
            }
            else if(state ===2 && todo.isCompleted){
                li = createList(todo,i)
            }
            return li
        })

    return <div>{toList}</div>
 }

export default TodoList


// {

//     list.map((store) => (
        
//         <div key={store.id} 
//             className="todo__list"
//             style={{
//                 background: !dark ? '#fff' : '#222'
//             }}
//             onMouseEnter={(e) => crossHandlerIn(e, store.id)}
//             onMouseLeave={(e) => crossHandlerOut(e, store.id)}
//             >

//             <div 
//                 className={store.isCompleted ? "circle li-circle cross-text" : "circle"} 
//                 onClick={(e) => taskCompleted(e, store.id)}
//                 ></div>
//             <p className={store.isCompleted ? "cross-text" : "list-item"}>{store.value}</p>
            
//             <div 
//                 className= {store.isCrossShown ? "cross-show" : "cross"} 
//                 onClick={(e) => deleteTask(e,store.id)}
//             >
//             </div>
                
//         </div>
//     ))
// }