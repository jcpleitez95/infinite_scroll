import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


function App() {
  const [pins, setPins] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let start = 0;
  let end = 5;

  useEffect(() => {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
      setPins(data)
    })
  })

  let firstItems = pins.splice(start, end).map((item) => <img src={item.images.orig.url} alt="kitten" height="250" width="250" key={item.id}></img>)
  
  function next(){
    if(firstItems.length === pins.length){
      setHasMore(false)
    } else {
      setHasMore(true)
    }
    start = end + 1;
    end = start +1;
    let newItems = pins.splice(start, end).map((item) => <img src={item.images.orig.url} alt="kitten" height="250" width="250" key={item.id}></img>)
    firstItems = firstItems.concat(newItems)
    return firstItems
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={5}
        next={next}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>

        {firstItems}
      

      </InfiniteScroll>
    </div>
  )
}

export default App;
