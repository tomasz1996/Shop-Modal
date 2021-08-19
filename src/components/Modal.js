import React, { useState, useEffect } from 'react';
import './Modal.css';
import { FaTimes, FaCheck } from "react-icons/fa";
import { BiTimer } from "react-icons/bi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import xboxWhite from "../images/xbox_white.jpg";
import xboxBlack from "../images/xbox_black.jpg";
import xboxSilver from "../images/xbox_silver.jpg";

function Modal({ isModalOpened }) {

    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentOption, setCurrentOption] = useState(0);
    const [colors, setColors] = useState([]);
    const [options, setOptions] = useState([]);
    const images = [xboxSilver, xboxBlack, xboxWhite];
    const [currentImage, setCurrentImage] = useState(0);
    const [counter, setCounter] = useState(0);

    useEffect(()=>{
        getData()
      },[])

    const getData=()=>{
        fetch('xbox.json')
          .then(response => {
            return response.json();
          })
          .then(result => {
            setData(result);
            console.log(result);
            saveColors(result);
            saveOptions(result);
            setIsLoaded(true);
          })
          .catch(error => {
              console.log("Error: "+ error);
          })
      }
      
    function saveColors(result){
        let colorsArray = [];
        let numberOfColors = (Object.keys(result.multiversions[0].items)).length;

        for(let i = 0;i < numberOfColors; i++){
            let tempColor = result.multiversions[0]
                .items[Object.keys(result.multiversions[0].items)[i]]
                .values[result.multiversions[0]
                .items[Object.keys(result.multiversions[0].items)[i]]
                .values_id].name;
            colorsArray.push(tempColor)
        }
        setColors(colorsArray);
    }
    
    function saveOptions(result){
        let optionsArray = [];
        let numberOfOptions = (Object.keys(result.sizes.items)).length;

        for(let i = 0;i < numberOfOptions; i++){
            let tempTypeObject = result.sizes.items[Object.keys(result.sizes.items)[i]];
            optionsArray.push(tempTypeObject);
        }
        setOptions(optionsArray);
    }
    function changeImage(index){
        if(index === 3) index=0
        if(index === -1) index=2
        setCurrentImage(index)
    }

    function changeCounter(value){
        if(value === -1) value=0
        setCounter(value)
    }

    function addToCart(){
        if(options[currentOption].status === "Produkt dostępny"){
            if(counter != 0 && counter <= options[currentOption].amount){
                alert("Przedmiot został dodany do koszyka.");
                isModalOpened(false);
            }else if(counter > options[currentOption].amount){
                alert("Taka ilość przedmiotów nie jest dostępna."+ "\r\n"+
                "Dostępna ilość to "+ options[currentOption].amount + ".")
            }   
        }
        
    }
    
    return ( 
    <div className="modalBackground">
       <div className="modalContainer">

           <div onClick={() => isModalOpened(false)} className ="closeModalButton">
               <FaTimes />
           </div>
           <div className="imageCorousel">
               <MdChevronLeft 
               onClick={() => changeImage(currentImage - 1)}
               className="chevron chevronLeft"/>
               <img className="xboxImage" src={images[parseInt(currentImage)]} alt="xboxSilver"/>
               <MdChevronRight 
               onClick={() => changeImage(currentImage + 1)} 
               className="chevron chevronRight"/>
           </div>

           <div className="productContainer">
               <div className="productTitle">{isLoaded && data.product.name}</div>
               <div className="productPrice">{isLoaded && options[currentOption].price},00 zł</div>

               <div className="sizeContainer">
                   <div className="sizeTitle">Rozmiar:</div>
                   <div className="sizeButtons">
                        {isLoaded && options.map((option, index) => (
                                <button onClick={(e)=>{setCurrentOption(e.target.id)}} className={index == currentOption ? "sizeButton activeSizeButton" : "sizeButton"} id={index} key={index}>{option.name}</button>
                            ))}
                   </div>
               </div>

               <div className="colorContainer">
                    <div className="colorTitle">Wariant:</div>
                    <div className="selectContainer">
                        <select onChange={(event)=>{changeImage(parseInt(event.target.value))}}className="select">
                            { isLoaded && colors.map((color, index) => (
                                <option value={index} key={index}>{color}</option>
                            ))}
                        </select>
                    </div>
               </div>

               <div className="informationsContainer">
                   <div className="availableContainer">
                       <div className="logoContainer">
                           {isLoaded && options[currentOption].status === "Produkt dostępny" ? <FaCheck className="availableLogo"/> : 
                           <CgCloseO className="notAvailableLogo"/>
                           } 
                        </div>
                       <div className="availableText">{isLoaded && options[currentOption].status}</div>
                   </div>
                   <div className="shippingContainer">
                        <div className="logoContainer">
                            <BiTimer className="shippingLogo"/></div>
                        <div className="shippingText">Możemy wysłać już dzisiaj!<br/>
                        <a href="#">Sprawdź czasy i koszty wysyłki</a></div>
                   </div>
               </div>

               <div className="buttonsContainer">
                   <div className="counterContainer">
                        <button 
                        onClick={() => changeCounter(counter - 1)}
                        className="decrementButton">-</button>
                        <div className="counter">{counter}</div>
                        <button
                        onClick={() => changeCounter(counter + 1)}
                        className="incrementButton">+</button>
                   </div>
                   <button 
                   onClick={()=>{addToCart()}} 
                   className="addToCartButton">Dodaj do koszyka</button>
               </div>

               <div></div>
           </div>
       </div>
    </div> );
}
 
export default Modal;