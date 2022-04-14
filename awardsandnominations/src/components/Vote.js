import * as React from 'react';
import { connect } from "react-redux";
import Button from '@mui/material/Button';
import { listNominees , updateVote } from '../redux/action';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Awards from './awardCategories'
import '../App.css'

const Vote = (props)  => {
  
  let navigate = useNavigate();
  const [tog,setTog]=useState({
    id:"",
    0:false,
    1:false,
    2:false,
    3:false
  })
  // var tempToggle=tog
  const [tempToggle]=useState({})
  const [togList,setTogList]= useState([ ])
    
  React.useEffect(() =>{
    props.listNominees()
  },[])

//   var tifOptions = Object.keys(tifs).map(function(key) {
//     return <option value={key}>{tifs[key]}</option>
// });
  
  const toggle= (idx,id,tFlag) =>{
          Object.assign(tempToggle,tog,{[idx]:!tFlag, "id":id})
          console.log("temp",tempToggle.id,id,idx)
          let tt= tempToggle; 
          console.log("iddd",tt.id)
          setTogList({
              ...togList,       // 0:{}, 1:{}, 2:{}
              [id]:tt,
          })

          console.log("....",togList[id][idx],togList)      
  }

  const handleCount=(item,index) => {
    let award=item
    award.vote[index]=item.vote[index]+1
    console.log("count",item,"....*",award)
  }
  
  return (
    <>
    { ( props.data.length > 0 )?
    <>
    { props.data.map( (item,key) => (<Awards item={item}/>
              ))}
              <div>
          <Button variant="contained" size="large" sx ={{ mx: 80 , width: 150 , color: "white"}}> VOTE </Button>          
        </div>
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
    updateVote: (voteNominees) => dispatch(updateVote(voteNominees))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
