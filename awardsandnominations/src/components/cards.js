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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

    //modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    //toggle flag
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
              {/* <Button variant="contained" size="large" sx ={{ mx: 80 , width: 150 , color: "white"}}> 
              <Link to="/user" style={{ textDecoration: 'none' }}>
                        Vote
              </Link>
              </Button> */}
              <div>
          <Button variant="contained" size="large" sx ={{ mx: 80 , width: 150 , color: "white"}} onClick={handleOpen}> VOTE </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 style={{ color:'#505050'}}>User Details</h2>
              <div style={{ padding: 10 }}>
                <div style={{ padding: 10 }}>
                <TextField
                  label="Name"
                  id="outlined-size-small"
                  size="small"
                />
                </div>
                <div style={{ padding: 10 }}>
                <TextField
                  label="Email"
                  id="outlined-size-small"
                  size="small"
                  type="email"
                />
                </div>
                <div style={{ padding: 10 }}>
                  <Button variant="contained" sx ={{ mx:2,width: 150 , color: "white" }} onClick={handleClose}>Cancel</Button>
                  <Button variant="contained" sx ={{ width: 150 , color: "white"}}>OK</Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </>
  );
}
{/* <Button onClick={handleOpen}>Open modal</Button> */}

