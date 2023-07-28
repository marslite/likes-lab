import { Card, Icon, Image } from "semantic-ui-react";

function PostCard({ post, isProfile, user, addLike, removeLike }) {
  //addLike, removeLike, user

  const likeIndex = post.likes.findIndex(like => like.username === user.username);
  const clickHandler = likeIndex > -1 ? () => removeLike(post.likes[likeIndex]._id) : () => addLike(post._id);
  const likeColor = likeIndex > -1 ? 'red' : 'grey' 

  return (
    <Card key={post._id}>
      {isProfile ? null : (
        <Card.Content textAlign="left">
          <Image
            floated="left"
            size="large"
            avatar
            src={
              post.user.photoUrl
                ? post.user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
          />
          <Card.Header floated="right">{post.user.username}</Card.Header>
        </Card.Content>
      )}

      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler} />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PostCard;
