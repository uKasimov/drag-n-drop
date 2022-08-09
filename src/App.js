import "./index";
import './App.css'
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import {BrowserRouter as Router , Routes ,Route, Link} from "react-router-dom";
import Dragn from './pages/dragn2'
const texts = ["kv 1","tr 2","ci 3","uc 4"];




const ItemsContainer = styled.div`
  color: black;
  position: relative;
  background-color: white;
  height: 100%;
  min-height:100vh;
  max-width:50vh;
  border: 4px solid blue;
    .kv {
      height: 200px;
      width:200px;
    background-color: yellow;
  }
  .tr {
    width:300px;
    background-color: green;
    height:150px;
  }
  .ci{
    height: 100px;
    width: 100px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    color:#fff;
    background-color:blue;
    height: 200px;
    width:200px;
  }
  .uc{
    width: 0;
    height: 0;
    border: 150px solid transparent;
    border-top: 0;
    border-bottom: 220px solid red;
    padding: 0;
  }
`;

const ExampleDiv = styled.div`
  position: relative;
  color: white;
  padding: 0.5em 1em;
  width: 40%;
  margin: 0.3em;
  cursor: move;
`;


export function Dagdrag ( {drag}){
  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const existingDivPositions = JSON.parse(
      localStorage.getItem("positions_div")
    );
    setPositions(existingDivPositions);
    setHasLoaded(true);
    console.log(existingDivPositions);
    console.log("has loaded");
  }, []);

  function handleStop(e, data) {
    let dummyPositions = { ...positions };
    const itemId = e.target.id;
    dummyPositions[itemId] = {};
    dummyPositions[itemId]["x"] = data.x;
    dummyPositions[itemId]["y"] = data.y;
    setPositions(dummyPositions);
  }

  useEffect(() => {
    localStorage.setItem(`positions_div`, JSON.stringify(positions));
  }, [positions]);

  return hasLoaded ? (
    <ItemsContainer>
      {texts.map((item) => {
        return (
          <>
            <Draggable
              defaultPosition={
                positions === null
                  ? { x: 0, y: 0 }
                  : !positions[item[3]]
                  ? { x: 0, y: 0 }
                  : { x: positions[item[3]].x, y: positions[item[3]].y }
              }
              position={null}
              key={item[3]}
              nodeRef={nodeRef}
              onStop={handleStop}
              disabled={drag}
            >
              <div ref={nodeRef}>
                <ExampleDiv className={item} id={item[3]}></ExampleDiv>
              </div>
            </Draggable>
          </>
        );
      })}{" "}
    </ItemsContainer>
  ) : null;
}

function App() {
  return (
    <>
     <Router>
        <nav>
          <Link to={'/'} >1 page</Link><span>   &nbsp; &nbsp;</span>
          <Link to={'/page2'} >2 page</Link>
        </nav>
        <Routes>
          <Route path="/page2" element={<Dragn drag={true}/>}/>
          <Route path="/" element={<Dagdrag drag={false}/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
