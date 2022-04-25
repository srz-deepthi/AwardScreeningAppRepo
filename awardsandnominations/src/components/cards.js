import * as React from 'react';
import { useState } from "react"
import { connect } from "react-redux";
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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { listNominees, addUser, updateVote } from '../redux/action';
import { useNavigate } from 'react-router';
import Divider from '@mui/material/Divider';
import Timer from './timer'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f7f37c',           
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

const Cards = (props) => {

  let navigate = useNavigate();

  //userDetails
  const [user, setUser] = useState({
    name: "",
    email: ""
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //toggle flag
  const [flagId, setFlag] = React.useState({
    fId: "",
    fExp: false,
  })

  const previousFlagValue = React.useRef("");

  React.useEffect(() => {
    props.listNominees()
  }, [])

  React.useEffect(() => {
    previousFlagValue.current = flagId;
  }, [flagId]);

  
  const handleExpand = (id) => {

    if (id !== previousFlagValue.current.fId && previousFlagValue.current.fExp === true) {
      setFlag({
        fId: id,
        fExp: true,
      })
    } else {
      setFlag(
        {
          fId: id,
          fExp: !flagId.fExp,
        }
      )
    }
  }
  
  //user details 
  const handleC = (e) => {
    const name = e.target.name
    setUser(
      {
        ...user,
        [name]: e.target.value
      }
    )
  }

  //submit user
  const handleSubmit = () => {
    props.addUser(user)
    navigate('/vote');
  }

  return (
    <>
      {(props.data.length > 0) ?
        <>
          {props.data.map((item, key) => (
            <div style={{ paddingLeft: 130, paddingTop: 30, paddingBottom: 30 }}>
              <Card sx={{ maxWidth: 1200 , bgcolor:"#f7f37c",color:"#4a4a36"}}>
                <CardHeader sx={{ fontFamily: "Verdana, sans-serif", color: "#696969", fontSize: 30 }}
                  avatar={
                    <Avatar sx={{ bgcolor:"#baba99" }} aria-label="recipe">
                      {item.id}
                    </Avatar>
                  }
                  action={
                    <ExpandMore
                      onClick={() => handleExpand(item.id)}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  }
                  title={item.AwardCategory}
                />
                {item.id === flagId.fId ?
                  <Collapse in={flagId.fExp} timeout="auto" unmountOnExit>
                    <CardContent sx={{ paddingBottom: 5 }}>
                      {item.Nominees.map((nom, index) => (<div style={{ padding: 10 }}>
                        <div style={{}} >
                          {index + 1} {nom}
                        </div>
                        <br /></div>))}
                    </CardContent>
                  </Collapse> : ""}
              </Card>
            </div>))}
          <div>
            <Button variant="contained" size="large" sx={{ mx: 80, width: 150, color: "white" }} onClick={handleOpen}> VOTE </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h2 style={{ color: '#505050' }}>User Details</h2><hr />

                <form onSubmit={handleSubmit}>
                  <div style={{ padding: 10 }}>
                    <div style={{ padding: 10, paddingLeft: 20 }}>
                      <TextField
                        sx={{ width: 330 }}
                        label="Name"
                        name="name"
                        id="outlined-size-small"
                        size="small"
                        value={user.name}
                        onChange={handleC}
                        required
                      />
                    </div>
                    <div style={{ padding: 10, paddingLeft: 20 }}>
                      <TextField
                        sx={{ width: 330 }}
                        label="Email"
                        name="email"
                        id="outlined-size-small"
                        size="small"
                        type="email"
                        onChange={handleC}
                        required
                      />
                    </div>
                    <div style={{ padding: 10 }}>
                      <Button variant="contained" sx={{ mx: 2, width: 150, color: "white" }} onClick={handleClose}>Cancel</Button>
                      <Button variant="contained" sx={{ width: 150, color: "white" }} type="submit" >
                        OK
                      </Button>
                    </div>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        </> : ""}
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
    addUser: (user) => dispatch(addUser(user)),
    // updateVote: (voteNominees) => dispatch(updateVote(voteNominees))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
