import React  from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { addUser } from '../redux/action';
import UseValidation from './useValidation';

const User = (props) => {

    let navigate = useNavigate();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',           
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    // //userDetails
    // const [user, setUser] = useState({
    //     name: "",
    //     email: ""
    // })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Final submit function
    const formLogin = () => {

    console.log("Callback function when form is submitted!");
    console.log("Form Values ", user);
    props.addUser(user)
    navigate('/vote');
  }
    // //user details 
    // const handleC = (e) => {
    //     const name = e.target.name
    //     setUser(
    //     {
    //         ...user,
    //         [name]: e.target.value
    //     }
    //     )
    // }

    // //submit user
    // const handleSubmit = () => {
    //     props.addUser(user)
    //     navigate('/vote');
    // } 

    //Custom hook call for validation
    const {handleChangeVal, user,errors,handleSubmitVal } = UseValidation(formLogin);

  return (
    <div><Button variant="contained" size="large" sx={{ mx: 80, width: 150, color: "white" }} onClick={handleOpen}> VOTE </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 style={{ color: '#505050' }}>User Details</h2><hr />

        <form onSubmit={handleSubmitVal}>
          <div style={{ padding: 10 }}>
            <div style={{ padding: 10, paddingLeft: 20 }}>
              <TextField
                sx={{ width: 330 }}
                label="Name"
                name="name"
                id="outlined-size-small"
                size="small"
                value={user.name}
                onChange={handleChangeVal}
                required
              />
                {
                  errors.name && <h5>{errors.name}</h5>
                }
            </div>
            <div style={{ padding: 10, paddingLeft: 20 }}>
              <TextField
                sx={{ width: 330 }}
                label="Email"
                name="email"
                id="outlined-size-small"
                size="small"
                type="email"
                value={user.email}
                onChange={handleChangeVal}
                required
              />
              {
                  errors.email && <h5>{errors.email}</h5>
                }
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
    </Modal></div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => {    
    return{
        addUser: (user) => dispatch(addUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)