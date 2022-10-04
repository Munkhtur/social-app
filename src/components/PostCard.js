import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import Popup from '../util/Popup';
import {
  FacebookShareButton, 
  FacebookIcon, 
  TwitterShareButton, 
  TwitterIcon, RedditIcon, RedditShareButton, VKShareButton, VKIcon
} from "react-share";

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/wireframe/square-image.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likeCount, likes }} user={user} />
        <Popup content='Comment on post'>
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button color='blue' basic>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </Popup>

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
      <Card.Content>
      <FacebookShareButton
      url={`http://localhost:3000/posts/${id}`}
            title={body}
          
                hashtag="#camperstribe"
            >
      <FacebookIcon size={26} round />
      </FacebookShareButton>
      <TwitterShareButton
              url={`http://localhost:3000/posts/${id}`}
            title={body}
      description={"social app post"}
    
            hashtag="#social app">
        <TwitterIcon size={26} round/>
      </TwitterShareButton>
      <VKShareButton
        image=''
              url={`http://localhost:3000/posts/${id}`}
      >
        <VKIcon  size={26}/>
      </VKShareButton>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
