import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from '../../components/PostGallery/PostGallery'
import PageHeader from "../../components/Header/Header";
import * as likeApi from "../../utils/likeApi"

import userService from "../../utils/userService";
import { removeLike } from "../../utils/likeApi";

export default function ProfilePage({user}) {
  const [posts, setPosts] = useState([]);
  const [stateUser, setStateUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // grabbing the param from this route
  //  <Route path="/:username" element={<ProfilePage />} />
  const { username } = useParams();
  console.log(username);


  async function getProfile() {
    // make the api call,
    // then log the response,
    // then update the state

    try {
      setLoading(true);
      const response = await userService.getProfile(username);
      console.log(response);
      setPosts(response.posts);
      setStateUser(response.stateUser);
      setLoading(false)
    } catch (err) {
      setError("Error loading profile");
      console.log(err, " err in profile");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);



  async function addLike(postId){
    try {
      const data = await likeApi.create(postId);
      console.log(data, '<-- from addLike');
      getProfile(); //To update our state
    } catch (err) {
      console.log(err);
      
    }
  }


  async function removeLike(likeId){
    try {
      const data = await likeApi.removeLike(likeId);
      getProfile();
    } catch (err) {
      console.log(err);
      
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader />
        <h1>Loading....</h1>
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostGallery posts={posts} itemsPerRow={3} isProfile={true} addLike={addLike} removeLike={removeLike} user={user}/> 
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
