import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './Header';
import BlogList from './Blog';
import BlogDetailShow from './BlogDetail';
import Form from './Contact';
import './App.css';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/articles/:id' element={<BlogDetailShow />} />
        <Route path='/contact' element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
