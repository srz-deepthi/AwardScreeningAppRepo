import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { listNominees } from '../redux/action'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

const Winners = (props) => {

  useEffect( ()=>{
        props.getWinners()
  },[])

  return (
    <div>
        { props.data.map((item,key) =>(

            <div style={{ paddingLeft: 130, paddingTop: 30, paddingBottom: 30 }}>

              <Card sx={{ maxWidth: 1200 , bgcolor:"#f7f37c",color:"#4a4a36"}}>

                <CardHeader sx={{ fontFamily: "Verdana, sans-serif", color: "#696969", fontSize: 50 }}
                  avatar={
                    <Avatar sx={{ bgcolor:"#baba99" }} aria-label="recipe">
                      {item.id}
                    </Avatar>
                  }
                  title={<div style={{ fontSize:20 }}>{item.AwardCategory}</div>}
                />             

                <CardContent sx={{ paddingBottom: 5 , fontSize: 30, paddingLeft:10}}>
                    { item.winner ? item.winner : " Winner not declared yet." }
                </CardContent>
              </Card>
            </div>
        ))
        }
    </div>
  )
}

const mapStateToProps = (state) => ({
    data:state.awardslist
})

const mapDispatchToProps = dispatch => {
    return {
        getWinners : () => dispatch(listNominees())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Winners)