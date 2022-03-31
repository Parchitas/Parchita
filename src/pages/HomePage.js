import React from 'react'
import { Typography, Grid, Card, CardContent, Box, CardHeader } from '@material-ui/core'
import { Rating, Avatar } from '@mui/material'
import Banner from '../components/Banner/Banner'
import { useContext } from 'react'
import { sessionContext } from "../context/SessionContext"



const HomePage = () => {

  const { isAdmin } = useContext(sessionContext)

  return (
    <>
      <div >
        <Banner />
      </div><br />
      <Typography variant="h3" align="center"> Feedback </Typography><br />
      <div><Grid container justifyContent='center' spacing={5}>
        <Grid item>
          <Box
            sx={{
              width: 300,
              height: 200,
            }}
          >
            <Card>
              <CardContent>
                <CardHeader
                  avatar={
                    <Avatar alt="Jason Momoa" src="https://flop.today/__export/1648571405380/sites/flop/img/2022/03/29/jason-momoa.jpg_166932058.jpg"></Avatar>}
                  title="Jason Momoa"
                  subheader="September 11, 2001"
                />
                <Typography variant="h6" color="text.secondary" align="right">
                  <Rating name="Ranking" defaultValue={4} precision={0.5} size="big" readOnly />
                </Typography>
                <Typography variant="h6" color="text.secondary" align="justify">
                  Me tocaron pero suavecito.
                </Typography>
              </CardContent>
            </Card>
          </Box></Grid>
        <Grid item>
          <Box
            sx={{
              width: 300,
              height: 200,
            }}
          >
            <Card>
              <CardContent>
                <CardHeader
                  avatar={
                    <Avatar alt="Albert Einstein" src="https://c.files.bbci.co.uk/assets/aabea4fb-7ebf-43e9-b431-b1480f3ca926"></Avatar>}
                  title="Albert Einstein"
                  subheader="September 02, 1945"
                />
                <Typography variant="h6" color="text.secondary" align="right">
                  <Rating name="Ranking" defaultValue={1.5} precision={0.5} size="big" readOnly />
                </Typography>
                <Typography variant="h6" color="text.secondary" align="justify">
                  Hitler lo hubiera hecho mejor.
                </Typography>
              </CardContent>
            </Card>
          </Box></Grid>
        <Grid item>
          <Box
            sx={{
              width: 300,
              height: 200,
            }}
          >
            <Card>
              <CardContent>
                <CardHeader
                  avatar={
                    <Avatar alt="Cristiano Ronaldo" src="https://media.canalnet.tv/2019/12/cr7borracho.jpg"></Avatar>}
                  title="Cristiano Ronaldo"
                  subheader="June 24, 1987"
                />
                <Typography variant="h6" color="text.secondary" align="right">
                  <Rating name="Ranking" defaultValue={3.5} precision={0.5} size="big" readOnly />
                </Typography>
                <Typography variant="h6" color="text.secondary" align="justify">
                  Me encontre a Messi, alto pibe.
                </Typography>
              </CardContent>
            </Card>
          </Box></Grid>
      </Grid>
      </div>
    </>
  )
}

export default HomePage
