import * as React from 'react';
import { connect } from "react-redux";
import { listNominees } from '../redux/action';
import Awards from './awardCategories'
import '../App.css'
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const Vote = (props)  => {
  
  //let navigate = useNavigate();
     
  React.useEffect(() =>{
    props.listNominees()
  },[])
  
  // const display=(tog) =>{
  //   console.log("parent",tog)
  // }
  return (
    <>
        { ( props.data.length > 0 )?
          <>
          <div style={{ border:1, height:60, textAlign:"right", paddingRight:50, paddingTop:10}}>
              <Link to='/' style={{ textDecoration:"none" , color:"white"}}>
                <HomeOutlinedIcon sx={{ fontSize:40, color:'#404040'}}/>
              </Link> 
          </div>
            { props.data.map( (item,key) => (
                      <Awards item={item} /> //display={display}
            ))}
          </> : "" }
    </>
  );
}

const mapStateToProps = state => {
  return {
      data: state.awardslist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    listNominees: () => dispatch(listNominees()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
