import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import '../App.css'
import { useState } from 'react';
import Button from '@mui/material/Button'
import { updateVote } from '../redux/action'
import { connect } from "react-redux";

const AwardCategories = (props) => {
  
  var Item=props.item;
  console.log("com",Item)

  const[btnEnable,setbtnEnable]=useState(false)
  const tog= {
                "id":"",
                0:false,     
                1:false,
                2:false,
                3:false
              }
  const [tempToggle,setTemp]=useState(tog);

  const toggle = (idx,id) => {
    let newToggle={...tog}
    newToggle[idx]=!tempToggle[idx]
    newToggle.id=id
    setTemp(newToggle);
  }

  const voteNominee= () => {
    var flag=0;
    Object.keys(tempToggle).map(function(key,idx){
      if(tempToggle[key] && key !== "id"){
        flag=1
        setbtnEnable(true)
        Item.vote[key]=props.item.vote[key]+1
        props.updateVote(Item)
      }
    })
    if(btnEnable===false && flag===0){
      alert("Please select the nominee of the category "+Item.AwardCategory)
    }
  }
  return (<>
    <div style={{ paddingLeft: 130 , paddingTop: 30 , paddingBottom: 30 }}>

        <Card sx={{ maxWidth: 1200,color:"#4a4a36",bgcolor:"#F0F0F0	"}}> 
              <CardHeader sx={{ fontFamily: "Verdana, sans-serif", color: "#696969", fontSize: 30 }}
                avatar={
                  <Avatar sx={{ bgcolor: "#baba99" }} aria-label="recipe">
                    {Item.id}
                  </Avatar>
                }
                title= { Item.AwardCategory }
              />  

              <CardContent sx={{ paddingBottom:5}}>
                    { Item.Nominees.map((nom, index) => (
                    <div style={{padding:10}}>
                        <div style={{}} >
                          { index+1 } { nom }
                        </div>
                          <div style={{textAlign:"end"}}>
                            <ThumbUpOutlinedIcon
                             onClick={() => {toggle (index,Item.id)}} 
                             className={ tempToggle[index] ? 'toggleOn' : 'toggleOff' }/>
                          </div> 
                        <Divider/>
                        <br/>
                    </div>)) }                      
                </CardContent>            
            </Card>
        </div> 

        <Button variant="contained" size="large" sx ={{ mx: 80 , width: 150 , color: "white"}} onClick={voteNominee} disabled={btnEnable}> VOTE </Button>          
        {/* <hr/> */}
        </>
  )
}

const mapStateToProps = state => {
  return {
      // data: state.awardslist
  }
}

const mapDispatchToProps = dispatch => {
  return {
     updateVote: (voteNominees) => dispatch(updateVote(voteNominees))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AwardCategories)
