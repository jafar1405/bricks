import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class App extends React.Component{
  state = {
    orders:[
      {id:0, name:"John Doe",bricks:12,fullfilled:false},
      {id:1, name:"Michel Ferry",bricks:16,fullfilled:false},
      {id:2, name:"Jordan Roy",bricks:100,fullfilled:false}
    ],
    name:"",
    bricks:"",
    confirmation:false,
    searchedOrders:[]
  }

  handleChange = (e)=>{
    if(e.target.id === "name"){
      this.setState({
        ...this.state,
        name:e.target.value
      })
    }
    if(e.target.id === "bricks"){
      this.setState({
        ...this.state,
        bricks:e.target.value
      })
    }
  }
  handleSubmit=(event) =>{
    
    event.preventDefault();
    
    const tempOrders = [...this.state.orders]
    tempOrders.push({
      id:this.state.orders.length,
      name:this.state.name,
      bricks:Number(this.state.bricks)
    })
    this.setState({
      orders:tempOrders,
      confirmation:true
    },()=>{
      console.log(this.state.orders)
      setTimeout(()=>{
        this.setState({
          confirmation:false
        })
      },1000)
    })
    
    
  }
  handleSearch = (event)=>{
    let searcjQery = event.target.value.toLowerCase(),
    searchedOrders = this.state.orders.filter((el) => {
      
          let searchValue = el.name.toLowerCase();
          
          return searchValue.indexOf(searcjQery) !== -1;
        })
        
    this.setState({
      searchedOrders: searchedOrders
    },()=>{
      console.log(this.state.searchedOrders)
    })
  }


  render(){
    return (
      <Router>
        <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-4">
          <div className="row">
          <nav className="navbar sticky-top col-12 ">
            <ul className="justify-content-center nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/Admin" className="nav-link">Admin</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          
            <Route exact path="/Admin">
            <Admin {...this.state} handleSearch={this.handleSearch}/>
            </Route>
            <Route exact path="/">
              <Home {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </Route>
            <Route path="/:id">
            <Child orders={this.state.orders} />
          </Route>
          </Switch>
          </div>
        </div>
          
        </div></div>
      </Router>
    );
  }
}

export default App;

function Home(props) {
  
  return (
   
       <div className="row">
          <form className="col-12 border p-3 shadow-lg rounded" onSubmit={props.handleSubmit}>
              <h3>Client</h3>
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder="enter your name" onChange={(e)=>props.handleChange(e)} value={props.name} />
            </div>
            <div className="form-group">
              <input type="number" className="form-control" id="bricks" placeholder="enter bricks" onChange={(e)=>props.handleChange(e)} value={props.bricks} />
            </div>
            {
              props.confirmation ? <div className="alert alert-success" role="alert">
              Successfully placed order
            </div>:<div></div>
            }
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
       </div>
  )
}

function Admin(props) {
  return (
    <div className="row">
          <form className="col-12 border p-3 shadow-lg rounded" onSubmit={props.handleSubmit}>
              <h3>Search</h3>
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder="enter your name" onChange={props.handleSearch} value={props.search} />
            </div>
            <ul className="list-group list-group-flush">

            
{
  props.searchedOrders ? props.searchedOrders.map(el=>(
    <li key={el.id} className="list-group-item">
      <Link to={`/${el.id}`}>
      {el.name} |
      {el.bricks}
      </Link>
      
    </li>
  )):<div></div>
}
</ul>
          </form>
         
       </div>
  )
}

function Child(props) {
  console.log(props)
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  let order_details = props.orders.filter(item=>{
    return item.id === Number(id)
  })

  console.log(order_details)

  return (
    <div>
      {
order_details ? order_details.map(item=>(
  <div className="card" key={item.id}>
    <div className="card-body">
      <h5 className="card-title">Name:{item.name}</h5>
      <p className="card-text">Bricks:{item.bricks}</p>
      <button type="button" className="btn btn-secondary">Update</button>
      <button type="button" className="btn btn-warning ml-4">Full filled</button>
    </div>
  </div>
)):<div>sdf</div>
      }
    </div>
  );
}
