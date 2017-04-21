import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRant, upvote } from '../../actions/rant';
/* API Ref:
attached_image: ""
created_time: 1491178991
edited: false
id: 509276
num_comments: 3
num_downvotes: 0
num_upvotes: 40
score: 40
tags: Array[]
text: ""
user_avatar: Object
user_id: 49546
user_score: 3506
user_username: "DLMousey"
vote_state: 0
*/
class RantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plusColor: null,
      minusColor: null,
    };
  }
  openRant(id) {
    this.props.fetchRant(id);
  }
  upvote(id) {
    this.setState({ plusColor: '#D55161' });
    this.props.upvote(
      id,
      this.props.auth.id,
      this.props.auth.key,
      this.props.auth.user_id,
    );
  }
  componentWillMount() {
    const { rant } = this.props;
    this.setState(
      {
        plusColor: rant.vote_state === 1 ? '#D55161' : null,
        minusColor: rant.vote_state < 0 ? '#D55161' : null,
      },
    );
  }
  render() {
    const { rant } = this.props;
    let trimmedString = rant.text;
    if (rant.text.length > 300) {
      const maxLength = 300;
      trimmedString = rant.text.substr(0, maxLength);
      trimmedString = `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))}...(Read More)`;
    }

    let imageSource = <img src="res/images/empty_avatar.png" alt="" />;

    if (rant.user_avatar.i) {
      imageSource = <img src={`https://avatars.devrant.io/${rant.user_avatar.i}`} alt="" />;
    }
    return (
      <div className="rant_card row" >
        <div className="card blue-grey darken-1">
          <div className="card-user">
            { imageSource }
            <div>
              <p>{rant.user_username}</p>
              <p className="user_score">+{rant.user_score}</p>
            </div>
          </div>
          <div className="card-content white-text">
            <pre><p>{trimmedString}</p></pre>
          </div>
          <div className="card-image">
            <img src={rant.attached_image.url} alt="" />
          </div>
          <div className="card-bottomBar">
            <button onClick={() => this.upvote(rant.id)} >
              <i
                style={{ color: this.state.plusColor }}
                className="ion-plus-round"
              />
            </button>
            <p>{rant.score}</p>
            <i
              style={{ color: this.state.minusColor }}
              className="ion-minus-round"
            />
            <div style={{ flex: 1 }} />
            <p>{rant.num_comments}</p>
            <button onClick={() => this.openRant(rant.id)} >
              <i className="ion-chatbubbles" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RantCard.propTypes = {
  rant: React.PropTypes.shape({
    text: React.PropTypes.string,
  }).isRequired,
  fetchRant: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { fetchRant, upvote })(RantCard);
