import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { Provider, useSelector} from 'react-redux';
import { appStore, persistor } from './utils/appstore'; // ✅ Correct import
import { PersistGate } from 'redux-persist/integration/react';
import Body from './components/Body';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import Feed from './components/Feed';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Connection from './components/Connection';
import Request from './components/Request';
import Forgotpassword from './components/Forgotpassword';
import Resetpassword from './components/Resetpassword';
import Premium from './components/Premium';
import Chat from './components/Chat';
const App = () => {

  // const userdata=useSelector((store)=>store.user.user);


  



  return (
    <Provider store={appStore}> {/* Pass store here */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <Navbar />
          <Routes>
            <Route path="/" element={<Body />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/premium' element={<Premium/>}/>
            <Route path="/connection" element={<Connection />} />
            <Route path="/request" element={<Request />} />
            <Route path='/forgotpassword' element={<Forgotpassword/>}/>
            <Route path="/reset-password/:token" element={<Resetpassword />} />
            <Route path='/chat/:targetuserid' element={<Chat/>}/>
          </Routes>
          <ToastContainer
  position="bottom-right"
  autoClose={3000}
  className="toast-container"
  toastClassName="alert alert-info"
/>

          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
