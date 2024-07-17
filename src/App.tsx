import './App.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from './context/ThemeContext'
import { setupStore } from './store'
import Routes from './Routes'

const store = setupStore()

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark">
          <Routes />
        </ThemeProvider>
      </Provider>
    </div>
  )
}

export default App
