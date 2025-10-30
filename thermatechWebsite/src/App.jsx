// src/App.jsx
import './App.css'

// 1. Import all your components
import Header from './components/header'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import News from './components/News'
import Join from './components/Join' // <-- Import new component
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      
      <main>
        <section id="home">
          <Home />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="products">
          <Products />
        </section>
        
        <section id="news">
          <News />
        </section>
        
        <section id="join"> {/* <-- Add new section */}
          <Join />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </>
  )
}

export default App