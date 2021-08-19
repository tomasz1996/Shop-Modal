import Modal from './components/Modal';
import React, { useState } from 'react';
import './styles.css';


function App() {
  const [isModalOpened, setIsModalOpened] = useState(false)

  function openModal(){
    setIsModalOpened(true);
  }
  
  return (
    <div className="App">
      <button className="openModalButton" onClick = { () => openModal()}>Shop</button>
      {isModalOpened && <Modal isModalOpened={setIsModalOpened}/>}
    </div>
  );
}

export default App;
