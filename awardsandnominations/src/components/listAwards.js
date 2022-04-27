import * as React from 'react';
import { connect } from "react-redux";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { listNominees } from '../redux/action';
import User from './user'

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

const ListAwards = (props) => {

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
  
  return (
    <>
      {(props.data.length > 0) ?
        <>
          {props.data.map((item, key) => (
            <div style={{ paddingLeft: 130, paddingTop: 30, paddingBottom: 30 }}>
              <Card sx={{ maxWidth: 1200 ,color:"#4a4a36"}}>
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
            {/* Button */}
            <User/>
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
    // updateVote: (voteNominees) => dispatch(updateVote(voteNominees))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAwards)
