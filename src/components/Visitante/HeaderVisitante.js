import {AppBar,  InputBase, makeStyles, Toolbar, Typography, Avatar, IconButton, Drawer, List, ListItem} from "@material-ui/core"
import React, { useEffect } from "react"
import {useState} from "react"
import logo from "../../imagenes/parchitaLogo.png"
import SearchIcon from "@material-ui/icons/Search"
import MenuIcon from "@material-ui/icons/Menu"
import { Link } from "react-router-dom"

const HeaderVisitante = () => {
  
  
  
  const [tablet,setTablet]=useState(true)

  const [drawerOpen,setDrawerOpen]=useState(false)
  const classes=useStyle()
  

  useEffect(()=>{
    const responsive = () => window.innerWidth < 900 ? setTablet(true): setTablet(false)
    responsive();
    window.addEventListener('resize',()=>responsive());
  },[])
    
  const displayTablet=()=>{

    const handleDrawerOpen = () => {
      setDrawerOpen(true)
    }

    const handleDrawerClose= () =>{
      setDrawerOpen(false)
    }
    
    const headersData=["Sign in", "Previous bookings"]
    const getDrawerChoices= () =>{
      return headersData.map((data,indice)=>{
        return (
          <List>
            <ListItem key={Math.random()*10} >{data} </ListItem>
          </List>
        )
      })
    }

    return (
      <Toolbar className={classes.toolbar}>
        <IconButton {...{edge:"start",
          "aria-label":"menu",
          "aria-haspopup":"true",
          onClick: handleDrawerOpen,

          }}>
          <MenuIcon fontSize='large'/>
        </IconButton>
          <Drawer {...{
            anchor:"left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}>

            <div>{getDrawerChoices()}</div>

          </Drawer> 
          <Link to="/">
            <img src={logo} className={classes.logo} alt="logo"/>
          </Link>
          <Link to="/login">
            <div className={classes.right}>
          
              <Typography>Sign in</Typography>
              <Avatar className={classes.avatar}/>
          
            </div>
          </Link>
      </Toolbar>

    )
  }

  const displayDesktop=()=>( 
    <Toolbar className={classes.toolbar}>
      <Link to="/">
        <img src={logo} className={classes.logo} alt="logo"/>
      </Link>
      <div className={classes.center}>
          <InputBase fullWidth inputProps={{className: classes.input}} placeholder="Search here .."/>
          <SearchIcon/>
      </div>
      <Link to="/login">
        <div className={classes.right}>
          
            <Typography>Sign in</Typography>
            <Avatar className={classes.avatar}/>
          
        </div>
      </Link>
    </Toolbar>
  )
  return (
   
    <AppBar className={classes.root}>
        { 
          tablet? displayTablet():displayDesktop()
        }
    </AppBar>
    
  )
}

const useStyle=makeStyles((theme)=>({
  root:{
    position:"sticky",
    top: "0",
    backgroundColor: "#fff",
    zIndex: 99,
    width : "100vw",

  },

  toolbar:{
    display:"flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    margin: theme.spacing(1,0,0,2),
    objectFit: "contain",

  },
  center: {

    display: "flex",
    alignItems: "center",
    border: "1px solid lightgray",
    borderRadius:"999px",
    minWidth:"300px",
    padding : theme.spacing(1),
    margin: theme.spacing(1),


  },
  input : {
    fontSize: "1,2rem",
    padding: theme.spacing(1,5,1,5),


  },
  right:{
    color:"#cccccc",
    display:"flex",
    alignItems:"center",
    marginLeft: theme.spacing(2)

  },
  avatar:{
    marginLeft: theme.spacing(2),

  }
  

}))


export default HeaderVisitante