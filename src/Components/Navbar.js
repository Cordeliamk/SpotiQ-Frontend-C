import { useEffect, useRef, useState } from 'react';
import { useCollapse } from 'react-collapsed'
import { HiBars3 } from 'react-icons/hi2';

function NavBar({renderSpotifySearch, renderPoll, renderSpotiQ}) {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  const navbarRef = useRef(null);


  // const renderPoll = () => {
  //   setPageState({
  //       poll : true, 
  //       spotify: false, 
  //       button : true})
  // };

  // const renderSpotifySearch = () => {
  //   setPageState({
  //     poll : false, 
  //     spotify: true, 
  //     button : true})
  // };

  // const renderSpotiQ = () => {
  //   setPageState({
  //     poll : false, 
  //     spotify: false, 
  //     button : false})
  // };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarRef]);


  return (
    <div className='NavBarBox' ref={navbarRef} >
      <button className='NavBarBtn'
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? <HiBars3 style={{color: "goldenrod", fontSize: "30px"}}/> : <HiBars3 className="NavBarIcon" style={{color: "goledenrod", fontSize: "30px"} }/>}
      </button>
      <section {...getCollapseProps()}>   <button onClick={renderSpotiQ} className="NavBarBtnAddToVote">
              <img className="NavbarSendToVote" src="../images/Logo.png"/></button></section>
      <section {...getCollapseProps()}> <button onClick={renderPoll} className="NavBarBtnAddToVote">
              <img className="NavbarSendToVote" src="../images/3.png"/></button></section>
              <section {...getCollapseProps()}>   <button onClick={renderSpotifySearch} className="NavBarBtnAddToVote">
              <img className="NavbarSendToVote" src="../images/2.png"/></button></section>
    </div>
  )
}

export default NavBar;