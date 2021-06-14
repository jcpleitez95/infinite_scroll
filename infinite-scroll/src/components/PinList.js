import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PinCard from './PinCard';

export default function PinList() {

    const [pins, setPins] = useState([]);
    const [isScrolling, setisScrolling] = useState(false)

    useEffect(() => {
      fetch('data.json')
      .then(response => response.json())
      .then(data => {
        setPins(data)
      })
    }, [])

    const fetchData = useEffect(() => {
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
          setPins(prevPins => prevPins.concat(data))
        })
      }, [isScrolling])

    function handleScroll(e){
        if(e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop === e.target.documentElement.clientHeight){
            setisScrolling(true)
        } else {
            setisScrolling(false)
        }   
    }
    
    return (
      window.addEventListener("scroll", handleScroll),
        <div className="list">
            <InfiniteScroll
                dataLength={pins.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >

                {pins.map((item) => <PinCard url={item.images.orig.url} key={Math.random()} description={item.description} pinner={item.pinner.username}/>)}
            

            </InfiniteScroll>
        </div>
    )
}
