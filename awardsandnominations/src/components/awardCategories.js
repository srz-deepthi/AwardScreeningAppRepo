import React from 'react'
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider'
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import '../App.css'

const awardCategories = (data) => {
  
  console.log("com",data.item.vote)

  var item=data.item;
  const [tog,setTog]= useState({
    id:"",
    0:false,
    1:false,
    2:false,
    3:false
  })

  const toggle = (idx,id) => {
    let tempToggle;
    Object.assign(tempToggle,tog,{[idx]:!tog[idx], "id":id})
    console.log("temp::: ",tempToggle,"::: ",id,"::: ",idx,"::: ",tog[idx])
  }

  return (
    <div style={{ paddingLeft: 130 , paddingTop: 30 , paddingBottom: 30 }}>
              <Card sx={{ maxWidth: 1200 }}>
                <CardHeader sx={{ fontFamily: "Verdana, sans-serif", color: "#696969", fontSize: 30 }}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {item.Id}
                    </Avatar>
                  }
                  title= { item.AwardCategory }
                />    
                <CardContent sx={{ paddingBottom:5}}>
                     { item.Nominees.map((nom, index) => (
                      <div style={{padding:10}}>
                          <div style={{}} >
                            { index+1 } { nom }
                          </div>
                            <div style={{textAlign:"end"}}>
                            {/* onClick={() => handleCount(item,index)}> */}
                              <ThumbUpAltRoundedIcon 
                              onClick={() => toggle (index,item.Id)} className={ 'true' ? 'toggleOn' : 'toggleOff' }/>
                            </div>
                          <Divider/>
                          <br/>
                      </div>)) }                      
                  </CardContent>            
              </Card>
              </div> 
  )
}

export default awardCategories
