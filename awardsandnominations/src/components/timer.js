import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import moment from 'moment';

const Timer = (props) => {

    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
      }));
    
      //Date and Time
      const dateString1 = '2022-04-20T04:30:00Z'
      const dateString2 = '2022-05-21T04:30:00Z'
      const [sDate, setsDate] = useState(moment(dateString1).utcOffset("+05:30").format('DD MMMM YYYY h:mm A'));
      const [eDate, seteDate] = useState(moment(dateString2).format('DD MMMM YYYY h:mm A'));
      const [countdownDate,setCountdownDate]= useState(new Date(eDate).getTime());


      const [state, setState] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      var timeValid;

      React.useEffect(() => {  
        props.checkTime(countdownDate)     
        setInterval(() => setNewTime(), 1000);
      }, [])

      const setNewTime = () => {
        if (countdownDate) {
    
          const currentTime = new Date().getTime();
    
          const distanceToDate = countdownDate - currentTime;
          
          timeValid=distanceToDate;

          let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
    
          let hours = Math.floor(
            (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          let minutes = Math.floor(
            (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
          );
          let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
          const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
          days = `${days}`;
          if (numbersToAddZeroTo.includes(hours)) {
            hours = `0${hours}`;
          } else if (numbersToAddZeroTo.includes(minutes)) {
            minutes = `0${minutes}`;
          } else if (numbersToAddZeroTo.includes(seconds)) {
            seconds = `0${seconds}`;
          }
          setState({ days: days, hours: hours, minutes, seconds });
          //console.log("state",state)
    
          }
      }

  return (

    <div> 
        <div style={{ display:"flex", flexDirection:"row", textAlign:"center", verticalAlign:"middle", color:"white"}}>
        <Div sx={{ textAlign: "center", fontSize: 22 , bgcolor:"#baba99", width:200}}>
            <div style={{fontSize:18}}>
                Starts on:
            </div>
            { sDate }
            <br />
        </Div>

        <Div sx={{ textAlign: "center", fontSize: 22, width:200, bgcolor:"#dbd99c"}}> 
        {/*  */}
            <div style={{fontSize:18}}>
                Ends on:
            </div>
            { eDate }
            <br />
        </Div>

        { (countdownDate - new Date().getTime()) > 0 ?          
            <div style={{ textAlign:"center", fontSize:25, paddingTop:50, backgroundColor:"#f5f295",width:1050 ,color:"#999990"}}>
                Voting Days left : { state.days }
                <small className="time-text"> Days </small>
                { state.hours }
                <small className="time-text"> Hours </small>
                { state.minutes }
                <small className="time-text"> Minutes </small>
                { state.seconds }
                <small className="time-text"> Seconds </small>
            </div> :

            <div style={{ textAlign:"center", fontSize:25, paddingTop:50, backgroundColor:"#c1ed8c",width:1050 ,color:"#999990"}}>
            Voting is over
            </div> }

        </div>
    </div>
  )
}

export default Timer