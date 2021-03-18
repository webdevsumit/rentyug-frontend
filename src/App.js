import './App.css';
import MainScreen from './Screens/MainScreen';
import MetaTags from 'react-meta-tags';

function App() {
  return (
    <div className="App">
    	<MetaTags>
    	    <title>RentYug</title>
    	    <meta id="meta-description" name="description" content="RentYug is a type rental social media plateform. 
    	    	It helps people to connect means helps to connect provider to consumer and consumer to provider. 
    	    	People can buy or take anything on rent" />
    	    <meta id="og-title" property="og:title" content="MyApp" />
    		<meta id="og-image" property="og:image" content="path/to/image.jpg" />
    	</MetaTags>
      	<MainScreen/>
    </div>
  );
}

export default App;
