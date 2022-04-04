import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const ExpandMore = styled((props) => {

  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards(props) {

  const [flagId,setFlag] = React.useState({
        fId:"",
        fExp:false,
  })

  const previousFlagValue = React.useRef("");
  
  React.useEffect(() => {
    previousFlagValue.current = flagId;
  }, [flagId]);

  const handleExpand= (id) =>{

     if( id !== previousFlagValue.current.fId && previousFlagValue.current.fExp === true )
        { 
            setFlag({
                fId:id,
                fExp:true,
              }) 
        }else{
          setFlag(
            {
              fId:id,
              fExp:!flagId.fExp,
            }
        )}
  }
  return (
    <>
    { props.data.map( (item,key) => (
              <div style={{ paddingLeft: 130 , paddingTop: 30 , paddingBottom: 30 }}>
              <Card sx={{ maxWidth: 1200 }}>
                <CardHeader sx={{ fontFamily: "Verdana, sans-serif", color: "#696969", fontSize: 30 }}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {item.Id}
                    </Avatar>
                  }
                  action={
                    <ExpandMore
                    onClick={()=>handleExpand(item.Id)}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                  }
                  title= { item.AwardCategory }
                />                
                { item.Id === flagId.fId ? 
                <Collapse in={flagId.fExp} timeout="auto" unmountOnExit>
                  <CardContent>
                     { item.Nominees.map((nom, index) => (<>
                    { index+1 } { nom } <br/></>)) } <br/>                     
                  </CardContent>
                </Collapse>:""}
              </Card>
              </div> ))}
              <Button variant="contained" size="large" sx ={{ mx: 80 , width: 150 , color: "white"}}> 
              <Link to="/user" style={{ textDecoration: 'none' }}>
                        Vote
              </Link>
              </Button>
      </>
  );
}

