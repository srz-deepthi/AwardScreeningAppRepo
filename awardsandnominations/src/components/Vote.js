import * as React from 'react';
import { connect } from "react-redux";
import { listNominees } from '../redux/action';
import Awards from './awardCategories'
import '../App.css'

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
