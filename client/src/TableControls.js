import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Web3 from 'web3';
import axios from 'axios';
import { NFTStorage } from 'nft.storage';
import Ricer from './build/Ricer.json';
import detectEthereumProvider from '@metamask/detect-provider';
import leftArrow from './images/left.png';
import rightArrow from './images/right.png';

import {
  incrementModel,
  decrementModel,
  incrementColor,
  decrementColor,
  incrementSpoiler,
  decrementSpoiler,
  incrementRims,
  decrementRims,
  incrementStickers,
  decrementStickers
} from './redux/actions/controlActions';

const TableControls = () => {
  const client = new NFTStorage({ token: process.env.REACT_APP_NFT_API_KEY });
  const [web3, setWeb3] = useState();
  const [ricer, setRicer] = useState();
  const [provider, setProvider] = useState();
  const [currentMetaMaskAccount, setCurrentMetaMaskAccount] = useState(null);
  let [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setProvider(provider);
        startApp(provider);
      } else {
        alert('Please install MetaMask!');
      };

      async function startApp(provider) {
        if (provider !== window.ethereum) {
          alert('Do you have multiple wallets installed?');
        };

        let web3Init = new Web3(provider);
        setWeb3(web3Init);

        //create ricer instance to interact with deployed Ricer contract
        const networkId = await web3Init.eth.net.getId();
        const deploymentNetwork = Ricer.networks[networkId];
        if (deploymentNetwork !== undefined) {
          const deployedRicer = new web3Init.eth.Contract(
            Ricer.abi,
            deploymentNetwork.address
          );
          setRicer(deployedRicer);
        };

        let accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setCurrentMetaMaskAccount(accounts[0]);
        };
      };
    };
    init();

    return () => setIsConnected(false);
  }, []);

  const getAccounts = async () => {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    await handleAccountsChanged(accounts);
  };

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentMetaMaskAccount) {
      setCurrentMetaMaskAccount(accounts[0]);
      setIsConnected(true);
      window.location.reload();
    }
  };

  const connectToMetaMask = async () => {
    await getAccounts();
    provider.on('accountsChanged', handleAccountsChanged);
  };

  const handleOnMint = async () => {
    let accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts.length === 0) {
      alert('Please connect using MetaMask');
      setCurrentMetaMaskAccount(null);
      setIsConnected(false);
      return;
    };
    let cidPath = require('./images/'+storedPng.storedPngAsString+'.png').default;
    let cid = await createPngCid(cidPath);
    let metadataCid = await createMetadataCid(cid);
    console.log(metadataCid)
    let mintedRicer = await ricer.methods.mintToken(currentMetaMaskAccount, metadataCid).send({from: currentMetaMaskAccount});
    console.log(mintedRicer)
  };

  const createPngCid = async pngPath => {
    let image = await axios.get(pngPath, {responseType: 'blob'});
    let cid = await client.storeBlob(image.data);
    return cid;
  };

  const createMetadataCid = async pngCid => {
    let metadata = {
      image: pngCid,
      model,
      color,
      spoiler,
      rims,
      stickers
    };
    let metadataCid = await client.storeBlob(JSON.stringify(metadata));
    return metadataCid;
  };

  let [model, setModel] = useState(0);
  let [color, setColor] = useState(0);
  let [spoiler, setSpoiler] = useState(0);
  let [stickers, setStickers] = useState(0);
  let [rims, setRims] = useState(0);

  const dispatch = useDispatch();
  let storedPng = useSelector(state => {
    let pngObject = state.storedPng;
    let storedPngAsString = Object.values(pngObject).map(num => num.toString()).join('');
    return {storedPngAsString};
  });

  const handleModelIncrement = () => {
    let newModel = ++model;
    if (newModel === 4) {
      setModel(0);
      dispatch(incrementModel(0));
      return;
    };
    if (newModel > 3) {
      setModel(0);
      return;
    };
    setModel(newModel);
    dispatch(incrementModel(newModel));
  };

  const handleModelDecrement = () => {
    let newModel = --model;
    if (newModel === -1) {
      setModel(3);
      dispatch(decrementModel(3));
      return;
    }
    if (newModel < 0) {
      setModel(3);
      return;
    };
    setModel(newModel);
    dispatch(decrementModel(newModel));
  };

  const handleColorIncrement = () => {
    let newColor = ++color;
    if (newColor === 4) {
      setColor(0);
      dispatch(incrementColor(0));
      return;
    };
    if (newColor > 3) {
      setColor(0);
      return;
    };
    setColor(newColor);
    dispatch(incrementColor(newColor));
  };

  const handleColorDecrement = () => {
    let newColor = --color;
    if (newColor === -1) {
      setColor(3);
      dispatch(decrementColor(3));
      return;
    }
    if (newColor < 0) {
      setColor(3);
      return;
    };
    setColor(newColor);
    dispatch(decrementColor(newColor));
  };

  const handleSpoilerIncrement = () => {
    let newSpoiler = ++spoiler;
    if (newSpoiler === 4) {
      setSpoiler(0);
      dispatch(incrementSpoiler(0));
      return;
    };
    if (newSpoiler > 3) {
      setSpoiler(0);
      return;
    };
    setSpoiler(newSpoiler);
    dispatch(incrementSpoiler(newSpoiler));
  };

  const handleSpoilerDecrement = () => {
    let newSpoiler = --spoiler;
    if (newSpoiler === -1) {
      setSpoiler(3);
      dispatch(decrementSpoiler(3));
      return;
    }
    if (newSpoiler < 0) {
      setSpoiler(3);
      return;
    };
    setSpoiler(newSpoiler);
    dispatch(decrementSpoiler(newSpoiler));
  };

  const handleStickersIncrement = () => {
    let newStickers = ++stickers;
    if (newStickers === 4) {
      setStickers(0);
      dispatch(incrementStickers(0));
      return;
    };
    if (newStickers > 3) {
      setStickers(0);
      return;
    };
    setStickers(newStickers);
    dispatch(incrementStickers(newStickers));
  };

  const handleStickersDecrement = () => {
    let newStickers = --stickers;
    if (newStickers === -1) {
      setStickers(3);
      dispatch(decrementStickers(3));
      return;
    }
    if (newStickers < 0) {
      setStickers(3);
      return;
    };
    setStickers(newStickers);
    dispatch(decrementStickers(newStickers));
  };

  const handleRimsIncrement = () => {
    let newRims = ++rims;
    if (newRims === 5) {
      setRims(0);
      dispatch(incrementRims(0));
      return;
    };
    if (newRims > 4) {
      setRims(0);
      return;
    };
    setRims(newRims);
    dispatch(incrementRims(newRims));
  };

  const handleRimsDecrement = () => {
    let newRims = --rims;
    if (newRims === -1) {
      setRims(4);
      dispatch(decrementRims(4));
      return;
    }
    if (newRims < 0) {
      setRims(4);
      return;
    };
    setRims(newRims);
    dispatch(decrementRims(newRims));
  };


  const MODELS = ["NEON", "CIVIC", "INTEGRA", "MIATA"];
  const COLORS = ["BLACK", "BLUE", "GREEN", "RED"];
  const SPOILERS = ["DAYTONA", "DRAG", "CARBON", "HOONICORN"];
  const STICKERS = ["RICERS", "FLAMES", "CHECKERED", "ALL OVER"];
  const RIMS = ["BREDRIN", "GOTHIC", "CODE RED", "RIFKIND", "FAT JOE"];


  return (
    <div>

      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td>Model</td>
          </tr>
          <tr>
            <td>
              <img className="leftArrow" src={leftArrow} onClick={handleModelDecrement} alt="model decrement"></img> {MODELS[model]}
              <img className="rightArrow" src={rightArrow} onClick={handleModelIncrement} alt="model increment"></img>
            </td>
          </tr>

          <tr>
            <td>Color</td>
          </tr>
          <tr>
            <td>
              <img className="leftArrow" src={leftArrow} onClick={handleColorDecrement} alt="color decrement"></img>
                {COLORS[color]}
              <img className="rightArrow" src={rightArrow} onClick={handleColorIncrement} alt="color increment"></img>
            </td>
          </tr>

          <tr>
            <td>Spoiler</td>
          </tr>
          <tr>
            <td>
              <img className="leftArrow" src={leftArrow} onClick={handleSpoilerDecrement} alt="spoiler decrement"></img>
                {SPOILERS[spoiler]}
              <img className="rightArrow" src={rightArrow} onClick={handleSpoilerIncrement} alt="spoiler increment"></img>
            </td>
          </tr>

          <tr>
            <td>Decals</td>
          </tr>
          <tr>
            <td>
              <img className="leftArrow" src={leftArrow} onClick={handleStickersDecrement} alt="sticker decrement"></img>
                {STICKERS[stickers]}
              <img className="rightArrow" src={rightArrow} onClick={handleStickersIncrement} alt="sticker increment"></img>
            </td>
          </tr>


          <tr>
            <td>Rims</td>
          </tr>
          <tr>
            <td>
              <img className="leftArrow" src={leftArrow} onClick={handleRimsDecrement} alt="rims decrement"></img>
                {RIMS[rims]}
              <img className="rightArrow" src={rightArrow} onClick={handleRimsIncrement} alt="rims increment"></img>
            </td>
          </tr>

        </tbody>
      </Table>

      <br></br>
      <div style={{color:'white'}}>
        <h5>user generated png value as string: {storedPng.storedPngAsString}</h5>
      </div>

      <br></br>
      <Button onClick={handleOnMint}>
        Mint your Ricer NFT!
      </Button>
      <br></br>

      {isConnected === true ? 'connected' : 'not connected'}

      <Button onClick={connectToMetaMask}>
        Connect to your MetaMask account
      </Button>

      <div className="carImageLocation">
        <img className="body carImage" src={require('./images/'+storedPng.storedPngAsString+'.png').default} alt="car"></img>
      </div>
    </div>
  );
};

export default TableControls;
