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
        setPins(data.splice(0, 5))
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
        console.log(e.target.scrollTop)
        console.log(isScrolling)
        if(e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight){
            setisScrolling(true)
        } else {
            setisScrolling(false)
        }   
    }
    
    return (
        <div className="list" onScroll={handleScroll}>
            <InfiniteScroll
                dataLength={pins.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >

                {pins.map((item) => <PinCard url={item.images.orig.url} key={Math.random()}/>)}
            

            </InfiniteScroll>
        </div>
    )
}
