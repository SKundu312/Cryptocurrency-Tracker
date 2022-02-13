import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [srch, setSrch] = useState('');
  
  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {
        setCoins(res.data)
        console.log(res.data)
    }).catch(err=>console.log(err))
  }, [])
  
  const handleChange = e => {
    setSrch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => {
    if(srch!=='')
      return coin.name.toLowerCase().includes(srch.toLowerCase())
    else
      return coin
   })  

  return (
    <div className="coin-app">
      <div className='coin-srch'>
        <h1 className='coin-txt'>Search a currency</h1>
        <form>
          <input type="text" placeholder="Search a currency" className='coin-input' onChange={handleChange}/>   
        </form>
      </div>
      {filteredCoins.map(coin => { 
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;
